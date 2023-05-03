//create more details component

import { useEffect, useState } from "react";

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {Card , Grid , Typography ,Button , Dialog , DialogTitle , DialogContent , TextField,Divider} from '@mui/material'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


interface MoreDetailsProps {
    service: any;
}

export default function MoreDetails(props: MoreDetailsProps) {
    
        //declare Service state
        const [service, setService] = useState(props.service);

        useEffect(
            () => {
                setService(props.service);
            }
        )
    
        //declare open state 
        const [open, setOpen] = useState(false);
    
        //handleOpen
        const handleOpen = () => {
            setOpen(true);
        }
    
        //handleClose
        const handleClose = () => {
            setOpen(false);
        }


    
       
        return(<>

            <Button variant="contained" color='info' onClick={handleOpen}>More Details</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>More Details</DialogTitle>
                <br/>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Service Name"
                                variant="outlined"
                                value={service.name}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Service Adresse"
                                variant="outlined"
                                value={service.adresse}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                fullWidth
                                label="Service Description"
                                variant="outlined"
                                value={service.description}
                                disabled
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Service Primary Phone"
                                variant="outlined"
                                value={service.primaryPhone}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Service Secondary Phone"
                                variant="outlined"
                                value={service.secondaryPhone}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="Service Email"
                                variant="outlined"
                                value={service.email}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Service Website"
                                variant="outlined"
                                value={service.website}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12} ><Divider/></Grid>
                        <Grid item xs={12} >
                            <Typography variant='h5'>Working Hours</Typography>
                            {
                                Object.keys(service.workHours).map((day: string) => (
                                    <Grid container spacing={2} key={day}>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant='h6'>{day}</Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant='h6'>{service.workHours[day].openAt} - {service.workHours[day].closeAt}</Typography>
                                        </Grid>
                                    </Grid>
                                ))
                            }
                            </Grid>




            </Grid>
                </DialogContent>
            </Dialog>



        
        </>)
    }
