import { Navbar } from "@/components/navbar"
import { SessionProvider } from "@/providers/sessionProvider"
import { ModalPDFDocumento1 } from "../../components/modais/modalDocumento"
import { ModalPDFAdmin } from "../../components/modais/modalAdmin"
import { ModalClientSolicitation } from "../../components/modais/ModalClient"
import ModalCongrats from "../../components/modais/ModalCongrats/page"
import ModalProcessamento from "../../components/modais/modalProcessamento"
import { ModalSolicitation } from "../../components/modais/modalSolicitation"
import { ModalVisualizarSolicitacao } from "../../components/modais/modalVisualizarSolicitacao"
import { Suspense } from "react"
import Loading from "../loading"

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