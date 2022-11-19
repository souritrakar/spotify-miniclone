import { useEffect, useState } from "react"
import { useRecoilState} from "recoil"
import { playlistIdState, playlistState } from "../atoms/stateAtom"
import timeConversion from "../hooks/timeConversion"
import useSpotify from "../hooks/useSpotify"
import SongRow from "./SongRow"
import {shuffle} from "lodash"
import { useSession } from "next-auth/react"
import Header from "./Header"
import toast, { Toaster } from 'react-hot-toast'

export default function Center(){

    const {data:session} = useSession()
    const spotifyAPI = useSpotify()
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState(playlistState)
    const [duration, setDuration] = useState(0)
    const [color, setColor] = useState("from-green-500")

    let colors = [
        "from-indigo-500",
        "from-blue-500",
        "from-green-500",
        "from-red-500",
        "from-yellow-500",
        "from-pink-500",
        "from-purple-500",
    ]

    useEffect(()=>{
        if(spotifyAPI.getAccessToken()){

            spotifyAPI.getPlaylist(playlistId).then((data)=>{

            setPlaylist(data?.body)
            let durationT = 0

            data?.body?.tracks?.items.map(song=>{
                durationT+= song?.track.duration_ms
            })

            setDuration(durationT)
            setColor(shuffle(colors).pop().toString())
            document.title = data?.body.name
            
        }).catch(err=>{
            console.log(err)
        })
        }

    }, [playlistId, spotifyAPI])

    const copyPlaylistLink = (link) =>{
        navigator.clipboard.writeText(link).then(()=>{
            toast('Playlist link copied!',{
                icon: '📋',
              });
        })
    }
    
    return(
        <>

        <Toaster />

        <section className={`bg-gradient-to-b ${color} to-${color?.split("from-")[1]} w-full lg:h-96`}>

            <Header/>

            <div className="lg:ml-8 lg:mt-10 ml-4 mt-6 flex pb-4 text-white">
                <img src={playlist?.images?.[0]?.url} className='lg:w-56 lg:h-56 md:w-48 md:h-48 w-32 h-32 shadow-xl rounded-xl' alt="Song"/>
        
                <div className="lg:ml-6 ml-2 lg:mt-4">
                    <h1 className="lg:text-7xl text-2xl md:text-5xl font-bold">{playlist?.name}</h1>
                    <p className="font-normal lg:mt-6 mt-4 ml-2"><strong>{playlist?.owner?.display_name} • {playlist?.tracks?.items?.length} song(s),</strong> {timeConversion(duration)}</p>

                    <a href={playlist?.external_urls.spotify} target="_blank" rel="noreferrer">
                    <button className="btn gap-2 bg-white md:visible invisible text-black border-none lg:mt-6 mt-4 ml-2 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    See in spotify
                    </button>
                    </a>

                </div>

            </div>
            
        </section>
        
        <div className="lg:ml-8 mt-6 ml-4 flex">

        <button className={`btn lg:btn-lg btn-md btn-circle bg-green-500`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="lg:w-8 lg:h-8 w-6 h-6">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
        </svg>
        </button>

        <div className="dropdown dropdown-bottom lg:ml-6 ml-2">
         
        <button tabIndex={0} className="text-white bg-none hover:opacity-80 lg:mt-4 mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lg:w-8 lg:h-8 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        </button>

        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-content rounded-box w-52 text-white">
            <li><button onClick={()=>{copyPlaylistLink(playlist?.external_urls?.spotify.toString())}} className="hover:bg-gray-600">Copy link</button></li>
            <li><a className="hover:bg-red-600">Delete playlist</a></li>
        </ul>
        </div>
       
        </div>

        <div className="overflow-x-auto bg-[#16181e] mt-4">
            <table className="table-normal  bg-[#16181e] w-full">
    
            <thead className="text-white border-b-gray-800 border-b-2 ">
            <tr>
                <th>#</th>
                <th className="text-left font-normal">Title</th>
                <th className="text-left font-normal">Album</th>
                <th className="text-left">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </th>
            </tr>
            </thead>

            <tbody>

                {playlist?.tracks?.items?.map((track, key)=>{
        
                    return(
                        <SongRow track={track.track} id={key} key={key}/>
                    )
                })}

            </tbody>
            </table>
        </div>
        </>
    )
}