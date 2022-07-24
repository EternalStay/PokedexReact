import React from 'react';

import { Form } from 'react-bootstrap';

import { safeurl } from '../includes/functions.js';

// ========================================

export function SearchPokedexType(props) {
    const type = props.type;
    const alt = 'Type ' + type.names['fr'];
    const label = <img src={process.env.PUBLIC_URL + '/images/types/' + safeurl(type.names['fr']) + '.png'} alt={alt} title={alt} style={{height: "16px"}} />

    return (
        <Form.Check id={`type-${safeurl(type.names['fr'])}`} className="mx-3" inline>
            <Form.Check.Input type="checkbox" className="mt-1" value={type.names['en']} checked={props.searchTypes.includes(type.names['en'])} onChange={props.handleChange} />
            <Form.Check.Label className="d-flex mt-1">{label}</Form.Check.Label>
        </Form.Check>
    )
}