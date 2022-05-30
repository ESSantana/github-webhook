import MySQL from "mysql";

export const getDBConnection = async(): Promise<MySQL.Connection> => {
  const connection =  MySQL.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await connection.connect();

  return connection;
}
