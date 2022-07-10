import React from 'react';

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
                    generation={generation} 
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

export class Pokemon extends React.Component {
    render() {
        let types = this.props.datas.types;
        let p = this.props.pokemon;
        let style = {
            background: p.types[1] ? ('linear-gradient(to bottom right, ' + types[p.types[0]].color + ' 50%, ' + types[p.types[1]].color + ' 50%)') : types[p.types[0]].color, 
        }

        // Si le Pokémon possède une forme, on ne la gère pas pour le moment
        if (!p.is_default) {
            return;
        }

        // Si le Pokémon ne correspond pas au filtre renseigné
        if ((p.names.fr).toLowerCase().indexOf(this.props.searchName.toLowerCase()) === -1) {
            return;
        }

        return ( 
            <div className="col-2 text-center" 
                data-numero={p.numero} 
                data-generation={p.generation}
                data-type1={p.types[0]}
                data-type2={p.types[1] ?? ''}
            >
                <div className="border m-1" style={style}>
                  {p.names.fr}
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
        const datas = this.props.datas;

        this.props.datas.pokemon.forEach((p) => {
            if (p.generation in pokemonByGeneration === false) {
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