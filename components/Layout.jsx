// icon from https://icons8.com/icons/set/gift

import React from "react";
import Head from "next/head";
import Link from "next/link";
const headerStyle = {
  background:
    "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(16,163,127,1) 35%, rgba(0,212,255,1) 100%)",
};

const Layout = () => {
  return (
    <>
      <Head>
        <title>Suggestion Me 3 Gift Ideas using OpenAI </title>
        <link rel="icon" href="/icons8-giveaway-50-blk.png" />
      </Head>

      <header className="w-full px-5" style={headerStyle}>
        <div className="container flex flex-wrap p-2 flex-row items-center">
          <Link
            href="/"
            className="md:ml-8 flex title-font font-medium items-center text-gray-900 mb-2 md:mb-0"
          >
            <img src="./icons8-giveaway-50.png" alt="Logo" />
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <span className="mr-5 text-white hover:text-gray-100">
              Suggestion Me 3 Gift Ideas using OpenAI
            </span>
          </nav>
          <Link
            href="/about"
            className="inline-flex items-center bg-white border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            About Us
          </Link>
        </div>
      </header>
    </>
  );
};

export default Layout;
