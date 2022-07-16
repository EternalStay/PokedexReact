import React from 'react';

import { PokemonGeneration } from './PokemonGeneration';

// ========================================

export class PokemonList extends React.Component {
    render() {
        const results = [];
        const pokemonByGeneration = [];
        const searchName = this.props.searchName;
        const datas = this.props.datas;

        datas.pokemon.forEach((p, index) => {
            if (!pokemonByGeneration[p.generation]) {
                pokemonByGeneration[p.generation] = [];
            }
            pokemonByGeneration[p.generation].push(p);
        });

        pokemonByGeneration.forEach(function(pokemon, generation) {
            results.push(<PokemonGeneration datas={datas} pokemon={pokemon} generation={generation} searchName={searchName} key={generation} />);
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