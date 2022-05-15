import React from "react";
import '../styles/Results.css'

function Results(props: { prompt: string; response: string; }){


    return(
        <div className="results-card-div">
            <p className="section-name">Prompt:</p>
            <p className="prompt">{props.prompt}</p>
            <p className="section-name">Response:</p>
            <p className="response">{props.response}</p>
        </div>
    )
}

export default Results;