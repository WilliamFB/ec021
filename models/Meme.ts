const { Schema, model } = require('mongoose');

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

module.exports = model('Meme', MemeSchema);