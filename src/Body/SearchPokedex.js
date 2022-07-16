import React from 'react';

import { Form } from 'react-bootstrap';

// ========================================

export class SearchPokedex extends React.Component {
    constructor(props) {
        super(props);

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <h2 className="mt-4">Filtres de recherche</h2>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Nom du Pokémon" value={this.props.filterText} onChange={this.handleFilterTextChange} />
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )
    }
}