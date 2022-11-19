import { useSession, signIn} from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import spotifyAPI from "../api/spotify"
export default function useSpotify(){

    const {data:session} = useSession()
 
    useEffect(()=>{
        if(session){
            if(session?.error==="RefreshAccessTokenError"){
                signIn();
            } //if refresh token returns error

            spotifyAPI.setAccessToken(session.user.accessToken)
        }

        
    }, [session])

    return spotifyAPI
}
