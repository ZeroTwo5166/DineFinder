import { UserLocationContext } from '@/context/UserLocationContext'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import React, { useContext, useEffect, useState } from 'react'
import Markers from './Markers'
import { SelectedBusinessContext } from '@/context/SelectedBusinessContext'

const GoogleMapView = ({businessList}) => {
  const {userLocation,setUserLocation} = useContext(UserLocationContext);
  const {selectedBusiness, setSelectedBusiness} = useContext(SelectedBusinessContext)
  const [map,setMap] = useState();


  const mapContainerStyle={
    width:"100%",
    height:"95vh" //70vh
  }

  useEffect(()=>{

    if(map&&selectedBusiness){
      map.panTo(selectedBusiness.geometry.location)
    }
  }, [selectedBusiness])


  return (
    <div>
      <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
      mapIds={["c32375f1c7e51ea5"]}
      >
        <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={!selectedBusiness.name?userLocation:selectedBusiness.geometry.location}
        options={{mapId:"c32375f1c7e51ea5"}}
        zoom={13}
        onLoad={map=>setMap(map)}
        >
          <MarkerF
          position={userLocation}
          icon={{
            url:"/user-location.png",
            scaledSize:{
              width:50,
              height:50
            }
          }}/>
          {businessList.map((item,index)=>index<=7&&(
                <Markers business={item} key={index}/>
              ))}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default GoogleMapView