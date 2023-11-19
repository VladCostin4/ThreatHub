import React, { useState } from 'react';
import { doc, setDoc, updateDoc, where, orderBy, collection, query, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase.config';

function UrlForm() {
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (url) {
      // Process the URL, for example, send it to the server
      const entryDocRef = doc(db, 'detected_urls', btoa(url));

      const entryDocSnapshot = await getDoc(entryDocRef);
      
      if (entryDocSnapshot.exists()) {
        alert(entryDocSnapshot.data().stats.status);
      } else {
        alert("Unknown url");
      }

      setUrl('');
    } else {
      alert('Please enter a URL before submitting.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter a URL:
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>
      <br />
      <button type="submit">Submit URL</button>
    </form>
  );
};

export default UrlForm;