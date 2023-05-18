import React, { useEffect, useState } from 'react'
import {IconButton, Paper , InputAdornment,Modal,TextField, Typography, Button, Grid, useTheme, useMediaQuery, Container, FormControlLabel, Checkbox, createTheme, ThemeProvider } from '@mui/material'
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import { lime } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Cartheme = createTheme({
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
    ordered:{
      main:"#808080"
    }
  }
})



function SearchFilter({newContent ,testContent , defaultSort , sortAscending , sortDescending , sortRecentlyAdded , defaultView  }) {

  const [open , setOpen ] = useState(false)
  const [recentAdded , setRecentAdded]= useState(false)
  const [tdChecker , setTdChecker]= useState(false)
  const [rmdChecker , setRmdChecker]= useState(false)
  const [wkChecker, setWkChecker]=useState(false)
  const [otherChecker , setOtherChecker] = useState(false)
  const [descChecker  , setdescChecker] = useState(false)
  const [ascChecker  , setascChecker ] = useState(false)

  const [searchContent , setSearchContent]= useState(null)
  const [searchCheck, setSearchCheck] = useState(false)


  const [filteredContent , setFilteredContent] = useState(null)
  const [filterCheck , setFiltCheck] = useState(false)




  const [searchTxt, setSearchTxT ] = useState("")



  const ResetAll = ()=>{

    //Returing Values of Checkers to Default 
    setdescChecker(false)
    setascChecker(false)
    setOtherChecker(false)
    setWkChecker(false)
    setRmdChecker(false)
    setTdChecker(false)
    setRecentAdded(false)
    setOpen(false)

    //Sorting Boolean Values
    sortAscending(false)
    sortDescending(false)
    sortRecentlyAdded(false)
    defaultSort(true)


    //Search and Filter Display Boolean Values  
    setFiltCheck(false)
    setSearchCheck(false)
    defaultView((current)=> !current)

    
    //Clearing TextField 
    setSearchTxT("")

  }



  //Filter Form Triggers 

  const handleCheck = (event)=>{
    setRecentAdded(event.target.checked)
    setascChecker(false)
    setdescChecker(false)
  }

  const descTrigger = ()=>{
    if (!ascChecker && !recentAdded) {
      setdescChecker(!descChecker)
    }
  }

  const ascTrigger = ()=>{

    if (!descChecker && !recentAdded) {
      setascChecker(!ascChecker)
    }
  }

  const tdTrigger = ()=>{
    setTdChecker(!tdChecker)
  }

  const rmdTrigger = ()=>{
    setRmdChecker(!rmdChecker)
  }

  const wkTrigger = ()=>{
    setWkChecker(!wkChecker)
  }

  const otherTrigger = ()=>{
    setOtherChecker(!otherChecker)
  }

 


  const theme= useTheme()
  const smbreak = useMediaQuery(theme.breakpoints.down('md'))
  const mdbreak = useMediaQuery(theme.breakpoints.up('md'))


  let ResModal = ()=>{
    if(smbreak === true){
        return "95%"
    }
    if(mdbreak === true){
        return "60%"
    }
}

  const filtOpenHandler = ()=>{
    console.log("FilterOpen");
    setOpen(true)
    setdescChecker(false)
    setascChecker(false)
    setOtherChecker(false)
    setWkChecker(false)
    setRmdChecker(false)
    setTdChecker(false)
    setRecentAdded(false)
  }

  const filtCloseHandler = ()=>{
    console.log("FilterClose")
    setOpen(false)
  }

  const searchHandler = (e)=>{
   e.preventDefault()
    if(searchTxt.length >= 3){
      const searchFiltered = !filterCheck ? testContent && testContent.filter( item => item.title.toLowerCase().includes(searchTxt.toLowerCase())) : filteredContent && filteredContent.filter( item => item.title.toLowerCase().includes(searchTxt.toLowerCase()))
      setSearchContent(searchFiltered)
      setSearchCheck(true)



    }else{
      console.log("Sorry check your input again");
    }
  }

  useEffect(()=>{

    newContent(searchContent)

  },[searchContent])



    const filterHandler = async ()=>{
      
      setFiltCheck(true)
      const UserSelectedCategory = !searchCheck ? testContent && testContent.filter( item=> item.category == (tdChecker ? "todo" : null) || item.category == (rmdChecker ? "reminder" : null) || item.category == (wkChecker ? "work" : null) || item.category == ( otherChecker ? "other" : null) ) : searchContent && searchContent.filter( item=> item.category == (tdChecker ? "todo" : null) || item.category == (rmdChecker ? "reminder" : null) || item.category == (wkChecker ? "work" : null) || item.category == ( otherChecker ? "other" : null) )
      const DeafultSelection = !searchCheck ? testContent && testContent.filter( item=> item.category === "todo" || item.category === "reminder" || item.category === "work"  || item.category === "other") : searchContent && searchContent.filter( item=> item.category === "todo" || item.category === "reminder" || item.category === "work"  || item.category === "other")
     
    if (UserSelectedCategory.length >= 1) {

      if (descChecker) {
        setFilteredContent(UserSelectedCategory)
        console.log(UserSelectedCategory);
        sortAscending(false)
        sortDescending(true)
        sortRecentlyAdded(false)
        defaultSort(false)

        
      }
      if(ascChecker){
        setFilteredContent(UserSelectedCategory)
        sortAscending(true)
        sortDescending(false)
        sortRecentlyAdded(false)
        defaultSort(false)
         
      }
      if (recentAdded) {
        setFilteredContent(UserSelectedCategory)
        sortAscending(false)
        sortDescending(false)
        sortRecentlyAdded(true)
        defaultSort(false)
         
      }

      if(!ascChecker && !recentAdded && !descChecker){
       setFilteredContent(UserSelectedCategory)
       sortAscending(false)
       sortDescending(false)
       sortRecentlyAdded(false)
       defaultSort(true)
      }

    }else{
      console.log("Yes there is an error");


      if (descChecker){
        setFilteredContent(DeafultSelection)
        sortAscending(false)
        sortDescending(true)
        sortRecentlyAdded(false)
        defaultSort(false)
        
        

      }
      if(ascChecker){
        setFilteredContent(DeafultSelection)
        sortAscending(true)
        sortDescending(false)
        sortRecentlyAdded(false)
        defaultSort(false)

      }
      if (recentAdded) {
        setFilteredContent(DeafultSelection)
        sortAscending(false)
        sortDescending(false)
        sortRecentlyAdded(true)
        defaultSort(false)
      }



    }

    setOpen(false)

  }

  useEffect(()=>{
    
    newContent(filteredContent)

  },[filteredContent])



  const userSearchTxtHandler = (e)=>{
    setSearchTxT(e.target.value)
  }


  return (
    <>
      <ThemeProvider  theme={Cartheme} >
        <form onSubmit={searchHandler} >
      <Box 
      mt={3} 
      sx={{ display:"flex" , justifyContent:"center" }} >
        <TextField variant='standard'
        sx={{ width:"55%" }}
        size="large" 
        placeholder="Search by title..." 
        InputProps={{
          endAdornment :(
          <InputAdornment position="end">
            <IconButton size="large" sx={{ padding:"5px"}} type='submit'> <SearchIcon/> </IconButton>
          </InputAdornment>
        )
      }}
      name="searchHint"
      value={searchTxt}
      onChange={userSearchTxtHandler}
      />

      <IconButton size='large' 
      sx={{ padding:"5px"}} 
      onClick={filtOpenHandler}> 
      <TuneIcon/>
      </IconButton>
      </Box>
      </form>

      <Modal
      open={open}
      sx={{ display:"flex" , justifyContent:"center" , alignItems:"center" , backgroundColor:"black"}}
      >

        <Paper 
        elevation={2} 
        sx={{ backgroundColor:lime[50], width:"88% ", borderRadius:"20px" , height:"88%" , overflowY:smbreak? "scroll" : "hidden" }} >

              <Box sx={{  display:"flex" , justifyContent:"space-between" , bgcolor:"#928E85" , borderTopLeftRadius:"20px"  , borderTopRightRadius:"20px"}} >
                <Box sx={{ borderTopLeftRadius:"20px" , display:"flex" , justifyContent:"center" , alignItems:"center" }}>
                <IconButton onClick={filtCloseHandler} >
                  <CloseIcon  sx={{ fontSize:"150%" , fontWeight:"bolder" , color:"white"  }} /> </IconButton>
                  </Box>
                  <Box sx={{ display:"flex" , justifyContent:"center" , alignItems:"center" , textAlign:"center"}}>
                <Typography 
                variant={smbreak? "h5" : "h4"} 
                color="#fefff4" 
                sx={{ fontWeight:"bold" }}>
                  Sort & Filter 
                </Typography>
                </Box>

                <Box sx={{ bgcolor:lime[50], borderTopRightRadius:"20px" , display:"flex" , justifyContent:"center" , alignItems:"center" }}>
                <Button sx={{ textTransform:"none"  }} size="large" onClick={filterHandler} disabled={ tdChecker ? false : rmdChecker ? false : wkChecker ? false : otherChecker ? false : descChecker? false : ascChecker ? false : recentAdded ? false : true }  >
                  <Typography variant={smbreak? "h5" : "h4"  } 
                  color="#696661" 
                  sx={{ fontWeight:"bold"}}>
                    Apply
                  </Typography>
                </Button>
                </Box>
              </Box>
              <Container fixed >
                <Typography 
                variant={smbreak? "h6" : "h4"}
                mt={2} 
                color="#808080" 
                sx={{ fontWeight:"bold" }}>
                  Sort by Catergory
                </Typography>

                <Grid container  columnSpacing={2} rowSpacing={2}  pt={2}  px={2} pb={1} >

                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Button 
                    variant='outlined' 
                    fullWidth={true} 
                    color={ tdChecker ? "todo" : "ordered" }  
                    disableElevation={true} 
                    endIcon={ <CheckCircleIcon  color={tdChecker ? "todo" : "ordered"  } /> } onClick={tdTrigger}  > 
                    <Typography 
                    variant='h6'  
                    color='todo' 
                    sx={{ fontWeight:"bold" }} >
                       Todo 
                    </Typography>
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Button 
                  variant='outlined' 
                  fullWidth={true}  
                  color={ rmdChecker ? "reminder" : "ordered"} 
                  disableElevation={true} endIcon={ <CheckCircleIcon   color={rmdChecker ? "reminder" : "ordered"  } /> } onClick={rmdTrigger} >
                     <Typography 
                     variant='h6' 
                     color='reminder' 
                     sx={{  fontWeight:"bold" }}>
                       Reminder 
                      </Typography>
                  </Button>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Button 
                  variant='outlined'  
                  fullWidth={true} 
                  color={ wkChecker ? "work" :"ordered"  }  disableElevation={true} endIcon={ <CheckCircleIcon  color={wkChecker ? "work" : "ordered"  } /> } onClick={wkTrigger} > 
                  <Typography  
                  variant='h6' 
                  color='work' 
                  sx={{  fontWeight:"bold" }}>
                     Work 
                  </Typography>
                  </Button>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Button 
                  variant='outlined'  
                  fullWidth={true}  
                  color={ otherChecker ? "other" :"ordered"  } disableElevation={true} endIcon={ <CheckCircleIcon  color={otherChecker ? "other" : "ordered"  } /> }  onClick={otherTrigger} >
                     <Typography 
                     variant='h6' 
                     color='other' 
                     sx={{  fontWeight:"bold" }}>
                      Other
                      </Typography>
                  </Button>
                  </Grid>

                </Grid>
                <br/>

                <Box sx={{ width:"65%" , borderStyle:"solid" , borderWidth:"1px" , borderColor:"#928E85", backgroundColor:"	#928E85" , borderRadius:"20px" , mx:"auto"}}></Box>
                <br/>

                <Typography 
                 variant='h4'
                 mt={2} 
                 color="#808080" 
                 sx={{ fontWeight:"bold" }}>
                  Order Title by
                </Typography>

                <Grid container  columnSpacing={2} rowSpacing={2} pt={2}  px={2} pb={2}>

                <Grid item xs={12} sm={6} md={6} lg={6}>

                    <Button 
                    variant='outlined' 
                    fullWidth={true} 
                    color={ascChecker? "primary":"ordered"  } endIcon={ascChecker?  <CheckCircleIcon /> : null } onClick={ascTrigger} >
                      <Typography variant='h6' >
                        Ascending
                      </Typography>
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Button 
                  variant='outlined' 
                  fullWidth={true} 
                  color={descChecker? "primary" :"ordered"  }  endIcon={descChecker?  <CheckCircleIcon /> : null } onClick={descTrigger} >
                    <Typography variant='h6'>
                      Descending
                    </Typography>
                  </Button>
                  </Grid>

                </Grid>
                <br/>

                <Box sx={{ width:"65%" , borderStyle:"solid" , borderWidth:"1px" , borderColor:"#928E85", backgroundColor:"	#928E85" , borderRadius:"20px" , mx:"auto"}}></Box>
                <br/>

                <FormControlLabel 
                label={ <Typography variant='h6' color='#808080'> Recently Added</Typography> } control={<Checkbox  disableRipple={true}  checked={recentAdded} onChange={handleCheck}/>}/>
                <br/>
                <br/>
                <Box sx={{ display:"flex" , justifyContent:"right"  }} >
                  <Button sx={{ textTransform:"none" , color:"black"}}  onClick={ResetAll}>
                    ResetAll
                  </Button>
                </Box>
              </Container>
        </Paper>
      </Modal>
      </ThemeProvider>
    </>
  )
}

export default SearchFilter