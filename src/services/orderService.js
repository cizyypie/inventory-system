import status from 'http-status';
import prisma from '../../prisma/client.js';
import ApiError from '../utils/ApiError.js';

const createOrder = async (orderBody, userId) => {
  const { customerName, customerEmail, items } = orderBody;

  // step 1 — validate all products exist and have enough stock (OUTSIDE transaction)
  const productIds = items.map((item) => item.productId);

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  if (products.length !== productIds.length) {
    throw new ApiError(status.NOT_FOUND, 'One or more products not found');
  }

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (product.quantityInStock < item.quantity) {
      throw new ApiError(
        status.BAD_REQUEST,
        `Insufficient stock for product: ${product.name}. Available: ${product.quantityInStock}`
      );
    }
  }

  // step 2 — calculate prices (OUTSIDE transaction)
  const orderItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: product.price,
    };
  });

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  // step 3 — transaction only does the writes, no reads inside
  const order = await prisma.$transaction(
    async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          customerName,
          customerEmail,
          totalPrice,
          user: { connect: { id: userId } },
          items: {
            create: orderItems.map((item) => ({
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              product: { connect: { id: item.productId } },
            })),
          },
        },
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      // bulk update all products in one go instead of looping
      await Promise.all(
        orderItems.map((item) =>
          tx.product.update({
            where: { id: item.productId },
            data: { quantityInStock: { decrement: item.quantity } },
          })
        )
      );

      return newOrder;
    },
    {
      timeout: 15000, // increase timeout to 15s as safety net
    }
  );

  return order;
};

const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      items: { include: { product: true } },
    },
  });
};

const getOrderById = async (id) => {
  console.log('getOrderById id:', id);
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
};

const getOrdersByUserId = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });
};

const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(status.NOT_FOUND, 'Order not found');
  }

  return prisma.order.update({
    where: { id: orderId },
    data: updateBody,
    include: {
      items: {
        include: { product: true },
      },
    },
  });
};

const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(status.NOT_FOUND, 'Order not found');
  }

  return prisma.$transaction(async (tx) => {
    await tx.orderItem.deleteMany({ where: { orderId } });
    await tx.order.delete({ where: { id: orderId } });
 });
};

export { createOrder, getAllOrders, getOrderById, updateOrderById, deleteOrderById, getOrdersByUserId };
