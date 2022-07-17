import React from 'react';

import { Card, ListGroup } from 'react-bootstrap';

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
        <ListGroup.Item>
            <Card.Title data-generation={generation}>Génération {generation}</Card.Title>
            <Card.Body>
                <div className="row g-1 g-md-2">
                    {pokemonListing}
                </div>
            </Card.Body>
        </ListGroup.Item>
    );
}
