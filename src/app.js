import express from 'express'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRoutes.js'
import realTimeProducts from './routes/realTimeProducts.js'
import home from './routes/home.js'
import routercarts from './routes/routercarts.js'
import  {engine}  from 'express-handlebars'
import { config } from './config/config.js'
import { conectarDB } from './connDB.js'

const app =express()
const PORT = config.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./src/public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/realtimeproducts', realTimeProducts);
app.use('/products', home);
app.use('/carts', routercarts);
app.get('/', (req, res)=>{
    res.send('<h1>Home</h1>, <a href="/products">Productos</a>');
});





app.listen(PORT, ()=>{
    console.log(`server on en http://localhost:${PORT}`)
})

conectarDB(config.MOONGODB, config.DBNAME)
