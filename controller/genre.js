const genreModel = require("../models/genre");

const lihatSemuaGenre = async (req, res) => {
  try {
    const [genre] = await genreModel.lihatSemuaGenre();
    res.status(200).json({
      status: 200,
      message: "Daftar genre yang tersedia",
      timestamp: new Date().toLocaleTimeString(),
      genre,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
};

const buatGenreBaru = async (req, res) => {
  const { genre } = req.body;
  const [cekGenre] = await genreModel.cekGenre(genre);
  if (cekGenre.length === 1) {
    res.status(400).json({
      status: 400,
      message: "Genre tersebut sudah terdaftar",
      timestamp: new Date().toLocaleTimeString(),
    });
  } else {
    try {
      await genreModel.buatGenreBaru(genre);
      res.status(201).json({
        status: 201,
        message: "Berhasil menambahkan genre",
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error,
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  }
};

module.exports = {
  lihatSemuaGenre,
  buatGenreBaru,
};
