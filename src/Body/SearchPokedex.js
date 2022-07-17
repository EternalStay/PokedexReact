import React from 'react';

import { Form } from 'react-bootstrap';

// ========================================

export function SearchPokedex(props) {
    return (
        <div className="row">
            <div className="col-12">
                <h2 className="mt-4">Filtres de recherche</h2>
                <Form>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Nom du Pokémon" value={props.filterText} onChange={(e) => props.setSearchName(e.target.value)} />
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}