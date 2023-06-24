import { Button, Container, Radio, Typography,Box,TextField} from '@mui/material'
import React, { useRef, useState } from 'react'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Createnotes({onCreate}) {
    const[selectedValue,setSelector] = useState("todo")
    const[titleHolder, setTitle] = useState("")
    const[detailsHolder, setDetails] = useState("")
    const[evalCheckTitle, setCheckTitle] = useState(false)
    const[evalCheckDetails, setCheckDetails] = useState(false)



    const nameForm= useRef()
    const nav= useNavigate()

    const goDate = ()=>{
        const date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        let currentDate = `${year}-${month}-${day}`

        return currentDate
    }

    const uniqueNum = ()=>{
        return Math.floor(Date.now() * Math.random())
    } 


    const handleSubmit =  async (e)=>{
        e.preventDefault()
        
        const detailed= nameForm.current

        

        if( detailed['title'].value != 0 &&  detailed['details'].value != 0 ){

            onCreate(true)
            
            //send data
            await axios.post('http://localhost:2500/notes', {
                id:uniqueNum(),
                title:titleHolder.toLowerCase(),
                description:detailsHolder,
                category:selectedValue,
                date:goDate(),
                hours:Date.now()
            }).then(nav('/'))
            

            console.log("Validated");
        }else{
            if(detailed['title'].value == 0){
                setCheckTitle(true)
            }else{
                setCheckTitle(false)
            }
            if(detailed['details'].value == 0 ){
                setCheckDetails(true)
            }else{
                setCheckDetails(false)
            }


        }
        console.log(`Title (${detailed['title'].value})..// Details( ${detailed['details'].value})../// category ${selectedValue} `);
        
    }


    const titleHandler = (e)=>{
        setTitle(e.target.value)
    }

    const detailsHandler = (e)=>{
            setDetails(e.target.value)
    }

    const handleSelector = (e)=>{
        setSelector(e.target.value)
    }

   

    const handleCategoryOther = ()=>{
        setSelector("other")
    }

    const handleCategoryWork = ()=>{
        setSelector("work")
    }

    const handleCategoryReminder = ()=>{
        setSelector("reminder")
    }

    const handleCategoryTodo = ()=>{
        setSelector("todo")
    }


  return (
    <>
    <Container fixed sx={{mt:2}}>
            <form  onSubmit={handleSubmit} ref={nameForm} >
                <Box 
                sx={{display:"flex" ,flexDirection:"column" }}>
                    <Typography variant='h4' color="primary">Title{evalCheckTitle ? "*" : "" }</Typography>
                    <TextField placeholder='Please enter topic..'  onChange={titleHandler} value={titleHolder} name="title"  error={ evalCheckTitle ? true : false }  inputProps={{maxLength : 25}} />
                    <Typography variant='h4' sx={{ mt:1 }}  color="primary" >Notes{evalCheckDetails === true ? "*" : "" }  </Typography >
                    <TextField multiline={true} rows={"4"} placeholder='Please enter details on note...'  onChange={detailsHandler} value={detailsHolder} name="details"  error={ evalCheckDetails ? true : false } inputProps={{maxLength : 100 ,  rows : 2 , cols: 10}} />
                </Box>

                <Box sx={{ display:"flex" ,flexDirection:"column" , mt:1, justifyContent:"end" }}>
                    <Typography 
                    variant='h4' 
                    color="primary"
                    >
                    Catergory
                    </Typography>
                    
                    <Button 
                    variant='outlined' 
                    sx={{display:"flex" , justifyContent:"space-between" , width:"55%"}} 
                    onClick={handleCategoryTodo}  
                    color={ selectedValue === "todo" ? "todo":"primary"} >
                        <Typography 
                        color="primary" >
                            Todo
                        </Typography>
                        <Radio  
                        checked={selectedValue === "todo"} 
                        onChange={handleSelector} 
                        value="todo" 
                        color="todo" 
                        name="category"  />
                    </Button>
                    
                    <Button 
                    variant='outlined' 
                    sx={{display:"flex" , justifyContent:"space-between" , width:"55%", mt:1}} 
                    onClick={handleCategoryReminder} 
                    color={ selectedValue === "reminder" ? "reminder":"primary"} >
                        <Typography 
                        color="primary">
                            Reminder
                        </Typography>
                        <Radio 
                        checked={selectedValue === "reminder"} 
                        onChange={handleSelector} 
                        value="reminder" 
                        color="reminder" 
                        name="category"/>
                    </Button>

                    <Button 
                    variant='outlined' 
                    sx={{display:"flex" , justifyContent:"space-between" , width:"55%", mt:1}}  
                    onClick={handleCategoryWork} 
                    color={ selectedValue === "work" ? "work":"primary"}>
                        <Typography 
                        color="primary">
                            Work
                        </Typography>
                        <Radio 
                        checked={selectedValue === "work"} 
                        onChange={handleSelector} 
                        value="work" 
                        color="work" 
                        name="category"/>
                    </Button>

                    <Button 
                    variant='outlined' sx={{display:"flex" , justifyContent:"space-between" , width:"55%", mt:1}}   
                    onClick={handleCategoryOther} 
                    color={ selectedValue === "other" ? "other":"primary"} >
                        <Typography 
                        color="primary">
                            Other
                        </Typography>
                        <Radio 
                        checked={selectedValue === "other"} 
                        onChange={handleSelector} 
                        value="other" 
                        color="other" 
                        name="category"  />
                    </Button>
                    
                </Box>

                <Box sx={{ display:"flex", mt:1, mb:1 , justifyContent:"end" }}>
                    <Button variant='contained' size='medium' sx={{width:"30%" , height:"5.5em" }} endIcon={<AddBoxOutlinedIcon sx={{color:"white" , marginLeft:"-7px"}}  />} color={selectedValue}  disableElevation={true} type="submit" >
                        <Typography 
                        sx={{ color:"white" , fontWeight:"bold"}} 
                        variant="subtitle" >
                            Create
                        </Typography>
                        </Button>
                </Box>
            </form>
    </Container>
    </>
  )
}

export default Createnotes