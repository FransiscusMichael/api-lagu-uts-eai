const laguModel = require("../models/lagu");

const getDataLagu = async (req, res) => {
  const strings = req.query;
  let [lagu] = await laguModel.getDataLagu(strings);
  if (lagu.length == 1) {
    lagu = lagu[0];
  }
  res.status(200).json({
    timestamp: new Date().toLocaleTimeString(),
    status: 200,
    message: "Ini adalah data lagu yang tersedia",
    lagu,
  });
  try {
  } catch (error) {
    res.status(500).json({
      timestamp: new Date().toLocaleTimeString(),
      status: 500,
      message: error,
    });
  }
};

const buatLaguBaru = async (req, res) => {
  const { id_genre } = req.body;
  const { judul_lagu } = req.body;
  const { band_artis } = req.body;
  const { album } = req.body;
  const { tahun_rilis } = req.body;
  try {
    await laguModel.buatLaguBaru(id_genre, judul_lagu, band_artis, album, tahun_rilis);
    res.status(201).json({
      timestamp: new Date().toLocaleTimeString(),
      status: 201,
      message: "Berhasil menambahkan lagu",
      data: {
        id_genre,
        nama_lagu,
        band_artis,
        album,
        tahun_rilis,
      },
    });
  } catch (error) {
    res.status(500).json({
      timestamp: new Date().toLocaleTimeString(),
      status: 500,
      message: error,
    });
  }
};

const updateLagu = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await laguModel.updateLagu(body, id);
    res.status(200).json({
      timestamp: new Date().toLocaleTimeString(),
      status: 200,
      message: `Berhasil mengupdate lagu`,
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      timestamp: new Date().toLocaleTimeString(),
      status: 500,
      message: error,
    });
  }
};

const hapusLagu = async (req, res) => {
  const { id } = req.params;
  try {
    await laguModel.hapusLagu(id);
    res.status(200).json({
      timestamp: new Date().toLocaleTimeString(),
      status: 200,
      message: `Berhasil menghapus lagu`,
    });
  } catch (error) {
    res.status(500).json({
      timestamp: new Date().toLocaleTimeString(),
      status: 500,
      message: error,
    });
  }
};

module.exports = {
  getDataLagu,
  buatLaguBaru,
  updateLagu,
  hapusLagu,
};
