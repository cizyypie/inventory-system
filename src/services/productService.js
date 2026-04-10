import status from 'http-status';
import prisma from '../../prisma/client.js';
import ApiError from '../utils/ApiError.js';

const createProduct = async (productBody, userId) => {
  return prisma.product.create({
    data: { productBody, userId },
    include: { category: true },
  });
};

const getProductById = async (id) => {
  return prisma.product.findUnique({ 
    where: { id }, 
    include: { category: true } 
    });
};

const getProductsByUserId = async (userId) => {
  return prisma.product.findMany({
    where: { userId },
    include: {
      category: true,
    },
  });
};

const getAllProducts = async () => {
  return prisma.product.findMany({
    include: {
      category: true,
    },
  });
};

const updateProductById = async (productId, updateBody) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(status.NOT_FOUND, 'Product not found');
  }

  return prisma.product.update({ 
    where: { id: productId }, 
    data: updateBody,
    include: { category: true },
     });
};

const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(status.NOT_FOUND, 'Product not found');
  }

  return prisma.product.delete({ where: { id: productId } });
};

export { createProduct, getProductsByUserId, getProductById, getAllProducts, updateProductById, deleteProductById };
