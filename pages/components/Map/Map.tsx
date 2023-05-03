import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import UserLocation from './UserLocation';
import ServiceLocation from './ServiceLocation';
const position = {lat :33.58370903536546, lng :-7.603131517084162}


// const defaultService ={
//     name: '',
//     type: '',
//     description: '',
//     url: 'https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
//     adresse: '',
//     primaryPhone: '',
//     secondaryPhone: '',
//     email: '',
//     webSite: '',
//     otherContact:'',
//     lat:'',
//     lng:'',
//     workHours: {
//     }

// }

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
    //get data from props
    useEffect(
        () => {
            setListServices(props.listServices);
        }
    )

    console.log(listServices)

    return(
        <MapContainer
            style={{
                height: "100vh",
            }}
          center={position}
          zoom={13}
          scrollWheelZoom={true}>
            <UserLocation />
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