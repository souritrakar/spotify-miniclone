import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { playbackState, trackIdState } from "../atoms/stateAtom"
import useSong from "../hooks/useSong"
import useSpotify from "../hooks/useSpotify"

export default function Footer(){

    const spotifyAPI = useSpotify()
    const {data:session} = useSession()
    const [volume, setVolume] = useState(50)
    const [trackId, setTrackId] = useRecoilState(trackIdState)
    const [playback, setPlayback] = useRecoilState(playbackState)

    const songInfo = useSong()

    const getCurrent = () =>{
        if(!songInfo){
            spotifyAPI.getMyCurrentPlayingTrack().then(data=>{
                setTrackId(data?.body?.item?.id)
                spotifyAPI.getMyCurrentPlaybackState().then(data=>{
                    setPlayback(data?.body?.is_playing)
                })
            })
        }
    }

    useEffect(()=>{
        if(spotifyAPI.getAccessToken() && !trackId){
            getCurrent()
            setVolume(50)
        }
    }, [trackId, spotifyAPI, session])
    
    return(
        <div className="sticky bottom-0 bg-[#1f222a] w-full lg:h-24 pt-4 lg:pb-0 pb-4">

            <div className="flex">

                <div className="flex">
                    <img className="lg:w-16 lg:h-16 h-12 w-12 lg:ml-4 ml-2" src={songInfo?.album.images?.[0]?.url} alt="Song"/>
                    <div className="lg:mt-2">
                        <a href={songInfo?.external_urls.spotify} className='hover:underline'  target="_blank" rel="noreferrer">
                            <h1 className="ml-4 ont-semibold text-white">{songInfo?.name}</h1>
                        </a>
                        
                        <a href={songInfo?.album?.artists?.[0]?.external_urls.spotify} className='hover:underline'  target="_blank" rel="noreferrer">
                            <h1 className="ml-4 text-sm text-white">{songInfo?.album?.artists?.[0]?.name}</h1>
                        </a>
                    </div>
                </div>
                
                <div className=" ml-auto mr-auto">

                    <div className="flex ml-20">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white mt-2 hover:cursor-pointer hover:text-green-500 lg:visible invisible">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white ml-6 mt-2 hover:cursor-pointer hover:text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z" />
                    </svg>
                    
                    <button className={`btn btn-md btn-circle bg-green-500 ml-6`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                    </button>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white ml-6 mt-2 hover:cursor-pointer hover:text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                    </svg>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white ml-6 mt-2 hover:cursor-pointer hover:text-green-500 lg:visible invisible">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                    </svg>
                    
                    </div>

                    <progress className="progress-success progress lg:w-96 w-48 lg:ml-0 ml-24" value="37" max="100"></progress>

                </div>

                <div className="flex text-white lg:mr-6 mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 lg:visible invisible">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>

                    <input type="range" min="0" max="100" className="range-primary range range-sm ml-4 mt-1" />

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ml-4 lg:visible invisible">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>

                </div>

            </div>
        </div>
    )
}