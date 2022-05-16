import React, { FormEventHandler, useEffect, useState } from "react";
import axios from "axios";
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

  //useEffect used to retrieve localStorage
  useEffect(()=>{
    var retrievedData = JSON.parse(window.localStorage.getItem("resultsArray") as string || '[]');
    updateResultsArray(retrievedData);
  }, [])

  //useEffect used to store values into localStorage
  useEffect(()=>{
    if (resultsArray.length !== 0){
      window.localStorage.setItem('resultsArray', JSON.stringify(resultsArray));
    }
  }, [output])

  async function generateResults(event: React.FormEvent<HTMLFormElement>) {

    event.preventDefault();

    if (userInput !== ''){ //Only perform the POST request if the textarea is not blank

      const data = {
        prompt: `${userInput}`,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };
      
      //perform POST request
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
        
      //use data retrieved from request to update the results array and output 
      const aiResponse = await response.json();      
      setOutput(aiResponse.choices[0].text);
      updateResultsArray((resultsArray) => [
        { prompt: userInput, response: aiResponse.choices[0].text }, // add the new result to the begining of the array, so that when its mapped newer items show first
        ...resultsArray,
      ]);
      setUserInput("");
    } else {  // in the case the request is not performed
      console.log("not ran")
    }
  }

  //clear all previous results of the OPENAI API
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