import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { SearchPokedex } from './filters.js';
import { PokemonList } from './pokemon.js'
import { fetchProgress, fetchNumber, fetchDatas } from './fetch.js';

//import { ThreeCircles } from  'react-loader-spinner'

// ========================================

class ProgressBar extends React.Component {
    render() {
        let progress = fetchProgress.count;
        let result = this.props.result;
        
        return (
            <div className="row">
                <div className="col-12">
                    <h2 className="mt-4">Chargement des données...</h2>
                    <div className="fst-italic">Progression : {Math.round(progress / result * 100 * 100) / 100}% /100</div>
                </div>
            </div>
        )
    }
}

class Pokedex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchName: '', 
            datas: {
                'language': {}, 
                'pokemon': [], 
                'types': {}, 
            }, 
            countFetch: 1, 
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);

        fetchNumber().then(response => {
            this.setState({
                countFetch: response, 
            });
        });

        fetchDatas().then(response => {
            const LANGUAGE = response[0];
            const POKEMON = response[1];
            const TYPES = response[2];

            const DATAS = {
                'language': LANGUAGE, 
                'pokemon': POKEMON, 
                'types': TYPES, 
            }

            this.setState({ datas: DATAS });
        });
    }
    
    handleFilterTextChange(searchName) {
        this.setState({
            searchName: searchName, 
        });
    }

    render() {
        let datas = this.state.datas;
        let fetchProgressActu = fetchProgress.count;
        let fetchProgressFinal = this.state.countFetch;

        return (
            <React.Fragment>
                <h1>Pokédex national</h1>
                {
                    fetchProgressActu === fetchProgressFinal 
                    ? 
                    <>
                        <SearchPokedex searchName={this.state.searchName} onFilterTextChange={this.handleFilterTextChange} />
                        <PokemonList datas={datas} searchName={this.state.searchName} /> 
                    </>
                    : 
                    <ProgressBar progress={fetchProgressActu} result={fetchProgressFinal} />
                }
            </React.Fragment>
        )
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<ThreeCircles color="red" outerCircleColor="blue" middleCircleColor="green" innerCircleColor="grey" />)
root.render(<Pokedex />);
