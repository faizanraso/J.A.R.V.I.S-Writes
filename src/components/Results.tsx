import React from "react";
import '../styles/Results.css'

function Results(props: { prompt: string; response: string; }){


    return(
        <div className="results-div">
            <p>Prompt:</p>
            <p>{props.prompt}</p>
            <p>Response:</p>
            <p>{props.response}</p>
        </div>
    )
}

export default Results;