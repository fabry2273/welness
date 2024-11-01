import mongoose, { Schema, Document } from 'mongoose';

// Definisci l'interfaccia per il documento User
export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
}

// Definisci lo schema di User
const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

// Crea e esporta il modello User
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
