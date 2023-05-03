import { Grid, TextField, Typography , Button, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface WorkHoursProps {
    workingHours: (workingHours: any) => void;
}

export default function WorkHours(props :WorkHoursProps ){

    type WorkingHours = {
        [key: string]: {
            openAt?: string;
            closeAt?: string;
        };
      };

    const [workingHours , setWorkingHours] = useState<WorkingHours>({
        Monday: {
            openAt: "9:00",
            closeAt: "17:00"
        },
        Tuesday: {
            openAt: "9:00",
            closeAt: "17:00"
        },
        Wednesday: {
            openAt: "9:00",
            closeAt: "17:00"
        },
        Thursday: {
            openAt: "9:00",
            closeAt: "17:00"
        },
        Friday: {
            openAt: "9:00",
            closeAt: "17:00"
        },
        Saturday: {
            openAt: "9:00",
            closeAt: "17:00"
        },
        Sunday: {
            openAt: "9:00",
            closeAt: "17:00"
        },
    });

    const [open, setOpen] = useState(false);

    //handleOpen
    const handleOpen = () =>{
        setOpen(true);
    }

    //handleClose
    const handleClose = () =>{
        setOpen(false);
    }

    //handle Save
    const handleSave = () =>{
        props.workingHours(workingHours);
        handleClose()
    }
    

    return(<>
     <Button onClick={handleOpen} fullWidth variant='outlined' >Edit Working Hours</Button>
     <Dialog open={open} onClose={handleClose} >
        <DialogTitle>
            <Typography variant='h6'>Working Hours</Typography>
        </DialogTitle>
        <DialogContent>
                    <Grid container spacing={2}>
                {
                    Object.keys(workingHours).map((day:string) =>(
                        <Grid item xs={12} md={6} key={day}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant='h6'>{day}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="Open At"
                                            value={dayjs(workingHours[day].openAt, 'HH:mm')}
                                            onChange={(newValue: Dayjs | null) => {
                                                setWorkingHours({...workingHours, [day]: {...workingHours[day], openAt: newValue?.format('HH:mm')}})
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="Close At"
                                            value={dayjs(workingHours[day].closeAt, 'HH:mm')}
                                            onChange={(newValue: Dayjs | null) => {
                                                setWorkingHours({...workingHours, [day]: {...workingHours[day], closeAt: newValue?.format('HH:mm')}})
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Grid>
                    ))

                }
                </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} variant='outlined' >Cancel</Button>
            <Button onClick={handleSave} variant='outlined' >Save</Button>
        </DialogActions>
     </Dialog>
    

    </>)
}