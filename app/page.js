"use client"
import GlobalApi from "@/Shared/GlobalApi";
import BusinessList from "@/components/home/BusinessList";
import CategoryList from "@/components/home/CategoryList";
import GoogleMapView from "@/components/home/GoogleMapView";
import RangeSelect from "@/components/home/RangeSelect";
import SelectRating from "@/components/home/SelectRating";
import { UserLocationContext } from "@/context/UserLocationContext";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import SkeltonLoading from "@/components/SkeltonLoading";

export default function Home() {
  const {data:session} = useSession();
  const [category,setCategory] = useState();
  const [radius,setRadius] = useState(2500);
  const [businessList, setBusinessList] = useState([]);
  const [businessListOrg,setBusinessListOrg]=useState([])
  const [loading,setLoading] = useState(true)
  const router = useRouter();
  const {userLocation, setUserLocation} = useContext(UserLocationContext);
  useEffect(()=>{
    if(!session?.user){
      router.push('/login')
    }
  }, [session])

  useEffect(()=>{
    getGooglePlace();
  }, [category, radius])

  const getGooglePlace=()=>{
    if(category){
      setLoading(true)
    GlobalApi.getGooglePlace(category,radius,userLocation.lat, userLocation.lng).then(resp=>{
      console.log(businessList)
      setBusinessList(resp.data.product.results)
      setBusinessListOrg(resp.data.product.results);
      setLoading(false)
    })
    }
  }

  const onRatingChange=(rating)=>{
    if(rating.length==0)
    {
      setBusinessList(businessListOrg);
    }
   const result= businessList.filter(item=>{
   for(let i=0;i<rating.length;i++)
   {
      if(item.rating>=rating[i])
      {
        return true;

      }
      return false
   }
   })

    console.log(result)
  }

  return (
    <div className="grid grid-cols-1
    md:grid-cols-4">
      <div className="p-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <CategoryList onCategoryChange={(value)=>setCategory(value)}/>
          <div className="">
            <RangeSelect onRadiusChange={(value)=>setRadius(value)}/>

          </div>
        </div> 
      <div className="col-span-3">
        <GoogleMapView businessList={businessList}/>  
        <div className="mr-[50px] md:absolute w-[90%] md:w-[71%]
        ml-6 md:ml-5 bottom-36 relative md:bottom-4 "> 
        {!loading?  <BusinessList businessList={businessList} />
          :
          <></>
          }

        </div>
      </div> 

    </div>
  );
}
