import React, { useState } from 'react';

import "./Detect.css"

import UrlForm from "./UrlForm.js";
import FileForm from "./FileForm.js";

function Detect() {
  const [showFileForm, setShowFileForm] = useState(true);

  const handleToggle = () => {
    setShowFileForm(!showFileForm);
  };

  return (
    <div className='container'>
      <h2>Detect malware</h2>
      <button className='switch_button' onClick={handleToggle}>
        Toggle Forms ({showFileForm ? 'URL' : 'File'})
      </button>
      {showFileForm ? (
        <FileForm />
      ) : (
        <UrlForm />
      )}
    </div>
  );
};

export default Detect;
