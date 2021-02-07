import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Markdown Previewer</h1>
      <textarea id="editor" rows="25" cols="80" />
      <div id="preview"></div>
    </div>
  );
}

export default App;
