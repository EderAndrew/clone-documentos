'use client'
import { userFormatDateCertidao } from "@/hooks/dateFormatCertidao"
import { SessionContext } from "@/providers/sessionProvider"
import { useContext, useState } from "react"

const InfoModalCertidao = () => {
    const ctx = useContext(SessionContext)  
    
    return(
        <section>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <p>Documento: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.nome_documento}</span></p>
                    <p>Estado: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.estado}</span></p>
                    <p>Cidade: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.cidade}</span></p>
                </div>
                <div>
                    <p>Tipo: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.sub_documento}</span></p>
                    <p>Cartório de Registro Civil: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.cartorio_registro_civil}</span></p>
                    {ctx?.documentoSolicitado?.sub_documento === "Certidão de Nascimento" && (
                        <p>Data de Nascimento: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.data_nascimento}</span></p>
                    )}
                    {ctx?.documentoSolicitado?.sub_documento === "Certidão de Casamento" && (
                        <p>Data de Casamento: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.data_casamento}</span></p>
                    )}
                    {ctx?.documentoSolicitado?.sub_documento === "Certidão de Óbito" && (
                        <p>Data de Óbito: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.data_obito}</span></p>
                    )}
                </div>
            </div>
           <div className="grid grid-cols-2 gap-2 border border-slate-100 rounded-md bg-slate-50 mt-4">
                <div>
                    <p>Nome do 1º Requerente: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.nome_requerente_um}</span></p>
                    <p>Nome do 2º Requerente: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.nome_requerente_dois}</span></p>
                </div>
                <div>
                    <p>CPF do 1º Requerente: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.cpf_requerente_um}</span></p>
                    <p>CPF do 2º Requerente: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.cpf_requerente_dois}</span></p>
                </div>
           </div>
           

        </section>
    )
}

export default InfoModalCertidao