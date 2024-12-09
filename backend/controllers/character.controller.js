import mongoose from 'mongoose';
import Character from '../models/character.model.js';

export const getCharacters = async (req, res) => {
    try {
        const characters = await Character.find({});
        res.status(200).json({ success: true, data: characters });
    } catch (error) {
        console.error("Cannot fetch characters:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createCharacter = async (req, res) => {
    const character = req.body;

    if (!character.name || !character.fandom || !character.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newCharacter = new Character(character);

    try {
        await newCharacter.save();
        res.status(201).json({ success: true, data: newCharacter });
    } catch (error) {
        console.error("Cannot create character:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateCharacter = async (req, res) => {
    const { id } = req.params;
    const character = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Character Id" });
    }

    try {
        const updatedCharacter = await Character.findByIdAndUpdate(id, character, {new:true});
        res.status(200).json({ success: true, data: updatedCharacter });
    } catch (error) {
        console.error("Cannot update character:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deleteCharacter = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Character Id" });
    }

    try {
        await Character.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Character deleted" });
    } catch (error) {
        console.error("Cannot delete character:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};