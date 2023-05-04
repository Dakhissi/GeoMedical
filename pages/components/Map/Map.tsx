import React from 'react';
import { useEffect, useState } from 'react';
import { MapContainer , TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import UserLocation from './UserLocation';
import ServiceLocation from './ServiceLocation';
import Routing from './Routing';
import dynamic from 'next/dynamic';
const position = {lat :33.58370903536546, lng :-7.603131517084162}

interface position {
    lat : number,
    lng : number
}
//Dynamic Routing
const DynamicRouting = dynamic(() => import('./Routing'),{ssr: false});

interface mapProps{
    listServices : {
        ts: number,
        data: {
            task:{
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
            }
        }
    }[]
}
//
export default function Map(props : mapProps){  
    //list serice state
    const [listServices , setListServices] = useState(props.listServices);

    const [inBrowser , setInBrowser] = useState(false);


    //decalre userPosition state
    const [userPosition , setUserPosition] = React.useState<position >({
        lat : 0, lng :0
    })

    //declare servicePosition
    const [servicePosition , setServicePosition] = React.useState<position>({lat :0, lng :0})

    //get data from props
    useEffect(
        () => {
            setListServices(props.listServices);
        },
        [props.listServices]
    )

    //handleUserLocation
    const handleUserLocation = (position : position) => {
        setUserPosition(position);      
    }

    //handleDirection
    const handleDirection = (position : position) => {
        setServicePosition(position);
    }


    return(<div >
        <MapContainer
            style={{
                height: "100vh",
            }}
          center={position}
          zoom={13}
          scrollWheelZoom={true}>
            <UserLocation userPosition={handleUserLocation} />
            <DynamicRouting 
                userPosition={userPosition}
                servicePosition={servicePosition}
            /> 
            {listServices.map((service) => {
                return (
                    <ServiceLocation 
                        key={service.ts}
                        handleDirection={handleDirection}
                     service={service} />
                )
            }
            )}


          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
        </div>
      )
}