'use client'
import { useContext } from 'react'
import { DocInfo, SessionContext } from "@/providers/sessionProvider"
import { Request } from '@/interfaces/request'
import IconEyeFill from '../../../public/icons/iconEyeFill'
import IconFileDocumentEdit from '../../../public/icons/iconFileDocumentEdit'
import Link from 'next/link'

type Props = {
    documents:Request[]
}
export const TableAdmin = ({documents}:Props) => {
    const ctx = useContext(SessionContext)

    const handlerStarProccess = (id: string, num: string, name: string) => {
        const data: DocInfo = {
            id,
            numero: num,
            nome: name
        }
        ctx?.handleDocInfo(data)
        ctx?.handleOpenModalProccess(true)
    }

    return(
        <table className="table-auto w-full">
            <thead className="border-b h-10 text-slate-700">
                <tr>
                    <th>Número</th>
                    <th>Documento</th>
                    <th>Tipo</th>
                    <th>Data da Solicitação</th>
                    <th>Nome do Solicitante</th>
                    <th>Status</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody className="">
                {documents && documents.map((item, index) => (
                    <tr key={item.id} className={`h-10 border-b text-slate-700 text-sm ${index % 2 !== 0 ? "bg-gray-50" : "bg-white"}`}>
                        <td  className="text-center">{item.numero_solicitacao}</td>
                        <td  className="text-center">{item.nome_documento}</td>
                        <td  className="text-center">{item.sub_documento}</td>
                        <td  className="text-center">{item.data_solicitacao}</td>
                        <td  className="text-center">{item.nome_solicitante}</td>
                        <td  className={`text-center `}>
                            <span
                                className={`
                                    ${item.status_solicitacao === 'solicitado' ? 'bg-blue-600 text-white py-1 px-2 rounded-full' 
                                    : item.status_solicitacao === 'processamento' ? 'bg-yellow-600 text-white py-1 px-2 rounded-full' 
                                    : item.status_solicitacao === 'finalizado' ? 'bg-green-500 text-white py-1 px-2 rounded-full'
                                    :'bg-red-500 text-white py-1 px-2 rounded-full'}`}
                            >{item.status_solicitacao}</span>
                        </td>
                        <td  className="text-center flex items-center justify-center gap-2 h-10">
                            {item.status_solicitacao === 'solicitado' && (
                                <span onClick={()=>handlerStarProccess(item.id as string, item.numero_solicitacao as string, item.nome_documento as string)} className="text-blue-600 hover:text-blue-700 text-xl cursor-pointer"><IconFileDocumentEdit /></span>
                            )}
                            {item.status_solicitacao === "processamento" && (
                                <Link href={`/documentos/admin/conferencia/${item.id}`}><span onClick={()=>console.log('teste')} className="text-yellow-600 hover:text-yellow-700 text-xl cursor-pointer"><IconFileDocumentEdit /></span></Link>
                            )}   
                            {item.status_solicitacao === "finalizado" && (
                                <Link href={`/documentos/admin/finalizados/${item.id}`}><span className="text-green-500 cursor-pointer text-xl hover:text-green-600"><IconEyeFill /></span></Link>
                            )}
                            {item.status_solicitacao === "finalizado/inconsistência" && (
                                <Link href={`/documentos/admin/finalizados/${item.id}`}><span className="text-red-500 cursor-pointer text-xl hover:text-red-600" onClick={()=>console.log("abrir modal")}><IconEyeFill /></span></Link>
                            )}                          
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
