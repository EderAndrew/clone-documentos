'use client'
import { Estado } from "@/interfaces/estado"
import { SubmitHandler, useForm } from "react-hook-form"
import { Request } from "@/interfaces/request"
import { useContext, useEffect, useState } from "react"
import { Cidade } from "@/interfaces/cidade"
import axios from "axios"
import { User } from "@/interfaces/user"
import { useDateFormat } from "@/hooks/dateFormat"
import { SessionContext } from "@/providers/sessionProvider"
import { UserCookie } from "@/api/route"
import { Historic } from "@/interfaces/historic"
import { useCpfMask } from "@/hooks/cpfMask"

type Props={
    document: Request,
    historic: Historic[],
    oneHistoric: Historic[]
}

const EditIPTU = ({document, oneHistoric}:Props) => {
    const [cidades, setCidades] = useState<Cidade[]>([])
    const [cpfInput1, setCpfInput1] = useState(document.cpf_requerente_um as string)
    const [cpfInput2, setCpfInput2] = useState(document.cpf_requerente_dois as string)
    const [nomeEstado, setNomeEstado] = useState("")
    const [dataUser, setDataUser] = useState<User[]>([])
    const dtSolicitacao = useDateFormat(new Date())
    const ctx = useContext(SessionContext)
    const [estados, setEstados] = useState<Estado[]>([])
    const dateCorrectHistoric = useDateFormat(new Date())
    const [escolherEstado, setEscolherEstado] = useState(false)

    const cpf1 = useCpfMask(cpfInput1)
    const cpf2 = useCpfMask(cpfInput2)
    
    useEffect(()=>{
        (async()=>{
            const user:User[] = await UserCookie()
            setDataUser(user)
        })()
    },[])

    useEffect(()=>{
        (async()=>{
            const res = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            const data = await res.data
            setEstados(data)
        })()
    },[])

    const {
        control,
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<Request>()

    const handleEditDocument: SubmitHandler<Request> = async (data) => {      

        const saveSolicitacao:Request = {
            id: document.id,
            numero_solicitacao: document.numero_solicitacao,
            nome_documento: document.nome_documento,
            sub_documento: "",
            estado: escolherEstado ? nomeEstado : document.estado,
            cidade: data.cidade,
            cartorio_registro_imovel: "",
            numero_matricula: "",
            cartorio_registro_civil: "",
            nome_requerente_um: "",
            nome_requerente_dois: "",
            cpf_requerente_um: data?.cpf_requerente_um,
            cpf_requerente_dois: data?.cpf_requerente_dois,
            data_nascimento: "",
            data_casamento: "",
            data_obito: "",
            inscricao_municipal_imovel: data.inscricao_municipal_imovel,
            status_solicitacao: "solicitado",
            data_solicitacao: document.data_solicitacao,
            nome_solicitante: dataUser[0].name,
            matricula_solicitante: dataUser[0].register,
            op_banco: dataUser[0].op_banco,
            nome_operador: document.nome_operador,
            matricula_operador: document.matricula_operador,
            op_operador: document.op_operador,
            historico: document.numero_solicitacao,
            imagem: "",
            nome_imagem:"",
            image_type: "",
            image_size: 0,
            data_inicio_processo: document.data_inicio_processo,
            data_finalizacao_processo: ""
        }

        const dtHistoric: Historic = {
            id: oneHistoric[0].id,
            nome_operador:oneHistoric[0].nome_operador,
            matricula_operador: oneHistoric[0].matricula_operador,
            data_informacao: oneHistoric[0].data_informacao,
            data_correcao: dateCorrectHistoric,
            descricao: oneHistoric[0].descricao,
            id_request: oneHistoric[0].id_request,
            status: "corrigido"
        }

        ctx?.handleEdit(true)
        ctx?.handlerEditHistoric(dtHistoric)
        ctx?.handlerDocumentoSolicitado(saveSolicitacao)
        ctx?.handleOpenModalSolicitacaoDoc(true)
        
    }

    const handleCidade = async(e: string) => {
        setEscolherEstado(true)
        const resp = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e}/municipios`)
        const data = await resp.data
        
        const municipioUf = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e}`)
        const uf:Cidade = await municipioUf.data
        
        setCidades(data)
        setNomeEstado(uf.nome)
    }

    return(
        <main>
            <form className="border bg-slate-50 p-2 mt-4 rounded-md" onSubmit={handleSubmit(handleEditDocument)}>  
                <section className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col mb-1.5">
                        <label className="text-slate-600">Estados</label>
                        <select
                            {...register("estado")}
                            className="border w-full border-slate-400 bg-white h-12 rounded-md px-2 text-lg text-slate-500 font-semibold"
                            onChange={(e)=>handleCidade(e.target.value)}
                            defaultValue={document.estado}
                            required
                        >
                            <option></option>
                            {estados && estados.map(item => (
                                <option 
                                    key={item.id}
                                    value={item.id}
                                    className="font-sans"
                                    selected={item.nome === document.estado}
                                >{item.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-1.5">
                        <label className="text-slate-600">Cidades</label>
                        <select 
                            {...register("cidade")}
                            defaultValue={document.cidade}
                            className="border w-full border-slate-400 bg-white h-12 rounded-md px-2 text-lg text-slate-500 font-semibold" disabled={cidades.length === 0 ? true : false} required>
                            <option value="" className="font-sans"></option>
                            {cidades && cidades.map(item => (
                                <option
                                    key={item.id}
                                    value={item.nome}
                                    className="font-sans"
                                    selected={item.nome === document.cidade}
                                >{item.nome}</option>
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
                        <input
                            {...register("cpf_requerente_um")}
                            placeholder="Ex: 123.456.789-10"
                            type="text"
                            value={cpf1}
                            className="border w-96 border-slate-400 h-12 rounded-md px-2 text-lg text-slate-500 font-semibold mb-1.5"
                        />
                    </label>
                    <label className="text-slate-600 mb-1.5">
                        <p>CPF do Segundo Requerente:</p>
                        <input
                            {...register("cpf_requerente_dois")}
                            placeholder="Ex: 123.456.789-10"
                            type="text"
                            value={cpf2}
                            className="border w-96 border-slate-400 h-12 rounded-md px-2 text-lg text-slate-500 font-semibold mb-1.5"
                        />
                    </label>
                </section>
                <div className="w-full flex justify-end">
                    <button
                     className="bg-blue-600 w-52 h-12 text-white rounded-full mt-8 text-xl"
                    >EDITAR</button>
                </div>
            </form>
        </main>
    )
}

export default EditIPTU