const pokemonList = [];
const speciesList = [];
const countPokemonPage = 2;

export async function fetchNumber() {
    let numberRequests = 0;

    let urls = [
        ['https://pokeapi.co/api/v2/language', 1, 'count'], 
        ['https://pokeapi.co/api/v2/pokemon?limit=1000000', 2, 'count'], 
        ['https://pokeapi.co/api/v2/type', 1, 'count'], 
    ];

    for (const url of urls) {
        let response = await fetch(url[0]);
        let responseJson = await response.json();

        if (url[2] === 'count') {
            numberRequests += responseJson.count * url[1];

            if (url[0] === 'https://pokeapi.co/api/v2/pokemon?limit=1000000') {
                responseJson.results.forEach((pokemon, index) => {
                    if (!pokemonList.includes(pokemon.name)) {
                        pokemonList.push(pokemon.name);
                    }
                });
            }
        }
    }

    return numberRequests;
}

export async function fetchDatas(setCounter) {
    return await Promise.all([fetchLanguages(setCounter), fetchPokemon(setCounter), fetchTypes(setCounter)]);
}

async function fetchTypes(setCounter) {
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

    let types = [];

    const response = await fetch('https://pokeapi.co/api/v2/type');
    const responseJson = await response.json();

    responseJson.results.forEach(type => {
        fetchURL(type.url, setCounter).then((typeData) => {
            if (typeData.pokemon.length > 0) {
                types.push({
                    name: type.name, 
                    names: changeLanguagesArray(typeData.names), 
                    color: colorTypes[type.name], 
                });
            }
        });
    });

    return types;
}

async function fetchPokemon(setCounter) {
    const response = await fetch('https://pokeapi.co/api/v2/pokedex/1/');
    const responseJson = await response.json();

    const pokemon = [];

    // /pokedex
    await Promise.all(responseJson.pokemon_entries.map(async (pokedex) => {

        // /species
        await fetchURL(pokedex.pokemon_species.url, setCounter, false).then(async (pokemonSpecies) => {

            for (let pokemonVariete of pokemonSpecies.varieties) {
                if (!speciesList.includes(pokemonVariete.pokemon.name)) {
                    speciesList.push(pokemonVariete.pokemon.name);
                }
                
                // /pokemon
                await fetchURL(pokemonVariete.pokemon.url, setCounter).then(async (pokemonData) => {

                    // /form
                    await fetchURL(pokemonData.forms[0].url, setCounter).then(async (pokemonForm) => {
                        let pokemonTmp = {};

                        pokemonTmp.form = pokemonForm.form_names.length > 0 ? changeLanguagesArray(pokemonForm.form_names) : [];

                        pokemonTmp.dex = pokedex.entry_number;
                        pokemonTmp.name = pokemonVariete.pokemon.name;
                        
                        pokemonTmp.types = pokemonData.types.map((type) => {
                            return type.type.name;
                        });
                        pokemonTmp.is_default = pokemonData.is_default;
                        pokemonTmp.sprites = pokemonData.sprites.other.home;

                        pokemonTmp.generation = parseInt(pokemonSpecies.generation.url.replace('https://pokeapi.co/api/v2/generation/', '').replace('/', ''));
                        pokemonTmp.names = changeLanguagesArray(pokemonSpecies.names);

                        pokemon.push(pokemonTmp);
                    });
                });
            };
        });
    }));

    let difference = pokemonList.filter(x => !speciesList.includes(x));
    console.log("Pokémon sans données : ", difference);
    setCounter(c => c + difference.length * countPokemonPage);

    pokemon.sort((a, b) => a.dex - b.dex);
    return pokemon;
}

async function fetchLanguages(setCounter) {
    const response = await fetch('https://pokeapi.co/api/v2/language');
    const responseJson = await response.json();

    return responseJson.results.map(language => {
        fetchURL(language.url, setCounter).then((languageData) => {
            if (languageData.names.length > 0) {
                language.details = languageData;
            }
        });

        return language;
    });
}

async function fetchURL(url, setCounter, count = true) {
    const response = await fetch(url);
    const responseJson = await response.json();
    
    if (count) {
        setCounter(c => c + 1);
    }

    return responseJson;
}

function changeLanguagesArray(languages) {
    let results = {};
    
    languages.forEach((language) => {
        results[language.language.name] = language.name;
    });

    return results;
}