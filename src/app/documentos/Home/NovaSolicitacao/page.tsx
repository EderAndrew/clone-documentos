'use client'
import { useContext, useEffect, useState } from 'react'
import { SessionContext } from "@/providers/sessionProvider"
import Matricula from './matricula/page'
import Certidao from './certidao/page'
import IPTU from './iptu/page'
import { Estado } from '@/interfaces/estado'
import axios from 'axios'

const NovaSolicitacao = () => {
    const ctx = useContext(SessionContext)
    const [estados, setEstados] = useState<Estado[]>([])

    useEffect(()=>{
        (async()=>{
            try{
                const res = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
                const data = await res.data
                setEstados(data)
            }catch(err){
                console.log(err)
            }
        })()
    },[])

    return(
        <section className="mt-3">
            <h1 className="text-2xl font-bold text-slate-500">Nova Solicitação de Documento</h1>
            <div className="mt-6">
                <div className="flex flex-col">
                    <label htmlFor="documentos" className="text-lg text-slate-600 font-semibold">Tipo de Documento</label>
                    <select className="border w-96 border-slate-400 bg-white h-12 rounded-md px-2 text-lg font-semibold text-slate-600" onChange={(e)=>ctx?.handlerTypeDocument(e.target.value)}>
                        <option value="Matricula" className="font-sans">Matricula</option>
                        <option value="Certidão de Estado Civil" className="font-sans">Certidão de Estado Civil</option>
                        <option value="IPTU" className="font-sans">IPTU</option>
                    </select>
                </div>
                {ctx?.typeDocument === "Matricula" && (
                    <Matricula estados={estados} />
                )}
                {ctx?.typeDocument === "Certidão de Estado Civil" && (
                    <Certidao estados={estados}/>
                )}
                {ctx?.typeDocument === "IPTU" && (
                    <IPTU estados={estados}/>
                )}
            </div>
            
            
        </section>
    )
}

export default NovaSolicitacao