import React, { useContext } from 'react';

import { Context } from '../../App';

// ========================================

export function Pokemon(props) {
    const types = useContext(Context).types;
    const languageSelected = useContext(Context).languageSelected;

    const searchName = props.searchName;
    const pokemon = props.pokemon;
    const style = {
        background: pokemon.types[1] ? ('linear-gradient(to bottom right, ' + types[pokemon.types[0]].color + ' 50%, ' + types[pokemon.types[1]].color + ' 50%)') : types[pokemon.types[0]].color, 
    }

    // Si le Pokémon possède une forme, on ne la gère pas pour le moment
    if (!pokemon.is_default) {
        return;
    }

    // Si le Pokémon ne correspond pas au filtre renseigné
    if ((languageSelected in pokemon.names ? pokemon.names[languageSelected] : '???').toLowerCase().indexOf(searchName.toLowerCase()) === -1) {
        return;
    }

    return ( 
        <div className="col-lg-2 col-md-3 col-4 text-center">
            <div className="border m-1" style={style}>
                <div><img className="w-50" loading="lazy" alt={pokemon.names.fr} title={pokemon.names.fr} src={pokemon.sprites.front_default ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/0.png'} /></div>
                <div>{languageSelected in pokemon.names ? pokemon.names[languageSelected] : '???'}</div>
            </div>
        </div>
    );
}