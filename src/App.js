import { useState, useEffect } from "react";
import PreviewWindow from "./PreviewWindow";
import marked from "marked";
import DOMPurify from "dompurify";

const defaultRawMarkdown = `Markdown Example
================

GitHub Flavored Markdown (GFM)
------------------------------

Read more about [GFM](https://github.github.com/gfm/).

The formatted HTML above was originally styled using the Markdown below:
\`\`\`
Markdown Example
================

GitHub Flavored Markdown (GFM)
------------------------------

Read more about [GFM](https://github.github.com/gfm/)
\`\`\`

Here is an example of something that would be treated with \`*emphasis*\`.

Here is an example of **strong text** versus *emphasized text*.

### Facts About Markdown
1. Markdown is a lightweight markup language for creating formatted text using a plain-text editor
2. John Gruber and Aaron Swartz created Markdown in 2004
3. Markdown is meant to be appealing to human readers in its source code form

> "For months I’ve been working with John Gruber on a new project. The idea was 
> to make writing simple web pages, and especially weblog entries, as easy as 
> writing an email, by allowing you to use much the same syntax and converting it
> automatically into HTML." — Aaron Swartz (posted March 19, 2004)

![Markdown is made for humans](http://source.unsplash.com/2LowviVHZ-E/480x270)`;

marked.setOptions({
  gfm: true,
  breaks: true,
});

function App() {
  const [rawMarkdown, setRawMarkdown] = useState("");
  const [formattedMarkdown, setFormattedMarkdown] = useState("");

  function updateMarkdown(markdown) {
    setRawMarkdown(markdown);
    const dirtyHtml = marked(markdown);
    const cleanHtml = DOMPurify.sanitize(dirtyHtml);
    setFormattedMarkdown(cleanHtml);
  }

  function handleMarkdownChange(event) {
    updateMarkdown(event.target.value);
  }

  useEffect(() => {
    updateMarkdown(defaultRawMarkdown);
  }, []);

  return (
    <>
      <header className="my-1 my-sm-2 my-md-3">
        <h1 className="text-center">Markdown Previewer</h1>
      </header>
      <main>
        <div className="d-flex flex-wrap justify-content-around">
          <div className="p-1 p-sm-2 p-md-3 flex-grow-1">
            <h2 className="text-primary">Markdown Editor</h2>
            <p>Enter your Markdown here:</p>
            <textarea
              className="border border-primary p-1 p-sm-2 p-md-3 w-100"
              id="editor"
              rows="25"
              value={rawMarkdown}
              onChange={handleMarkdownChange}
            />
          </div>
          <div className="p-1 p-sm-2 p-md-3 w-50">
            <h2 className="text-success">Markdown Viewer</h2>
            <p>View your formatted Markdown here:</p>
            <PreviewWindow
              id="preview"
              className="bg-light border border-success border-inset p-1 p-sm-2 p-md-3"
              formattedMarkdown={formattedMarkdown}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
