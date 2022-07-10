import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { SearchPokedex } from './filters.js';
import { PokemonList } from './pokemon.js'
import { fetchDatas } from './test.js';

//import { ThreeCircles } from  'react-loader-spinner'

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
                <PokemonList datas={this.props.datas} searchName={this.state.searchName} />
            </>
        )
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<ThreeCircles color="red" outerCircleColor="blue" middleCircleColor="green" innerCircleColor="grey" />)

fetchDatas().then(response => {
    const LANGUAGE = response[0];
    const POKEMON = response[1];
    const TYPES = response[2];

    const DATAS = {
        'language': LANGUAGE, 
        'pokemon': POKEMON, 
        'types': TYPES, 
    }

    console.log(DATAS);

    root.render(<Pokedex datas={DATAS} />);
});