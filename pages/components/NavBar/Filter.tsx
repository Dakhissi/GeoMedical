import React from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { IconButton } from '@mui/material';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import {Menu , Grid} from '@mui/material';
import {Autocomplete , TextField} from '@mui/material';

interface FilterProps {
    selectedServicesTypes: (selectedServiceTypes: any) => void;
}

export default function Filter(props :FilterProps){

    const serviceTypes = [
        'Primary Care',
        'Urgent Care',
        'Emergency Care',
        `Women's Health Care `,
        'Mental Health Care',
        'Pediatrics',
        'Geriatrics',
        'Holistic Medicine',
        'Chiropractic Care',
        'Integrative Medicine',
        'Dentistry',
        'Optometry',
        'Pharmacy',
        'Physical Therapy',
        'Occupational Therapy',
        'Speech Therapy',
        'Audiology',
        'Podiatry',
        'Acupuncture',
        'Massage Therapy',
        'Nutrition',
        'Fitness',
        'Health Coaching'
    ]

    //declare open state
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    //declare selected servicesType state
    const [selectedServiceTypes, setSelectedServiceTypes] = React.useState<string[]>([]);

    //handleServiceTypeCheck
    const handleServiceTypeCheck = (event:any) => {
        const option = event.target.value;
        let newSelectedServiceTypes = [...selectedServiceTypes];
        if (event.target.checked) {
          newSelectedServiceTypes.push(option);
        } else {
          newSelectedServiceTypes = newSelectedServiceTypes.filter((type) => type !== option);
        }
        setSelectedServiceTypes(newSelectedServiceTypes);
        props.selectedServicesTypes(newSelectedServiceTypes);
    
      };



    return(<>
    <IconButton onClick={handleClick} color='inherit' >
        <FilterAltIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
    </IconButton>
     <Menu anchorEl={anchorEl}
        open={open}
        onClose={handleClose} 
        PaperProps={{  
            style: {  
              width: 350,  
            }}}
            >
            <Autocomplete
            options={serviceTypes}
            renderInput={(params) => <TextField {...params} label="Service Types" />}
            renderOption={(props, option) => (
                <li {...props}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Switch
                                checked={selectedServiceTypes.includes(option)}
                                onChange={handleServiceTypeCheck}
                                value={option}
                                color="primary"
                                inputProps={{ 'aria-label': 'controlled' }}
                                />
                        </Grid>
                        <Grid item xs>
                            {option}
                        </Grid>
                    </Grid>
                </li>
            )}

            />
     </Menu>





        
    </>)
}