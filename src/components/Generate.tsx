import React, { FormEventHandler, useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import Dropdown from "./Dropdown";
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
  const [submissionError, setSubmissionError] = useState(false);
  const [aiEngine, setAIEngine] = useState<string>("text-curie-001");

  //useEffect used to retrieve localStorage
  useEffect(() => {
    var retrievedResults = JSON.parse(
      (window.localStorage.getItem("resultsArray") as string) || "[]"
    );
    var aiEngine =
      (window.localStorage.getItem("aiEngine") as string);
    updateResultsArray(retrievedResults);
    console.log(aiEngine)
    setAIEngine(aiEngine);
  }, []);

  //useEffect used to store values into localStorage
  useEffect(() => {
    if (resultsArray.length !== 0) {
      window.localStorage.setItem("resultsArray", JSON.stringify(resultsArray));
    }
  }, [output]);

  useEffect(() => {
    window.localStorage.setItem("aiEngine", aiEngine);
  }, [aiEngine]);

  async function generateResults(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionError(false);

    if (userInput !== "") {
      //Only perform the POST request if the textarea is not blank
      const data = {
        prompt: `${userInput}`,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };

      const response = await axios.post(
        "https://api.openai.com/v1/engines/" + aiEngine + "/completions",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_SECRET}`,
          },
        }
      );

      //use data retrieved from request to update the results array and output
      const aiResponse = await response.data;
      setOutput(aiResponse.choices[0].text);
      updateResultsArray((resultsArray) => [
        { prompt: userInput, response: aiResponse.choices[0].text }, // add the new result to the begining of the array, so that when its mapped newer items show first
        ...resultsArray,
      ]);
      setUserInput("");

      // if error in post request, log the error
      if (mutation.isError) {
        console.log(mutation.error);
      }

      console.log(aiEngine);
    } else {
      console.log("not ran"); // in the case the request is not performed
      setSubmissionError(true);
    }
  }

  const mutation = useMutation(generateResults);

  //clear all previous results of the OPENAI API
  function clearResults() {
    localStorage.clear();
    updateResultsArray([]);
  }

  function dropDownChange(e: {
    target: { value: React.SetStateAction<string> };
  }) {
    setAIEngine(e.target.value);
  }

  return (
    <>
      <div className="input-area-div">
        <form onSubmit={mutation.mutate}>
          <label className="input-label" htmlFor="user-input">
            What would you like to write about?
          </label>
          <Dropdown engine={aiEngine} onChange={dropDownChange} />
          <textarea
            className={
              submissionError || mutation.isError ? "search-error" : ""
            }
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
            placeholder="Enter your prompt"
            id="user-input"
          />
          <button className="clear-button" type="button" onClick={clearResults}>
            Clear Results
          </button>
          <button
            disabled={mutation.isLoading ? true : false}
            className="submit-button"
            type="submit"
          >
            {!mutation.isLoading ? "Submit" : "Loading..."}
          </button>
        </form>
        <hr className="divider" />
      </div>
      <div className="results-div">
        {resultsArray.map((result, index) => {
          return (
            <Results
              key={index}
              prompt={result.prompt}
              response={result.response}
            />
          );
        })}
      </div>
    </>
  );
}

export default Generate;
