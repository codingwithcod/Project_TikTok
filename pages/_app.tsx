import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";


const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSr] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    setIsSSr(false);
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID}`}>
      <Head>
        <title>MyTikTik</title>
      </Head>
      <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
      <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className=" relative md:flex md:gap-20">
        <div className="absolute top-0 left-0 md:static z-50 h-[92vh] overflow-hidden md:hover:overflow-auto">
          <Sidebar showSidebar={showSidebar} />
        </div>
        <div className="p-1 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
          <Component {...pageProps} />
        </div>
      </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
