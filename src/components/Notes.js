import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const context = useContext(noteContext)
  let navigate = useNavigate();
  const { notes, getNotes, editNote} = context
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      navigate("/login");
    }
  }, [])

  
  const ref = useRef(null)
  const [note,setNote]=useState({id:"",etitle:"", ediscription:"" ,etag:""})

  const updateNote = (currentNote) => {
    ref.current.click();  // useRef documentetion
    setNote({id:currentNote._id, etitle:currentNote.title, ediscription:currentNote.discription, etag:currentNote.tag})
  }

  const refClose = useRef(null)
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.ediscription, note.etag)
    refClose.current.click();
    props.showAlart("Updated Successfuly","success");
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote showAlart={props.showAlart}/>

      {/* Adding bootstrap modal //for edit notes */}

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edite Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="ediscription" value={note.ediscription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
              <button disabled={note.etitle.length<5 || note.ediscription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      {/* populating Notes in card */}
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length==0 && 'No notes to display'}
        </div>
        {notes.map((notes) => {
          return <Noteitem key={notes._id} note={notes} updateNote={updateNote} showAlart={props.showAlart} />
        })}
      </div>
    </>
  )
}
