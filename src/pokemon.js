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
            <div className="col-2 text-center">
                <div className="border m-1" style={style}>
                    <div><img className="w-50" loading="lazy" alt={p.names.fr} title={p.names.fr} src={p.sprites.front_default ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/0.png'} /></div>
                    <div>{p.names.fr}</div>
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