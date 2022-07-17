import React, { useContext } from 'react';

import { Card } from 'react-bootstrap';

import { PokemonGeneration } from './PokemonGeneration';

import { Context } from '../../App.js';

// ========================================

export function PokemonList(props) {
    const searchName = props.searchName;

    const pokemon = useContext(Context).pokemon;

    const pokemonByGeneration = [];
    const results = [];

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
        <Card>
            <Card.Header>Liste des Pokémon</Card.Header>
            <Card.Body>
                {results}
            </Card.Body>
        </Card>
    );
}