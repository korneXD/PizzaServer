import { configDB } from "./configDB.js";
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const PORT = 3000;

let connection;
try {
  connection = await mysql.createConnection(configDB);
} catch (error) {
  console.log(error);
}

const app = express();
app.use(express.json());
app.use(cors());

app.get("/products", async (req, res) => {
  try {
    const sql = "select * from products";
    const [rows] = await connection.execute(sql);
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "select name, img_url from products where id=?";
    const value = [id];
    const [rows] = await connection.execute(sql, value);
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
});

app.get("/pricelist/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sql =
      "select pricelist.id, pricelist.product_id, pricelist.size, pricelist.price from products inner join pricelist on pricelist.product_id = products.id where pricelist.product_id=?";
    const value = [id];
    const [rows] = await connection.execute(sql, value);
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log("Server listening on port: ", PORT));
