import Head from 'next/head';
import React from 'react'
import Footer from '../components/Footer';

import Player from '../components/Player';

export default function Main() {
    return(
      <>
      <Head>
          <title>Home | Spotify Clone</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Player/>

      <Footer/>

      </>
    )
 
}
