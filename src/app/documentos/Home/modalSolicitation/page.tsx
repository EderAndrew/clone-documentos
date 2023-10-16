'use client'
import { useContext } from "react"
import { SessionContext } from "@/providers/SessionProvider"
import IconCloseCircle from "../../../../../public/icons/iconCloseCircle"
import { putHistoric, saveInfoMatricula, uploadDocument } from "@/api/route"
import { useRouter } from "next/navigation"
import InfoModalMatricula from "../infoModalMatricula/page"
import InfoModalCertidao from "../infoModalCertidao/page"
import InfoModalIPTU from "../infoModalIptu/page"
import EditMatricula from "../edicao/editMatricula/page"
import IconCheckAll from "../../../../../public/icons/iconCheckAll"
import { Historic } from "@/interfaces/historic"

export const ModalSolicitation = () => {
    const ctx = useContext(SessionContext)
    const router = useRouter()

    const handlerSaveMatricula = async() => {
        ctx?.handleLoading(true)
        if(ctx?.documentoSolicitado){
            await saveInfoMatricula(ctx.documentoSolicitado)
            router.push('/documentos/Home')
            ctx.handleLoading(false)
            ctx.handleOpenModalSolicitacaoDoc(false)
            ctx.handleEdit(false)
        }
    }

    const handlerEditMatricula = async() => {
        ctx?.handleLoading(true)
        if(ctx?.documentoSolicitado){
            await uploadDocument(ctx.documentoSolicitado)
            await putHistoric(ctx.editHistoric as Historic)
            router.push('/documentos/Home')
            ctx.handleLoading(false)
            ctx.handleOpenModalSolicitacaoDoc(false)
            ctx.handleEdit(false)
        }
    }
    return(
        <>
        {ctx?.openModaSolicitacaoDoc && (
            <div className="fixed w-screen h-screen z-10 bg-slate-950/70 flex items-center justify-center p-2">
                <section className="w-[50%] bg-white rounded-md border p-2">
                    <header className="flex justify-between items-center border-b pb-2 mb-2">
                        <p className="self-center flex justify-center w-full text-xl font-semibold text-slate-700">{ctx.edit ? "Confirmar os Dados para Edição":"Confirmar os Dados da Solicitação"}</p>
                        <label className="text-lg cursor-pointer text-red-500 hover:text-red-600" onClick={()=>ctx.handleOpenModalSolicitacaoDoc(false)}>
                            <IconCloseCircle />
                        </label>
                    </header>
                    <section>
                        {ctx.edit && ctx.documentoSolicitado?.nome_documento === "Matricula" && (
                            <InfoModalMatricula />
                        )}
                        {ctx.edit && ctx.documentoSolicitado?.nome_documento === "Certidão de Estado Civil" && (
                            <InfoModalCertidao />
                        )}
                        {ctx.edit && ctx.documentoSolicitado?.nome_documento === "IPTU" && (
                            <InfoModalIPTU />
                        )}
                        {!ctx.edit && ctx.typeDocument === "Matricula" && (
                            <InfoModalMatricula />
                        )}
                        {!ctx.edit && ctx.typeDocument === "Certidão de Estado Civil" && (
                            <InfoModalCertidao />
                        )}
                        {!ctx.edit && ctx.typeDocument === "IPTU" && (
                            <InfoModalIPTU />
                        )}
                    </section>
                    <section className={`mt-8 border p-1 rounded-md bg-gray-50 text-slate-700`}>
                        <label className="text-slate-700 text-lg font-semibold">Informações do Solicitante</label>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-sm">Nome: {ctx.documentoSolicitado?.nome_solicitante}</p>
                                <p className="text-sm">Matricula: {ctx.documentoSolicitado?.matricula_solicitante}</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-sm">Data da Solicitação: {ctx.documentoSolicitado?.data_solicitacao}</p>
                                <p className="text-sm">Numero da Solicitação: <span className="bg-gray-600 text-white p-1 rounded-full text-xs">{ctx.documentoSolicitado?.numero_solicitacao}</span></p>
                            </div>
                        </div> 
                    </section>
                    {ctx.edit && (
                        <>
                            <section className="mt-2 border p-1 rounded-md bg-gray-50 text-slate-700">
                                <label className="text-slate-700 text-lg font-semibold">Informações do Operador</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <p className="text-sm">Nome: {ctx.documentoSolicitado?.nome_operador}</p>
                                        <p className="text-sm">Matricula: {ctx.documentoSolicitado?.matricula_operador}</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="text-sm">Data do Processo: {ctx.documentoSolicitado?.data_inicio_processo?.split("-")[0]}</p>
                                    </div>
                                </div> 
                            </section>
                            <section className="mt-3">
                                <p className="text-slate-700 font-semibold">Inconsistência corrigida</p>
                                <div className="flex justify-between px-4">
                                    <span className="text-green-700 text-sm font-semibold">{ctx.editHistoric && ctx.editHistoric.descricao}</span>
                                    <span className="text-lg text-green-500">
                                        <IconCheckAll />
                                    </span>
                                </div>
                            </section>
                        </>
                    )}
                    <div className="text-sm font-semibold text-slate-700 w-full flex justify-center mt-2">{ctx.edit ? `Confirma os dados de Edição para o Documento ${ctx.documentoSolicitado?.nome_documento}` : `Confirma os dados de Solicitação para o Documento ${ctx.documentoSolicitado?.nome_documento}`}?</div>
                    <footer className="mt-4 flex gap-4">
                        <button className="bg-red-500 w-full h-10 rounded-full text-white text-lg" onClick={()=>ctx.handleOpenModalSolicitacaoDoc(false)}>CANCELAR</button>
                        {!ctx.edit && (
                            <button className={`bg-green-500 w-full h-10 rounded-full text-white text-lg`} onClick={handlerSaveMatricula}>CONFIRMAR</button>
                        )}
                        {ctx.edit && (
                            <button className={`bg-blue-500 w-full h-10 rounded-full text-white text-lg`} onClick={handlerEditMatricula}>CONFIRMAR</button>
                            
                        )}
                    </footer>
                </section>
            </div>
        )}
        </>
    )
}
