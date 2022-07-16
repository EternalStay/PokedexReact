import React from 'react';

// ========================================

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