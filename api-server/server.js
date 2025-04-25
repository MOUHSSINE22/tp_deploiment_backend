const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes de base
app.get('/', (req, res) => {
  res.json({ message: 'API opérationnelle' });
});

// Données mock pour l'exemple
let tasks = [
  { id: 1, title: 'Apprendre Express', completed: false },
  { id: 2, title: 'Créer une API REST', completed: false },
  { id: 3, title: 'Apprendre Spring Boot', completed: true },
  { id: 4, title: 'Apprendre React JS', completed: false },
  { id: 5, title: 'Apprendre Vue JS', completed: true },
  { id: 6, title: 'Apprendre Laravel', completed: true },
  { id: 7, title: 'Apprendre Node JS', completed: true },
  { id: 8, title: 'Apprendre Angular JS', completed: false },
  { id: 9, title: 'Apprendre Django', completed: false },
  { id: 10, title: 'Apprendre Flask', completed: true }
];

// Route pour récupérer toutes les tâches
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Route pour récupérer une tâche spécifique
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Tâche non trouvée' });
  res.json(task);
});

// Route pour créer une nouvelle tâche
app.post('/api/tasks', (req, res) => {
  const { title, completed } = req.body;

  // Assurez-vous que 'completed' est un booléen
  const isCompleted = completed === true;  // Vérifie et assure que completed est un booléen

  const newTask = {
    id: tasks.length + 1,
    title,
    completed: isCompleted  // Utilise la valeur envoyée par le client pour 'completed'
  };

  tasks.push(newTask);
  res.status(201).json(newTask);  // Retourner la tâche créée avec le bon statut 'completed'
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
