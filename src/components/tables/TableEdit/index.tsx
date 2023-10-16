'use client'
import { Historic } from "@/interfaces/historic"
import IconCheck from "../../../../public/icons/iconCheck"
import IconCheckAll from "../../../../public/icons/iconCheckAll"

type Props = {
    historic: Historic[]
}
const TableEdit = ({historic}:Props) => {
    return(
        <table className="table-auto w-full">
            <thead className="border-b h-10 text-slate-700">
                <tr>
                    <th>Número</th>
                    <th>Inconsistência</th>
                    <th>Data da Informação</th>
                    <th>Data da Correção</th>
                    <th>Operador</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {historic && historic.map((item, index) => (
                <tr key={item.id} className={`h-10 border-b text-slate-700 text-sm ${index % 2 !== 0 ? "bg-gray-50" : "bg-white"}`}>
                    <td className="text-center">{item.id}</td>
                    <td className="text-center">{item.descricao}</td>
                    <td className="text-center">{item.data_informacao}</td>
                    <td className="text-center">{item.data_correcao}</td>
                    <td className="text-center">{item.nome_operador}</td>
                    <td className={`text-center `}>{item.status === "corrigir" ? (
                        <span className="text-xl text-red-500">
                            <IconCheck/>
                        </span>
                    ):
                    (
                        <span className="text-xl text-green-500">
                            <IconCheckAll />
                        </span>
                    )}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default TableEdit