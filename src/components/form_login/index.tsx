'use client'
import { SignUpForm } from "@/interfaces/SignUpForm"
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"
import { logIn } from "@/api/route"
import { User } from "@/interfaces/user"
import { useContext } from "react"
import IconBxsUser from "../../../public/icons/iconBxUser"
import IconLockPasswordFill from "../../../public/icons/iconLockPasswordFill"
import { SessionContext } from "@/providers/sessionProvider"


export const FormLogin = () => {
    const router = useRouter()
    const ctx = useContext(SessionContext)
     
    const {
        control,
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<SignUpForm>()

    const handleFormSubmit: SubmitHandler<SignUpForm> = async(data) => {
        ctx?.handleLoading(true)
        try{
            const userOp:User[] = await logIn(data) as unknown as User[]
            
            if(userOp[0].op === "0"){
                router.replace("/documentos/Home")
                ctx?.handleLoading(false)
            }
            if(userOp[0].op === "1"){
                router.replace("/documentos/admin")
                ctx?.handleLoading(false)
            }
            if(userOp[0].op === "00"){
                router.replace("/documentos/Home")
                ctx?.handleLoading(false)
            }
        }catch(err){
            console.log(err)
            ctx?.handleLoading(false)
        }
    }

    return(
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col items-center">
            <span className="text-xl font-bold text-[#062642] mb-16  sm:text-2xl md:text-3xl">Sistema de Documentação</span>
            <div className="w-80 md:w-full flex flex-col items-center px-6 border py-4 mx-3 shadow-md rounded-md">
                <div className="w-72 md:w-full flex mb-8 h-10 border-b">
                    <span className=" text-[#062642] text-xl font-bold">LogIn</span>
                </div>
                <label className="flex flex-col w-full">
                    <span className="text-[#062642] text-sm">Usuário</span>
                    <div  className="border w-72 md:w-full border-slate-300
                    h-12 rounded-md px-2 text-sm flex items-center gap-2">
                        <div className="text-xl text-slate-600">
                            <IconBxsUser />
                        </div>
                        <input {...register('user')} className="outline-none w-full h-full" />
                    </div>
                    {errors.user?.type === "required" && <p className="text-sm text-red-500">*Preencha o Campo Usuário</p>}
                </label>
                <label className="flex flex-col w-full mt-2 mb-8">
                    <span className="text-sm text-[#062642]">Senha</span>
                    <div className="border w-72 md:w-full border-slate-300 h-12 rounded-md px-2 gap-2 text-sm flex items-center">
                        <div className="text-xl text-slate-600">
                            <IconLockPasswordFill />
                        </div>
                        <input type="password" {...register('pwd')} className="outline-none w-full h-full" />
                    </div>
                    {errors.pwd?.type === "required" && <p className="text-sm text-red-500">*Preencha o Campo Senha</p>}
                </label>
                {/* <label className="w-full flex justify-end mt-2">
                    <p className="text-sm text-[#cc092f]">Esqueceu usuário e/ou Senha?</p>
                </label> */}
                <button className="bg-[#28dddb] text-[#062642] text-sm w-full mt-4 h-12 rounded-full shadow-md">ACESSAR</button>
            </div>
            
        </form>
    )
}