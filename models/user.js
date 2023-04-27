const db = require("../config/db");

const cekUser = (email) => {
  const query = `SELECT * FROM table_user WHERE email='${email}'`;
  return db.execute(query);
};

const buatUserBaru = (name, email, password) => {
  const query = `INSERT INTO table_user (name, email, password) 
                  VALUES ('${name}', '${email}', '${password}')`;
  return db.execute(query);
};

module.exports = {
  cekUser,
  buatUserBaru,
};
