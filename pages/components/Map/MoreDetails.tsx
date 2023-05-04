//create more details component
import React from 'react';
import { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import { Box ,Grid , Typography ,Button , Dialog , DialogTitle , DialogContent , TextField,Divider} from '@mui/material'
import StarIcon from '@mui/icons-material/Star';


interface MoreDetailsProps {
    service : {
        name: string,
        id: number,
        type: string,
        description: string,
        url: string,
        adresse: string,
        primaryPhone: string,
        secondaryPhone: string,
        email: string,
        webSite: string,
        otherContact: string,
        lat: string,
        lng: string,
        workHours: any,
        rating: number | null
    }
}



export default function MoreDetails(props: MoreDetailsProps) {

    const labels: { [index: string]: string } = {
        0.5: 'Poor ',
        1: 'Poor +',
        1.5: 'Below Average',
        2: 'Below Average+',
        2.5: 'Average',
        3: 'Average +',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Exceptional',
      };
    
      function getLabelText(value: number) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
      }

        const [service, setService] = useState(props.service);

        const [value, setValue] = React.useState<number | null>(2);
        const [hover, setHover] = React.useState(-1);

        useEffect(
            () => {
                setService(props.service);
            },
            [props.service]
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

        //handleRating
        const handleRating = (event: React.ChangeEvent<{}>, newValue: number | null) => {
            setValue(newValue);
            setService({...service , rating : newValue});
            //console
            console.log(service);
          }

     
        return(<>

            <Button variant="contained"  onClick={handleOpen}>More Details</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>More Details</DialogTitle>
                <br/>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}  >
                            <TextField
                                fullWidth
                                label="Service Name"
                                variant="outlined"
                                value={service.name}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} md={6}  >
                            <TextField
                                fullWidth
                                label="Service Type"
                                variant="outlined"
                                value={service.type}
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
                                value={service.webSite}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} >
                        <Box
                            sx={{
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                            <Rating 
                                name="hover-feedback"
                                value={service.rating}
                                precision={0.5}
                                getLabelText={getLabelText}
                                onChange={handleRating}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {value !== null && (
                                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                )}
                            </Box>
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
