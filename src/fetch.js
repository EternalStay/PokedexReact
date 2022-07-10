export let fetchProgress = {
    countInternal: 0, 
    countListener: function(val) {}, 
    set count(val) {
        this.countInternal = val;
        this.countListener(val);
    }, 
    get count() {
        return this.countInternal;
    }, 
    registerListener: function(listener) {
        this.countListener = listener;
    }
};

export async function fetchNumber() {
    let numberRequests = 0;

    let urls = [
        ['https://pokeapi.co/api/v2/language', 1], 
        ['https://pokeapi.co/api/v2/pokemon', 2], 
        ['https://pokeapi.co/api/v2/type', 1], 
    ];

    for (const url of urls) {
        let response = await fetch(url[0]);
        let responseJson = await response.json();

        numberRequests += responseJson.count * url[1];
    }

    return numberRequests;
}

export async function fetchDatas() {
    return await Promise.all([fetchLanguages(), fetchPokemon(), fetchTypes()]);
}

async function fetchTypes() {
    let colorTypes = {
        'normal': '#A8A77A', 
        'fire': '#EE8130', 
        'water': '#6390F0', 
        'electric': '#F7D02C', 
        'grass': '#7AC74C', 
        'ice': '#96D9D6', 
        'fighting': '#C22E28', 
        'poison': '#A33EA1', 
        'ground': '#E2BF65', 
        'flying': '#A98FF3', 
        'psychic': '#F95587', 
        'bug': '#A6B91A', 
        'rock': '#B6A136', 
        'ghost': '#735797', 
        'dragon': '#6F35FC', 
        'dark': '#705746', 
        'steel': '#B7B7CE', 
        'fairy': '#D685AD', 
    }

    let types = {};

    const response = await fetch('https://pokeapi.co/api/v2/type');
    const responseJson = await response.json();

    responseJson.results.forEach(type => {
        fetchURL(type.url).then((typeData) => {
            types[type.name] = {
                names: changeLanguagesArray(typeData.names), 
                color: colorTypes[type.name], 
            };
        });
    });

    return types;
}

async function fetchPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000');
    const responseJson = await response.json();

    let results = await Promise.all(responseJson.results.map(async (pokemon) => {
        await fetchURL(pokemon.url).then(async (pokemonData) => {
            pokemon.types = pokemonData.types.map((type) => {
                return type.type.name;
            });
            pokemon.is_default = pokemonData.is_default;
            pokemon.sprites = pokemonData.sprites.other.home;

            await fetchURL(pokemonData.species.url).then((pokemonSpecies) => {
                pokemon.names = changeLanguagesArray(pokemonSpecies.names);
                pokemon.generation = parseInt(pokemonSpecies.generation.url.replace('https://pokeapi.co/api/v2/generation/', '').replace('/', ''));
            });
        });

        return pokemon;
    }));

    return results;
}

async function fetchLanguages() {
    const response = await fetch('https://pokeapi.co/api/v2/language');
    const responseJson = await response.json();

    return responseJson.results.map(language => {
        fetchURL(language.url).then((languageData) => {
            language.details = languageData;
        });

        return language;
    });
}

async function fetchURL(url) {
    const response = await fetch(url);
    const responseJson = await response.json();
    
    fetchProgress.count += 1;

    return responseJson;
}

function changeLanguagesArray(languages) {
    let results = {};
    
    languages.forEach((language) => {
        results[language.language.name] = language.name;
    });

    return results;
}