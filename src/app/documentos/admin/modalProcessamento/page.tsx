'use client'
import {useContext, useEffect, useState} from 'react'
import { SessionContext } from "@/providers/SessionProvider"
import { useDateFormat } from '@/hooks/dateFormat'
import { Request } from '@/interfaces/request'
import { useRouter } from 'next/navigation'
import { UserCookie, getRequestDocument, putStartProcces } from '@/api/route'
import { User } from '@/interfaces/user'

const ModalProcessamento = () => {
    const [dataUser, setDataUser] = useState<User[]>([])
    const ctx = useContext(SessionContext)
    const start_date = useDateFormat(new Date())
    const router = useRouter()

    useEffect(()=>{
        (async()=>{
            const user:User[] = await UserCookie()
            setDataUser(user)
        })()
    },[])
    
    const handleUpdateProcess = async () => {
        ctx?.handleLoading(true)
        try{
            const res:Request = await getRequestDocument(ctx?.docInfo?.id as string)
             //dar um update no chamado
            const dataStartProccess:Request = {
                id: ctx?.docInfo?.id as string,
                numero_solicitacao: res.numero_solicitacao,
                nome_documento: res.nome_documento,
                sub_documento: res.sub_documento,
                estado: res.estado,
                cidade: res.cidade,
                cartorio_registro_imovel: res.cartorio_registro_imovel,
                numero_matricula: res.numero_matricula,
                cartorio_registro_civil: res.cartorio_registro_civil,
                nome_requerente_um: res.nome_requerente_um,
                nome_requerente_dois: res.nome_requerente_dois,
                cpf_requerente_um: res.cpf_requerente_um,
                cpf_requerente_dois: res.cpf_requerente_dois,
                data_nascimento: res.data_nascimento,
                data_casamento: res.data_casamento,
                data_obito: res.data_obito,
                inscricao_municipal_imovel: res.inscricao_municipal_imovel,
                status_solicitacao: "processamento",
                data_solicitacao: res.data_solicitacao,
                nome_solicitante: res.nome_solicitante,
                matricula_solicitante: res.matricula_solicitante,
                op_banco: res.op_banco,
                nome_operador: dataUser[0].name,
                matricula_operador: dataUser[0].register,
                op_operador: dataUser[0].op,
                historico: "",
                imagem: "",
                nome_imagem: "",
                image_type: "",
                image_size: 0,
                data_inicio_processo: start_date,
                data_finalizacao_processo: ""
            }

            await putStartProcces(dataStartProccess)

            //navegar pra outra tela
            router.push(`/documentos/admin/conferencia/${ctx?.docInfo?.id as string}`)
            ctx?.handleOpenModalProccess(false)
            ctx?.handleLoading(false)
            
        }catch(error){
            console.log(error)
            ctx?.handleLoading(false)
        }
        
    }

    return (
        <>
        {ctx?.openModalProccess && (
            <main className="fixed z-10 w-screen h-screen bg-slate-900/60 flex items-center justify-center">
                <section className="w-[50%] bg-white rounded-md flex flex-col items-center justify-center gap-3 p-3">
                    <p className="text-2xl text-slate-600">Você esta prestes a iniciar o Processamento do Documento:</p>
                    <p className="text-xl text-slate-500 font-bold">{ctx.docInfo?.nome}</p>
                    <p className="text-2xl text-slate-500 font-bold">{ctx.docInfo?.numero}</p>
                    <p className="text-lg text-red-500">Deseja Continuar?</p>
                    <div className="w-full flex justify-center gap-5 mb-12">
                        <button
                            className="bg-red-600 w-52 h-12 text-white rounded-full mt-8"
                            onClick={()=>ctx.handleOpenModalProccess(false)}
                        >VOLTAR</button>
                            <button
                            className="bg-green-600 w-52 h-12 text-white rounded-full mt-8"
                            onClick={handleUpdateProcess}
                        >INICIAR</button>
                        </div>
                </section>
            </main>
        )}
        </>
    )
}

export default ModalProcessamento