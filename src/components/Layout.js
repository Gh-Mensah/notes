import { AppBar, Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme} from '@mui/material'
import React, { useState } from 'react'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { Link } from 'react-router-dom';
import '../styles/Create.css'






function Layout({children}) {


    const theme= useTheme()
    const smbreak = useMediaQuery(theme.breakpoints.down('sm'))
    const mdbreak = useMediaQuery(theme.breakpoints.down('md'))
    const lgbreak = useMediaQuery(theme.breakpoints.down('lg'))
    const xlbreak = useMediaQuery(theme.breakpoints.up('lg'))

    let ResDrawer = ()=>{
        if(smbreak === true){
            return "50%"
        }
        if(mdbreak === true){
            return "40%"
        }
        if(lgbreak === true){
            return "30%"
        }
        if(xlbreak === true){
            return "20%"
        }
    }



  const [open,setOpen] =useState(false)

  return (
    <div>
        <AppBar sx={{backgroundColor :"#c68a54" , color:"white"}}  >
                <Toolbar>
                    <MenuTwoToneIcon fontSize='large' onClick={() => setOpen(true)}  sx={{ cursor:"pointer" }} />
                <Typography variant='h4' sx={{pl:1}}>
                    Notes
                </Typography>
                </Toolbar>
        </AppBar>
        <Toolbar/>
            <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}  PaperProps={{sx:{width:ResDrawer() ,display:"flex" ,flexDirection:"column" , justifyContent:"center",backgroundColor :"#c68a54"  }}} >
                       <Box  sx={{height:"20%" }} >
                       <List disablePadding sx={{ height:"100%" , display:"flex" , flexDirection:"column"}} >
                        <Link to="/create" className='location' onClick={ ()=>{ setOpen(false) }  } >
                            <ListItemButton disableGutters={true} >
                                <ListItemText primary={<Typography variant="h6" >Create Note</Typography>} sx={{pl: 1 , color:"white"}} />
                                <ListItemIcon>
                                    <AddCircleOutlineRoundedIcon sx={{fontSize:45 , color:"white" }} />
                                </ListItemIcon>
                            </ListItemButton>
                            </Link>
                            <Link to="/" className='location' onClick={ ()=>{ setOpen(false) }} >
                            <ListItemButton disableGutters={true} sx={{mt: 2}} >
                                <ListItemText primary={<Typography variant="h6" >View Notes</Typography>} sx={{pl: 1 , color:"white"}} disableTypography  />
                                <ListItemIcon>
                                    <ViewModuleRoundedIcon sx={{fontSize:45 , color:"white"}} />
                                </ListItemIcon>
                            </ListItemButton>
                            </Link>
                        </List>
                       </Box>
                    </Drawer>
                    <div>
                        {children}
                    </div>

    </div>
    
  )
}

export default Layout