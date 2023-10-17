/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { getDocumentbyNumber, getHistoric } from "@/api/route"
import { Request } from "@/interfaces/request"
import { useEffect, useState } from "react"
import { Historic } from "@/interfaces/historic"
import TableEdit from "@/components/tables/TableEdit"

const Finalizado = ({params}: {params: {id: string}}) => {
    const [info, setInfo] = useState<Request>()
    const [infoHistoric, setInfoHistoric] = useState<Historic[]>([])
   
        
    useEffect(()=>{
        (async()=>{
            const res:Request = await getDocumentbyNumber(params.id) as Request
            setInfo(res)
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
    
    return (
        <main className="w-full h-full overflow-auto pt-2 pr-2 pb-3 pl-1">
            <header className="flex justify-between items-center border-b pb-3">
                <h1 className="text-3xl font-bold text-slate-600">Documento {info?.status_solicitacao}: {info?.nome_documento} {info?.sub_documento !== "" ? <span>/{info?.sub_documento}</span>: null}</h1>
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
            <span className="text-red-500 font-semibold">{info?.status_solicitacao === "finalizado" ? "Finalizado com sucesso." : "Finalizado com inconsistências! Aguardando a correção do Solicitante."}</span>
                <section>
                    <h1 className="text-2xl text-slate-500 font-semibold">Dados da Solicitação</h1>
                    <section className="mt-2 flex flex-col gap-1 mb-4">
                        {info?.nome_requerente_um !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Nome do Primeiro Requerente: 
                            <span className="text-semibold text-red-500 ml-1" id={info?.nome_requerente_um}>{info?.nome_requerente_um}</span>
                            
                        </p>
                        )}
                        {info?.cpf_requerente_um !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">CPF do Primeiro Requerente: 
                            <span className="text-semibold text-red-500 ml-1" id={info?.cpf_requerente_um}>{info?.cpf_requerente_um}</span>
                            
                        </p>
                        )}
                        {info?.nome_requerente_dois !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Nome do Segundo Requerente: 
                            <span className="text-semibold text-red-500 ml-1" id={info?.nome_requerente_dois}>{info?.nome_requerente_dois}</span>
                                </p>
                        )}
                        {info?.cpf_requerente_dois !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">CPF do Segundo Requerente: 
                            <span className="text-semibold text-red-500 ml-1" id={info?.cpf_requerente_dois}>{info?.cpf_requerente_dois}</span>
                            
                        </p>
                        )}
                        {info?.data_nascimento !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Data de Nascimento:
                                <span className="text-semibold text-red-500 ml-1" id={info?.data_nascimento}>{info?.data_nascimento}</span>
                                
                            </p>
                        )}
                        {info?.data_casamento !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Data de Casamento: 
                                <span className="text-semibold text-red-500 ml-1" id={info?.data_casamento}>{info?.data_casamento}</span>
                                
                            </p>
                        )}
                        {info?.data_obito !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Data de Óbito: 
                                <span className="text-semibold text-red-500 ml-1" id={info?.data_obito}>{info?.data_obito}</span>
                                
                            </p>
                        )}
                        {info?.estado !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Estado: 
                                <span className="text-semibold text-red-500 ml-1" id={info?.estado}>{info?.estado}</span>
                                
                            </p>
                        )}
                        {info?.cidade !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Cidade:
                                <span className="text-semibold text-red-500 ml-1" id={info?.cidade}>{info?.cidade}</span>
                                
                            </p>
                        )}
                        {info?.cartorio_registro_imovel !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Cartório de Registro de Imóvel: 
                                <span className="text-semibold text-red-500 ml-1" id={info?.cartorio_registro_imovel}>{info?.cartorio_registro_imovel}</span>
                                
                            </p>
                        )}
                        {info?.cartorio_registro_civil !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Cartório de Registro Civil: 
                                <span className="text-semibold text-red-500 ml-1" id={info?.cartorio_registro_civil}>{info?.cartorio_registro_civil}</span>
                                
                            </p>
                        )}
                        {info?.numero_matricula !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Número da Matricula: 
                                <span className="text-semibold text-red-500 ml-1" id={info?.numero_matricula}>{info?.numero_matricula}</span>
                                
                            </p>
                        )}
                        {info?.inscricao_municipal_imovel !== "" && (
                            <p className="text-slate-600 flex text-lg items-center">Inscrição Municipal do Imóvel: 
                                <span className="text-semibold text-red-500 ml-1" id={info?.inscricao_municipal_imovel}>{info?.inscricao_municipal_imovel}</span>
                               
                            </p>
                        )}
                    </section>                   
                </section>
            </div>
            <footer className="mt-4">
            <div className="mt-3">
                <p className="text-lg font-semibold text-slate-700">Histórico de Inconsistências</p>
                {infoHistoric.length > 0 ? (
                    <div className="border  border-slate-100 p-1 rounded overflow-auto h-44">
                        <TableEdit historic={infoHistoric}/>
                    </div> 
                ):(
                    <div className="flex w-full h-full items-center justify-center">
                        <span className="font-semibold text-slate-300">Não há nenhuma informação de inconsistência para essa solicitação.</span>
                    </div>
                )}
                
            </div>
            </footer>
            
        </main>
    )
}

export default Finalizado