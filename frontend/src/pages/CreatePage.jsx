import { useEffect, useState } from "react"
import { useCharacterStore } from "../store/character"

const CreatePage = () => {
    const [newCharacter, setNewCharacter] = useState({
        name: "",
        fandom: "",
        image: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [successful, setSuccessful] = useState(false);

    const {createCharacter} = useCharacterStore();

    const handleAddCharacter = async() => {
        const {success, message} = await createCharacter(newCharacter);

        setSubmitted(true);
        if (!success) {
            setSuccessful(false);
        }
        else if (success) {
            setSuccessful(true);
        }
    };

    useEffect(() => {
        setSubmitted(false);
        setSuccessful(false);
    }, [newCharacter]);
    
    return (
        <>
            <div className="create-form">
                <input
                placeholder='Character Name'
                name='name'
                value={newCharacter.name}
                onChange={(e)=>{setNewCharacter({...newCharacter, name: e.target.value})}}
                />
                <input
                placeholder='Fandom'
                name='fandom'
                value={newCharacter.fandom}
                onChange={(e)=>setNewCharacter({...newCharacter, fandom: e.target.value})}
                />
                <input
                placeholder='Image URL'
                name='image'
                value={newCharacter.image}
                onChange={(e)=>setNewCharacter({...newCharacter, image: e.target.value})}
                />
                <button onClick={handleAddCharacter}>Submit</button>
                
                {submitted && (
                    <>
                        {successful && (
                            <p style={{textAlign: 'center', color: 'green'}}>Character submitted successfully!</p>
                        )}
                        {!successful && (
                            <p style={{textAlign: 'center', color: 'red'}}>Error while submitting character...</p>
                        )}
                    </>
                )}
            </div>
        </>
    )
}

export default CreatePage