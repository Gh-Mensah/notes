import { Avatar, Box, Button, Card, CardContent, CardHeader, Grid, IconButton, Modal, Paper,Typography,useMediaQuery, useTheme} from '@mui/material'
import { green, lime, purple, red, yellow } from '@mui/material/colors'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React, { useEffect, useState } from 'react'
import axios from 'axios';



function CardNotes({items,noteCreation,noteAlertII,newContent}) {


function CardColor(categoryValue){
  if(categoryValue === "work" ){
    return yellow
  }
  if(categoryValue === "reminder"){
    return green
  }
  if(categoryValue === "todo"){
    return red
  }
  if(categoryValue === "other"){
    return purple
  }

}




const [newlyCreated , setnewlyCreated]= useState(true)
const [open , setOpen ] = useState(noteCreation)
const [deleteVal , setDeletedVal]= useState(0)
const [newItemsContent , setNewItemsContent]= useState(null)






const handleNew = ()=>{
  setOpen(false)
  setnewlyCreated(false)
  noteAlertII(false)
}


const theme= useTheme()
  const smbreak = useMediaQuery(theme.breakpoints.down('md'))
  const mdbreak = useMediaQuery(theme.breakpoints.up('md'))

  let ResModal = ()=>{
    if(smbreak === true){
        return "90%"
    }
    if(mdbreak === true){
        return "60%"
    }
}

const deleteItem = (id)=>{
  const newCollection = items.filter((item)=> item.id !== id)
  setNewItemsContent(newCollection)
  axios.delete(`http://localhost:2500/notes/${id}`)
  setDeletedVal(id)
}

useEffect(()=>{
  newContent(newItemsContent)
},[deleteVal])




  return (
    <>
      {items &&
          items.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3}  key={item.id} >
          <Paper elevation={5}>
            <Card  sx={{ bgcolor:lime[50]}} >
              <CardHeader
              avatar={
                <Avatar  
                variant='rounded' 
                sx={{ bgcolor : CardColor(item.category)[800] }}>
                  {item.category[0].toUpperCase()}
                </Avatar>
              }
              title={
                <Typography 
                variant='h6'  
                align='center' 
                sx={{ color:"white" , textTransform:"capitalize" , wordWrap:"break-word" , fontFamily:'Varela Round' , fontWeight:"bold"}} 
                >
                  {item.title}
                </Typography>
              }
              action={
                <IconButton  onClick={()=> deleteItem(item.id) } >
                  <DeleteIcon/>
                </IconButton>
              }
              sx={{ bgcolor: CardColor(item.category)[700] }}
              />
                <CardContent >
                  <Typography variant='body1' 
                  align="center" 
                  pt={1}
                  sx={{
                    wordWrap:"break-word",
                    fontFamily:'Varela Round'
                  }}

                  >
                    {item.description}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Box sx={{ display:"flex" , justifyContent:"flex-end"}} >
                    <Typography 
                    variant='caption' 
                    align='right' >
                      {item.date}
                    </Typography>
                  </Box>
                </CardContent>
            </Card>
          </Paper>
        </Grid>
          ))}
          {
          newlyCreated ?
          <Modal
          open={open} 
          disableAutoFocus={true}
          sx={{ display:"flex" , justifyContent:"center", flexDirection:"column" , alignItems:"center" }}
          >
            <Paper elevation={2} sx={{ width:ResModal() , borderRadius:"55px" , backgroundColor:"#FEFEFA"}} >
            <Box sx={{  display:"flex" , justifyContent:"center" , flexDirection:"column", backgroundColor:"#FEFEFA",  borderRadius:"55px" }} >
              <Box sx={{ justifyContent:"center" , display:"flex"  }}>
                <CheckCircleRoundedIcon color='success' sx={{ fontSize:"15em"}}  />
              </Box>
              <Box sx={{ justifyContent:"center" , display:"flex"  }}>
                <Typography variant='h4' 
                textAlign='center' 
                sx={{ fontWeight:"bolder" }}>
                  Note created successfully
                  </Typography>
              </Box>
              <br/>
              <br/>
              <Box sx={{ justifyContent:"center" , display:"flex"}}>
                <Button onClick={handleNew}  
                endIcon={<ArrowForwardIcon/>} 
                sx={{paddingBottom:"20px"}} 
                color="secondary"
                disableRipple={true}
                >
                  <Typography 
                  variant='h5' 
                  textAlign='center' 
                  sx={{textTransform:"none" ,fontWeight:"bolder" }}>
                    View Notes
                  </Typography>
                </Button>
              </Box>
              </Box>
            </Paper>
          </Modal> : null }
    </>
  )
}

export default CardNotes