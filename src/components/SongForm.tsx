import React from "react";
import { useState } from "react";
import "./styles/SongForm.css";

import { db } from "../firebase-config";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";

function SongForm() {
  const [songName, setSongName] = useState<string>("");
  const [songArtist, setSongArtist] = useState<string>("");
  const [songLink, setSongLink] = useState<string>("");
  const clearForm = () => {
    setSongName("");
    setSongArtist("");
    setSongLink("");
  };
  const sendForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    // const date = new Date();
    e.preventDefault();
    if (songName.length < 2) {
      alert("Please write the full name of the song.");
      return;
    }

    updateDoc(doc(db, "songs", "songList"), {
      data: arrayUnion({
        // date: `${date.getMonth() + 1}-${date.getDate()}`,
        songName: songName,
        songArtist: songArtist,
        songLink: songLink,
      }),
    })
      .then(() => {
        alert(`You have successfully added your song to our queue!`);
      })
      .catch((error) => {
        alert(error.message);
      });

    clearForm();
    // setNeedToSignIn(false);
  };
  return (
    <div className="SongForm">
      <h1 className="form_page_title">Queue A Song!</h1>
      <form>
        <input
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          type="text"
          placeholder="Song Name"
        />
        <input
          value={songArtist}
          onChange={(e) => setSongArtist(e.target.value)}
          type="text"
          placeholder="Artist Name"
        />
        <input
          value={songLink}
          onChange={(e) => setSongLink(e.target.value)}
          type="text"
          placeholder="Song Link (Youtube, Spotify, etc.)"
        />
        <button type="submit" onClick={sendForm}>
          Submit
        </button>
      </form>
      <a href="https://venmo.com/u/bookingmajestic">
        Venmo at least <span id="tipAmount">$5</span> to get your song played.
      </a>
    </div>
  );
}

export default SongForm;
