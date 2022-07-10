import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';

import { POKEMON } from './constantes';

import { SearchPokedex } from './filters.js';
import { PokemonList } from './pokemon.js'

// ========================================

class Pokedex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchName: '', 
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(searchName) {
        this.setState({
            searchName: searchName, 
        });
    }

    render() {
        return (
            <>
                <h1>Pokédex national</h1>
                <SearchPokedex searchName={this.state.searchName} onFilterTextChange={this.handleFilterTextChange} />
                <PokemonList pokemon={this.props.pokemon} searchName={this.state.searchName} />
            </>
        )
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Pokedex pokemon={POKEMON} />);