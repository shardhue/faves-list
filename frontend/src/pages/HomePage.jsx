import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from "react"
import { useCharacterStore } from '../store/character';
import CharacterCard from '../components/CharacterCard';

const HomePage = () => {
    const {fetchCharacters,characters} = useCharacterStore();

    useEffect(() => {
        fetchCharacters();
    }, [fetchCharacters]);

    return (
        <>
            {characters.length===0 && (
                <div>
                    <p>No characters found...</p>
                    <Link to={"/create"}>
                        Create character
                    </Link>
                </div>
            )}

            {characters.map((character) => {
                return (
                    <CharacterCard key={character._id} character={character}></CharacterCard>
                );
            })}
        </>
    )
}

export default HomePage