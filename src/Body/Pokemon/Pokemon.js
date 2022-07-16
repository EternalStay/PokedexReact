import React from 'react';

// ========================================

export function Pokemon(props) {
    let languageSelected = props.languageSelected;
    let types = props.datas.types;
    let p = props.pokemon;
    let style = {
        background: p.types[1] ? ('linear-gradient(to bottom right, ' + types[p.types[0]].color + ' 50%, ' + types[p.types[1]].color + ' 50%)') : types[p.types[0]].color, 
    }

    // Si le Pokémon possède une forme, on ne la gère pas pour le moment
    if (!p.is_default) {
        return;
    }

    // Si le Pokémon ne correspond pas au filtre renseigné
    if ((languageSelected in p.names ? p.names[languageSelected] : '???').toLowerCase().indexOf(props.searchName.toLowerCase()) === -1) {
        return;
    }

    return ( 
        <div className="col-lg-2 col-md-3 col-sm-4 text-center">
            <div className="border m-1" style={style}>
                <div><img className="w-50" loading="lazy" alt={p.names.fr} title={p.names.fr} src={p.sprites.front_default ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/0.png'} /></div>
                <div>{languageSelected in p.names ? p.names[languageSelected] : '???'}</div>
            </div>
        </div>
    );
}