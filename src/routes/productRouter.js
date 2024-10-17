import express from 'express';
import ProductManager from '../dao/productManager.js';

const router = express.Router()
const products = new ProductManager();

router.get('/', async (req, res)=>{
    const limit = parseInt(req.query.limit) || 10
    try {
        const productos = await products.getProducts(Number(limit))
        productos ? res.status(200).json(productos) : res.status(404).json({error: error.message})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/:id', async (req, res)=>{
    const {id} = req.params
    try {
        const producto = await products.getProductsById(id)
        producto ? res.status(200).json(producto) : res.status(404).json({error: error.message, id: id})
    } catch (error) {
        res.status(500).json({error: error.message, id: id})
    }
})

router.post('/', async (req,res)=>{
    const {title, description, code, price, status, stock, category, thumbnail} = req.body
    try {
        const newProduct = await products.addProducts(title, description, code, price, status, stock, category, thumbnail)
        newProduct && res.status(201).json(newProduct) 
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.put('/:pid', async(req, res)=>{
    const {pid}= req.params
    const {title, description, code, price, status, stock, category, thumbnail} = req.body

    try {
        const updateProductlist = await products.updateProduct(Number(pid), {title, description, code, price, status, stock, category, thumbnail})
        updateProductlist ? res.status(200).json(updateProductlist) : res.status(404).json({error: error.message})
    } catch (error) {
        res.status(500).json({error: error.message})
    }

})

router.delete('/:pid', async(req, res)=>{
    const {pid}= req.params
    try {
        const deleteProduct = await products.deleteProduct(Number(pid))
        deleteProduct ? res.status(200).json(deleteProduct) : res.status(404).json({error: error.message})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default router;