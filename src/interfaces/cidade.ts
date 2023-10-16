export interface Cidade{
    id: number,
    nome: string
    regiao:{
        id: number, 
        sigla: string, 
        nome: string 
    },
    sigla: string
}