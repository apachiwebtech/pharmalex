// src/BookReader.js
import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CanvasDraw from 'react-canvas-draw';

const BookReader = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showCanvas, setShowCanvas] = useState(false);

  const onEditorStateChange = (newState) => {
    setEditorState(newState);
  };

  const copyText = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    const text = raw.blocks.map(block => block.text).join('\n');
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard');
  };

  return (
    <div>
      <h1>Book Reader</h1>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
      <button onClick={copyText}>Copy Text</button>
      <button onClick={() => setShowCanvas(!showCanvas)}>
        {showCanvas ? 'Hide Canvas' : 'Show Canvas'}
      </button>
      {showCanvas && <CanvasDraw />}
    </div>
  );
};

export default BookReader;
