import React from 'react';
import Header from "./Shared/Header/Header";
import Menu from "./Shared/Menu/Menu";
import Groceries from "./components/Customer/Groceries/Groceries";
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='row-container'>
        <Menu className="left"/>
        <Groceries className="right"/>
      </div>
    </div>
  );
}

export default App;
