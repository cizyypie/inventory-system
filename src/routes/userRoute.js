import { Router } from "express";
import { getAllUsers, getUserById, createUser, deleteUser, updateUser, getProductUser, getOrderUser } from "../controllers/userController.js";

const router = Router(); 

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);    
router.delete("/:id", deleteUser);
router.get("/id/products", getProductUser)
router.get("/id/orders", getOrderUser)

export default router;