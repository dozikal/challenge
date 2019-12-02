import React from "react";
import "./App.css";
import FizzBuzzRenderItem from "./components/FizzBuzzRenderItem";
import FizzBuzz from "./components/FizzBuzz";

function App() {
  const numbers = Array.from({ length: 100 });
  const fizzBuzzArr = numbers.map((_, n) => FizzBuzz(n));

  return (
    <div className="App">
      <header className="App-header">
        {
          fizzBuzzArr.map((x, index) => FizzBuzzRenderItem(x, index))
        }
      </header>
    </div>
  );
}

export default App;
