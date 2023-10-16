import Link from "next/link"

const NotFound = () => {
    return(
        <main className='w-screen h-screen flex flex-col items-center justify-center'>
           <h1 className=" text-3xl font-semibold text-slate-700">404</h1>
           <p className="text-lg">Página não encontrada :(</p>
           <span>Clique para voltar aos <Link href="/documents" className="text-blue-700">Documentos</Link></span>
        </main>
    )
}

export default NotFound