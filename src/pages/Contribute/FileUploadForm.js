import React, { useState } from 'react';
import { doc, setDoc, updateDoc, where, orderBy, collection, query, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase.config'; // Import your Firebase configuration

import "./FileUploadForm.css"

function FileUploadForm() {
  const [file, setFile] = useState(null);
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState('');
  const [family, setFamily] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState('');
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
      try {
        const fileHash = await getFileHash(file);

        const entryDocRef = doc(db, 'community', fileHash);

        // Check if the document exists
        const entryDocSnapshot = await getDoc(entryDocRef);
        
        if (!entryDocSnapshot.exists()) {
          // Add the entry to Firebase
          await setDoc(doc(db, `community/${fileHash}`), {
            hash: fileHash,
            stats: {
              details: details,
              family: family,
              status: status,
              type: type,
              query_count: 0,
              upload_count: 1,
              report_count: 0,
            }
          });
        } else {
          // Update the specific field with the new value
          await updateDoc(entryDocRef, {
            'stats.upload_count': entryDocSnapshot.data().stats.upload_count + 1
          });
        }

        // Clear form fields after successful submission
        setFile(null);

        setDetails('');
        setStatus('');
        setFamily('');
        setType('');
        setError('');

        setKey((prevKey) => prevKey + 1);
      } catch (error) {
        setError('Error adding entry: ' + error.message);
        console.error('Error adding entry: ', error);
      }
    } else {
      alert('Please select a file before submitting.');
    }
  };

  return (
    <>
      <h2>Add File</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Details:
          <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} />
        </label>
        <br />
        <label>
          Family:
          <input type="text" value={family} onChange={(e) => setFamily(e.target.value)} />
        </label>
        <br />
        <label>
          Status:
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
        </label>
        <br />
        <label>
          Type:
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </label>
        <br />
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </>
  );
};

export default FileUploadForm;