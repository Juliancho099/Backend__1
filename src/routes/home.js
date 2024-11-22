import { Router } from "express";
import { ProductMongoManager as ProductManager } from "../dao/ProductMongoManager.js";
import { CartMongoManager as CartManager } from "../dao/cartMongoManager.js";
const router = Router();
const Productos = new ProductManager()
const carts = new CartManager()
router.get("/", async(req, res) => {
    let {limit, sort, query, page} = req.query
    limit = parseInt(limit) || 10
    page = parseInt(page) || 1
    try {
        const productos = await Productos.getProducts(limit, sort, query, page)
        const Carts = await carts.getCarts() 
        const carritos = Carts ? Carts : []
        res.render("home", {
            products: productos,
            carts: carritos,
            limit: limit,
            sort: sort || 'asc',
            query: query || '',
            page: page,
            style: 'todo.css'
        });
    } catch (error) {
        console.log(error)
    }
});

export default router