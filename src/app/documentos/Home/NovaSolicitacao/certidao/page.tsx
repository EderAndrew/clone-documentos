'use client'
import { SubmitHandler, useForm } from "react-hook-form"
import { Request } from "@/interfaces/request"
import { Estado } from "@/interfaces/estado"
import axios from "axios"
import { FC, useContext, useEffect, useState } from "react"
import { Cidade } from "@/interfaces/cidade"
import { useDateFormat } from "@/hooks/dateFormat"
import { User } from "@/interfaces/user"
import { UserCookie, getCartoriosImoveis } from "@/api/route"
import { SessionContext } from "@/providers/sessionProvider"
import { useCpfMask } from "@/hooks/cpfMask"
import { CartorioImovel } from "@/interfaces/cartorioImovel"

type pageProps={
    estados: Estado[]
}

const Certidao = ({estados}:pageProps) => {
    const [cidades, setCidades] = useState<Cidade[]>([])
    const [cpfInput1, setCpfInput1] = useState("")
    const [cpfInput2, setCpfInput2] = useState("")
    const [nomeEstado, setNomeEstado] = useState("")
    const [selectNascimento, setSelectNascimento] = useState(true)
    const [selectCasamento, setSelectCasamento] = useState(false)
    const [selectObito, setSelectObito] = useState(false)
    const [dataUser, setDataUser] = useState<User[]>([])
    const [subDocumento, setSubDocumento] = useState("Certidão de Nascimento")
    const dtSolicitacao = useDateFormat(new Date())
    const [registroCivil, setRegistroCivil] = useState<CartorioImovel[]>([])
    const ctx = useContext(SessionContext)

    const cpf1 = useCpfMask(cpfInput1)
    const cpf2 = useCpfMask(cpfInput2)
    
    useEffect(()=>{
        (async()=>{
            const user:User[] = await UserCookie()
            setDataUser(user)
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

    const handlerNascimento = () => {
        setSubDocumento("Certidão de Nascimento")
        setSelectNascimento(true)
        setSelectCasamento(false)
        setSelectObito(false)
    }
    const handlerCasamento = () => {
        setSubDocumento("Certidão de Casamento")
        setSelectNascimento(false)
        setSelectCasamento(true)
        setSelectObito(false)
    }
    const handlerObito = () => {
        setSubDocumento("Certidão de Óbito")
        setSelectNascimento(false)
        setSelectCasamento(false)
        setSelectObito(true)
    }

    const handleSendDocument: SubmitHandler<Request> = async (data) => {
        const randomNumber = Math.random() * 10000
        const infodate = new Date()
        const year = infodate.getFullYear()
        const randomId = `${year}-${randomNumber.toFixed()}`
                
        /* if(data.data_casamento){
            let cas:string[] = data.data_casamento.split("-")
            setDataCasamento(`${cas[0]}`)
            console.log("Casdo: ",dataCasamento)
        } */

        const saveSolicitacao:Request = {
            numero_solicitacao: randomId,
            nome_documento: ctx?.typeDocument,
            sub_documento: subDocumento,
            id_estado: data.estado,
            estado: nomeEstado,
            cidade: data.cidade,
            cartorio_registro_imovel: "",
            numero_matricula: "",
            cartorio_registro_civil: data.cartorio_registro_civil,
            nome_requerente_um: data.nome_requerente_um,
            nome_requerente_dois: data.nome_requerente_dois,
            cpf_requerente_um: data.cpf_requerente_um,
            cpf_requerente_dois: data.cpf_requerente_dois,
            data_nascimento: subDocumento === "Certidão de Nascimento" ? data.data_nascimento : "",
            data_casamento: subDocumento === "Certidão de Casamento" ? data.data_casamento : "",
            data_obito: subDocumento === "Certidão de Óbito" ? data.data_obito : "",
            inscricao_municipal_imovel: "",
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
    
    const handleRegistro = async(e: string) => {
        try{
            const cartorios:CartorioImovel[] = await getCartoriosImoveis(e)
            const registroCivil:CartorioImovel[] = cartorios.filter(item => item.Tipo === "Registro de Títulos e Documentos e Civis das Pessoas Jurídicas")
            
            setRegistroCivil(registroCivil)
            
        }catch(e){}
    }

    return(
        <main>
            <header className="mt-4">
                <div className="grid grid-cols-3 gap-3">
                    <label className={`${selectNascimento ? "bg-green-500 hover:bg-green-600 text-white" : "bg-green-300 hover:bg-green-400 text-green-500"}  h-12 p-2 flex items-center justify-center rounded-md cursor-pointer text-xl font-semibold shadow-md`} onClick={handlerNascimento}>Nascimento</label>
                    <label className={`${selectCasamento ? "bg-blue-500 h-12 hover:bg-blue-600 text-white": "bg-blue-300 h-12 hover:bg-blue-400 text-blue-500"} p-2 flex items-center justify-center rounded-md cursor-pointer text-xl font-semibold shadow-md`} onClick={handlerCasamento}>Casamento</label>
                    <label className={`${selectObito ? "bg-yellow-500 h-12 hover:bg-yellow-600 text-white": "bg-yellow-300 h-12 hover:bg-yellow-400 text-yellow-500"} p-2 flex items-center justify-center rounded-md cursor-pointer text-xl font-semibold shadow-md`} onClick={handlerObito}>Óbito</label>
                </div>
            </header>
            <form className="border bg-gray-50 p-1 mt-4 rounded-md" onSubmit={handleSubmit(handleSendDocument)}>
                <section className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col mb-1.5">
                        <label className="text-slate-600">Estados</label>
                        <select {...register("estado")} className="border w-full border-slate-400 bg-white h-12 rounded-md px-2 text-lg text-slate-500 font-semibold" onChange={(e)=>handleCidade(e.target.value)}>
                            <option></option>
                            {estados && estados.map(item => (
                                 <option key={item.id} value={item.id} className="font-sans">{item.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-1.5">
                        <label className="text-slate-600">Cidades</label>
                        <select
                            {...register("cidade")}
                            className="border w-full border-slate-400 bg-white h-12 rounded-md px-2 text-lg text-slate-500 font-semibold"
                            disabled={cidades.length === 0 ? true : false}
                            onChange={e => handleRegistro(e.target.value)}
                        >
                            <option value="" className="font-sans"></option>
                            {cidades && cidades.map(item => (
                                 <option key={item.id} value={item.nome} className="font-sans">{item.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-1.5">
                        <label className="text-slate-600">Cartório de Registro Civil</label>
                        <select {...register("cartorio_registro_civil")} className="border w-full border-slate-400 bg-white h-12 rounded-md px-2 text-slate-500 font-semibold">
                            <option value="" className="font-sans"></option>
                            {registroCivil && registroCivil.map((item, index) => (
                                <option key={index} value={item.Nome} className="font-sans">{item.Nome}</option>
                            ))}
                        </select>
                    </div>
                </section>
                <section className="flex gap-4">
                    <label className="w-full text-slate-600 mb-1.5">
                        <p>{selectNascimento ? "Primeiro Requerente:" :selectCasamento ? "Solicitante:":"Falecido:"}</p>
                        <input {...register("nome_requerente_um")} placeholder="Nome Completo..." type="text" className="border w-full border-slate-400 h-12 rounded-md px-2 text-slate-500 font-semibold"/>
                    </label>
                    <label className="text-slate-600 mb-1.5">
                        <p>CPF:</p>
                        <input {...register("cpf_requerente_um")} value={cpf1} onChange={e=>setCpfInput1(e.target.value)} placeholder="Ex: 123.456.789-10" type="text" className="border w-96 border-slate-400 h-12 rounded-md px-2 text-slate-500 font-semibold"/>
                    </label>
                </section>
                <section className="flex gap-4">
                    <label className="w-full text-slate-600 mb-1.5">
                        <p>{selectNascimento ? "Segundo Requerente:" :selectCasamento ? "Cônjuge:":"Requerente"}</p>
                        <input {...register("nome_requerente_dois")} placeholder="Nome Completo..." type="text" className="border w-full border-slate-400 h-12 rounded-md px-2 text-slate-500 font-semibold"/>
                    </label>
                    <label className="text-slate-600 mb-1.5">
                        <p>CPF:</p>
                        <input {...register("cpf_requerente_dois")} value={cpf2} onChange={e=>setCpfInput2(e.target.value)} placeholder="Ex: 123.456.789-10" type="text" className="border w-96 border-slate-400 h-12 rounded-md px-2 text-slate-500 font-semibold"/>
                    </label>
                </section>
                <section>
                    {selectNascimento && (
                        <label className="text-slate-600 mb-1.5">
                            <p>Data de Nascimento</p>
                            <input {...register("data_nascimento")} type="date" className="border w-96 border-slate-400 h-12 rounded-md px-2 text-slate-500 font-semibold"/>
                        </label>
                    )}
                    {selectCasamento && (
                        <label className=" text-slate-600 mb-1.5">
                            <p>Data de Casamento</p>
                            <input {...register("data_casamento")} type="date" className="border w-96 border-slate-400 h-12 rounded-md px-2 text-slate-500 font-semibold"/>
                        </label>
                    )}
                    {selectObito && (
                        <label className="text-slate-600 mb-1.5">
                            <p>Data de Óbito</p>
                            <input {...register("data_obito")} type="date" className="border w-96 border-slate-400 h-12 rounded-md px-2 text-slate-500 font-semibold"/>
                        </label>
                    )}
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

export default Certidao