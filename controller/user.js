const userModel = require("../models/user");
const jsonwebtoken = require("jsonwebtoken");

const signin = async (req, res) => {
  const { email } = req.body;
  const { password } = req.body;
  try {
    let [cekUser] = await userModel.cekUser(email);
    if (cekUser.length === 1) {
      user = cekUser[0];
      if (password == user.password) {
        jsonwebtoken.sign(
          {
            name: user.name,
            email: user.email,
          },
          process.env.KUNCI_JSONWEBTOKEN,
          (err, token) => {
            res.status(200).json({
              status: 200,
              timestamp: new Date().toLocaleTimeString(),
              message: "Berhasil sign in ke API",
              token,
            });
          }
        );
      } else {
        res.status(401).json({
          status: 401,
          timestamp: new Date().toLocaleTimeString(),
          message: "Password yang anda masukkan salah",
        });
      }
    } else {
      res.status(401).json({
        status: 401,
        timestamp: new Date().toLocaleTimeString(),
        message: "Email tidak terdaftar",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
      timestamp: new Date().toLocaleTimeString(),
    });
  }
};

const signup = async (req, res) => {
  const { email } = req.body;
  const { name } = req.body;
  const { password } = req.body;
  const [cekUser] = await userModel.cekUser(email);
  if (cekUser.length === 1) {
    res.status(400).json({
      status: 400,
      timestamp: new Date().toLocaleTimeString(),
      message: "Sign up gagal",
    });
  } else {
    try {
      await userModel.buatUserBaru(name, email, password);
      res.status(201).json({
        status: 201,
        timestamp: new Date().toLocaleTimeString(),
        message: "Sign up sudah berhasil, anda bisa sign in untuk mendapatkan token",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        timestamp: new Date().toLocaleTimeString(),
        message: error,
      });
    }
  }
};

module.exports = {
  signin,
  signup,
};
