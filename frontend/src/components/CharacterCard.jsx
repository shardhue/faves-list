import { useEffect, useState } from "react";
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

    useEffect(() => {
        if (!infoShow) {
            document.body.style.overflow = "visible";
        }
        else if (infoShow) {
            document.body.style.overflow = "hidden";
        }
    }, [infoShow]);

    return(
        <>

            <div className="character-card">
                <div className="character-image">
                    <img src={character.image}></img>
                </div>
                <div className="character-info">
                    <h2>{character.name}</h2>
                    <br></br>{character.fandom}
                    <br></br><button onClick={() => setInfoShow(true)}>View Details</button>
                </div>
            </div>

            {infoShow && (
                <div className="modal-bg">
                    <div className="modal">

                        <div className="modal-content">
                        <div className="modal-table">
                            <img className="modal-image" src={character.image}></img>
                            <table>
                                <tbody>
                                    {updating && (
                                        <tr>
                                            <td className="modal-label">Image</td>
                                            <td>
                                                <input
                                                placeholder='Image URL'
                                                name='image'
                                                value={updatedCharacter.image}
                                                onChange={(e) => setUpdatedCharacter({ ...updatedCharacter, image: e.target.value })}/>
                                            </td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td className="modal-label">Name</td>
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
                                        <td className="modal-label">Fandom</td>
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
                                                <td className="modal-label">
                                                    {!updating && (<>{item.label}</>)}
                                                    {updating && (
                                                        <input
                                                        placeholder='Label'
                                                        name='label'
                                                        value={item.label}
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
                                                            value={item.field}
                                                            onChange={(e) => setUpdatedCharacter({ ...updatedCharacter, etc:
                                                                updatedCharacter.etc.map((item, x) => (x === i ? {...item, field: e.target.value} : item))
                                                            })}/>
                                                            <button className="modal-minus" onClick={() => setUpdatedCharacter({...updatedCharacter, etc:
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

                            <br></br>
                            {updating && (
                                <button onClick={() => setUpdatedCharacter({...updatedCharacter, etc:
                                    [...updatedCharacter.etc, {label: "", field: ""}]
                                })}>Add Field</button>
                            )}

                        </div>

                        <div className="modal-info">
                            {!updating && (
                                <>{character.info.length===0 && (<>No content added...</>)}</>
                            )}
                            {updatedCharacter.info.map((item, i) => {
                                return (
                                    <div key={i}>
                                        {!updating && (<><h3>{item.title}</h3></>)}
                                        {updating && (
                                            <>
                                                <input
                                                placeholder='Title'
                                                name='title'
                                                value={item.title}
                                                onChange={(e) => setUpdatedCharacter({ ...updatedCharacter, info:
                                                    updatedCharacter.info.map((item, x) => (x === i ? {...item, title: e.target.value} : item))
                                                })}
                                                style={{width: '80%'}}/>
                                                <button className="modal-minus" onClick={() => setUpdatedCharacter({...updatedCharacter, info:
                                                    [...updatedCharacter.info.filter((item, y) => y !== i)]
                                                })}>-</button>
                                            </>
                                        )}
                                        <hr></hr>
                                        {!updating && (<>{item.content}</>)}
                                        {updating && (
                                            <textarea
                                            placeholder='Content'
                                            name='content'
                                            value={item.content}
                                            onChange={(e) => setUpdatedCharacter({ ...updatedCharacter, info:
                                                updatedCharacter.info.map((item, x) => (x === i ? {...item, content: e.target.value} : item))
                                            })}
                                            style={{width: '100%'}}/>
                                        )}
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                    </div>
                                );
                            })}

                            {updating && (
                                <button onClick={() => setUpdatedCharacter({...updatedCharacter, info:
                                    [...updatedCharacter.info, {title: "", content: ""}]
                                })}>Add Section</button>
                            )}
                        </div>
                        </div>

                        <div className="modal-footer">
                            <div className="modal-footer-left" style={{display: 'flex', gap: '1rem'}}>
                                {!updating && (
                                    <>
                                        <button onClick={() => setUpdating(true)}>Update</button>
                                        <button onClick={() => setInfoShow(false)}>Close</button>
                                    </>
                                )}
                                {updating && (
                                    <>
                                        <button onClick={() => {handleUpdatedCharacter(character._id, updatedCharacter), setUpdating(false)}}>Save</button>
                                        <button onClick={() => {setUpdatedCharacter(character), setUpdating(false)}}>Cancel</button>
                                    </>
                                )}
                            </div>
                            <div className="modal-footer-right" style={{textAlign: 'right'}}>
                                {updating && (
                                    <button onClick={() => {setInfoShow(false), handleDeleteCharacter(character._id)}}
                                    style={{color: 'red'}}>Delete</button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

export default CharacterCard