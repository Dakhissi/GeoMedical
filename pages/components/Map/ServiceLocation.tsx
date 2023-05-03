import {useState , useEffect} from "react" ;

import { Marker , Popup  } from "react-leaflet";
import Rating from '@mui/material/Rating';
import {Card , Grid , Typography } from '@mui/material'

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import MoreDetails from "./MoreDetails";
import { popupHead , popupContent , popupText } from "../styles/PopUp";

interface position {
    lat : number,
    lng : number
}

export default function ServiceLocation(props:any){
    
    //declare position state
    const [position , setPosition] = useState<position | null>(null);

    //declare Service state
    const [service , setService] = useState(props.service.data.task);
    
    useEffect(() => {
        if (props.service) {
          setService(props.service.data.task);
          setPosition({ lat: +props.service.data.task.lat, lng: +props.service.data.task.lng });
        }
      }, [props.service.data.task]);

    const icon = L.icon({ iconUrl: "/icons/serviceLocation.svg",iconSize: [32, 32], });


    return position === null ? null : (
        <Marker position={position}  icon={icon}  >
          <Popup>
            <div style={popupContent} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                            <img
                            src={service.url}
                            height="150"
                             />
                    </Grid>
                    <Grid item xs={12}>
                        <div style={popupHead}>
                            <Typography variant="h6" component="div" gutterBottom>
                                {service.name}
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
                        <Rating disabled />
                        <br/>
                     <MoreDetails service={service} />
                     </Grid>
                </Grid>

                        
                        </div>
          </Popup>
        </Marker>
      );
}