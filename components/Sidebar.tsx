import React, {useState} from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link';
import {AiFillHome, AiOutlineMenu} from 'react-icons/ai'
import {ImCancelCircle} from 'react-icons/im'
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';




const Sidebar = ({showSidebar}:any) => {

    const router = useRouter()
    const homePage = router.query;
    

    const activeLink = 'flex items-center gap-3 hover:bg-primary p-3 pl-1 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';

    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';




  return (
    <div className=''>
       
        {
            showSidebar && (
                <div className='md:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 bg-gray-50 md:border-0  '>
                    <div className='md:border-b-2   md:pb-4'>
                        <Link href='/'>
                        <div className={  activeLink}>
                            <p className="text-2xl">
                                <AiFillHome/>
                            </p>
                            <span className='capitalize text-xl hidden md:block'>
                                For You
                            </span>

                        </div>
                        </Link>
                    </div>
                    
                    <Discover/>
                    <SuggestedAccounts/>
                    <Footer/>
                    
                </div>
            )
        }

        
    </div>
  )
}

export default Sidebar