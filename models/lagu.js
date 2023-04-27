const db = require("../config/db");

const getDataLagu = (params) => {
  const strings = Object.keys(params);
  if (strings.length == 0) {
    const query = `SELECT table_lagu.judul_lagu, table_lagu.band_artis, table_lagu.album, table_lagu.tahun_rilis FROM table_lagu JOIN table_genre ON table_lagu.id_genre = table_genre.id`;
    return db.execute(query);
  } else {
    let string = "";
    strings.forEach((s) => {
      string += `${s}='${params[s]}' AND `;
    });
    string = string.slice(0, -5);
    const query = `SELECT table_lagu.judul_lagu, table_lagu.band_artis, table_lagu.album, table_lagu.tahun_rilis FROM table_lagu JOIN table_genre ON table_lagu.id_genre = table_genre.id WHERE ${string}`;
    return db.execute(query);
  }
};

const buatLaguBaru = (id_genre, judul_lagu, band_artis, album, tahun_rilis) => {
  const query = `INSERT INTO table_lagu (id_genre, judul_lagu, band_artis, album, tahun_rilis) 
                    VALUES (${id_genre}, '${judul_lagu}', '${band_artis}', '${album}', '${tahun_rilis}')`;
  return db.execute(query);
};

const updateLagu = (body, id) => {
  let updateString = "";
  const parameter = Object.keys(body);
  parameter.forEach((param) => {
    updateString += `${param}='${body[param]}', `;
  });
  updateString = updateString.slice(0, -2);
  const query = `UPDATE table_lagu
                SET ${updateString}
                WHERE id=${id}`;
  return db.execute(query);
};

const hapusLagu = (id) => {
  const query = `DELETE FROM table_lagu WHERE id=${id}`;
  return db.execute(query);
};

module.exports = {
  getDataLagu,
  buatLaguBaru,
  updateLagu,
  hapusLagu,
};
