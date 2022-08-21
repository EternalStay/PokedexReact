import React, { useContext } from 'react';

import { Card } from 'react-bootstrap';

import { PokemonGeneration } from './PokemonGeneration';

import { Context } from '../../App.js';

// ========================================

export function PokemonList(props) {
    const types = useContext(Context).types;
    const languageSelected = useContext(Context).languageSelected;

    const searchName = props.searchName;
    const searchTypeSelect = props.searchTypeSelect;
    const searchTypes = props.searchTypes;

    const pokemon = useContext(Context).pokemon;
    const filteredPokemon = [];
    
    pokemon.forEach((poke, index) => {
        let showPokemon = true;

        // Si le Pokémon possède une forme, on ne la gère pas pour le moment
        if (!poke.is_default) {
            //showPokemon = false;
        }

        // Si le Pokémon ne correspond pas au filtre renseigné
        if ((languageSelected in poke.names ? poke.names[languageSelected] : '???').toLowerCase().indexOf(searchName.toLowerCase()) === -1) {
            showPokemon = false;
        }

        if (showPokemon && searchTypes.length) {
            if (parseInt(searchTypeSelect) === 1) {
                showPokemon = ((searchTypes.includes(types.find(x => x.name === poke.types[0]).names['en'])) || (poke.types[1] ? searchTypes.includes(types.find(x => x.name === poke.types[1]).names['en']) : false));
            } else {
                searchTypes.forEach((type, index2) => {
                    if (showPokemon && !(type === types.find(x => x.name === poke.types[0]).names['en'] || (poke.types[1] ? type === types.find(x => x.name === poke.types[1]).names['en'] : false))) {
                        showPokemon = false;
                    }
                });
            }
        }

        if (showPokemon) {
            filteredPokemon.push(poke);
        }
    });

    const pokemonByGeneration = [];
    const results = [];

    filteredPokemon.forEach((p, index) => {
        if (!pokemonByGeneration[p.generation]) {
            pokemonByGeneration[p.generation] = [];
        }
        pokemonByGeneration[p.generation].push(p);
    });

    pokemonByGeneration.forEach(function(poke, generation) {
        results.push(<PokemonGeneration pokemon={poke} generation={generation} searchName={searchName} key={'generation-' + generation} />);
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