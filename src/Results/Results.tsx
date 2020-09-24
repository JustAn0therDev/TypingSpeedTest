import React, { useEffect, useState } from 'react';
import IResults from '../Interfaces/IResults';
import './Results.css';

const Results = (props: IResults) => {
    let [wordsPerMinute, setWordsPerMinute] = useState(0);

    useEffect(() => {
        setWordsPerMinute(props.currentNumberOfWordsPerMinute);
    }, [props.currentNumberOfWordsPerMinute]);

    return (
        <>
            <div id="divResults">
                <h1>{wordsPerMinute} WPM</h1>
            </div>
        </>
    );
}

export default Results;