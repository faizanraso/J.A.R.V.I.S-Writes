# J.A.R.V.I.S Writes

### Description:

J.A.R.V.I.S (Just A Rather Very Intelligent System) Writes is a web-app that takes a user entered prompt and returns a AI generated response. Some of the technologies used in this project include React, TypeScript, Axios, react-query and localStorage

This project can be used/tested at the following links: 

Replit: https://jarvis-writes.faizanraso.repl.co/
<br>

### Feautures Included: 

1. Ability to select the AI engine being used from a select box
2. Implemented react-query (useMutation) to create a loading state for when a prompt is submitted. When the application is waiting for 
   the API to return the data, the submit button is disabled and a loading message is displayed.
3. Used localStorage to save AI responses as well as AI engine selection after the page is closed/refreshed
4. Added a clear button, which clears all previous prompts and their associated AI generated responses.
5. Error animations for when an invalid entry is submitted as the prompt (a blank entry)
6. Error animation for when the API call returns an error (e.g. invalid API key). This error is detected using react-query and its message is logged in the console. 


### Demo:
This project can be used/tested at the following links: 

Replit: https://jarvis-writes.faizanraso.repl.co/
<br>

The demo video below shows the project being used and its various features.



https://user-images.githubusercontent.com/59986120/181494639-250bec05-8e58-4e84-b31d-7b07aaa33513.mov



