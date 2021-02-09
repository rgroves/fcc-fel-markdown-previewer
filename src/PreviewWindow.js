function PreviewWindow({ formattedMarkdown, ...props }) {
  return (
    <div
      {...props}
      dangerouslySetInnerHTML={{ __html: formattedMarkdown }}
    ></div>
  );
}

export default PreviewWindow;
