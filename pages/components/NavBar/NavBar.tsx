import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {Stack }from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddService from './AddService';
import CurrentLocation from './CurrentLocation';
import Filter from './Filter';
import { Grid } from '@mui/material';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));




  
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