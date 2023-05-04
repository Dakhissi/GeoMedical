import { useState , useEffect } from "react";

import NavBar from "./NavBar/NavBar"

import dynamic from "next/dynamic"
const DynamicMap = dynamic(() => import("./Map/Map"),{
    ssr: false
});

export default function Main(){
    const [listServices , setListServices] = useState<{
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
    }[]>([]);

    async function fetchData(){
        const res = await fetch("../api/getData");
        const newData = await res.json();
        setListServices(newData);
    }

    useEffect(() => {
        fetchData();
    },[])

    const handleUpdateListServices = () =>{
            fetchData();
    }
    const handleFilter = (selectedServicesTypes: string[]) => {
        if (selectedServicesTypes.length === 0) {
          fetchData();
        } else {
            const initialListServices = listServices;
          const newList = initialListServices.filter(service =>
            selectedServicesTypes.includes(service.data.task.type)
          );
          setListServices(newList);
        }
    
      };

    return(<>
    <NavBar selectedServicesTypes={handleFilter} isAdded={handleUpdateListServices} />
    <DynamicMap listServices={listServices} />
    </>)
}