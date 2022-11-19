import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { trackIdState } from "../atoms/stateAtom";
import useSpotify from "./useSpotify";

export default function useSong(){
    const spotifyAPI = useSpotify()
    const [trackId, setTrackId] = useRecoilState(trackIdState)
    const [song, setSong] = useState(null)

    useEffect(()=>{
        const getData = async()=>{
            if(spotifyAPI.getAccessToken()){
                if(trackId){
                    const data = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                        headers:{
                            Authorization: `Bearer ${spotifyAPI.getAccessToken()}`
                        }
                    }).then(res=>res.json())
    
                    setSong(data)
                }
            }
            
        }

        getData()
    }, [trackId, spotifyAPI])

    return song
}