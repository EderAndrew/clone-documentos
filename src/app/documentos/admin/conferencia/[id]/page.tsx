/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { UserCookie, getDocumentbyNumber, getHistoric, getRequestDocument, postHistoric, uploadDocument } from "@/api/route"
import { Request } from "@/interfaces/request"
import IconCopy from "../../../../../../public/icons/iconCopy"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { UseBase64 } from "@/hooks/base64"
import { useRouter } from 'next/navigation'
import { useDateFormat } from "@/hooks/dateFormat"
import { Historic } from "@/interfaces/historic"
import { SessionContext } from "@/providers/SessionProvider"
import { User } from "@/interfaces/user"
import TableEdit from "@/components/tables/TableEdit"

const PageDocument = ({params}: {params: {id: string}}) => {
    const [file, setFile] = useState("")
    const [info, setInfo] = useState<Request>()
    const [infoHistoric, setInfoHistoric] = useState<Historic[]>([])
    const [descricaoInconsistencia, setDescricaoInconsistencia] = useState("")
    const [dataUser, setDataUser] = useState<User[]>([])
    const [infoFile, setInfoFile] = useState<File>()
    const router = useRouter()
    const finishDate = useDateFormat(new Date())
    const dateHistoric = useDateFormat(new Date())
    const ctx = useContext(SessionContext)
    
    useEffect(()=>{
        (async()=>{
            const res:Request = await getDocumentbyNumber(params.id) as Request
            setInfo(res)
        })()
    },[])

    useEffect(()=>{
        (async()=>{
            const user:User[] = await UserCookie()
            setDataUser(user)
        })()
    },[])

    useEffect(()=>{
        (async()=>{
            const data:Historic[] = await getHistoric(info?.numero_solicitacao as string)
            if(data){
                setInfoHistoric(data)
            }
        })()
    },[])
    
    const verifyHistoric:Historic[] = infoHistoric.filter(item => item.status === "corrigir")

    const handleChangeFile = async(e: ChangeEvent<HTMLInputElement>) => {       
        if(e.target.files){
            setInfoFile(e.target.files[0])
            const fileBase64 = await UseBase64(e.target.files[0])
            setFile(fileBase64 as string)
        }
    }

    const handleUploadFile = async() => {
        ctx?.handleLoading(true)
        try{
            if(descricaoInconsistencia.length === 0 && !file) return
            const res:Request = await getRequestDocument(params.id as string)
            
            if(descricaoInconsistencia.length === 0){
             //dar um update no chamado
                const uploadImage:Request = {
                    id: params.id as string,
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
                    status_solicitacao: descricaoInconsistencia.length === 0 ? "finalizado" : "finalizado/inconsistência",
                    data_solicitacao: res.data_solicitacao,
                    nome_solicitante: res.nome_solicitante,
                    matricula_solicitante: res.matricula_solicitante,
                    op_banco: res.op_banco,
                    nome_operador: dataUser[0].name,
                    matricula_operador: dataUser[0].register,
                    op_operador: dataUser[0].op,
                    historico: res.historico,
                    imagem: file,
                    nome_imagem: infoFile?.name,
                    image_type: infoFile?.type,
                    image_size: infoFile?.size,
                    data_inicio_processo: res.data_inicio_processo,
                    data_finalizacao_processo: finishDate
                }
               
                await uploadDocument(uploadImage)
                router.push("/documentos/admin")
                ctx?.handleLoading(false)
            }
            if(descricaoInconsistencia.length > 0){
             //dar um update no chamado
                const uploadImage:Request = {
                    id: params.id as string,
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
                    status_solicitacao: descricaoInconsistencia.length === 0 ? "finalizado" : "finalizado/inconsistência",
                    data_solicitacao: res.data_solicitacao,
                    nome_solicitante: res.nome_solicitante,
                    matricula_solicitante: res.matricula_solicitante,
                    op_banco: res.op_banco,
                    nome_operador: dataUser[0].name,
                    matricula_operador: dataUser[0].register,
                    op_operador: dataUser[0].op,
                    historico: res.historico,
                    imagem: file,
                    nome_imagem: "",
                    image_type: "",
                    image_size: 0,
                    data_inicio_processo: res.data_inicio_processo,
                    data_finalizacao_processo: finishDate
                }
                const dtHistoric: Historic = {
                    nome_operador: dataUser[0].name ,
                    matricula_operador: dataUser[0].register,
                    data_informacao: dateHistoric,
                    data_correcao: "",
                    descricao: descricaoInconsistencia,
                    id_request: res.numero_solicitacao as string,
                    status: "corrigir"
                }
                await postHistoric(dtHistoric)
                await uploadDocument(uploadImage)
                router.replace("/documentos/admin")
                ctx?.handleLoading(false)
            }            
        }catch(err){
            console.log(err)
            ctx?.handleLoading(false)
        }
    }

    const copyClipboard = async (value: string) => {
        try{
            await navigator.clipboard.writeText(value)
        }catch(err){
            console.log("Não foi possível copiar.")
        }
    }

    return (
        <main className="w-full h-full overflow-auto pt-2 pr-2 pb-3 pl-1">
            <header className="flex justify-between items-center border-b pb-3">
                <h1 className="text-3xl font-bold text-slate-600">Documento {info?.nome_documento} {info?.sub_documento !== "" ? <span>/{info?.sub_documento}</span>: null}</h1>
                <div className="flex items-center">
                    <span className="font-semibold text-slate-500 mr-3">Numero da Solicitação: {info?.numero_solicitacao}</span>
                </div>
                
            </header>
            <nav className="flex text-sm text-slate-600 justify-between items-center mt-1 mb-4">
                <div className="flex gap-3">
                    <span>Solicitado por: {info?.nome_solicitante}</span>
                    <span>Matricula: {info?.matricula_solicitante}</span>
                </div>
                <div className="flex gap-3">
                    <span>Data da Solicitação: {info?.data_solicitacao}</span>
                    <span>op - {info?.op_banco}</span>
                </div>
            </nav>
            <div className="grid grid-cols-2 gap-3">
                <section>
                    <h1 className="text-2xl text-slate-500 font-semibold">Dados da Solicitação</h1>
                    <section className="mt-2 flex flex-col gap-1 mb-4">
                        {info?.nome_requerente_um !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Nome do Primeiro Requerente: 
                            <span className="text-semibold text-red-500 ml-1" id={info?.nome_requerente_um}>{info?.nome_requerente_um}</span>
                            <span className="ml-2 text-base cursor-pointer text-slate-400" onClick={()=>copyClipboard(info?.nome_requerente_um as string)}><IconCopy /></span>
                        </p>
                        )}
                        {info?.cpf_requerente_um !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">CPF do Primeiro Requerente: 
                            <span className="text-semibold text-red-500 ml-1" id={info?.cpf_requerente_um}>{info?.cpf_requerente_um}</span>
                            <span className="ml-2 text-base cursor-pointer text-slate-400" onClick={()=>copyClipboard(info?.cpf_requerente_um as string)}><IconCopy /></span>
                        </p>
                        )}
                        {info?.nome_requerente_dois !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Nome do Segundo Requerente: 
                            <span className="text-semibold text-red-500 ml-1" id={info?.nome_requerente_dois}>{info?.nome_requerente_dois}</span>
                                <span className="ml-2 text-base cursor-pointer text-slate-400" onClick={()=>copyClipboard(info?.nome_requerente_dois as string)}><IconCopy /></span></p>
                        )}
                        {info?.cpf_requerente_dois !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">CPF do Segundo Requerente: 
                            <span className="text-semibold text-red-500 ml-1" id={info?.cpf_requerente_dois}>{info?.cpf_requerente_dois}</span>
                            <span className="ml-2 text-base cursor-pointer text-slate-400" onClick={()=>copyClipboard(info?.cpf_requerente_dois as string)}><IconCopy /></span>
                        </p>
                        )}
                        {info?.data_nascimento !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Data de Nascimento:
                                <span className="text-semibold text-red-500 ml-1" id={info?.data_nascimento}>{info?.data_nascimento}</span>
                                <span className="ml-2 text-base cursor-pointer text-slate-400" onClick={()=>copyClipboard(info?.data_nascimento as string)}><IconCopy /></span>
                            </p>
                        )}
                        {info?.data_casamento !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Data de Casamento: 
                                <span className="text-semibold text-red-500 ml-1" id={info?.data_casamento}>{info?.data_casamento}</span>
                                <span className="ml-2 text-base cursor-pointer text-slate-400" onClick={()=>copyClipboard(info?.data_casamento as string)}><IconCopy /></span>
                            </p>
                        )}
                        {info?.data_obito !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Data de Óbito: 
                                <span className="text-semibold text-red-500 ml-1" id={info?.data_obito}>{info?.data_obito}</span>
                                <span className="ml-2 text-base cursor-pointer text-slate-400" onClick={()=>copyClipboard(info?.data_obito as string)}><IconCopy /></span>
                            </p>
                        )}
                        {info?.estado !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Estado: 
                                <span className="text-semibold text-red-500 ml-1" id={info?.estado}>{info?.estado}</span>
                                <span className="ml-2 text-base cursor-pointer text-slate-400" onClick={()=>copyClipboard(info?.estado as string)}><IconCopy /></span>
                            </p>
                        )}
                        {info?.cidade !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Cidade:
                                <span className="text-semibold text-red-500 ml-1" id={info?.cidade}>{info?.cidade}</span>
                                <span className="ml-2 text-base cursor-pointer text-slate-400" onClick={()=>copyClipboard(info?.cidade as string)}><IconCopy /></span>
                            </p>
                        )}
                        {info?.cartorio_registro_imovel !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Cartório de Registro de Imóvel: 
                                <span className="text-semibold text-red-500 ml-1" id={info?.cartorio_registro_imovel}>{info?.cartorio_registro_imovel}</span>
                                <span className="ml-2 text-base cursor-pointer text-slate-400" onClick={()=>copyClipboard(info?.cartorio_registro_imovel as string)}><IconCopy /></span>
                            </p>
                        )}
                        {info?.cartorio_registro_civil !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Cartório de Registro Civil: 
                                <span className="text-semibold text-red-500 ml-1" id={info?.cartorio_registro_civil}>{info?.cartorio_registro_civil}</span>
                                <span className="ml-2 text-base cursor-pointer text-slate-400" onClick={()=>copyClipboard(info?.cartorio_registro_civil as string)}><IconCopy /></span>
                            </p>
                        )}
                        {info?.numero_matricula !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Número da Matricula: 
                                <span className="text-semibold text-red-500 ml-1" id={info?.numero_matricula}>{info?.numero_matricula}</span>
                                <span className="ml-2 text-base cursor-pointer text-slate-400" onClick={()=>copyClipboard(info?.numero_matricula as string)}><IconCopy /></span>
                            </p>
                        )}
                        {info?.inscricao_municipal_imovel !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Inscrição Municipal do Imóvel: 
                                <span className="text-semibold text-red-500 ml-1" id={info?.inscricao_municipal_imovel}>{info?.inscricao_municipal_imovel}</span>
                                <span className="ml-2 text-base cursor-pointer text-slate-400" onClick={()=>copyClipboard(info?.inscricao_municipal_imovel as string)}><IconCopy /></span>
                            </p>
                        )}
                    </section>
                    <section className="mt-2">
                        <h1 className="text-semibold text-xl text-slate-700 mb-1.5">Inconsistência</h1>
                        <textarea
                            className="w-full h-24 border p-1 border-slate-300 rounded-md resize-none text-slate-600 font-semibold"
                            value={descricaoInconsistencia}
                            onChange={(event)=>setDescricaoInconsistencia(event.target.value)}
                            placeholder="Descreva somente o essencial do Problema. Ex: Erro no CPF"
                        ></textarea>
                    </section>
                    {descricaoInconsistencia.length === 0 && (
                        <div>
                            <label className="block mt-4">
                                <span className="block text-base mb-2 text-slate-500 font-semibold">Anexar um Arquivo</span>
                                <input type="file" required={descricaoInconsistencia.length === 0 ? true : false} className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-violet-50 file:text-violet-700
                                    hover:file:bg-violet-100" hidden
                                    onChange={(event) => handleChangeFile(event)}
                                />
                            </label>
                        </div>
                    )}
                    
                </section>
                {verifyHistoric && verifyHistoric[0]?.status !== "corrigir" && (
                    <section className="flex flex-col justify-end">
                    {descricaoInconsistencia.length === 0 ? (
                        <div className="flex justify-end">
                            <button onClick={handleUploadFile} className="bg-green-600 w-96 h-12 text-white rounded-full shadow-md">ENVIAR DOCUMENTO</button>
                        </div>
                    ) : (
                        <div className="flex justify-end">
                            <button onClick={handleUploadFile} className="bg-red-600 w-96 h-12 text-white rounded-full shadow-md">ENVIAR COM INCONSISTÊNCIA</button>
                        </div>
                    )}
                </section>
                )}
            </div>
            <footer className="mt-4">
            {infoHistoric.length > 0 && (
                <div className="mt-3">
                    <p className="text-lg font-semibold text-slate-700">Histórico de Inconsistências</p>
                    <div className="border  border-slate-100 p-1 rounded overflow-auto h-44">
                        <TableEdit historic={infoHistoric}/>
                    </div> 
                </div>
            )}
            {infoHistoric.length === 0 && (
                <div>
                    <h1 className="text-lg font-semibold text-slate-600">Histórico de Inconsistências</h1>
                    <div className="w-full h-44 border border-slate-300 rounded-md overflow-auto">
                        <div className="flex w-full h-full items-center justify-center">
                            <span className="font-semibold text-slate-300">Não há nenhuma informação de inconsistência para essa solicitação.</span>
                        </div>
                    </div>
                </div>
            )}
            </footer>
            
        </main>
    )
}

export default PageDocument