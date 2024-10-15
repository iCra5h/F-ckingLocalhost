const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Ініціалізація Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Підключення до MongoDB Atlas
const mongoUri = 'YOUR_MONGODB_ATLAS_CONNECTION_STRING';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Створення схеми для зберігання заміток
const noteSchema = new mongoose.Schema({
  userId: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model('Note', noteSchema);

// Створення замітки
app.post('/addNote', (req, res) => {
  const { userId, content } = req.body;
  const newNote = new Note({ userId, content });
  newNote.save().then(note => res.json(note)).catch(err => res.status(500).json(err));
});

// Отримання заміток
app.get('/getNotes/:userId', (req, res) => {
  const userId = req.params.userId;
  Note.find({ userId }).then(notes => res.json(notes)).catch(err => res.status(500).json(err));
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
