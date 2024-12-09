import { useState } from "react";
import { useCharacterStore } from "../store/character";

const CharacterCard = ({character}) => {
    const [updatedCharacter, setUpdatedCharacter] = useState(character);

    const {updateCharacter} = useCharacterStore();
    const handleUpdatedCharacter = async(cid, updatedCharacter) => {
        updateCharacter(cid, updatedCharacter);
    };

    const {deleteCharacter} = useCharacterStore();
    const handleDeleteCharacter = async(cid) => {
        const {success,message} = await deleteCharacter(cid);
        setInfoShow(false);
    };

    const [infoShow, setInfoShow] = useState(false);

    return(
        <>
            <br></br>{character.name}
            <br></br>{character.fandom}
            <br></br><img src={character.image} height="300"></img>
            <br></br><button onClick={() => setInfoShow(true)}>edit</button>
            <button className="button" onClick={() => handleDeleteCharacter(character._id)}>delete</button>

            {infoShow && (
                <div className="modal-bg">
                    <div className="modal">
                        <br></br><input
                        placeholder='Character Name'
                        name='name'
                        value={updatedCharacter.name}
                        onChange={(e) => setUpdatedCharacter({ ...updatedCharacter, name: e.target.value })}/>
                        <br></br><input
                        placeholder='Fandom'
                        name='fandom'
                        value={updatedCharacter.fandom}
                        onChange={(e) => setUpdatedCharacter({ ...updatedCharacter, fandom: e.target.value })}/>
                        <br></br><input
                        placeholder='Image URL'
                        name='image'
                        value={updatedCharacter.image}
                        onChange={(e) => setUpdatedCharacter({ ...updatedCharacter, image: e.target.value })}/>
                        <br></br><button onClick={() => handleUpdatedCharacter(character._id, updatedCharacter)}>Update</button>
                        <button onClick={() => setInfoShow(false)}>Close</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default CharacterCard