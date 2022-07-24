import React, { useState } from 'react';

import { SearchPokedex } from './Body/SearchPokedex.js';
import { PokemonList } from './Body/Pokemon/PokemonList.js';

// ========================================

export function Body(props) {
    const [searchName, setSearchName] = useState('');
    const [searchTypeSelect, setSearchTypeSelect] = useState(1);
    const [searchTypes, setSearchTypes] = useState([]);

    return (
        <React.Fragment>
            <SearchPokedex searchName={searchName} setSearchName={setSearchName} searchTypeSelect={searchTypeSelect} setSearchTypeSelect={setSearchTypeSelect} searchTypes={searchTypes} setSearchTypes={setSearchTypes} />
            <PokemonList searchName={searchName} searchTypeSelect={searchTypeSelect} searchTypes={searchTypes} /> 
        </React.Fragment>
    )
}