import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";


L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
  });

  interface RoutingEnds  {
    userPosition : {
        lat : number,
        lng : number
    },
    servicePosition : {
        lat : number,
        lng : number
  }
} 



const Routing = ({ userPosition , servicePosition} : RoutingEnds ) => {
    const map = useMap();
    console.log("servicePosition :", servicePosition);
    useEffect(() => {
    if (!map) return;
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(parseFloat(userPosition.lat.toString()), parseFloat(userPosition.lng.toString())),
        L.latLng(parseFloat(servicePosition.lat.toString()), parseFloat(servicePosition.lng.toString()))
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: "#F97B22", weight: 4 }],
        extendToWaypoints: true,
        missingRouteTolerance: 10
      },
      show: true,
      showAlternatives: false,
      addWaypoints: true,
      fitSelectedRoutes: true
    }).addTo(map);

    return () => {map.removeControl(routingControl);}
  }, [map, userPosition, servicePosition]);

  return null;
};

export default Routing;