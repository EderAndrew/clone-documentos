'use client'
import { SessionContext } from "@/providers/sessionProvider"
import { useContext } from "react"

const InfoModalMatricula = () => {
    const ctx = useContext(SessionContext)
    
    return(
        <section>
            <p>Documento: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.nome_documento}</span></p>
            <p>Estado: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.estado}</span></p>
            <p>Cidade: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.cidade}</span></p>
            <p>Cartório de Registro de Imóveis: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.cartorio_registro_imovel}</span></p>
            <p>Número de Matricula: <span className="font-semibold text-red-500">{ctx?.documentoSolicitado && ctx.documentoSolicitado?.numero_matricula}</span></p>
        </section>
    )
}

export default InfoModalMatricula