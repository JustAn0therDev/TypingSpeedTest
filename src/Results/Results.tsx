import './Results.css';
import IResults from '../Interfaces/IResults';
import React, { useEffect, useState } from 'react';

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