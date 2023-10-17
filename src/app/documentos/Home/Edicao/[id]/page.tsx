import { getDocumentbyNumber, getHistoric } from "@/api/route"
import { Request } from "@/interfaces/request"
import { Historic } from "@/interfaces/historic"
import dynamic from "next/dynamic"
import EditMatricula from "@/components/edit/editMatricula/page"
import EditCertidao from "@/components/edit/editCertidao/page"
import EditIPTU from "@/components/edit/editIPTU/page"

const TableEdit = dynamic(() => import('@/components/tables/TableEdit'), { ssr: false })

const Edicao = async({params}:{params: {id: string}}) => {
    const document:Request = await getDocumentbyNumber(params.id)
    const historic:Historic[] = await getHistoric(document.numero_solicitacao as string)
    
    const oneHistoric:Historic[] = historic.filter(item => item.status === "corrigir") as Historic[]

    return(
        <main className="mt-2">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-slate-700">Editar Documento {document.nome_documento}</h1>
                <div className="flex flex-col items-end">
                    <p className="text-xs font-semibold text-slate-600">Numero da Solicitação: <span className="text-blue-500">{document.numero_solicitacao}</span></p>
                    <p className="text-xs font-semibold text-slate-600">Data da Solicitação: <span className="text-blue-500">{document.data_solicitacao}</span></p>
                </div>
            </header>
            <section className="mt-4">
                <h2 className="text-xl font-semibold text-slate-600">Inconsistências</h2>
                <div className="border border-slate-50 h-32 overflow-auto p-1">
                    <TableEdit historic={historic}/>
                </div>
                
            </section>
            {document.nome_documento === "Matricula" && (
                <EditMatricula oneHistoric={oneHistoric} historic={historic} document={document}/>
            )}
            {document.nome_documento === "Certidão de Estado Civil" && (
                <EditCertidao oneHistoric={oneHistoric} historic={historic} document={document}/>
            )}
            {document.nome_documento === "IPTU" && (
                <EditIPTU oneHistoric={oneHistoric} historic={historic} document={document}/>
            )}
        </main>
    )
}

export default Edicao