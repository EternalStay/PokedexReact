import React, { useState } from 'react';

import { SearchPokedex } from './Body/SearchPokedex.js';
import { PokemonList } from './Body/Pokemon/PokemonList.js';

// ========================================

export function Body(props) {
    const [searchName, setSearchName] = useState('');

    return (
        <React.Fragment>
            <SearchPokedex searchName={searchName} setSearchName={setSearchName} />
            <PokemonList searchName={searchName} /> 
        </React.Fragment>
    )
}