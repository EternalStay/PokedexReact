import React from 'react';

import { Pokemon } from './Pokemon';

// ========================================

export class PokemonGeneration extends React.Component {
    render() {
        const searchName = this.props.searchName;
        const generation = this.props.generation;
        const pokemon = [];
        
        this.props.pokemon.forEach((poke) => {
            let key = poke.name;
            
            pokemon.push(
                <Pokemon 
                    pokemon={poke} 
                    datas={this.props.datas}
                    searchName={searchName} 
                    key={key}
                />
            );
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