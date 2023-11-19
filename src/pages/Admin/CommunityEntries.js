import React, { useState, useEffect } from 'react';
import { collection, getDocs, onSnapshot, query, where, orderBy, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/firebase.config';

const CommunityEntries = () => {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const q = query(
      collection(db, 'community'),
      where('stats.upload_count', '>', -1),
      orderBy('stats.upload_count', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedEntries = [];
      querySnapshot.forEach((doc) => {
        updatedEntries.push({ id: doc.id, ...doc.data() });
      });
      setEntries(updatedEntries);
    }, (error) => {
      setError('Error fetching entries: ' + error.message);
      console.error('Error fetching entries: ', error);
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleButtonClick = async (entry, prevEntries) => {
      try {
        // Delete the entry from the database using its ID

        if (entry.url != null) {
          await setDoc(doc(db, `detected_urls/${btoa(entry.url)}`), {
            url: entry.url, 
            stats: {
              details: entry.stats.details,
              status: entry.stats.status,
            }
          });
        } else {
          await setDoc(doc(db, `detected_hashes/${entry.hash}`), {
        
              hash: entry.hash,
              stats: {
                details: entry.stats.details,
                family: entry.stats.family,
                status: entry.stats.status,
                type: entry.stats.type
              }
            });
          }

        setEntries((prevEntries) => prevEntries.filter((e) => e.id !== entry.id));

        await deleteDoc(doc(db, 'community', entry.id));
      } catch (error) {
        setError('Error deleting entry: ' + error.message);
        console.error('Error deleting entry: ', error);
      }
  };

  return (
    <div>
      <h2 style={{marginTop: "100px"}}>Community entries</h2>
      {entries.length === 0 && <p>No entries available.</p>}
      <ul style={{height: "400px", overflow: "hidden", overflowY: "scroll"}}>
        {entries.map((entry) => (
          <li key={entry.id}>
          <strong>URL:</strong> {entry.url ? entry.url : "- not applicable -"}
          <br />
          <strong>File hash:</strong> {entry.hash ? entry.hash : "- not applicable -"}
          <br />
          <strong>Details:</strong> {entry.stats?.details}
          <br />
          <strong>Status:</strong> {entry.stats?.status}
          <br />
          <strong>Family:</strong> {entry.stats?.family ? entry.stats.family : "- not applicable -"}
          <br />
          <strong>Type:</strong> {entry.stats?.type ? entry.stats.type : "- not applicable -"}
          <br />
          <strong>Query Count:</strong> {entry.stats?.query_count}
          <br />
          <strong>Upload Count:</strong> {entry.stats?.upload_count}
          <br />
          <strong>Report Count:</strong> {entry.stats?.report_count}
          <button onClick={() => handleButtonClick(entry, entries)}>Run Function</button>
          <hr />
        </li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CommunityEntries;
