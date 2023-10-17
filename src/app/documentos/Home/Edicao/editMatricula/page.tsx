/* eslint-disable react-hooks/exhaustive-deps */
//novo teste
'use client'
import { useRef, useState, useContext, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDateFormat } from "@/hooks/dateFormat"
import { SessionContext } from "@/providers/SessionProvider"
import { Estado } from "@/interfaces/estado"
import { Cidade } from "@/interfaces/cidade"
import { Request } from "@/interfaces/request"
import axios from "axios"
import { User } from "@/interfaces/user"
import { Historic } from "@/interfaces/historic"
import { UserCookie, getCartoriosImoveis } from "@/api/route"
import { useCpfMask } from "@/hooks/cpfMask"
import { CartorioImovel } from "@/interfaces/cartorioImovel"

type Props = {
    document: Request,
    oneHistoric: Historic[],
    historic:Historic[] | undefined
}

const EditMatricula = ({document, oneHistoric, historic}:Props) => {
    const [cidades, setCidades] = useState<Cidade[]>([])
    const [nomeEstado, setNomeEstado] = useState("")
    const [dataUser, setDataUser] = useState<User[]>([])
    const [cartoriosImoveis, setCartoriosImoveis] = useState<CartorioImovel[]>([])
    const dtSolicitacao = useDateFormat(new Date())
    const ctx = useContext(SessionContext)
    const [estados, setEstados] = useState<Estado[]>([])
    const dateCorrectHistoric = useDateFormat(new Date())
    const [escolherEstado, setEscolherEstado] = useState(false)

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
            const resp = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${document?.id_estado}/municipios`)
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
        const resp = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e}/municipios`)
        const data = await resp.data

        const municipioUf = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${e}`)
        const uf:Cidade = await municipioUf.data
        
        setCidades(data)
        setNomeEstado(uf.nome)
    }

    const handleCartorios = async(e: string) => {
        const cartorios:CartorioImovel[] = await getCartoriosImoveis(e)
        
        const registroImoveis:CartorioImovel[] = cartorios.filter(item => item.Tipo.includes("Registro de Imóveis"))
        setCartoriosImoveis(registroImoveis)
    }

    const handleEditDocument: SubmitHandler<Request> = async (data) => {
                
        const editMatricula:Request = {
            id: document.id,
            numero_solicitacao: document.numero_solicitacao,
            nome_documento: document.nome_documento,
            sub_documento: "",
            id_estado: document.id_estado,
            estado: escolherEstado ? nomeEstado : document?.estado,
            cidade: document.cidade ? document.cidade : data.cidade,
            cartorio_registro_imovel: document.cartorio_registro_imovel ? document.cartorio_registro_imovel : data.cartorio_registro_imovel,
            numero_matricula: document.numero_matricula ? document.numero_matricula : data.numero_matricula,
            cartorio_registro_civil: "",
            nome_requerente_um: "",
            nome_requerente_dois: "",
            cpf_requerente_um: "",
            cpf_requerente_dois: "",
            data_nascimento: "",
            data_casamento: "",
            data_obito: "",
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
        ctx?.handlerDocumentoSolicitado(editMatricula)
        ctx?.handleOpenModalSolicitacaoDoc(true)
    }
    
    return(
        <main className="mt-4 p-2 border border-slate-300 mr-2 rounded-md bg-gray-100">
            <form onSubmit={handleSubmit(handleEditDocument)}>
                <section className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <label className="text-slate-600">Estados</label>
                        <select
                            {...register("estado")}
                            value={document.estado}
                            className={`border w-full border-slate-400 bg-white h-12 rounded-md px-2 text-lg text-slate-500 font-semibold`}
                            onChange={(e)=>handleCidade(e.target.value)}
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
                    <div className="flex flex-col">
                        <label className="text-slate-600">Cidades</label>
                        <select
                            {...register("cidade")}
                            defaultValue={document.cidade}
                            className="border w-full border-slate-400 bg-white h-12 rounded-md px-2 text-lg text-slate-500 font-semibold"
                            disabled={cidades.length === 0 ? true : false}
                            onChange={e => handleCartorios(e.target.value)}
                            required
                        >
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
                    <div className="flex flex-col">
                        <label className="text-slate-600">Cartório de Registro de Imóveis</label>
                        <select
                            {...register("cartorio_registro_imovel")}
                            className="border w-full border-slate-400 bg-white h-12 rounded-md px-2 text-lg text-slate-500 font-semibold"
                            defaultValue={document.cartorio_registro_imovel}
                        >
                            <option value="" className="font-sans"></option>
                            {cartoriosImoveis && cartoriosImoveis.map((item, index) => (
                                <option
                                    key={index}
                                    value={item.Nome} className="font-sans"
                                    selected={item.Nome === document.cartorio_registro_imovel}
                                     
                                >{item.Nome}</option>
                            ))}
                        </select>
                    </div>
                </section>
                <section className="mt-2">
                    <div className="flex flex-col">
                        <label className="text-slate-600">Número de Matrícula</label>
                        <input
                            {...register("numero_matricula")}
                            type="text"
                            className="mb-3 border w-96 border-slate-400 h-12 rounded-md px-2 text-base text-slate-500 font-semibold"
                            defaultValue={document.numero_matricula}
                        />
                    </div>
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

export default EditMatricula