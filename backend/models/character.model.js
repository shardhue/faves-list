import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fandom: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    etc: {
        type: Array,
        required: false
    },
}, {
    timestamps: true
});

const Character = mongoose.model('Character', characterSchema);

export default Character;