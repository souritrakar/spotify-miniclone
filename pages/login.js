import Image from "next/image"
import Head from "next/head"
import {getProviders, signIn} from 'next-auth/react'

export default function Login({providers}){

    const src = 'https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg'

    return(
        
         <div className="bg-black min-h-screen pb-4">
            <Head>
                <title>Login | Spotify Clone</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <br/>
            <Image 
             loader={()=>src}
             src={src}
             width={'260'}
             height={'260'}
             className='mx-auto mt-10'
             alt="Spotify Logo"
            />
            <center>
                {
                    Object.values(providers).map((provider, key)=>{
                        return(
                            <a key={key}>
                            <button onClick={()=>{signIn(provider.id, {callbackUrl:'/'} )}} className="btn lg:mt-12 mt-6 btn-wide bg-green-500 hover:bg-green-600 text-white ">LOGIN WITH {provider.name}</button>
                            </a>
                        )
                    })
                }
            </center>


        </div>
    )
}

export async function getServerSideProps(){
    const providers = await getProviders()

    return {
        props:{
            providers
        }
    }
}