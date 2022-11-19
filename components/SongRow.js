import { useRecoilState } from "recoil";
import { playbackState, trackIdState } from "../atoms/stateAtom";
import timeConversion from "../hooks/timeConversion";
import useSong from "../hooks/useSong";
import useSpotify from "../hooks/useSpotify";

export default function SongRow({track, id}){

    const spotifyAPI = useSpotify()
    const [trackId, setTrackId] = useRecoilState(trackIdState)
    const [playback, setPlayback] = useRecoilState(playbackState)
    
    const playCurrentSong = () =>{
        if(spotifyAPI.getAccessToken()){
            setTrackId(track?.id)
            setPlayback(true)
            spotifyAPI.play({
                uris:[track?.uri]
            }).catch(err=>{
                if(err.toString().includes('PREMIUM')){
                    alert("Spotify Premium Account required for this feature.")
                }
            })

        }
        
    }

    return(
        <tr onClick={()=>{playCurrentSong()}} className="bg-[#16181e] text-white hover:bg-gray-700 cursor-pointer transition duration-150">
        <th className="font-normal">{id+1}</th>
        <td>
            <div className="flex">
            <img src={track?.album?.images?.[0].url} className='w-12 h-12'/>
            <div>
            <a href={track?.external_urls.spotify} className='hover:underline'  target="_blank" rel="noreferrer">
                <h1 className="ml-4 font-semibold">{track?.name}</h1>
            </a>
            
            <a href={track?.album?.artists?.[0]?.external_urls.spotify} className='hover:underline'  target="_blank" rel="noreferrer">
                <h1 className="ml-4 text-sm">{track?.album?.artists?.[0]?.name}</h1>
            </a>
                
            </div>
            </div>
        </td>
        
        <td>
        <a href={track?.album?.external_urls.spotify} className='hover:underline'  target="_blank" rel="noreferrer">
            <h1 className="text-sm">{track?.album?.name}</h1>
        </a>
        </td>

        <td>{timeConversion(track?.duration_ms)}</td>

      </tr>
    )
}