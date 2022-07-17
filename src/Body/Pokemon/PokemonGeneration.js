import React from 'react';

import { Pokemon } from './Pokemon';

// ========================================

export function PokemonGeneration(props) {
    const searchName = props.searchName;
    const generation = props.generation;
    const pokemon = props.pokemon;
    const pokemonListing = [];

    pokemon.forEach((poke) => {
        let key = poke.name;
        
        pokemonListing.push(
            <Pokemon 
                pokemon={poke} 
                searchName={searchName} 
                key={key}
            />
        );
    });

    return (
        <>
            <h3 className="mt-3" data-generation={generation}>Génération {generation}</h3>
            <div className="row">
                {pokemonListing}
            </div>
        </>
    );
}
