export const configDB = {
  host: process.env.DB_HOST,
  user: process.env.DB_PASSWORD,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  multipleStatements: true,
};
