import { useState } from "react"
import { useCharacterStore } from "../store/character"

const CreatePage = () => {
    const [newCharacter, setNewCharacter] = useState({
        name: "",
        fandom: "",
        image: "",
    });

    const {createCharacter} = useCharacterStore();

    const handleAddCharacter = async() => {
        const {success, message} = await createCharacter(newCharacter);
    };
    
    return (
        <>
            <br></br><input
            placeholder='Character Name'
            name='name'
            value={newCharacter.name}
            onChange={(e)=>setNewCharacter({...newCharacter, name: e.target.value})}
            />
            <br></br><input
            placeholder='Fandom'
            name='fandom'
            value={newCharacter.fandom}
            onChange={(e)=>setNewCharacter({...newCharacter, fandom: e.target.value})}
            />
            <br></br><input
            placeholder='Image URL'
            name='image'
            value={newCharacter.image}
            onChange={(e)=>setNewCharacter({...newCharacter, image: e.target.value})}
            />
            <br></br><button onClick={handleAddCharacter}>Submit</button>
        </>
    )
}

export default CreatePage