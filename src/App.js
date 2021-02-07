import { useState } from "react";
import PreviewWindow from "./PreviewWindow";
import marked from "marked";
import "./App.css";

function App() {
  const [rawMarkdown, setRawMarkdown] = useState("");
  const [formattedMarkdown, setFormattedMarkdown] = useState("");

  function updateRawMarkdown(event) {
    const newRawMarkdown = event.target.value;
    setRawMarkdown(newRawMarkdown);
    setFormattedMarkdown(marked(newRawMarkdown));
  }

  return (
    <div className="App">
      <h1>Markdown Previewer</h1>
      <textarea
        id="editor"
        rows="25"
        cols="80"
        value={rawMarkdown}
        onChange={updateRawMarkdown}
      />
      <PreviewWindow formattedMarkdown={formattedMarkdown} />
    </div>
  );
}

export default App;
