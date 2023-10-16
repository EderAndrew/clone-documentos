import { Navbar } from "@/components/navbar"
import { SessionProvider } from "@/providers/SessionProvider"
import { ModalPDFDocumento1 } from "./Home/ModalDocumento/page"
import { Loading } from "@/components/loading"
import { ModalPDFAdmin } from "./Admin/ModalAdmin/page"
import { ModalClientSolicitation } from "./Home/nova_solicitacao/ModalClient/page"
import ModalCongrats from "./Home/nova_solicitacao/ModalCongrats/page"
import ModalProcessamento from "./Admin/ModalProcessamento/page"
import { ModalSolicitation } from "./Home/ModalSolicitation/page"
import { ModalVisualizarSolicitacao } from "./Home/ModalVisualizarSolicitacao/page"
import { Suspense } from "react"

type Props = {
    children: React.ReactNode
}
const LayoutDocuments = ({children}:Props) => {
    return(
        <SessionProvider>
            <Suspense fallback={<Loading />}>
            <ModalPDFAdmin />
            <ModalPDFDocumento1 />
            <ModalClientSolicitation />
            <ModalProcessamento />
            <ModalCongrats />
            <ModalSolicitation />
            <ModalVisualizarSolicitacao />
            <main className="h-screen flex">
                <Navbar />
                <main className="ml-4 mr-2 w-screen">
                    {children}
                </main>
            </main>
            </Suspense>
        </SessionProvider>
    )
}

export default LayoutDocuments