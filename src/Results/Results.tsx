import React from 'react';
import IResults from '../Interfaces/IResults';
import './Results.css';

const Results = (props: IResults) => {
    return (
        <>
            <div id="divResults">
                <h1>{props.currentNumberOfWordsPerMinute} WPM</h1>
            </div>
        </>
    );
}

export default Results;