Proyecto Backend Julian Tocano

En esta primera instancia, la funcionalidad de este repositorio es entregar un primer trabajo requerido por coderhouse cursada backed numero 1.

Podras encontrar en este repo la funcionalidad de un servidro el cual esta apuntando ala siguiente ruta: http://localhost:8080. En un instante te mostrare el tipo de solicitudes que podras hacer a este servodor, pero primero los pasos para usar este repo

1. Podras clonar este repositorio usando el comando git clone https://github.com/Juliancho099/Backend__1.git

2. Una vez clonado el repositorio no se te olvide instalar las dependencias, esto se logra con el comando npm install.

3. Aqui hago una aclaracion para visualizar a tiempo real el servidor te recomiendo instalar nodemon, esto lo haras con npm i nodemon, ya que solo lo instale como dependencia de desarrollo.

Una vez realizado los pasos anteriores te dejo aqui todas las solicitudes que le podras hacer al servidor


Solicitudes GET:
PRODUCTS
1. http://localhost:8080/api/products Aqui podras listar todos los productos
2. http://localhost:8080/api/products/:pdi Aqui podras remplazar el valor pid por un valor numerico para listar el producto el cual tenga dicha id.

CARTS

1. http://localhost:8080/api/carts Lista todos los carritos existentes.
2. http://localhost:8080/api/carts/:cid Lista el carrito con dicha id.

Solicitudes POST:

PRODUCTS
1. http://localhost:8080/api/products Aqui podras mandar solicitudes Post para crear nuevos productos los cuales tienen el siguiente formato
    {
        "title": "soy el titulo del la id 1",
        "description": "hola soy un producto nuevo del id 1",
        "code": "NP01",
        "price": 2000,
        "status": true,
        "stock": 20,
        "category": "perro2",
        "thumbnails": [
            "perro.jpg",
            "perro2.jpg"
        ]
    }

CARTS

1. http://localhost:8080/api/carts Crea un nuevo carrito
2. http://localhost:8080/api/products/:cid/products/:pid aqui podras añadir un producto(pid) a dicho carrito con la id meciondad(cid), aclaro que tambien se debe añadir una cantidad {"quantity": 1} y la id del producto debe ser de un producto existente en el servidor

Solicitudes PUT:

1. http://localhost:8080/api/products/:pid Aqui podras buscar un producto en especifico con su id y modificar los valores que desees, estos valores son los mismos que en la solicitud post.

Solicitudes DELETE:

1. http://localhost:8080/api/products/:pid Aqui podras buscar un producto en especifico con la id y eliminarlo.