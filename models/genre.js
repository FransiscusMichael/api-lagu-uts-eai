const db = require("../config/db");

const cekGenre = (genre) => {
  const query = `SELECT * FROM table_genre where genre='${genre}'`;
  return db.execute(query);
};

const lihatSemuaGenre = () => {
  const query = `SELECT * FROM table_genre`;
  return db.execute(query);
};

const buatGenreBaru = (genre) => {
  const query = `INSERT INTO table_genre (genre) VALUES ('${genre}')`;
  return db.execute(query);
};

module.exports = {
  cekGenre,
  lihatSemuaGenre,
  buatGenreBaru,
};
