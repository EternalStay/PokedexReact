import React from 'react';

import { TYPES } from './constantes';

import { safeurl } from './functions.js';

// ========================================

export class PokemonGeneration extends React.Component {
    render() {
        const searchName = this.props.searchName;
        const generation = this.props.generation;
        const pokemon = [];
        
        this.props.pokemon.forEach((poke) => {
            let key = safeurl(poke.nom.fr + (poke.forme.fr ? ' ' + poke.forme.fr : ''))
            
            pokemon.push(<Pokemon pokemon={poke} generation={generation} searchName={searchName} key={key} />);
        });

        return (
            <>
                <h3 className="mt-3" data-generation={generation}>Génération {generation}</h3>
                <div className="row">
                    {pokemon}
                </div>
            </>
        );
    }
}

export class Pokemon extends React.Component {
    render() {
        let p = this.props.pokemon;
        let style = {
            background: 'linear-gradient(to bottom right, ' + TYPES[p.types[0]].color + ' 50%, ' + (p.types[1] ? TYPES[p.types[1]].color : TYPES[p.types[0]].color) + ' 50%)', 
        }

        if ((p.nom.fr + (p.forme.fr ? ' ' + p.forme.fr : '')).indexOf(this.props.searchName) === -1) {
            return;
        }

        return (
            <div className="col-2 text-center" data-numero={p.numero} data-generation={p.generation}>
                <div className="border m-1" style={style}>
                    {p.nom.fr + (p.forme.fr ? ' ' + p.forme.fr : '')}
                </div>
            </div>
        );
    }
}

export class PokemonList extends React.Component {
    render() {
        const results = [];
        const pokemonByGeneration = [];
        const searchName = this.props.searchName;

        this.props.pokemon.forEach((p) => {
            if (p.generation in pokemonByGeneration === false) {
                pokemonByGeneration[p.generation] = [];
            }
            pokemonByGeneration[p.generation].push(p);
        });

        pokemonByGeneration.forEach(function(pokemon, generation) {
            results.push(<PokemonGeneration pokemon={pokemon} generation={generation} searchName={searchName} key={generation} />);
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
}