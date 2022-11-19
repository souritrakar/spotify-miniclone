import { useRecoilState } from "recoil"
import { playlistIdState } from "../atoms/stateAtom"
import toast, { Toaster } from 'react-hot-toast';

export default function PlaylistTab({pl}){

    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

    return(

        <button onClick={()=>{setPlaylistId(pl?.id)}} className="text-white w-full">
        
            <span className="flex flex-row gap-4 lg:text-md text-sm ml-4 mr-2 mt-4 hover:text-green-500 transition duration-300 p-2.5 rounded-md">
            {pl?.name}
            </span>

        </button>
    )
}