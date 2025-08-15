import mysql from 'mysql2'

export const PORT = 3500
export const db = "mongodb+srv://egormix1703:h4zqLvsZg8hQ1v5W@cluster-java-27-30.uqs1p0i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-java-27-30"

//================================mySQL Connection=====================
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
})