import {useState , useEffect} from "react" ;

import { Marker , Popup , useMap } from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";





export default function UserLocation(){
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();
    const icon = L.icon({ iconUrl: "/icons/userLocation.svg",iconSize: [48, 48], });

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
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