import React from 'react';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import {Autocomplete , TextField, Grid} from '@mui/material';

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

interface FilterProps {
    selectedServicesTypes: (selectedServiceTypes: any) => void;
    
}

interface AutocompleteProps  {
    renderInput: any;
    renderOption: any;
    options: any;
    fullWidth: boolean;
}

interface TextFieldProps  {
    label: string;
}



const StyledTextField : React.FC<TextFieldProps > = styled(TextField)<TextFieldProps>`
  "& label, & label.Mui-focused": {
    color: "white"
  }
}`;


const CssTextField: React.FC<AutocompleteProps> = styled(Autocomplete)<AutocompleteProps>`
  & label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
    "& label, & label.Mui-focused": {
      color: "white"
    },
    ".MuiInputBase-input " : {
      height: "20px !important"
    }
  },
`;


export default function Filter(props :FilterProps ){

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
 
            <CssTextField
            fullWidth
            options={serviceTypes}
            renderInput={(params : any) => <StyledTextField {...params} label="Service Types" />}
            renderOption={(props :any , option : any) => (
                <li {...props}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Switch
                                checked={selectedServiceTypes.includes(option )}
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

        
    </>)
}