const productValidation = (title, description, code, price, status, stock, category, thumbnail) => {

    if (!title || !description || !code || !price || status === undefined || !stock || !category || !thumbnail) {
        throw new Error('Todos los campos son obligatorios');
    }

    if (typeof title !== 'string' || typeof description !== 'string' || typeof code !== 'string' || typeof category !== 'string') {
        throw new Error('titulo, descripción, código y categoría son de tipo string');
    }

    if (typeof price !== 'number' || typeof stock !== 'number') {
        throw new Error('price y stock son de tipo number');
    }

    if (typeof status !== 'boolean') {
        throw new Error('status es de tipo boolean');
    }

    if (price <= 0 || stock <= 0) {
        throw new Error('price y stock deben ser mayor a 0');
    }

    if (thumbnail && (!Array.isArray(thumbnail) || !thumbnail.every(item => typeof item === 'string'))) {
        throw new Error('thumbnail debe ser un array de strings');
    }
}

export default productValidation;