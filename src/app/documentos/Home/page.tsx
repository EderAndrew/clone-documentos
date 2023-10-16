
import { UserCookie, getRequestDocuments } from "@/api/route"
import ClientTable from "@/components/tables/ClientTable"
import { Request } from "@/interfaces/request"
import { User } from "@/interfaces/user"
import Link from "next/link"
import { SearchInput } from "@/components/SearchInput"

const Documents = async() => {
    const myDocuments:Request[] = await getRequestDocuments()
    const user:User = await UserCookie()[0]
    
    const searchDocuments:Request[] = myDocuments.filter(item => myDocuments.includes(item))

    return(
        <section className="mt-3 pr-2">
            <h1 className="text-2xl mb-4 font-bold text-slate-600">Sistema Bancário de Solicitação de Documentos</h1>
            <div className="flex justify-between">
                <span className="italic font-semibold text-lg text-slate-700">Olá, {user.name} !</span>
                <SearchInput />
            </div>
            <section className="mt-8 flex flex-col">
                <span className="text-xl text-slate-500 font-semibold mb-4">Minhas Solicitações</span>
                <ClientTable myDocuments={myDocuments}/>
            </section>
            <div className="mt-12 flex justify-end">
                <Link href={'/documentos/Home/nova_solicitacao'} className="flex items-center justify-center bg-purple-800 text-white p-2 h-14 w-48 rounded-full hover:bg-purple-900">Solicitar Documento</Link>
            </div>
        </section>
    )
}

export default Documents