import { productosModel } from "./models/productsModel.js";
import productValidation from "../validaciones/productsValidation.js";

export class ProductMongoManager {
    constructor() {
        this.products = [];

    }

    async getProducts(limit, sort = "asc", query, page) {
        limit = parseInt(limit) || 10
        try {
            const sortOptions = sort === 'des' ? { price: -1 } : { price: 1 }; 
            const queryOptions = query ? { category: query } : {};
    
            const result = await productosModel.paginate(
                queryOptions, { limit, sort: sortOptions, page: page, lean: true }
            );
            result.prevLink = result.hasPrevPage ? `http://localhost:8080?page=${result.prevPage}` : '';
            result.nextLink = result.hasNextPage ? `http://localhost:8080?page=${result.nextPage}` : '';
            
            result.isValid = !(page <= 0 || page > result.totalPages);
            // Opcional: Crear un objeto con los datos paginados y propiedades adicionales
            this.productos = {
                status: result ? 'succes' : 'error',
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasNextPage: result.hasNextPage,
                hasPrevPage: result.hasPrevPage,
                prevLink: result.hasPrevPage === false ? null : result.prevLink,
                nextLink: result.hasNextPage === false ? null : result.nextLink,
            };
    
            return this.productos;
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    }
    


    async getProductsById(id) {
        try {
            return await productosModel.findById(id).lean()
        } catch (error) {
            console.error('Error al obtener producto:', error);
            throw error;
        }
    }

    async addProducts(title, description, code, price, status, stock, category, thumbnails = ['default.jpg']) {
        try {
            const validaciones = await productValidation(title, description, code, price, status, stock, category, thumbnails)
            if (validaciones !== true) {
                throw new Error(validaciones);
            }
            const newProduct = await productosModel.create({
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails
            })

            this.products.push(newProduct.toJSON())

            return newProduct.toJSON()

        } catch (error) {
            console.error('error al añadir el producto', error)
            throw error
        }
    }

    async updateProduct(id, updateData) {
        try {
            const producto = await this.getProductsById(id);
            if (!producto) {
                throw new Error('El producto no existe');
            }

            delete updateData.code;

            const productoActualizado = await productosModel.findByIdAndUpdate(id, { code: producto.code, ...updateData }, { new: true, runValidators: true }).lean();

            // Verifica si el producto fue encontrado.
            if (!productoActualizado) {
                throw new Error('El producto no existe');
            }

            return productoActualizado;
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
    }




    async deleteProduct(id) {
        try {

            return await productosModel.findByIdAndDelete(id).lean()
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            throw error;
        }
    }

}