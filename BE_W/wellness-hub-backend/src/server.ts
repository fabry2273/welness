import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import User, { IUser } from './model/User'; 

const app = express();
const port = 5000;

// Abilita CORS per tutte le richieste
app.use(cors({
  origin: 'http://localhost:4200', // Specifica l'origine del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metodi consentiti
  allowedHeaders: ['Content-Type', 'Authorization'] // Headers consentiti
}));

app.use(express.json()); // Middleware per gestire il body in JSON



// Connessione a MongoDB
mongoose.connect('mongodb://localhost:27017/wellnesshub')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err));


// Configura una rotta di esempio
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Wellness Hub Backend');
});

// Endpoint di registrazione
app.post('/register', async (req: Request, res: Response): Promise<Response> => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Missing username, password, or email' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, password, email });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Ascolta sulla porta 5000
app.listen(port, () => {
  console.log('Server running on http://localhost:5000');
});
