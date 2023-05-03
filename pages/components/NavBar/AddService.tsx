import React from 'react';
import { useState } from 'react';

import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, TextField , Box} from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import AddIcon from '@mui/icons-material/Add';
import ServiceTypes from './ServiceTypes';
import WorkHours from './WorkHours';
import createData from '../../api/createData';


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



export default function AddService(props :any){

    const [open, setOpen] = useState(false);

    const defaultService ={
        name: '',
        type: '',
        description: '',
        url: 'https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
        adresse: '',
        primaryPhone: '',
        secondaryPhone: '',
        email: '',
        webSite: '',
        otherContact:'',
        lat:'33.58370903536546',
        lng:'-7.603131517084162',
        workHours: {
        }

    }

    const [newService , setNewService] = useState(defaultService)

    //handleOpen
    const handleOpen = () =>{
        setOpen(true);
    }

    //handleClose
    const handleClose = () =>{
        setOpen(false);
    }

    //handleInputChange
    const handleInputChange = (e:any) =>{
        const {name, value} = e.target
        setNewService({...newService, [name]: value})
    }

    //handleWorkingHours
    const handleWorkingHours = (val:any) =>{
        setNewService({...newService, workHours: val})
    }

    console.log(newService);

    const requestParams = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: newService }),
      };

    const  addService = async ()=>{
        await fetch("../api/createData", requestParams)
        .then((res) => res.json())
        .then((data) => {
            console.log("data", data);
            }
        );
    }
    
    const handleSubmit = () =>{
        addService();
        handleClose();
        props.isAdded(true);
    }
      

    return(<>
    <IconButton onClick={handleOpen} color='inherit' ><AddLocationAltIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /></IconButton>
        <Dialog 
        open={open} 
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted 
        fullScreen>
            <DialogTitle>
                {"Add Service"}
            </DialogTitle>
            <DialogContent>
               <Grid spacing={2} container >
                    <Grid item xs={8} container spacing={2} >
                            <Grid item xs={12} md={6} >
                                <TextField fullWidth onChange={handleInputChange} name='name' type="text" placeholder=" Name" />
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <ServiceTypes />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth onChange={handleInputChange} name='description' multiline rows={3} type="text" placeholder=" Description" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth onChange={handleInputChange} name='url' type="text" placeholder="Picture URL " />
                            </Grid>
                            <Grid item xs={12}><Divider/></Grid>
                            <Grid item xs={12} >
                                <TextField fullWidth onChange={handleInputChange} name='adresse' type="text" placeholder="Address" />
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <TextField fullWidth onChange={handleInputChange} name="primaryPhone" type="text" placeholder="primary Phone" />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth onChange={handleInputChange} name="SecondaryPhone" type="text" placeholder="Secondary Phone" />
                            </Grid>
                            
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth onChange={handleInputChange} name="email" type="text" placeholder=" Email" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth onChange={handleInputChange} name="webSite" type="text" placeholder="Web Site" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth onChange={handleInputChange} name="otherContact" type="text" placeholder="Other Contact" />
                            </Grid>

                            <Grid item xs={12}><Divider/></Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth value={newService.lat} onChange={handleInputChange} name="lat" type="text" placeholder=" Latitude" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth value={newService.lng} onChange={handleInputChange} name="lng" type="text" placeholder=" Longitude" />
                            </Grid>
                    </Grid>
                    <Grid item xs={4} container spacing={2} >
                        <Grid item xs={12} >
                        <Box
                            component="img"
                            sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            }}
                            src={newService.url}
                        />
                        </Grid>
                        <Grid item xs={12}>
                           <WorkHours workingHours={handleWorkingHours} />
                        </Grid>
                    </Grid>
                </Grid> 
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={handleClose} >Close</Button>
                <Button variant='contained' onClick={handleSubmit} endIcon={<AddIcon/>} >Submit</Button>
            </DialogActions>
        </Dialog>
    </>)
}