import React from 'react';
import {useState , useEffect} from "react" ;

import { Marker , Popup , useMap } from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";





interface position{
    lat : number,
    lng : number
}

interface UserProps {
    userPosition : (position : position )  => void;
}


export default function UserLocation(props : UserProps ){

    const [position, setPosition] = React.useState<position>({lat :33.58370903536546, lng :-7.603131517084162})
    const [bbox, setBbox] = useState([]);

    const map = useMap();
    const icon = L.icon({ iconUrl: "/icons/userLocation.svg",iconSize: [48, 48], });
    useEffect(() => {
      const {userPosition} = props;
      map.locate().on("locationfound", function (e : any) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        userPosition({lat : e.latlng.lat, lng : e.latlng.lng})
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