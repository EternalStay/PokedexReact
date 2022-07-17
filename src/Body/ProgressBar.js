import React from 'react';

import { Card } from 'react-bootstrap';

// ========================================

export function ProgressBar(props) {
    let counter = props.counter;
    let counterTotal = props.counterTotal;
    let pourcent = Math.round(((counter / counterTotal * 100) + Number.EPSILON));
    let style = {width: pourcent + '%'};
    
    return (
        <Card>
            <Card.Header>Chargement des données...</Card.Header>
            <Card.Body>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={counter} aria-valuemin="0" aria-valuemax={counterTotal} style={style}>
                        {pourcent}%
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}