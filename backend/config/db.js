import oracledb from "oracledb";

async function initialize() {
  const pool = await oracledb.createPool({
    user: "COMP214_f23_ers_10",
    password: "password",
    connectString: "199.212.26.208:1521/SQLD",
  });

  return pool;
}

async function getConnection() {
  return await oracledb.getConnection();
}

async function close() {
  await oracledb.getPool().close();
}

const db = { initialize, getConnection, close };
export default db;
