'use client'
import { useContext } from "react"
import IconFilePdf from "../../../../public/icons/iconFilePdf"
import { SessionContext } from "@/providers/SessionProvider"
import { useRouter } from "next/navigation"

const ModalCongrats = () => {
    const ctx = useContext(SessionContext)
    const router = useRouter()

    const handleCloseReturn = () => {
        router.push('/documentos/Home')
        ctx?.handleModalCongrats(false)
    }

    return (
        <>
        {ctx?.modalCongrats && (
            <div className="fixed z-10 w-screen h-screen bg-slate-950/50 py-2 px-4 flex justify-center items-center">
                <div className="w-[50%] h-96 bg-white flex flex-col items-center justify-center rounded-md">
                    <p className="text-slate-500 text-2xl">Obrigado! Recebemos sua solicitação e já estamos verificando.</p>
                    <p className="text-slate-500 text-xl">Quando for aprovado, retorne no sistema para baixar o seu documento.</p>
                    <span className="text-slate-500 text-4xl"><IconFilePdf /></span>
                    <div>
                    <button
                        className="bg-purple-600 w-52 h-12 text-white rounded-full mt-12"
                        onClick={handleCloseReturn}
                    >Voltar</button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default ModalCongrats