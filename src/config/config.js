
export const config = {
    PORT: process.env.PORT || 8080,
    MOONGODB: process.env.MOONGODB || "mongodb+srv://Julian999:JulianJulian@cluster0.hs69b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    SESSION_SECRET: process.env.SESSION_SECRET || 'secret',
    DBNAME: process.env.DBNAME || 'ecommerce',
}