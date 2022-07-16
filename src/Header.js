import React from 'react';

// ========================================

export function Header(props) {
    const languageSelected = props.languageSelected;
    const languages = props.languages;
    const setLanguage = props.setLanguage;

    const languagesAccepted = [];
    const languagesOptions = [];

    const handleLanguageChange = e => {
        setLanguage(e.target.value);
    };
    
    if (languages !== undefined) {
        languages[0].details.names.forEach(function(name) {
            languagesAccepted.push(name.language.name);
        });

        languages.forEach(function(language) {
            if (languagesAccepted.includes(language.name)) {
                let langueActu = '';

                language.details.names.forEach(function(name) {
                    if (name.language.name === languageSelected) {
                        langueActu = name.name;
                    }
                });

                languagesOptions.push(<option key={language.name} value={language.name}>{langueActu}</option>)
            }
        });
    }        

    const languagesOptionsSort = [...languagesOptions].sort((a, b) =>
        a.props.children > b.props.children ? 1 : -1,
    );

    const languagesSelect = <select className="form-select" value={languageSelected} onChange={handleLanguageChange}>
        {languagesOptionsSort}
    </select>

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 px-4">
            <a className="navbar-brand" href="#">Pokédex</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarPokedex" aria-controls="navbarPokedex" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarPokedex">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Accueil</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="https://github.com/EternalStay/PokedexReact/" target="_blank" rel="noreferrer">Source</a>
                    </li>
                </ul>
            </div>
            <div> 
                {languagesOptionsSort.length > 0 ? languagesSelect : ''}
            </div>
        </nav>
    )
}