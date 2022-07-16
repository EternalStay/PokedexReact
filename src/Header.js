import React from 'react';

// ========================================

export class Header extends React.Component {
    render() {
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
                <div className="text-white">
                    Langue : {this.props.languageSelected}
                </div>
            </nav>
        )
    }
}