import React, { useState } from 'react';

import "./Contribute.css"

import UrlUploadForm from "./UrlUploadForm.js";
import FileUploadForm from "./FileUploadForm.js";

function Contribute() {
  const [showFileForm, setShowFileForm] = useState(true);

  const handleToggle = () => {
    setShowFileForm(!showFileForm);
  };

  return (
    <div className='container'>
      <button className='switch_button' onClick={handleToggle}> 
        Toggle Forms ({showFileForm ? 'URL' : 'File'})
      </button>
      {showFileForm ? (
        <FileUploadForm />
      ) : (
        <UrlUploadForm />
      )}
    </div>
  );
}

export default Contribute;