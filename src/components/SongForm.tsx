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
    if (songName.length < 4) {
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
        alert(`${name}, you have submitted successfully.`);
      })
      .catch((error) => {
        alert(error.message);
      });

    clearForm();
    // setNeedToSignIn(false);
  };
  return (
    <div className="SongForm">
      <h1 className="form_page_title">Queue a song for the party</h1>
      <h2 className="tag_line">Think you have a good song in mind?</h2>
      <form>
        <input
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          type="text"
          placeholder="Baby"
        />
        <input
          value={songArtist}
          onChange={(e) => setSongArtist(e.target.value)}
          type="text"
          placeholder="Justin Bieber"
        />
        <input
          value={songLink}
          onChange={(e) => setSongLink(e.target.value)}
          type="text"
          placeholder="https://www.youtube.com/watch?v=kffacxfA7G4"
        />
        <button type="submit" onClick={sendForm}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SongForm;
