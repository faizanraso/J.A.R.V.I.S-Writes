import React from 'react'
import InputArea from './components/InputArea'
import Header from './components/Header'
import Results from './components/Results'

import './App.css'

function App() {

  return(
    <div className='app-div'>
      <Header/>
      <InputArea/>
      <Results/>
    </div>
  )
}

export default App
