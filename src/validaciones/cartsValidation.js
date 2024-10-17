import ProductManager from "../dao/productManager.js";
const productos = new ProductManager()

const cartsValidation = async (id, productId, quantity)=>{
    const producto = await productos.getProductsById(productId);  // Asegúrate de usar await aquí
    if (!producto) {  // Comprueba si el producto existe realmente
        throw new Error('El producto que intentas añadir no existe');
    }
    if (quantity <= 0) {
    throw new Error('quantity debe ser mayor a 0');
    }

    if ( !productId || !quantity) {
        throw new Error('Todos los campos son obligatorios');
    }

    if ( typeof productId === 'string' || typeof quantity !== 'number' || typeof id === 'string') {
        throw new Error('id, productId y quantity son de tipo number');
    }
    
}

export default cartsValidation;