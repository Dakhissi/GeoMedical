import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
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
    isAdded: (isAdded: boolean) => void;
}

function NavBar(props :navBarProps) {

    //handle Filter
    const handleFilter = (selectedServiceTypes: string[]) => {
        console.log(selectedServiceTypes);
    }


  return (
    <AppBar 
    position="fixed"
    style={{ backgroundColor: '#E8A0BF',}}
    >
      <Container maxWidth="xl">
        <Toolbar style={{ backgroundColor: '#E8A0BF',}} disableGutters>
          <AddLocationIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
          >
            GeoMedical
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

          </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <Grid direction="row" container spacing={2}>
                    <Grid item><Filter selectedServicesTypes={handleFilter} /></Grid>
                    <Grid item><AddService /></Grid>
                </Grid>
            </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Grid direction="row" container spacing={2}>
                
                <Grid item><Filter selectedServicesTypes={handleFilter} /></Grid>
                <Grid item><AddService isAdded={()=>{props.isAdded(true)}} /></Grid>
            </Grid>      
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;