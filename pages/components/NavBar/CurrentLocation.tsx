import React from 'react';

import MyLocationIcon from '@mui/icons-material/MyLocation';
import { IconButton } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle , Button} from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function CurrentLocation(){

    const [open, setOpen] = React.useState(false);

    //handleOpen
    const handleOpen = () =>{
        setOpen(true);
    }

    //handleClose
    const handleClose = () =>{
        setOpen(false);
    }


    return(<>
       <IconButton onClick={handleOpen} color='inherit' ><MyLocationIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /></IconButton> 
       <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color="inherit" >{"Detect your Location Auto?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let GeoMedical determine your location. This means sending anonymous
            location data the App, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>)
}