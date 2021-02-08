import { useState, useEffect } from "react";
import PreviewWindow from "./PreviewWindow";
import marked from "marked";
import DOMPurify from "dompurify";
import Container from "react-bootstrap/Container";

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

  useEffect(() => {
    setRawMarkdown(defaultRawMarkdown);
    setFormattedMarkdown(marked(defaultRawMarkdown));
  }, []);

  function updateRawMarkdown(event) {
    const newRawMarkdown = event.target.value;
    setRawMarkdown(newRawMarkdown);

    const dirtyHtml = marked(newRawMarkdown);
    const cleanHtml = DOMPurify.sanitize(dirtyHtml);
    setFormattedMarkdown(cleanHtml);
  }

  return (
    <Container className="text-center">
      <h1>Markdown Previewer</h1>
      <textarea
        id="editor"
        rows="25"
        cols="80"
        value={rawMarkdown}
        onChange={updateRawMarkdown}
      />
      <PreviewWindow formattedMarkdown={formattedMarkdown} />
    </Container>
  );
}

export default App;
