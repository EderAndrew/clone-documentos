import { Navbar } from "@/components/navbar"
import { SessionProvider } from "@/providers/SessionProvider"
import { ModalPDFDocumento1 } from "./Home/modalDocumento/page"
import { Loading } from "@/components/loading"
import { ModalPDFAdmin } from "./admin/modalAdmin/page"
import { ModalClientSolicitation } from "./Home/NovaSolicitacao/ModalClient/page"
import ModalCongrats from "./Home/NovaSolicitacao/ModalCongrats/page"
import ModalProcessamento from "./admin/modalProcessamento/page"
import { ModalSolicitation } from "./Home/modalSolicitation/page"
import { ModalVisualizarSolicitacao } from "./Home/modalVisualizarSolicitacao/page"
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