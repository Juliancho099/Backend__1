import { Router } from "express";
import { CartMongoManager } from "../dao/cartMongoManager.js";
const Carts = new CartMongoManager();
const router = Router();

router.get("/", async (req, res) => {

    try {
        const carts = await Carts.getCarts();
        res.render("carts", {
            style: "todo.css",
            carts: carts,
        });
        
    } catch (error) {
        console.log(error);
    }
});

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await Carts.getCartsById(cid);
        res.render("cart", {
            style: "todo.css",
            cart: cart,
            cartId: cid
        });
    } catch (error) {
        console.log(error);
    }
});

export default router;