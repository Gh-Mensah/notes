import { Grid } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CardNotes from '../components/CardNotes'
import SearchFilter from '../components/SearchFilter'

function Viewnotes({createdNote ,newNoteAlert}) {

  const [notes, setNotes] = useState(null)
  const [manipulatedNotes , setmanipulatedNotes]= useState(null)
  const [defaultArr , setDefaultCheck] = useState(true)
  const [ascCheck , setAscChecK]= useState(false)
  const [descCheck , setDescChecK]= useState(false)
  const [recentAdd , setrecentAddChecK]= useState(false)

  const [DefaultToggler , setDefaulter] = useState(false)



  useEffect(()=>{
    axios(`http://localhost:2500/notes`)
    .then((res)=>{
      setNotes(res.data)
    })
  },[DefaultToggler])

  useEffect(()=>{
    axios(`http://localhost:2500/notes`).then((res)=>{
      setmanipulatedNotes(res.data)
    })
  },[])


  if (notes) {

    if (defaultArr) {
      notes.sort( (a , b ) => (a.hours < b.hours) ? -1 : (a.hours > b.hours) ? 1 : 0 ).reverse()
     }

     if (ascCheck) {
      notes.sort( (a , b ) => (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0 )
     }
    
     if (descCheck) {
      notes.sort( (a , b ) => (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0 ).reverse()
     }
    
     if (recentAdd) {
      notes.sort( (a , b ) => (a.hours < b.hours) ? -1 : (a.hours > b.hours) ? 1 : 0 ).reverse()
     }

   }

 



  
  return (
    <div>
      <SearchFilter items={notes} newContent={setNotes}  testContent={manipulatedNotes}  defaultSort={setDefaultCheck} sortAscending={setAscChecK} sortDescending={setDescChecK} sortRecentlyAdded={setrecentAddChecK}  defaultView={setDefaulter } />
      <Grid container  columnSpacing={2} rowSpacing={2}  mt={1}  px={2} pb={2} >
      <CardNotes  items={notes} noteCreation={createdNote} noteAlertII={newNoteAlert} newContent={setNotes} />
      </Grid>
    </div>
  )
}

export default Viewnotes