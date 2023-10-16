'use client'
import { SessionContext } from "@/providers/SessionProvider"
import { useContext } from "react"

export const ModalClientSolicitation = () => {
    const ctx = useContext(SessionContext)

    const handlerSaveSolicitation = () => {
        console.log('salvou')
        ctx?.handleModalCongrats(true)
        ctx?.handleModalClientSolicitation(false)
    }

    return(
        <>
            {ctx?.modalClientSolicitation && (
                <div className="fixed z-10 w-screen h-screen bg-slate-950/50 py-2 px-4 flex justify-center">
                    <div className="w-[50%] bg-white flex flex-col justify-between rounded-md">
                    <div className="flex flex-col items-center p-4 ">
                        <span className="text-2xl font-bold text-slate-700 mb-12">Detalhes da Solicitação</span>
                        <div className="flex flex-col w-full border-t pt-2">
                            <span className="text-lg text-slate-700 mb-2 font-semibold">Nome: Jhon Doe</span>
                            <span className="text-lg text-slate-700 mb-2 font-semibold">RG: 000000-0</span>
                        </div>
                        <div className='flex flex-col w-full'>
                            <span className="text-lg text-slate-700 mb-2 font-semibold italic">Tipo de Documento: Documento 1</span>
                            <span className="text-lg text-slate-700 mb-2 font-semibold">Descrição do Documento:</span>
                            <p className="text-center text-lg">Documento descritivo</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-center gap-5 mb-12">
                    <button
                        className="bg-red-600 w-52 h-12 text-white rounded-full mt-8"
                        onClick={()=>ctx?.handleModalClientSolicitation(false)}
                    >SAIR</button>
                        <button
                        className="bg-green-600 w-52 h-12 text-white rounded-full mt-8"
                        onClick={handlerSaveSolicitation}
                    >SALVAR</button>
                    </div>
                    </div>
                </div>
            )}
        </>
        
    )
}