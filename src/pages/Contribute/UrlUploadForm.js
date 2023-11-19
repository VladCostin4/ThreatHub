import React, { useState } from 'react';
import { doc, setDoc, updateDoc, where, orderBy, collection, query, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase.config'; // Import your Firebase configuration

import "./UrlUploadForm.css"

function UrlUploadForm() {
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const entryDocRef = doc(db, 'community', btoa(url));

      // Check if the document exists
      const entryDocSnapshot = await getDoc(entryDocRef);
      
      if (!entryDocSnapshot.exists()) {
        // Add the entry to Firebase
        await setDoc(doc(db, `community/${btoa(url)}`), {
          url: url, 
          stats: {
            details: details,
            status: status,
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
      setDetails('');
      setStatus('');
      setUrl('');
      setError('');
    } catch (error) {
      setError('Error adding entry: ' + error.message);
      console.error('Error adding entry: ', error);
    }
  };

  return (
    <>
      <h2>Add Url</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Details:
          <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} />
        </label>
        <br />
        <label>
          Status:
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
        </label>
        <br />
        <label>
          URL:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit Url</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </>
  );
};

export default UrlUploadForm;
