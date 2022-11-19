import {HomeIcon, MagnifyingGlassIcon , MusicalNoteIcon, PlusCircleIcon, HeartIcon} from "@heroicons/react/24/outline"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { playlistIdState } from "../atoms/stateAtom"
import useSpotify from "../hooks/useSpotify"
import PlaylistTab from "./PlaylistTab"
import SidebarTab from "./SidebarTab"

export default function Sidebar(){
    const src = 'https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg'
    const tabClass = 'h-6 w-6 text-white'

    const spotifyAPI = useSpotify()
    const {data:session, status} = useSession()
    const [playlists, setPlaylists] = useState([])
    
    useEffect(()=>{
 
        if(spotifyAPI.getAccessToken()){
            spotifyAPI.getUserPlaylists().then((data)=>{
                setPlaylists(data?.body?.items)
            })
        }

    }, [session, spotifyAPI])

    return(
        <div className="bg-black lg:w-64 w-72 min-h-screen">

         <img 
             loader={() => src} 
             src={src} 
             className="lg:w-48 w-40 ml-2"
             alt="Spotify Logo"
         />

        <SidebarTab title={'Home'} Icon={<HomeIcon className={tabClass}/>}/>
        <SidebarTab title={'Search'} Icon={<MagnifyingGlassIcon className={tabClass}/>}/>
        <SidebarTab title={'Create'} Icon={<PlusCircleIcon className={tabClass}/>}/>

        <hr className="mt-8"/>
        {/* <button className="text-white" onClick={()=>{signOut()}}>Log out</button> */}
        <h2 className="text-white ml-6 mt-4 text-md font-bold">Playlists</h2>
         {
            playlists.map(playlist=>{
                return(
                    <PlaylistTab key={playlist?.id} pl={playlist? playlist : ""}/>
                )
            })
         }

        </div>
    )
}