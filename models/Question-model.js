const { Schema, model } = require("mongoose");

const Question = new Schema({
  title: { type: String, required: true },
  answer: { type: String, required: true },
  media: { type: String}, // Здесь будет путь к файлу
  category: { type: String, required: true },
  difficulty: { type: Number, required: true },
  koment: { type: [String], required: true }, // Массив строк
});

module.exports = model("Question", Question);