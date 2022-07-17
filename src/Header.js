import React from 'react';

import {Container, Form, Nav, Navbar} from 'react-bootstrap';

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
                    if (language.name === name.language.name) {
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
        <Navbar bg="dark" expand="lg" variant="dark" className="mb-4 px-2">
            <Container fluid>
                <Navbar.Brand href="#">Pokédex</Navbar.Brand>
                <Navbar.Toggle aria-controls="navpokedex" />
                <Navbar.Collapse id="navpokedex">
                    <Nav className="me-auto my-2 my-lg-0">
                        <Nav.Link href="#">Accueil</Nav.Link>
                        <Nav.Link href="https://github.com/EternalStay/PokedexReact/" target="github" rel="noreferrer">Source</Nav.Link>
                    </Nav>
                    {
                        languagesOptions.length > 0 
                        ?
                        <Form className="d-flex">
                            {languagesSelect}
                        </Form>
                        :
                        ''
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}