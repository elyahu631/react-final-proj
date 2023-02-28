import React from 'react'
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Box } from "@mui/system";




const center = { lat: 32.29, lng:  34.93, };


export default function CGoogleMap() {
    navigator.geolocation.getCurrentPosition(function (position) {
        center.lat =position.coords.latitude 
        center.lng=position.coords.longitude
      });

    return (
        <Box style={{ height: "100%", width: "100%" }}>
            <GoogleMap zoom={15}
                center={center}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                mapContainerClassName="map-container">
                <Marker  position={center}  />
            </GoogleMap>
        </Box>

    );
}
