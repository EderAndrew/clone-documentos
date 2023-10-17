'use client'
import { Request } from "@/interfaces/request"
import IconEyeFill from "../../../../public/icons/iconEyeFill"
import IconFileDocumentEdit from "../../../../public/icons/iconFileDocumentEdit"
import IconFilePdf from "../../../../public/icons/iconFilePdf"
import { useContext, useState } from "react"
import { SessionContext } from "@/providers/SessionProvider"
import { getDocumentbyNumber } from "@/api/route"
import { useRouter } from "next/navigation"

type Props = {
    myDocuments: Request[]
}
const ClientTable = ({myDocuments}:Props) => {
    const router = useRouter()
    let ctx = useContext(SessionContext)
    const handlerOpenModalDocument = (file:string) => {
        ctx?.handleIDPDF(file)
        ctx?.handleModal(true)
    }

    const handlerSolicitacao:Request[] = myDocuments.filter(item => item.numero_solicitacao?.includes(ctx?.searchSolicitacao as string)) as unknown as Request[]
    const searchDoc:Request[] = handlerSolicitacao ? handlerSolicitacao : myDocuments
    
    const handlerOpenInfoSolicitacao = async(id: string) => {
        const req:Request = await getDocumentbyNumber(id)
        
        ctx?.handlerDocumentoSolicitado(req)
        ctx?.handlerOpenModalVisualizarSolicitacao(true)
    }

    const handlerEdit = (id: string) => {
        ctx?.handleLoading(true)
        router.push(`/documentos/Home/edicao/${id}`)
        ctx?.handleLoading(false)
    }

    return(
        <>
        {myDocuments ? (
            <table className="table-auto w-full">
                <thead className="border-b h-10 text-slate-700">
                   <tr>
                        <th>Número</th>
                        <th>Nome do Documento</th>
                        <th>Tipo</th>
                        <th>Data da Solicitação</th>
                        <th>Status</th>
                        <th>Doc. Solicitado</th>
                        <th>Ação</th>
                   </tr>
                </thead>
                <tbody className="">
                    {searchDoc && searchDoc.map((item, index) => (
                        <tr key={item.id} className={`h-10 border-b text-slate-700 text-sm ${index % 2 !== 0 ? "bg-gray-50" : "bg-white"}`}>
                            <td className="text-center">{item.numero_solicitacao}</td>
                            <td className="text-center">{item.nome_documento}</td>
                            <td className="text-center">{item.sub_documento}</td>
                            <td className="text-center">{item.data_solicitacao}</td>
                            <td className={`text-center `}>
                                <span
                                    className={`
                                        ${item.status_solicitacao === 'solicitado' ? 'bg-slate-500 text-white py-1 px-2 rounded-full' 
                                        : item.status_solicitacao === 'processamento' ? 'bg-blue-500 text-white py-1 px-2 rounded-full' 
                                        : item.status_solicitacao === 'finalizado' ? 'bg-green-500 text-white py-1 px-2 rounded-full'
                                        :'bg-red-500 text-white py-1 px-2 rounded-full'}`}
                                >{item.status_solicitacao}</span>
                            </td>
                            <td className="text-center">
                                <span
                                    className={`flex justify-center text-xl ${item.status_solicitacao === "finalizado"? 'text-green-500 cursor-pointer': 'text-slate-500'}`}
                                    onClick={() => item.imagem !== "" ? handlerOpenModalDocument(item.imagem as string) : alert("Não tem arquivo")}
                                ><IconFilePdf /></span>
                            </td>
                            <td  className="text-center flex items-center justify-center gap-2 h-10">
                                <span className="text-green-700 cursor-pointer text-lg" onClick={() => handlerOpenInfoSolicitacao(item.id as string) }><IconEyeFill /></span>
                                <span
                                    className={`${item.status_solicitacao === 'finalizado/inconsistência' ? 'text-red-700 cursor-pointer' : 'text-gray-500'} text-lg`}
                                    onClick={()=> {item.status_solicitacao === 'finalizado/inconsistência' ? handlerEdit(item.id as string) : null}}
                                ><IconFileDocumentEdit /></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <section className="w-full h-32 flex items-center justify-center">
                <span className="text-xl text-slate-400 font-bold">Não há nenhum documento solicitado!</span>
            </section>
        )}
        </>
    )
}

export default ClientTable