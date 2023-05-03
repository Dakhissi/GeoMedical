import { Autocomplete, TextField } from "@mui/material";

//create auto complete for this list 

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

export default function ServiceTypes() {
    return (
        <>
        <Autocomplete
        options={serviceTypes}
        renderInput={(params) => <TextField {...params} label="Service Types" />}

        />
        </>
    )
}
