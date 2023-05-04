import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AddService from './AddService';
import Filter from './Filter';
import { Grid } from '@mui/material';


  
interface navBarProps{
    isAdded: (isAdded: boolean) => void,
    selectedServicesTypes: (selectedServiceTypes: any) => void;
}

function NavBar(props :navBarProps) {

    //handle Filter
    const handleFilter = (selectedServiceTypes: string[]) => {
        props.selectedServicesTypes(selectedServiceTypes);
    }


  return (
    <AppBar 
    position="fixed"
    style={{ backgroundColor: '#E8A0BF',}}
    >
      <Container maxWidth="xl">
        <Toolbar style={{ backgroundColor: '#E8A0BF',}} disableGutters>
          <Grid container spacing={2} alignItems="center" >
            <Grid item  xs={12} md={2} >
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              ><AddLocationIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                GeoMedical
              </Typography>
              </Grid>
              <Grid item  xs={12} md={8} > 
              <Box sx={{ flexGrow: 0 }} style={{ display: "flex", alignItems: "center" }} >      
                <Filter selectedServicesTypes={handleFilter} />
                <AddService isAdded={()=>{props.isAdded(true)}} />
                </Box>
              </Grid>
            </Grid>



        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;