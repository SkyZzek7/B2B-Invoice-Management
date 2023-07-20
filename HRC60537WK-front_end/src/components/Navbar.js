import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Grid} from '@material-ui/core';
import Box from '@material-ui/core/Box';
//import Edit from "./Edit";
// import Add from "./Add";


 const Navbar = () => {

  return (
    
            <Grid container justifyContent="flex-start" alignItems='flex-end' style={{height:'70px', backgroundColor:'#283d4a', paddingBottom:'16px'}}>
              <Grid item xs={5} > 
              <Button variant='contained' color='primary' style={{margin:'4px'}}>PREDICT</Button>
              <Button variant='outlined' color='primary' style={{margin:'4px'}}>ANALYTICS VIEW</Button>
              <Button variant='outlined' color='primary' style={{margin:'4px'}}>ADVANCE SEARCH</Button>
              </Grid>

              <Grid item xs={3}>
              <TextField label="Search Customer ID" size="small" variant="filled"
              style={{backgroundColor:'white', borderRadius:'10px'}}/>             
              </Grid>

              <Grid item xs={4}>
                {/* <Box component="span" sx={{ p: 1, border: '0px' }}><Button variant='outlined' color='primary'>ADD</Button></Box> */}
                
              {/* <Add/> */}
              <Button variant='outlined' color='primary'>ADD</Button>
              <Box component="span" style={{ margin:'4px'}}><Button variant='outlined' color='primary'>EDIT</Button></Box>
              {/* <Edit/> */}
              <Box component="span" style={{ margin:'4px'}}><Button variant='outlined' color='primary'>DELETE</Button></Box>
              </Grid>
            </Grid>
  )
}
export default Navbar;