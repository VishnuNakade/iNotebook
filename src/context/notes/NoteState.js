import { json } from "react-router-dom"
import NoteContext from "./noteContext"
import { useState } from "react"

const NoteState = (props) => {
  const host = "http://localhost:5000"

  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    console.log(json)
    //Logic to get all Notes in client
    setNotes(json)
  }


  // Add a Note
  const addNote = async (title, discription, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, discription, tag }),
    });
    const note = await response.json()
    console.log(json)
    //Logic to Add a Note in client

    // const note = {
    //   "_id": "65269af868233f45179ebcd3fff84",
    //   "user": "6524d5d07fba353c130cc500",
    //   "title": title,
    //   "discription": discription,
    //   "tag": tag,
    //   "date": "2023-10-11T12:54:16.341Z",
    //   "__v": 0
    // };
    setNotes(notes.concat(note))
  }


  // Delete a Note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json)
    //Logic to Delete a Note in client
    console.log(id)
    const newanote = notes.filter((note) => { return note._id !== id })
    setNotes(newanote)
  }


  // Edit a Note
  const editNote = async (id,title, discription, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, discription, tag }),
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].discription = discription;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }



  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {/* hum state aur update(function) export kar rahe hai */}
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;