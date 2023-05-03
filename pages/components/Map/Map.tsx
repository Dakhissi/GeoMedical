import { useEffect, useState } from 'react';
import { MapContainer , TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import UserLocation from './UserLocation';
import ServiceLocation from './ServiceLocation';
import Routing from './Routing';
const position = {lat :33.58370903536546, lng :-7.603131517084162}

interface position {
    lat : number,
    lng : number
}

interface mapProps{
    listServices : { 
        name: string,
        id: number,
        type: string,
        description: string,
        url: string,
        adresse: string,
        primaryPhone: string,
        secondaryPhone: string,
        email: string,
        webSite: string,
        otherContact: string,
        lat: string,
        lng: string,
        workHours: {
            monday: {
                openAt: string,
                closeAt: string
            },
            tuesday: {
                openAt: string,
                closeAt: string
            },
            wednesday: {
                openAt: string,
                closeAt: string
            },
            thursday: {
                openAt: string,
                closeAt: string
            },
            friday: {
                openAt: string,
                closeAt: string
            },
            saturday: {
                openAt: string,
                closeAt: string
            },
            sunday: {
                openAt: string,
                closeAt: string
            }
        }



    }[]
}

export default function Map(props : mapProps){  
    //list serice state
    const [listServices , setListServices] = useState(props.listServices);

    //decalre userPosition state
    const [userPosition , setUserPosition] = useState({lat :33.58370903536546, lng :-7.603131517084162});

    //declare servicePosition
    const [servicePosition , setServicePosition] = useState({lat :33.58370903536546, lng :-7.603131517084162});

    //get data from props
    useEffect(
        () => {
            setListServices(props.listServices);
        }
    )

    //console.log(listServices)

    //handleUserLocation
    const handleUserLocation = (position : position) => {
        setUserPosition(position);      
    }

    console.log(userPosition)

    return(
        <MapContainer
            style={{
                height: "100vh",
            }}
          center={position}
          zoom={13}
          scrollWheelZoom={true}>
            <UserLocation userPosition={handleUserLocation} />
            <Routing 
                userPosition={{
                    lat : 33.58370903536546,
                    lng : -7.603131517084162
                }}
                servicePosition={{
                    lat : 33.6128385537005,
                    lng : -7.514545619015777
                }}
            />
            {listServices.map((service) => {
                return (
                    <ServiceLocation service={service} />
                )
            }
            )}


          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      )
}