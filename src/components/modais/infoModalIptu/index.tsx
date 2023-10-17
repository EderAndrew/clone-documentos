'use client'
import { SessionContext } from "@/providers/sessionProvider"
import { useContext } from "react"

const InfoModalIPTU = () => {
    const ctx = useContext(SessionContext)
    
    return(
        <section>
            <p>Documento: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.nome_documento}</span></p>
            <p>Estado: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.estado}</span></p>
            <p>Cidade: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.cidade}</span></p>
            <p>Inscrição Municipal do Imóvel: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.inscricao_municipal_imovel}</span></p>
            <p>CPF do Primeiro Requerente: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.cpf_requerente_um}</span></p>
            <p>CPF do Segundo Requerente: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.cpf_requerente_dois}</span></p>
        </section>
    )
}

export default InfoModalIPTU