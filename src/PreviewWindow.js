function PreviewWindow({ formattedMarkdown }) {
  return (
    <div
      id="preview"
      dangerouslySetInnerHTML={{ __html: formattedMarkdown }}
    ></div>
  );
}

export default PreviewWindow;
