import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Canvas from "./Canvas";
import Header from "./Header";
import qs from 'qs';
export default function App(props) {
  const [showAddNote, setShowAddNote] = useState(false);
  const [newNotePos, setNewNotePos] = useState({ x: 0, y: 0 });
  const [newNoteText, setNewNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  // preload from server
  useEffect(() => {
    axios.get("/api/notes/").then((res) => {
      let notes = res.data;
      setNotes(notes);
    });
  }, []);
  function handleNewNoteValue(e) {
    setNewNoteText(e.target.value);
  }
  const handleEnter = (e) => {
    if (e.key == "Enter") {
      // Backend first: update with backend then show result
      axios
        .post(
          "/api/notes/",
          qs.stringify({
            text: newNoteText,
            positionX: newNotePos.x,
            positionY: newNotePos.y,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          console.log("added successfully")
          setNotes([
            ...notes,
            {
              text: newNoteText,
              positionX: newNotePos.x,
              positionY: newNotePos.y,
            },
          ]);
          setNewNoteText("");
          setNewNotePos({ x: 0, y: 0 });
          setShowAddNote(false);
        }).catch((err) => {
          console.log(err)
        });
      //End of backend first 


      // UI first (not reliable): concurrently update ui regardless of backend status
      // axios
      //   .post(
      //     "/api/notes/",
      //     qs.stringify({
      //       text: newNoteText,
      //       positionX: newNotePos.x,
      //       positionY: newNotePos.y,
      //     }),
      //     {
      //       headers: {
      //         "Content-Type": "application/x-www-form-urlencoded",
      //       },
      //     }
      //   )
      //   .then((res) => {
      //     console.log("added successfully")
      //   }).catch((err) => {
      //     console.log(err)
      //   });
      // setNotes([
      //   ...notes,
      //   {
      //     text: newNoteText,
      //     positionX: newNotePos.x,
      //     positionY: newNotePos.y,
      //   },
      // ]);
      // setNewNoteText("");
      // setNewNotePos({ x: 0, y: 0 });
      // setShowAddNote(false);
      // end of UI first
    }
  };
  function addNoteUI(e) {
    // -70 for remove header size
    setNewNotePos({ x: e.pageX, y: e.pageY - 70 });
    setShowAddNote(true);
  }

  function deleteAll() {
    axios.delete('/api/notes/').then(res => {
      console.log("all notes deleted")
    }).catch(err => {
      console.log(err)
    })
    setNotes([]);
  }
  return (
    <>
      {showAddNote ? (
        <div id="pop_note">
          <div id="inner_pop_note">
            <textarea
              placeholder="Note..."
              id="user_input"
              maxLength="136"
              value={newNoteText}
              onChange={handleNewNoteValue}
              onKeyDown={handleEnter}
            ></textarea>
            <i className="btn-close" onClick={() => setShowAddNote(false)}></i>
          </div>
        </div>
      ) : null}

      <main>
        <Header deleteAll={deleteAll} addNoteUI={addNoteUI} />
        <Canvas notes={notes} addNoteUI={addNoteUI} />
      </main>
    </>
  );
}
