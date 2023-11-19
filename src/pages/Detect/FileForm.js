import React, { useState } from 'react';
import { doc, setDoc, updateDoc, where, orderBy, collection, query, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase.config';

function FileForm() {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState(0);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const getFileHash = async (file) => {
    // Implement file hashing logic, for example using crypto.subtle.digest
    // This is a simplified example, you might want to use a more robust hashing algorithm
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const fileHash = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return fileHash;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (file) {
      const fileHash = await getFileHash(file);

      const entryDocRef = doc(db, 'detected_hashes', fileHash);

      const entryDocSnapshot = await getDoc(entryDocRef);
      
      if (entryDocSnapshot.exists()) {
        alert(entryDocSnapshot.data().stats.status);
      } else {
        alert("Unknown file");
      }

      setFile(null);
      setKey((prevKey) => prevKey + 1);
    } else {
      alert('Please select a file before submitting.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Choose a file:
        <input
            key={key}
            type="file"
            id="fileInput"
            accept=".jpg, .jpeg, .png, .gif, .txt" // Specify the file types you want to allow
            onChange={handleFileChange}
          />
      </label>
      <br />
      <button type="submit">Submit File</button>
    </form>
  );
};

export default FileForm;