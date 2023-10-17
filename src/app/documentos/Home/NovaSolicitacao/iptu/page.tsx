'use client'
import { Estado } from "@/interfaces/estado"
import { SubmitHandler, useForm } from "react-hook-form"
import { Request } from "@/interfaces/request"
import { useContext, useEffect, useState } from "react"
import { Cidade } from "@/interfaces/cidade"
import axios from "axios"
import { User } from "@/interfaces/user"
import { UserCookie } from "@/api/route"
import { useDateFormat } from "@/hooks/dateFormat"
import { SessionContext } from "@/providers/sessionProvider"

type Props={
    estados: Estado [] | undefined
}

const IPTU = ({estados}:Props) => {
    const [cidades, setCidades] = useState<Cidade[]>([])
    const [nomeEstado, setNomeEstado] = useState("")
    const [dataUser, setDataUser] = useState<User[]>([])
    const dtSolicitacao = useDateFormat(new Date())
    const ctx = useContext(SessionContext)

    useEffect(()=>{
        (async()=>{
            const user:User[] = await UserCookie()
            console.log("user: ",user)
            setDataUser(user)
        })()
    },[])
    
    const {
        control,
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<Request>()

    const handleSendDocument: SubmitHandler<Request> = async (data) => {
        const randomNumber = Math.random() * 10000
        const infodate = new Date()
        const year = infodate.getFullYear()
        const randomId = `${year}-${randomNumber.toFixed()}`

        const saveSolicitacao:Request = {
            numero_solicitacao: randomId,
            nome_documento: ctx?.typeDocument,
            sub_documento: "",
            id_estado: data.estado,
            estado: nomeEstado,
            cidade: data.cidade,
            cartorio_registro_imovel: "",
            numero_matricula: "",
            cartorio_registro_civil: "",
            nome_requerente_um: "",
            nome_requerente_dois: "",
            cpf_requerente_um: data.cpf_requerente_um ? data.cpf_requerente_um : "",
            cpf_requerente_dois: data.cpf_requerente_dois ? data.cpf_requerente_dois : "",
            data_nascimento: "",
            data_casamento: "",
            data_obito: "",
            inscricao_municipal_imovel: data.inscricao_municipal_imovel,
            status_solicitacao: "solicitado",
            data_solicitacao: dtSolicitacao,
            nome_solicitante: dataUser[0].name,
            matricula_solicitante: dataUser[0].register,
            op_banco: dataUser[0].op_banco,
            nome_operador: "",
            matricula_operador: "",
            op_operador: "",
            historico: randomId,
            imagem: "",
            nome_imagem:"",
            image_type: "",
            image_size: 0,
            data_inicio_processo: "",
            data_finalizacao_processo: ""
        }

        ctx?.handlerDocumentoSolicitado(saveSolicitacao)
        ctx?.handleOpenModalSolicitacaoDoc(true)
        
    }

    const handleCidade = async(e: string) => {
        const resp = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e}/municipios`)
        const data = await resp.data
        
        const municipioUf = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e}`)
        const uf:Cidade = await municipioUf.data
        
        setCidades(data)
        setNomeEstado(uf.nome)
    }

    return(
        <main>
            <form className="border bg-slate-50 p-2 mt-4 rounded-md" onSubmit={handleSubmit(handleSendDocument)}>  
                <section className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col mb-1.5">
                        <label className="text-slate-600">Estados</label>
                        <select {...register("estado")} className="border w-full border-slate-400 bg-white h-12 rounded-md px-2 text-lg text-slate-500 font-semibold" onChange={(e)=>handleCidade(e.target.value)} required>
                            <option></option>
                            {estados && estados.map(item => (
                                <option key={item.id} value={item.id} className="font-sans">{item.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-1.5">
                        <label className="text-slate-600">Cidades</label>
                        <select {...register("cidade")} className="border w-full border-slate-400 bg-white h-12 rounded-md px-2 text-lg text-slate-500 font-semibold" disabled={cidades.length === 0 ? true : false} required>
                            <option value="" className="font-sans"></option>
                            {cidades && cidades.map(item => (
                                <option key={item.id} value={item.nome} className="font-sans">{item.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-1.5">
                        <label className="text-slate-600">Inscrição Municipal do Imóvel</label>
                        <input {...register("inscricao_municipal_imovel")} placeholder="Ex: 12345678" type="text" className="border w-96 border-slate-400 h-12 rounded-md px-2 text-lg text-slate-500 font-semibold mb-1.5"/>
                    </div>
                </section>
                <section className="">
                    <label className="text-slate-600 mb-1.5">
                        <p>CPF do Primeiro Requerente:</p>
                        <input {...register("cpf_requerente_um")} placeholder="Ex: 123.456.789-10" type="text" className="border w-96 border-slate-400 h-12 rounded-md px-2 text-lg text-slate-500 font-semibold mb-1.5"/>
                    </label>
                    <label className="text-slate-600 mb-1.5">
                        <p>CPF do Segundo Requerente:</p>
                        <input {...register("cpf_requerente_dois")} placeholder="Ex: 123.456.789-10" type="text" className="border w-96 border-slate-400 h-12 rounded-md px-2 text-lg text-slate-500 font-semibold mb-1.5"/>
                    </label>
                </section>
                <div className="w-full flex justify-end">
                    <button
                     className="bg-green-600 w-52 h-12 text-white rounded-full mt-8 text-xl"
                    >Solicitar</button>
                </div>
            </form>
        </main>
    )
}

export default IPTU