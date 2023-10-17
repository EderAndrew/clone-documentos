'use client'
import { useContext } from "react"
import { SessionContext } from "@/providers/SessionProvider"
import IconCloseCircle from "../../../../public/icons/iconCloseCircle"
import { saveInfoMatricula } from "@/api/route"
import { useRouter } from "next/navigation"
import InfoModalMatricula from "../InfoModalMatricula"
import InfoModalCertidao from "../infoModalCertidao"
import InfoModalIPTU from "../infoModalIptu"

export const ModalVisualizarSolicitacao = () => {
    const ctx = useContext(SessionContext)
    const router = useRouter()

    /* const handlerSaveMatricula = async() => {
        ctx?.handleLoading(true)
        if(ctx?.documentoSolicitado){
            await saveInfoMatricula(ctx.documentoSolicitado)
            router.push('/documentos/Home')
            ctx.handleLoading(false)
            ctx.handleOpenModalSolicitacaoDoc(false)
        }
    } */

    return(
        <>
        {ctx?.openModalVisualizarSolicitacao && (
            <div className="fixed w-screen h-screen z-10 bg-slate-950/70 flex items-center justify-center p-2">
                <section className="w-[50%] bg-white rounded-md border p-2">
                    <header className="flex justify-between items-center border-b pb-2 mb-2">
                        <p className="self-center flex justify-center w-full text-xl font-semibold text-slate-700">Informação da Solicitação</p>
                        <label className="text-lg cursor-pointer text-red-500 hover:text-red-600" onClick={()=>ctx.handlerOpenModalVisualizarSolicitacao(false)}>
                            <IconCloseCircle />
                        </label>
                    </header>
                    <p className="mb-2 font-semibold text-slate-600">Status:
                        <span className={`ml-1 px-2
                            ${ctx.documentoSolicitado?.status_solicitacao === "solicitado" ? "bg-gray-600" 
                            : ctx.documentoSolicitado?.status_solicitacao === "processamento" ? "bg-blue-600" 
                            : ctx.documentoSolicitado?.status_solicitacao === "finalizado" ? "bg-green-600" : "bg-red-600"
                        } 
                            text-white p-1 font-normal rounded-full text-sm`}>{ctx.documentoSolicitado?.status_solicitacao}</span></p>
                    {ctx.documentoSolicitado?.nome_documento === "Matricula" && (
                        <InfoModalMatricula />
                    )}
                    {ctx.documentoSolicitado?.nome_documento === "Certidão de Estado Civil" && (
                        <InfoModalCertidao />
                    )}
                    {ctx.documentoSolicitado?.nome_documento === "IPTU" && (
                        <InfoModalIPTU />
                    )}
                    <section className="mt-8 border p-1 rounded-md bg-gray-50 text-slate-700">
                        <label className="text-slate-700 text-lg font-semibold">Informações do Solicitante</label>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-sm mb-1.5">Nome: <span className="font-semibold text-slate-600">{ctx.documentoSolicitado?.nome_solicitante}</span></p>
                                <p className="text-sm">Matricula: <span className="font-semibold text-slate-600">{ctx.documentoSolicitado?.matricula_solicitante}</span></p>
                            </div>
                            <div className="flex flex-col items-end">
                            
                                <p className="text-sm">Data da Solicitação: <span className="font-semibold text-slate-600">{ctx.documentoSolicitado?.data_solicitacao}</span></p>
                            </div>
                        </div>
                    </section>
                    {ctx.documentoSolicitado?.status_solicitacao !== "solicitado" ? (
                       <>
                         <section className="mt-4 text-slate-700">
                            <label className="text-slate-700 text-lg font-semibold">Informações do Operador</label>
                            <div className="grid grid-cols-2">
                                <div>
                                    <p className="text-sm mb-1.5">Nome: <span className="font-semibold text-slate-600">{ctx.documentoSolicitado?.nome_operador}</span></p>
                                    <p className="text-sm mb-1.5">Matricula: <span className="font-semibold text-slate-600">{ctx.documentoSolicitado?.matricula_operador}</span></p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-sm mb-1.5">Data de abertura do Processo: <span className="font-semibold text-slate-600">{ctx.documentoSolicitado?.data_inicio_processo}</span></p>
                                    <p className="text-sm mb-1.5">Data de finalização do Processo: <span className="font-semibold text-slate-600">{ctx.documentoSolicitado?.data_finalizacao_processo}</span></p>
                                </div>
                            </div>
                        </section>
                       {ctx.documentoSolicitado?.status_solicitacao === "finalizado/inconsistencia" ? (
                            <section>
                                
                            </section>
                        ) : (
                            <section className="w-full h-16 flex justify-center items-center mt-4">
                                <p className="text-lg font-semibold text-slate-400">Não há nenhuma inconsistência para essa Solicitação!</p>
                            </section>
                       )}
                       {ctx.documentoSolicitado?.status_solicitacao === "finalizado" ? (
                            <section className="w-full flex items-center justify-center p-4">
                                <button className="bg-blue-600 py-2 px-8 text-white rounded-full shadow-md hover:bg-blue-700">Imprimir Documento</button>
                            </section>
                       ) : (
                        <section></section>
                       )}
                       </>
                    ): (
                        <section className="w-full h-16 flex justify-center items-center mt-4">
                            <p className="text-lg font-semibold text-slate-400">Solicitação ainda não esta em status de Processamento!</p>
                        </section>
                    )}
                </section>
            </div>
        )}
        </>
    )
}
