import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

export default function Home(props) {
  const{showAlart}=props //ShowAlart ko mai nikal raha hu props me se //useing restruturing method
  return (
    <>
      <Notes showAlart={showAlart}/>
    </>
  )
}

