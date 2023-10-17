'use server'
import { SignUpForm } from "@/interfaces/SignUpForm";
import { Estado } from "@/interfaces/estado";
import { Historic } from "@/interfaces/historic";
import { Request } from "@/interfaces/request";
import { User } from "@/interfaces/user";
import axios from "axios";
import { cookies } from 'next/headers'

/* const config = {
    api: {
      responseLimit: false,
    },
  } */

export const api = axios.create({
    baseURL: `https://json-documentos.vercel.app`,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
})

export const ibgeApi = axios.create({
    baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
})

export const logIn = async(data: SignUpForm):Promise<User> => {
    const info = await fetch(`https://json-documentos.vercel.app/users?register=${data.user}&password=${data.pwd}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
   })
   
   const res:User  = await info.json()
   const oneDay = 24 * 60 * 60 * 1000

   /* const userCookie:User = {
    name: res.name,
    register: res.register,
    op: res.op,
    op_banco: res.op_banco,
    logged: true
   } */
   
   //cookies().set("user", JSON.stringify(res),{maxAge:Date.now() - oneDay})
   cookies().set({
    name: "user",
    value: JSON.stringify(res),
    path: '/documentos',
    maxAge: Date.now() - oneDay
   })
    return res
}

export const logOut = async() => {
    cookies().delete('user')
}

export const UserCookie = () => {
    const user = cookies().get("user")

    if(user){
        const info = JSON.parse(user.value)
        return info
    }
    
}

export const getRequestDocuments = async() => {
    try{
        const res = await api.get('/requests')
        if (res){
            return res.data
        }
        
    }catch(err:any){
        console.log(err)
    }
}

export const getDocuments = async () => {
    try{
        const res = await api.get('/documents')
        if(res){
            return res.data
        }
    }catch(error){
        console.log(error)
    }
}

export const getRequestDocument = async (id: string) => {
    try{
        const res = await fetch(`https://json-documentos.vercel.app/requests/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        if(res){
            return res.json()
        }
    }catch(error){
        console.log(error)
    }
}

