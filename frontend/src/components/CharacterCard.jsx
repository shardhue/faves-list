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
    const [updating, setUpdating] = useState(false);

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

                        <img src={character.image} height="500"></img>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>
                                        {!updating && (<>{character.name}</>)}
                                        {updating && (
                                            <input
                                            placeholder='Name'
                                            name='name'
                                            value={updatedCharacter.name}
                                            onChange={(e) => setUpdatedCharacter({ ...updatedCharacter, name: e.target.value })}/>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Fandom</td>
                                    <td>
                                        {!updating && (<>{character.fandom}</>)}
                                        {updating && (
                                            <input
                                            placeholder='Fandom'
                                            name='fandom'
                                            value={updatedCharacter.fandom}
                                            onChange={(e) => setUpdatedCharacter({ ...updatedCharacter, fandom: e.target.value })}/>
                                        )}
                                    </td>
                                </tr>
                                {updatedCharacter.etc.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>
                                                {!updating && (<>{item.label}</>)}
                                                {updating && (
                                                    <input
                                                    placeholder='Label'
                                                    name='label'
                                                    value={updatedCharacter.etc[i].label}
                                                    onChange={(e) => setUpdatedCharacter({ ...updatedCharacter, etc:
                                                        updatedCharacter.etc.map((item, x) => (x === i ? {...item, label: e.target.value} : item))
                                                    })}/>
                                                )}
                                            </td>
                                            <td>
                                                {!updating && (<>{item.field}</>)}
                                                {updating && (
                                                    <>
                                                        <input
                                                        placeholder='Field'
                                                        name='field'
                                                        value={updatedCharacter.etc[i].field}
                                                        onChange={(e) => setUpdatedCharacter({ ...updatedCharacter, etc:
                                                            updatedCharacter.etc.map((item, x) => (x === i ? {...item, field: e.target.value} : item))
                                                        })}/>
                                                        <button onClick={() => setUpdatedCharacter({...updatedCharacter, etc:
                                                            [...updatedCharacter.etc.filter((item, y) => y !== i)]
                                                        })}>-</button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* <input
                        placeholder='Character Name'
                        name='name'
                        value={updatedCharacter.name}
                        onChange={(e) => setUpdatedCharacter({ ...updatedCharacter, name: e.target.value })}/> */}

                        {!updating && (
                            <>
                                <button onClick={() => setUpdating(true)}>Update</button>
                                <button onClick={() => setInfoShow(false)}>Close</button>
                            </>
                        )}
                        {updating && (
                            <>
                                <button onClick={() => setUpdatedCharacter({...updatedCharacter, etc:
                                    [...updatedCharacter.etc, {label: "", field: ""}]
                                })}>Add Field</button><br></br>
                                <button onClick={() => {handleUpdatedCharacter(character._id, updatedCharacter), setUpdating(false)}}>Save</button>
                                <button onClick={() => {setUpdatedCharacter(character), setUpdating(false)}}>Cancel</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default CharacterCard