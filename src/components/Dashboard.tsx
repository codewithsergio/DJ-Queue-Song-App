import { useEffect, useState } from "react";
import "./styles/Dashboard.css";

import {
  // updateDoc,
  doc,
  onSnapshot,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "../firebase-config";

interface Song {
  songName: string;
  songArtist: string;
  songLink: string;
}

function Dashboard() {
  const [songsList, setSongsList] = useState<Song[]>([]);

  useEffect(() => {
    // When user submits form, re-render page.
    onSnapshot(
      doc(db, "songs", "songList"),
      (docSnapshot: DocumentSnapshot<DocumentData, DocumentData>) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data()?.data;
          if (data) {
            setSongsList(data.reverse());
          } else {
            setSongsList([]); // Handle the case where information is undefined
          }
        }
      }
    );
  }, []);

  return (
    <div className="Dashboard">
      <h1>Queued Songs List</h1>
      <div className="songsTable">
        <table>
          <tbody>
            <tr>
              <th>Song Name</th>
              <th>Song Artist</th>
              <th>Song Link</th>
            </tr>
            {songsList.map((song, index) => (
              <tr key={index}>
                <td>{song.songName ? song.songName : "N/A"}</td>
                <td>{song.songArtist ? song.songArtist : "N/A"}</td>
                <td>
                  <a target="_blank" href={`${song.songLink}`}>
                    {song.songLink}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
