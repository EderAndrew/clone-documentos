import { UserCookie, getRequestDocuments } from "@/api/route"
import { SearchInput } from "@/components/SearchInput"
import { TableAdmin } from "@/components/tables"
import { Request } from "@/interfaces/request"
import { User } from "@/interfaces/user"

const Admin = async() => {
    const requests:Request[] = await getRequestDocuments()
    const user:User = UserCookie()[0]

    return(
        <main>
            <header className="mt-4">
               <h1 className="text-2xl font-semibold text-slate-700">Documentos Solicitados</h1>
               <div className="flex justify-between mt-4">
                    <span className="italic font-semibold text-lg text-slate-700">Olá, {user.name} !</span>
                    <SearchInput />
                </div>
            </header>
            <section className="mt-8">
                <label className="text-xl font-semibold text-slate-600 mb-2">Documentos</label>
                <TableAdmin 
                    documents={requests}
                />
            </section>
        </main>
        
    )
}

export default Admin