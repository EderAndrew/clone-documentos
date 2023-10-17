'use client'
import {useContext, useEffect, useState} from 'react'
import { SessionContext } from "@/providers/sessionProvider"
import dynamic from 'next/dynamic'
import IconCloseCircle from '../../../../public/icons/iconCloseCircle'

const InvoicePDF = dynamic(() => import('@/components/pdfs/admin'),{
    ssr: false
})

export const ModalPDFAdmin = () => {
    const modalCtx = useContext(SessionContext)

    console.log("ModalPDFAdmin: ",modalCtx?.documentPdf)
    return(
        <>
            {modalCtx?.openModalAdmin && (
                <div className="fixed z-10 w-screen h-screen bg-slate-950/50 py-2 px-4 flex justify-center">
                    <InvoicePDF pdfbase64={modalCtx.documentPdf}/>
                    <div className="text-xl text-white cursor-pointer ml-4" onClick={()=>modalCtx.handleOpenModalAdmin(false)}>
                        <IconCloseCircle />
                    </div>
                </div>
            )}
        </>
        
    )
}