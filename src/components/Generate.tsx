import React, { FormEventHandler, useEffect, useState } from "react";
import "../styles/Generate.css";
import Results from "./Results";

export interface OpenAIresponse {
  prompt: string;
  response: string;
}

function Generate() {
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const [resultsArray, updateResultsArray] = useState<OpenAIresponse[]>([]);


  useEffect(()=>{
    var retrievedData = JSON.parse(window.localStorage.getItem("resultsArray") as string || '[]');
    updateResultsArray(retrievedData);
  }, [])

  useEffect(()=>{
    if (resultsArray.length !== 0){
      window.localStorage.setItem('resultsArray', JSON.stringify(resultsArray));
    }
  }, [output])

  async function generateResults(event: React.FormEvent<HTMLFormElement>) {

    event.preventDefault();

    if (userInput !== ''){

      const data = {
        prompt: `${userInput}`,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };
  
      const response = await fetch(
        "https://api.openai.com/v1/engines/text-curie-001/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_SECRET}`,
          },
          body: JSON.stringify(data),
        }
      );
  
      const aiResponse = await response.json();
      
      setOutput(aiResponse.choices[0].text);
      updateResultsArray((resultsArray) => [
        { prompt: userInput, response: aiResponse.choices[0].text },
        ...resultsArray,
      ]);
      setUserInput("");
    } else {
      console.log("not ran")
    }
  }

  function clearResults(){
    localStorage.clear()
    updateResultsArray([])
  }

  return (
    <>
    <div className="input-area-div">
      <form onSubmit={generateResults}>
        <label className="input-label" htmlFor="user-input">What would you like to write about?</label>
        <textarea
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          placeholder="Enter your prompt"
          id="user-input"
        />
        <button className="clear-button" onClick={clearResults}>
            Clear Results
        </button>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
      <hr className="divider" />
    </div>
    <div className="results-div">
      {resultsArray.map((result, index)=>{
        return <Results key={index} prompt={result.prompt} response={result.response}/>
      })}
    </div>
    </>   
  );
}

export default Generate;