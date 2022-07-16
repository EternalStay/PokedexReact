import React, { useState, useEffect } from 'react';

import { Header } from './Header';
import { Body } from './Body';

import { ProgressBar } from './Body/ProgressBar';
import { fetchNumber, fetchDatas } from './includes/fetch';

// ========================================

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

            <div className="container-fluid w-75">
                { 
                    counterTotal > 1 && counter % counterTotal === 0 && datas.pokemon 
                    ? 
                    <Body languageSelected={language} datas={datas} /> 
                    : 
                    <ProgressBar counter={counter} counterTotal={counterTotal} /> 
                }
            </div>
        </React.Fragment>
    );
}