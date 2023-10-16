'use client'
import {useContext } from 'react'
import { SessionContext } from "@/providers/SessionProvider"
import dynamic from 'next/dynamic'
import IconCloseCircle from '../../../../../public/icons/iconCloseCircle'

const InvoicePDF = dynamic(() => import('@/components/pdfs/document1'),{
    ssr: false
})

export const ModalPDFDocumento1 = () => {
    const modalCtx = useContext(SessionContext)
    return(
        <>
            {modalCtx?.openModal && (
                <div className="fixed z-10 w-screen h-screen bg-slate-950/50 py-2 px-4 flex justify-center">
                    <InvoicePDF pdfbase64={modalCtx.documentPdf}/>
                    <div className="text-xl text-white cursor-pointer" onClick={()=>modalCtx.handleModal(false)}>
                        <IconCloseCircle />
                    </div>
                </div>
            )}
        </>
        
    )
}