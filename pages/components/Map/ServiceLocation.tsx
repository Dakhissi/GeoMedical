import {useState , useEffect} from "react" ;
import React from 'react';
import { Marker , Popup  } from "react-leaflet";
import Rating from '@mui/material/Rating';
import {Box , Grid , IconButton, Typography } from '@mui/material'
import Image from "next/image";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import MoreDetails from "./MoreDetails";
import { popupHead , popupContent , popupText } from "../styles/PopUp";
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
interface position {
    lat : number,
    lng : number
}

export default function ServiceLocation(props:any){

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

      const [value, setValue] = React.useState<number | null>(2);
        const [hover, setHover] = React.useState(-1);
    
    //declare position state
    const [position , setPosition] = useState<position | null>(null);

    //declare Service state
    const [service , setService] = useState(props.service.data.task);

    //handleDirection
    const handleDirection = (position : {lat:number,lng:number}) => {
        props.handleDirection(position);
    }

    
    useEffect(() => {
        if (props.service) {
          setService(props.service.data.task);
          setPosition({ lat: +props.service.data.task.lat, lng: +props.service.data.task.lng });
        }
      }, [props.service]);

    const icon = L.icon({ iconUrl: "/icons/serviceLocation.svg",iconSize: [32, 32], });


    return position === null ? null : (
        <Marker position={position}  icon={icon}  >
          <Popup>
            <div style={popupContent} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                            <Image
                            src={service.url}
                            height="100"
                            alt={service.name}
                             />
                    </Grid>
                    <Grid item xs={12}>
                        <div style={popupHead}>
                            <Typography variant="h6" component="div" gutterBottom>
                                {service.name}
                            </Typography>
                            <Typography variant="body2"component="div" gutterBottom>
                                <IconButton color='info' onClick={
                                    () => handleDirection({lat:+service.lat,lng:+service.lng})
                                } size="large" > <AssistantDirectionIcon /></IconButton>
                            </Typography>
                            
                        </div>
                    
                    </Grid>
                    <Grid item xs={12}>
                        <div style={popupText}>
                        <Typography variant="body2" component="div" gutterBottom>
                            {service.adresse}
                        </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                    <div style={popupText}> 
                        <Typography variant="body2" component="div" gutterBottom>
                            {service.primaryPhone}
                        </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
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
                                />
                            </Box>

                        <br/>
                     <MoreDetails service={service} />
                     </Grid>
                </Grid>

                        
                        </div>
          </Popup>
        </Marker>
      );
}