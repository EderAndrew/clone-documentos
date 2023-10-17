'use client'
import { useContext } from 'react'
import { SessionContext } from "@/providers/SessionProvider"

export const Loading = () => {
    const ctx = useContext(SessionContext)
    return (
        <>
            {ctx?.loading && (
                <div className="fixed z-20 w-screen h-screen bg-slate-900/60 flex justify-center items-center">
                    <span className="text-white text-2xl">Carregando...</span>
                </div>
            )}
        </>
    )
}