import React from 'react';

// ========================================

export function ProgressBar(props) {
    let counter = props.counter;
    let counterTotal = props.counterTotal;
    let pourcent = Math.round(((counter / counterTotal * 100) + Number.EPSILON));
    let style = {width: pourcent + '%'};
    
    return (
        <div className="row">
            <div className="col-12">
                <h2 className="mt-4">Chargement des données...</h2>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={counter} aria-valuemin="0" aria-valuemax={counterTotal} style={style}>
                        {pourcent}%
                    </div>
                </div>
            </div>
        </div>
    )
}