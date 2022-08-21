import React, { useContext } from 'react';

import { Context } from '../../App';

// ========================================

export function Pokemon(props) {
    const types = useContext(Context).types;
    const languageSelected = useContext(Context).languageSelected;

    const pokemon = props.pokemon;
    const style = {
        background: pokemon.types[1] ? ('linear-gradient(to bottom right, ' + types.find(x => x.name === pokemon.types[0]).color + ' 50%, ' + types.find(x => x.name === pokemon.types[1]).color + ' 50%)') : types.find(x => x.name === pokemon.types[0]).color, 
    }

    const pokemonName = languageSelected in pokemon.names ? pokemon.names[languageSelected] : '???';
    const pokemonForm = Object.keys(pokemon.form).length > 1 ? pokemon.form[languageSelected] : '???';

    return ( 
        <div className="col-lg-2 col-md-3 col-4 text-center">
            <div className="border m-1 bloc-pokemon" style={style}>
                <div><img className="w-50" loading="lazy" alt={pokemon.names.fr} title={pokemon.names.fr} src={pokemon.sprites.front_default ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/0.png'} /></div>
                <div>{(typeof pokemonForm !== 'undefined') && pokemonForm.includes(pokemonName) ? pokemonForm : pokemonName}</div>
                <div className="pokemon-name">{pokemonForm !== '???' ? ((typeof pokemonForm !== 'undefined') && pokemonForm.includes(pokemonName) ? '' : '(' + pokemonForm + ')') : ''}</div>
            </div>
        </div>
    );
}