import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import useSpotify from "../hooks/useSpotify"

export default function Header(){

    const {data:session} = useSession()
    const [img, setImg] = useState()
    const spotifyAPI = useSpotify()
    useEffect(()=>{
        spotifyAPI?.getMe().then(data=>{
            setImg(data?.body?.images?.[0]?.url)
        })
    }, [session, spotifyAPI])

    return(
        <div className={`flex flex-row w-full justify-between`}>
        <input type="text" placeholder="Search for song" className="input focus:border-white glass w-full max-w-xl lg:ml-8 ml-4 mt-4 rounded-xl text-white placeholder-white" />

        <div className=" mt-6 lg:mr-12 mr-2 flex lg:flex-row flex-col lg:ml-0 ml-8 lg:bg-gray-100 lg:h-10 lg:pr-4 lg:pl-2 rounded-full">
        <div className="avatar mr-2 lg:mt-1">
            <div className="w-8 rounded-full h-8">
                <img src={img ? img : `https://ui-avatars.com/api/?name=${session?.user?.name}`} />
            </div>
        </div>

        <h1 className="lg:text-black text-white font-semibold mt-1 lg:mt-2" >{session?.user?.name}</h1>
        </div>

        </div>
    )
}