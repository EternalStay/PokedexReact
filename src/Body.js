import React from 'react';

import { SearchPokedex } from './Body/SearchPokedex.js';
import { PokemonList } from './Body/Pokemon/PokemonList.js';

// ========================================

export class Body extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'searchName': '', 
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
    
    handleFilterTextChange(searchName) {
        this.setState({
            searchName: searchName, 
        });
    }

    render() {
        let datas = this.props.datas;

        return (
            <React.Fragment>
                <h1>Pokédex national</h1>
                <SearchPokedex searchName={this.state.searchName} onFilterTextChange={this.handleFilterTextChange} />
                <PokemonList datas={datas} searchName={this.state.searchName} /> 
            </React.Fragment>
        )
    }
}