import { Schema, model } from 'mongoose';

export interface ModelMeme {
    _id?: string;
    titulo: string,
    descricao: string,
    ano: number
}

const MemeSchema = new Schema(
    {
        titulo: String,
        descricao: String,
        ano: Number
    },
    {
        timestamps: true
    }
);

export const Meme = model('Meme', MemeSchema);
