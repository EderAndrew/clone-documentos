'use client'
import { useContext, useState } from "react"
import IconSearch from "../../../public/icons/iconSearch"
import { SessionContext } from "@/providers/sessionProvider"

export const SearchInput = () => {
    const ctx = useContext(SessionContext)

    return(
        <label className="border border-slate-400 w-96 h-10 rounded-md p-1 flex items-center gap-2 hover:outline outline-[#333b8f]">
            <input
                type="text"
                placeholder="Pesquisar Solicitação..."
                className="w-full outline-none"
                value={ctx?.searchSolicitacao}
                onChange={(e)=>ctx?.handlerSearchSolicitacao(e.target.value)}
            />
            <span className="text-xl text-slate-600">
                <IconSearch />
            </span>
        </label>
    )
}