const User = require("../models/User-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  async registration(req, res) {
    try {
      const { fullName, email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({
          message: "Пользователь с таким именем уже существует",
        });
      }

      const hashPassword = bcrypt.hashSync(password, 7);

      const user = new User({
        fullName,
        email,
        password: hashPassword,
      });

      await user.save();
      const token = jwt.sign({ email }, "SECRET_KEY", { expiresIn: "15m" });
      return res.json({ token });
    } catch (e) {
      console.log("Error", e);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Ищем пользователя по имени
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Пользователь ${email} не найден` });
      }

      // Проверяем пароль
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      // Генерируем токен
      const token = jwt.sign({ email }, 'SECRET_KEY', { expiresIn: "15m" });
      return res.json({ token });
    } catch (e) {
      console.log("Error", e);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}


module.exports = new AuthController()