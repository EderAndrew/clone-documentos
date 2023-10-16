'use client'
import { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import IconHome from '../../../public/icons/iconHome'
import IconDocument from '../../../public/icons/iconDocument'
import IconLogoutBoxFill from '../../../public/icons/iconLogoutBoxFill'
import IconBxUserCircle from '../../../public/icons/iconBxUserCircle'
import { SessionContext } from '@/providers/SessionProvider'
import IconChevronCompactLeft from '../../../public/icons/iconChevronCompactLeft'
import { User } from '@/interfaces/user'
import { UserCookie, logOut } from '@/api/route'
import { useRouter } from 'next/navigation'

export const Navbar = () => {
    const [openNavbar, setOpenNavbar] = useState(false)
    const [homeClient, setHomeClient] = useState(true)
    const [docMontreal, setDocMontreal] = useState(false)
    const [adminBank, setAdminBank] = useState(false)
    const [session, setSession] = useState<User>()
    const ctx = useContext(SessionContext)
    const router = useRouter()

    useEffect(()=>{
        (async()=>{
            const info = await UserCookie()
            setSession(info[0])
        })()
    },[])

    const handlerMenu = () => {
        setOpenNavbar(!openNavbar)
    }

    const handlerHome = () => {
        setHomeClient(true)
        setDocMontreal(false)
        setAdminBank(false)
    }
    const handleMontreal = () => {
        setHomeClient(false)
        setDocMontreal(true)
        setAdminBank(false)
    }

    const handlerLogout = async() => {
        await logOut()
        router.replace("/")
    }

    return(
        <aside className={`transition-all flex flex-col ${openNavbar ? 'w-72' : 'w-16'} bg-[#333b8f] text-[#a1a8f7] m-3 rounded-lg`}>
            <div className="flex flex-col justify-between h-full pb-8">
                <div>
                    <div className={`transition-all flex items-center h-24 w-full gap-3 justify-between mt-2 pl-2.5 shadow-md`}>
                    <div className="transition-all flex gap-3 items-center">
                        <div className={`w-10 h-10 rounded-full text-[4.5rem] flex items-center shadow-sm shadow-[#383c69]
                            ${!openNavbar ? 'cursor-pointer' : ''}
                            `} onClick={!openNavbar ? handlerMenu : ()=>console.log('teste')}><IconBxUserCircle /></div>
                            {openNavbar && (
                                <div className="transition-all">
                                    <p className="text-base font-bold ">{session && session.name}</p>
                                    <p className="text-[0.800rem]">Matricula: {session && session.register}</p>
                                    <p className="text-[0.800rem]">{session && session.op === "0" ? "Administrador" : "User"}</p>
                                </div>
                            )}
                    </div>
                        {openNavbar && (
                            <div onClick={handlerMenu} className={`transition-all bg-[#9299e7] h-16 text-white flex items-center rounded-tl-md rounded-bl-md cursor-pointer hover:bg-[#8289d4]`}><IconChevronCompactLeft /></div>
                        )}
                    </div>
                    <div className={`transition-all flex flex-col gap-1 ${openNavbar ? '' : ''}  justify-center`}>
                        {session && session.op === "0" && (
                            <Link href={'/documentos/Home'} onClick={handlerHome} className={`flex gap-3 ${homeClient || session.logged ? 'bg-white rounded-md text-[#333b8f]' : ''} p-2 m-2 rounded-md ${openNavbar ? 'pl-3' : 'pl-3'}`}>
                                <div className="text-xl"><IconHome /></div>
                                {openNavbar && (
                                    <span className="cursor-pointer text-sm">Home Cliente</span>
                                )}
                            </Link>
                        )}
                        
                        {session && session.op === "1" && (
                            <Link href={'/documentos/admin'} onClick={handleMontreal} className={`flex gap-3 ${docMontreal || session.logged  ? 'bg-white rounded-md text-[#333b8f]' : ''} p-2 m-2  ${openNavbar ? 'pl-3' : 'pl-3'}`}>
                                <div className="text-xl"><IconDocument /></div>
                                {openNavbar && (
                                    <span className="cursor-pointer text-sm">Documentos Montreal</span>
                                )}
                            </Link>
                        )}
                        {session && session.op === "00" && (
                            <>
                                <Link
                                    href={'/documentos/Home'} 
                                    onClick={handlerHome}
                                    className={`flex gap-3 ${homeClient ? 'bg-white rounded-md text-[#333b8f]' : ''} p-2 m-2 rounded-md ${openNavbar ? 'pl-3' : 'pl-3'}`}>
                                    <div className="text-xl"><IconHome /></div>
                                    {openNavbar && (
                                        <span className="cursor-pointer text-sm">Home Cliente</span>
                                    )}
                                </Link>
                                <Link href={'/documentos/admin'} onClick={handleMontreal} className={`flex gap-3 ${docMontreal ? 'bg-white rounded-md text-[#333b8f]' : ''} p-2 m-2  ${openNavbar ? 'pl-3' : 'pl-3'}`}>
                                    <div className="text-xl"><IconDocument /></div>
                                    {openNavbar && (
                                        <span className="cursor-pointer text-sm">Documentos Montreal</span>
                                    )}
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className={`flex gap-4 ${openNavbar ? 'pl-11' : 'pl-5'} items-center`}>
                <button onClick={handlerLogout} className='flex gap-3'>
                    <div className="text-xl"><IconLogoutBoxFill /></div>
                        {openNavbar && (
                            <span className="mb-4 cursor-pointer text-sm">Sair</span>
                    )}
                </button>
                </div>
            </div>
            
        </aside>
    )
}