import {useState , useEffect} from "react" ;

import { Marker , Popup  } from "react-leaflet";

import {Card , Grid , Typography ,Button , CardContent , CardActions} from '@mui/material'

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import MoreDetails from "./MoreDetails";


export default function ServiceLocation(props:any){
    const [position, setPosition] = useState(null);
    //declare Service state
    const [service , setService] = useState(props.service.data.task);
    
    useEffect(() => {
        if (props.service) {
          setService(props.service.data.task);
          setPosition({ lat: props.service.data.task.lat, lng: props.service.data.task.lng });
        }
      }, [props.service.data.task]);

    const icon = L.icon({ iconUrl: "/icons/serviceLocation.svg",iconSize: [32, 32], });


    return position === null ? null : (
        <Marker position={position}  icon={icon}  >
          <Popup>
            <Card >
                <CardContent>

                
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" component="div" gutterBottom>
                            {service.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="div" gutterBottom>
                            {service.adresse}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="div" gutterBottom>
                            {service.primaryPhone}
                        </Typography>
                    </Grid>
                </Grid>
                </CardContent>
                <CardActions>
                        <MoreDetails service={service} />
                </CardActions>
            </Card>
          </Popup>
        </Marker>
      );
}