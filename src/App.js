import React, { useState, useEffect } from 'react';

import { Header } from './Header';
import { Body } from './Body';

import { ProgressBar } from './Body/ProgressBar';
import { fetchNumber, fetchDatas } from './includes/fetch';

// ========================================

export const Context = React.createContext();

export function App(props) {
    const [language, setLanguage] = useState('fr');
    const [counter, setCounter] = useState(0);
    const [counterTotal, setCounterTotal] = useState(1);
    const [datas, setDatas] = useState({});
    
    useEffect(() => {
        fetchNumber().then(response => {
            setCounterTotal(response);
        });
    }, []);

    useEffect(() => {
        if (counterTotal !== 1) { 
            fetchDatas(setCounter).then(response => {
                setDatas({
                    'languages': response[0], 
                    'pokemon': response[1], 
                    'types': response[2], 
                });
            });
        }
    }, [counterTotal]);

    return (
        <React.Fragment>
            <Header languages={datas.languages} languageSelected={language} setLanguage={setLanguage} />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-sm-12">
                        {
                            counterTotal > 1 && counter % counterTotal === 0 && datas.pokemon 
                            ? 
                            <Context.Provider value={ {pokemon: datas.pokemon, types: datas.types, languageSelected: language} }>
                                <Body languageSelected={language} datas={datas} /> 
                            </Context.Provider>
                            : 
                            <ProgressBar counter={counter} counterTotal={counterTotal} /> 
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}