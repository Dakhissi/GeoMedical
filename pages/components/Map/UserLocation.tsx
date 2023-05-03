import {useState , useEffect} from "react" ;

import { Marker , Popup , useMap } from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";



interface UserLocationProps {
    userPosition : {
        lat : number,
        lng : number
    }
}



export default function UserLocation(props : UserLocationProps ){
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();
    const icon = L.icon({ iconUrl: "/icons/userLocation.svg",iconSize: [48, 48], });

    useEffect(() => {
      map.locate().on("locationfound", function (e : any) {
        setPosition(e.latlng);
        props.userPosition.lat = e.latlng.lat;
        props.userPosition.lng = e.latlng.lng;
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        //const circle = L.circle(e.latlng, radius);
        //circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
      
    }, [map]);

    return position === null ? null : (
        <Marker position={position}  icon={icon}  >
          <Popup>
            You are here. <br />
            Map bbox: <br />
            <b>Southwest lng</b>: {bbox[0]} <br />
            <b>Southwest lat</b>: {bbox[1]} <br />
            <b>Northeast lng</b>: {bbox[2]} <br />
            <b>Northeast lat</b>: {bbox[3]}
          </Popup>
        </Marker>
      );
}