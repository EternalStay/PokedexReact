import React, { useContext } from 'react';

import { PokemonGeneration } from './PokemonGeneration';

import { Context } from '../../App.js';

// ========================================

export function PokemonList(props) {
    const results = [];
    const pokemonByGeneration = [];
    const searchName = props.searchName;

    const pokemon = useContext(Context).pokemon;

    pokemon.forEach((p, index) => {
        if (!pokemonByGeneration[p.generation]) {
            pokemonByGeneration[p.generation] = [];
        }
        pokemonByGeneration[p.generation].push(p);
    });

    pokemonByGeneration.forEach(function(poke, generation) {
        results.push(<PokemonGeneration pokemon={poke} generation={generation} searchName={searchName} key={generation} />);
    });

    return (
        <div className="row">
            <div className="col-12">
                <h2 className="mt-4">Liste des Pokémon</h2>
                {results}
            </div>
        </div>
    );
}