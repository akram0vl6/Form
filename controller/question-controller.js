const Question = require("../models/Question-model");
const path = require("path");

class QuestionController {

  async getAllQuestions(req, res) {
    try {
      const skip = parseInt(req.query.skip) || 0; // Количество уже загруженных вопросов
      const limit = 5; // Количество вопросов на одну порцию

      // Запрос к базе данных с пагинацией
      const questions = await Question.find()
        .skip(skip) // Пропускаем уже загруженные вопросы
        .limit(limit); // Ограничиваем количество загружаемых вопросов

      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: "Ошибка получения вопросов", error });
    }
  }

  async createQuestion(req, res) {
    try {
      // Обрабатываем путь файла
      const filePath = path.normalize(req.file.path); // Исправляем путь

      // Создаём новый вопрос
      const newQuestion = new Question({
        title,
        answer,
        media: filePath, // Сохраняем путь к файлу
        category,
        difficulty,
        koment: JSON.parse(koment), // Преобразуем строку JSON в массив
      });

      // Сохраняем в базу данных
      await newQuestion.save();
      res.status(201).json({ message: "Вопрос успешно создан!" });
    } catch (error) {
      res.status(500).json({ message: "Ошибка создания вопроса" });
    }
  }

  async deleteQuestion(req, res) {
    try {
      const { id } = req.params; // Получаем ID из параметров URL

      // Ищем вопрос по ID и удаляем его
      const deletedQuestion = await Question.findByIdAndDelete(id);

      // Если вопрос не найден
      if (!deletedQuestion) {
        return res.status(404).json({ message: "Вопрос не найден" });
      }

      // Ответ успешного удаления
      res
        .status(200)
        .json({ message: "Вопрос успешно удалён", deletedQuestion });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Ошибка при удалении вопроса", error: err });
    }
  }
}

module.exports = new QuestionController();
