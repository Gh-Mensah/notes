import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Createnotes from './pages/Createnotes';
import Viewnotes from './pages/Viewnotes';
import { ThemeProvider, createTheme } from '@mui/material';



function App() {


  const [newlyCreated, SetNewCreated]= useState(false)

  const   Customtheme = createTheme({
    palette:{
        todo:{
            main:"#ff7543",
            darker:"#9f0000"
        },
        reminder:{
            main:"#6abf69",
            darker:"#00600f"
        },
        work:{
            main:"#fdd835",
            darker:"#c67100"
        },
        other:{
            main:"#d05ce3",
            darker:"#6a0080"
        },
        primary:{
            main:"#37474f",
            darker:"#1b1b1b"
        },
        info:{
            main:"#33691e",
            darker:"#00701a"
        },
        label:{
            main:"#cfcfcf",
            darker:"#c7c7c7"
        }
    },
    typography:{
        fontFamily:[
          'Varela Round',
          'Signika',
          'Bebas Neue',
          'sans-serif'
        ].join(','),
      }
})

  return (
    <ThemeProvider theme={Customtheme}>
    <>
    <Layout>
    <Routes>
    <Route path="/" element={<Viewnotes  createdNote={newlyCreated} newNoteAlert={SetNewCreated}  />} />
    <Route path="/create" element={<Createnotes onCreate={SetNewCreated}  /> } />
    </Routes>
    </Layout>
    </>
    </ThemeProvider>
  )
}

export default App;
