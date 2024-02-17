import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

export default function AddNote(props) {
    const context =useContext(noteContext)
    const {addNote}=context

    const [note,setNote]=useState({title:"",discription:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault(); //page reload na ho isliye 
        addNote(note.title,note.discription,note.tag);
        setNote({title:"",discription:"",tag:""}) // submit karne ke phirse fild khali ho jaye
        props.showAlart("Added Successfuly","success")
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    
  return (
    <>
        <div className="container my-3">
      <h2>Add a Note</h2>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="discription" value={note.discription} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
        </div>
        <button disabled={note.title.length<5 || note.discription.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
      </div>
    </>
  )
}
