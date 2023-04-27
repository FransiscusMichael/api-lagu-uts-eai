require("dotenv").config();
const userController = require("./controller/user");
const genreController = require("./controller/genre");
const laguController = require("./controller/lagu");
const tokenMiddleware = require("./middleware/tokenMiddleware");
const express = require("express");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post("/signup", userController.signup);
app.post("/signin", userController.signin);
app.get("/genre", tokenMiddleware, genreController.lihatSemuaGenre);
app.post("/genre", tokenMiddleware, genreController.buatGenreBaru);
app.get("/lagu", tokenMiddleware, laguController.getDataLagu);
app.post("/lagu", tokenMiddleware, laguController.buatLaguBaru);
app.patch("/lagu/:id", tokenMiddleware, laguController.updateLagu);
app.delete("/lagu/:id", tokenMiddleware, laguController.hapusLagu);

app.listen(PORT, () => {
  console.log("Server berhasil berjalan pada port " + PORT);
});
