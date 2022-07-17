import React from 'react';

import { Form, Card } from 'react-bootstrap';

// ========================================

export function SearchPokedex(props) {
    return (
        <Card className="mb-4">
            <Card.Header>Filtres de recherche</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Nom du Pokémon" value={props.filterText} onChange={(e) => props.setSearchName(e.target.value)} />
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    )
}