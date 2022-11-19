import Image from "next/image"
import progressPic from "../public/under_construction.svg"

export default function Home(){
    return(
        <center>
            <div className="lg:mt-48 mt-48">
            <Image src={progressPic} height={30} width={30} className='lg:w-72 w-40' />
            <h1 className="lg:text-3xl text-xl font-semibold lg:mt-12 mt-6">Page in progress</h1>
            </div>
        </center>
    )
}