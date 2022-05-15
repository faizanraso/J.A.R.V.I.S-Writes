import React, {useEffect, useState} from "react";
import "../styles/InputArea.css"
import Generate from "../api/Generate"

function InputArea(){

    const [userInput, setUserInput] = useState("");
    const [output, setOutput] = useState("");

    const initialArray = []
    const [resultsArray, updateResultsArray] = useState(initialArray);
    
    useEffect(()=>{
        updateResultsArray(resultsArray => [{prompt: userInput, response: output}, ...resultsArray])
        console.log(resultsArray)
    }, [output]);


    async function generateResults(event){
        event.preventDefault();

        const data = {
            prompt: `${userInput}`,
            temperature: 0.5,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        };

        const response = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_SECRET}`,
            },
            body: JSON.stringify(data),
          });

          const aiResponse = await response.json();
          setOutput(aiResponse.choices[0].text);
    }


    return(
        <div className="input-area-div">
            <form >
                <textarea onChange={(e) => setUserInput(e.target.value)} value={userInput} placeholder="What would you like to write about?"/>
                <button className="submit-button" onClick={generateResults}>Submit</button>
            </form>
            <hr className="divider"/>
        </div>
    )
}

export default InputArea;