export const putStartProcces = async(data:Request) => {
    try{
        const res = await fetch(`https://json-documentos.vercel.app/requests/${data.id as string}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                numero_solicitacao: data.numero_solicitacao,
                nome_documento: data.nome_documento,
                sub_documento: data.sub_documento,
                id_estado: data.id_estado,
                estado: data.estado,
                cidade: data.cidade,
                cartorio_registro_imovel: data.cartorio_registro_imovel,
                numero_matricula: data.numero_matricula,
                cartorio_registro_civil: data.cartorio_registro_civil,
                nome_requerente_um: data.nome_requerente_um,
                nome_requerente_dois: data.nome_requerente_dois,
                cpf_requerente_um: data.cpf_requerente_um,
                cpf_requerente_dois: data.cpf_requerente_dois,
                data_nascimento: data.data_nascimento,
                data_casamento: data.data_casamento,
                data_obito: data.data_obito,
                inscricao_municipal_imovel: data.inscricao_municipal_imovel,
                status_solicitacao: data.status_solicitacao,
                data_solicitacao: data.data_solicitacao,
                nome_solicitante: data.nome_solicitante,
                matricula_solicitante: data.matricula_solicitante,
                op_banco: data.op_banco,
                nome_operador: data.nome_operador,
                matricula_operador: data.matricula_operador,
                op_operador: data.op_operador,
                historico: data.historico,
                imagem: data.imagem,
                nome_imagem: data.nome_imagem,
                image_type: data.image_type,
                image_size: data.image_size,
                data_inicio_processo: data.data_inicio_processo,
                data_finalizacao_processo: data.data_finalizacao_processo
            })
        })
        if(res.status === 200){
            console.log("Atualizado com sucesso!")
        }
    }catch(error){
        console.log(error)
    }
}
export const getDocumentbyNumber = async(id:string)=>{
    try{
        const res = await fetch(`https://json-documentos.vercel.app/requests/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })

        return res.json()
    }catch(err: any){
        console.log(err)
    }
}

export const uploadDocument = async(data:Request) => { 
    try{
        const res = await fetch(`https://json-documentos.vercel.app/requests/${data.id as string}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                numero_solicitacao: data.numero_solicitacao,
                nome_documento: data.nome_documento,
                sub_documento: data.sub_documento,
                id_estado: data.id_estado,
                estado: data.estado,
                cidade: data.cidade,
                cartorio_registro_imovel: data.cartorio_registro_imovel,
                numero_matricula: data.numero_matricula,
                cartorio_registro_civil: data.cartorio_registro_civil,
                nome_requerente_um: data.nome_requerente_um,
                nome_requerente_dois: data.nome_requerente_dois,
                cpf_requerente_um: data.cpf_requerente_um,
                cpf_requerente_dois: data.cpf_requerente_dois,
                data_nascimento: data.data_nascimento,
                data_casamento: data.data_casamento,
                data_obito: data.data_obito,
                inscricao_municipal_imovel: data.inscricao_municipal_imovel,
                status_solicitacao: data.status_solicitacao,
                data_solicitacao: data.data_solicitacao,
                nome_solicitante: data.nome_solicitante,
                matricula_solicitante: data.matricula_solicitante,
                op_banco: data.op_banco,
                nome_operador: data.nome_operador,
                matricula_operador: data.matricula_operador,
                op_operador: data.op_operador,
                historico: data.historico,
                imagem: data.imagem,
                nome_imagem: data.nome_imagem,
                image_type: data.image_type,
                image_size: data.image_size,
                data_inicio_processo: data.data_inicio_processo,
                data_finalizacao_processo: data.data_finalizacao_processo
            })
        })
        if(res.status === 200){
            console.log("Upload efetuado com sucesso!")
        }
    }catch(error){
        console.log(error)
    }
}

export const saveInfoMatricula = async(data: Request) => {
    try{
        await fetch(`https://json-documentos.vercel.app/requests`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                numero_solicitacao: data.numero_solicitacao,
                nome_documento: data.nome_documento,
                sub_documento: data.sub_documento,
                id_estado: data.id_estado,
                estado: data.estado,
                cidade: data.cidade,
                cartorio_registro_imovel: data.cartorio_registro_imovel,
                numero_matricula: data.numero_matricula,
                cartorio_registro_civil: data.cartorio_registro_civil,
                nome_requerente_um: data.nome_requerente_um,
                nome_requerente_dois: data.nome_requerente_dois,
                cpf_requerente_um: data.cpf_requerente_um,
                cpf_requerente_dois: data.cpf_requerente_dois,
                data_nascimento: data.data_nascimento,
                data_casamento: data.data_casamento,
                data_obito: data.data_obito,
                inscricao_municipal_imovel: data.inscricao_municipal_imovel,
                status_solicitacao: data.status_solicitacao,
                data_solicitacao: data.data_solicitacao,
                nome_solicitante: data.nome_solicitante,
                matricula_solicitante: data.matricula_solicitante,
                op_banco: data.op_banco,
                nome_operador: data.nome_operador,
                matricula_operador: data.matricula_operador,
                op_operador: data.op_operador,
                historico: data.historico,
                imagem: data.imagem,
                nome_imagem: data.nome_imagem,
                image_type: data.image_type,
                image_size: data.image_size,
                data_inicio_processo: data.data_inicio_processo,
                data_finalizacao_processo: data.data_finalizacao_processo
            })
        })
    }catch(err){
        console.log(err)
    }
}

export const putHistoric = async(data: Historic) => {
    try{
        await fetch(`https://json-documentos.vercel.app/historics/${data.id as string}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                nome_operador: data.nome_operador,
                matricula_operador: data.matricula_operador,
                data_informacao: data.data_informacao,
                data_correcao: data.data_correcao,
                descricao: data.descricao,
                id_request: data.id_request,
                status: data.status
            })
        })
    }catch(err){
        console.log(err)
    }
}
export const postHistoric = async(data: Historic) => {
    try{
        await fetch(`https://json-documentos.vercel.app/historics`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                nome_operador: data.nome_operador,
                matricula_operador: data.matricula_operador,
                data_informacao: data.data_informacao,
                data_correcao:"",
                descricao: data.descricao,
                id_request: data.id_request,
                status: data.status
            })
        })
    }catch(error){
        console.log(error)
    }
}

export const getHistorics = async() => {
    try{
        const res = await api.get('historics')

        return res.data
    }catch(err){
        console.log(err)
    }
}
export const getHistoric = async(id_request: string) => {
    try{
        const res = await api.get(`/historics?id_request=${id_request}`)
        
        if(res){
            return res.data
        }        
    }catch(err){
        console.log(err)
    }
}

export const getCartoriosImoveis = async(uf:string) => {
    try{
        const res = await api.get(`/cartoriosImoveis?Cidade=${uf}`)

        if(res){
            return res.data
        }
    }catch(err){
        console.log(err)
    }
}