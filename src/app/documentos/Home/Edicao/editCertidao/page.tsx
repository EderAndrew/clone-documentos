/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { SubmitHandler, useForm } from "react-hook-form"
import { Request } from "@/interfaces/request"
import { Estado } from "@/interfaces/estado"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Cidade } from "@/interfaces/cidade"
import { useDateFormat } from "@/hooks/dateFormat"
import { User } from "@/interfaces/user"
import { UserCookie } from "@/api/route"
import { SessionContext } from "@/providers/SessionProvider"
import { useCpfMask } from "@/hooks/cpfMask"
import { Historic } from "@/interfaces/historic"
import { CartorioImovel } from "@/interfaces/cartorioImovel"

type Props={
    document: Request,
    oneHistoric: Historic[],
    historic:Historic[] | undefined
}

const EditCertidao = ({ document, oneHistoric }:Props) => {
    const [cidades, setCidades] = useState<Cidade[]>([])
    const [cpfInput1, setCpfInput1] = useState(document.cpf_requerente_um as string)
    const [cpfInput2, setCpfInput2] = useState(document.cpf_requerente_dois as string)
    const [nomeEstado, setNomeEstado] = useState("")
    const [dataUser, setDataUser] = useState<User[]>([])
    const ctx = useContext(SessionContext)
    const [estados, setEstados] = useState<Estado[]>([])
    const dateCorrectHistoric = useDateFormat(new Date())
    const [escolherEstado, setEscolherEstado] = useState(false)
    const [registroCivil, setRegistroCivil] = useState<CartorioImovel[]>([])

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

    useEffect(()=>{
        (async()=>{
            const resp = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${document.id_estado}/municipios`)
            const data = await resp.data

            setCidades(data)
        })()
    },[])

    const {
        control,
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<Request>()

    const handleCidade = async(e: string) => {
        setEscolherEstado(true)
        const resp = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e}/municipios`)
        const data = await resp.data
        
        const municipioUf = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e}`)
        const uf:Cidade = await municipioUf.data
        
        setCidades(data)
        setNomeEstado(uf.nome)
    }

    const handleEditDocument: SubmitHandler<Request> = async (data) => {
                
        const editCertificado:Request = {
            id: document.id,
            numero_solicitacao: document.numero_solicitacao,
            nome_documento: document.nome_documento,
            sub_documento: document.sub_documento,
            id_estado: document.id_estado,
            estado: escolherEstado ? nomeEstado : document.estado,
            cidade: data.cidade,
            cartorio_registro_imovel: "",
            numero_matricula: "",
            cartorio_registro_civil: data.cartorio_registro_civil,
            nome_requerente_um: data.nome_requerente_um,
            nome_requerente_dois: data.nome_requerente_dois,
            cpf_requerente_um: "",
            cpf_requerente_dois:"",
            data_nascimento: document.sub_documento === "Certidão de Nascimento" ? data.data_nascimento : "",
            data_casamento: document.sub_documento === "Certidão de Casamento" ? data.data_casamento : "",
            data_obito: document.sub_documento === "Certidão de Óbito" ? data.data_obito : "",
            inscricao_municipal_imovel: "",
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
        ctx?.handlerDocumentoSolicitado(editCertificado)
        ctx?.handleOpenModalSolicitacaoDoc(true)
    }
    
    return(
        <main>
            <form className="border bg-gray-50 p-1 mt-4 rounded-md" onSubmit={handleSubmit(handleEditDocument)}>
                <section className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col mb-1.5">
                        <label className="text-slate-600">Estados</label>
                        <select
                            {...register("estado")}
                            className="border w-full border-slate-400 bg-white h-12 rounded-md px-2 text-lg text-slate-500 font-semibold"
                            onChange={(e)=>handleCidade(e.target.value)}
                            defaultValue={document.estado}
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
                            className="border w-full border-slate-400 bg-white h-12 rounded-md px-2 text-lg text-slate-500 font-semibold"
                            disabled={document.estado?.length === 0 ? true : false}
                            defaultValue={document.cidade}
                        >
                            <option value="" className="font-sans"></option>
                            {cidades && cidades.map(item => (
                                 <option
                                    key={item.id}
                                    value={item.nome}
                                    className="font-sans"
                                    selected={item.nome === document.estado}
                                >{item.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-1.5">
                        <label className="text-slate-600">Cartório de Registro Civil</label>
                        <select
                            {...register("cartorio_registro_civil")}
                            className="border w-full border-slate-400 bg-white h-12 rounded-md px-2 text-lg text-slate-500 font-semibold"
                            defaultValue={document.cartorio_registro_civil}
                        >
                            <option value="" className="font-sans"></option>
                            {registroCivil && registroCivil.map((item, index) => (
                                <option key={index} value={item.Nome} className="font-sans">{item.Nome}</option>
                            ))}
                        </select>
                    </div>
                </section>
                <section className="flex gap-4">
                    <label className="w-full text-slate-600 mb-1.5">
                        <p>Primeiro Requerente:</p>
                        <input
                            {...register("nome_requerente_um")}
                            placeholder="Nome Completo..."
                            type="text"
                            className="border w-full border-slate-400 h-12 rounded-md px-2 text-slate-500 font-semibold"
                            defaultValue={document.nome_requerente_um}
                        />
                    </label>
                    <label className="text-slate-600 mb-1.5">
                        <p>CPF:</p>
                        <input
                            {...register("cpf_requerente_um")}
                            value={cpf1}
                            onChange={e=>setCpfInput1(e.target.value)}
                            placeholder="Ex: 123.456.789-10"
                            type="text"
                            className="border w-96 border-slate-400 h-12 rounded-md px-2 text-slate-500 font-semibold"
                        />
                    </label>
                </section>
                <section className="flex gap-4">
                    <label className="w-full text-slate-600 mb-1.5">
                        <p>Segundo Requerente:</p>
                        <input
                            {...register("nome_requerente_dois")}
                            placeholder="Nome Completo..."
                            type="text"
                            className="border w-full border-slate-400 h-12 rounded-md px-2 text-slate-500 font-semibold"
                            defaultValue={document.nome_requerente_dois}
                        />
                    </label>
                    <label className="text-slate-600 mb-1.5">
                        <p>CPF:</p>
                        <input
                            {...register("cpf_requerente_dois")}
                            value={cpf2}
                            onChange={e=>setCpfInput2(e.target.value)}
                            placeholder="Ex: 123.456.789-10"
                            type="text"
                            className="border w-96 border-slate-400 h-12 rounded-md px-2 text-slate-500 font-semibold"
                        />
                    </label>
                </section>
                <section>
                    {document.sub_documento === "Certidão de Nascimento" && (
                        <label className="text-slate-600 mb-1.5">
                            <p>Data de Nascimento</p>
                            <input
                                {...register("data_nascimento")}
                                defaultValue={document.data_nascimento}
                                type="date"
                                className="border w-96 border-slate-400 h-12 rounded-md px-2 text-slate-500 font-semibold"
                            />
                        </label>
                    )}
                    {document.sub_documento === "Certidão de Casamento" && (
                        <label className=" text-slate-600 mb-1.5">
                            <p>Data de Casamento</p>
                            <input
                                {...register("data_casamento")}
                                defaultValue={document.data_casamento}
                                type="date"
                                className="border w-96 border-slate-400 h-12 rounded-md px-2 text-slate-500 font-semibold"
                            />
                        </label>
                    )}
                    {document.sub_documento === "Certidão de Óbito" && (
                        <label className="text-slate-600 mb-1.5">
                            <p>Data de Óbito</p>
                            <input 
                                {...register("data_obito")}
                                defaultValue={document.data_obito}
                                type="date"
                                className="border w-96 border-slate-400 h-12 rounded-md px-2 text-slate-500 font-semibold"
                            />
                        </label>
                    )}
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

export default EditCertidao