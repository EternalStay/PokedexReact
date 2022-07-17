import React, { useState } from 'react';

import { SearchPokedex } from './Body/SearchPokedex.js';
import { PokemonList } from './Body/Pokemon/PokemonList.js';

// ========================================

export function Body(props) {
    const [searchName, setSearchName] = useState('');

    const handleFilterTextChange = searchName => {
        setSearchName(searchName);
    };

    return (
        <React.Fragment>
            <h1>Pokédex national</h1>
            <SearchPokedex searchName={searchName} onFilterTextChange={handleFilterTextChange} />
            <PokemonList searchName={searchName} /> 
        </React.Fragment>
    )
}