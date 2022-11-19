
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/stateAtom";
import Center from "./Center";
import Sidebar from "./Sidebar";

export default function Player(){

    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

    return(
        <div className="bg-[#16181e] w-full h-screen ">
            <div className="flex flex-row">
            <Sidebar/>
            <div className="flex flex-col w-full h-screen overflow-y-auto">
                {
                    playlistId ? (
                        <Center/>
                    ) : (
                        <>
                        <center><h1 className="text-white font-normal lg:mt-80 mt-48">Select a playlist.</h1></center>
                        </>
                    )
                }
                
            </div>
            
            </div>
         
        </div>
    )
}