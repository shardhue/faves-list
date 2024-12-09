import { create } from 'zustand'

export const useCharacterStore = create((set) => ({
    characters: [],
    setCharacters: (characters) => set({characters}),
    createCharacter: async (newCharacter) => {
        if (!newCharacter.name || !newCharacter.fandom || !newCharacter.image) {
            return {success:false, message:"Please fill in all the fields."}
        };
        const res = await fetch("/api/characters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCharacter)
        });
        const data = await res.json();
        set((state) => ({characters:[...state.characters, data]}))
        return {success:true, message:"Character created successfully."}
    },
    fetchCharacters: async () => {
        const res = await fetch("/api/characters", {
            method: "GET",
        });
        const data = await res.json();
        set({ characters: data.data });
    },
    deleteCharacter: async (cid) => {
        const res = await fetch(`/api/characters/${cid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return {success:false, message:data.message};

        set(state => ({characters: state.characters.filter(character => character._id !== cid)}));
        return {success:true, message:data.message};
    },
    updateCharacter: async (cid, updateCharacter) => {
        const res = await fetch(`/api/characters/${cid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateCharacter),
        });
        const data = await res.json();
        if (!data.success) return {success:false, message:data.message};
        set((state) => ({
            characters: state.characters.map((character) => (character._id === cid ? data.data : character))
        }));
    },
}))