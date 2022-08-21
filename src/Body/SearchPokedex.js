import React, { useContext } from 'react';
import { Form, Card } from 'react-bootstrap';

import { Context } from '../App';
import { SearchPokedexType } from './SearchPokedexType';

import { safeurl } from '../includes/functions.js';

// ========================================

export function SearchPokedex(props) {
    const languageSelected = useContext(Context).languageSelected;
    const types = useContext(Context).types;

    const handleChangeSearchTypeSelect = e => {
        props.setSearchTypeSelect(e.target.value);
    };

    const typesCheckbox = [];
    const handleCheckTypes = (event) => {
        var updatedList = [...props.searchTypes];
        if (event.target.checked) {
            updatedList = [...props.searchTypes, event.target.value];
        } else {
            updatedList.splice(props.searchTypes.indexOf(event.target.value), 1);
        }
        props.setSearchTypes(updatedList);
    };
    types.sort((a, b) => (safeurl(a.names[languageSelected]) > safeurl(b.names[languageSelected])) ? 1 : ((safeurl(b.names[languageSelected]) > safeurl(a.names[languageSelected])) ? -1 : 0));
    Object.keys(types).forEach(function(objectKey, index) {
        let type = types[objectKey];
        typesCheckbox.push(<SearchPokedexType type={type} searchTypes={props.searchTypes} handleChange={handleCheckTypes} key={'type_' + index} />);
    });

    return (
        <Card className="mb-4">
            <Card.Header>Filtres de recherche</Card.Header>
            <Card.Body>
                <div className="row">
                    <Form>
                        <div className="col-12">
                            <div className="mb-2"><strong>Nom :</strong></div>
                            <Form.Control type="text" placeholder="Nom du Pokémon" value={props.searchName} onChange={(e) => props.setSearchName(e.target.value)} />
                        </div>

                        <hr />

                        <div className="row">
                            <div className="col-sm-12 col-lg-3 mb-2 mb-lg-0">
                                <div className="mb-2"><strong>Types :</strong></div>
                                <Form.Select onChange={handleChangeSearchTypeSelect} defaultValue={props.searchTypeSelect}>
                                    <option value="1">Possède l'un de ces types</option>
                                    <option value="2">Possède uniquement ces types</option>
                                </Form.Select>
                            </div>
                            <div className="col-sm-12 col-lg-9 text-center">
                                {typesCheckbox}
                            </div>
                        </div>
                    </Form>
                </div>
            </Card.Body>
        </Card>
    )
}