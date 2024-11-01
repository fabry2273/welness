"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./model/User"));
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
// Connessione a MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/wellnesshub')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('MongoDB connection error:', err));
// Configura una rotta di esempio
app.get('/', (req, res) => {
    res.send('Welcome to Wellness Hub Backend');
});
// Endpoint di registrazione
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    // Validazione dei dati
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Missing username, password, or email' });
    }
    try {
        // Controlla se l'utente esiste già
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Crea un nuovo utente
        const newUser = new User_1.default({ username, password, email });
        // Salva l'utente nel database
        yield newUser.save();
        // Risposta di successo
        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
// Ascolta sulla porta 5000
app.listen(port, () => {
    console.log('Server running on http://localhost:5000');
});
