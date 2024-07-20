import React, { useEffect, useState } from 'react';
import Footer from "./components/Head";
import Head from "./components/Head";

function App() {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const [lyrics, setLyrics] = useState('');



  useEffect(() => {

    const handleMessage = (message) => {

      if (!message) {
        console.error("Message is undefined");
        return;
      }





      const { type, payload } = message;
      if (type === "FROM_BACKGROUND") {
        setSong(payload.song);
        setArtist(payload.artist);


      } else {
        console.log("Some error with type");
      }
    };



    console.log("OnMessage");
    chrome.runtime.onMessage.addListener(handleMessage);

    // Cleanup listener on unmount
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  useEffect(() => {
    if (artist && song) {
      fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
        .then(response => response.json())
        .then(data => {
          if (data.lyrics) {
            setLyrics(data.lyrics);
          } else {
            setLyrics("Lyrics not found");
          }
        })
        .catch(error => {
          console.error("Error fetching lyrics:", error);
          setLyrics("Error fetching lyrics");
        });
    }
  }, [artist, song]);


return (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="font-sans w-[420px] h-[580px] bg-opacity-10 backdrop-filter backdrop-blur-lg shadow-lg p-6 bg-[#1DB954]">
      <Head title={song} />

      {/* Artist Name */}
      <h1 className="text-xl text-white mb-4">{artist}</h1>

      {/* Lyrics Box */}
      <div className="text-xl text-white p-4 m-4 rounded-lg shadow-lg w-[360px] h-[400px] overflow-y-auto bg-[#191414] bg-opacity-80 backdrop-filter backdrop-blur-lg">
        {lyrics ? lyrics.split('\n').map((line, index) => (
          <p key={index} className="mb-1">{index === 0 ? " " : line}</p>
        )) : 'Loading lyrics...'}
      </div>

      <Footer />
    </div>
  </div>
);
}

export default App;
