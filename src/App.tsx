import React, { useState } from "react";
import "./App.scss";
import CollectInput from "./components/CollectInput";
import SpellingFixer from "./components/SpellingFixer";

const App = () => {
  const [text, setText] = useState("");
  return (
    <div className="App">
      <CollectInput submitHandler={setText} />
      {text && <SpellingFixer corpus={text} />}
    </div>
  );
};

export default App;

