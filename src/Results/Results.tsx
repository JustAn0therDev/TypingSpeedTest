import './Results.css';
import IResults from '../Interfaces/IResults';
import React, { useEffect, useState } from 'react';

export default function Results(props: IResults): JSX.Element {
    let [wordsPerMinute, setWordsPerMinute] = useState(0);

    useEffect(() => {
        setWordsPerMinute(props.currentNumberOfWordsPerMinute);
    }, [props.currentNumberOfWordsPerMinute]);

    return (
        <>
            <div id="divResults">
                <h1 className={"foreground"}>{wordsPerMinute} WPM</h1>
            </div>
        </>
    );
}