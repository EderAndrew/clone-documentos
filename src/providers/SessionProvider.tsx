'use client'
import { Historic } from "@/interfaces/historic";
import { Request } from "@/interfaces/request";
import { User } from "@/interfaces/user";
import { createContext, useState } from "react";

export type DocInfo = {
    id: string
    numero: string,
    nome: string
}

type SessionContextType = {
    home: boolean,
    handleHome: (v: boolean) => void,
    openModal: boolean,
    handleModal: (v: boolean) => void,
    documentPdf: string,
    handleIDPDF: (v: string) => void,
    newDocument: Request | undefined,
    handleNewDocument: (v: Request) => void,
    loading: boolean,
    handleLoading: (v: boolean) => void
    openModalAdmin: boolean,
    handleOpenModalAdmin: (v: boolean) => void,
    showDocument: Request | undefined,
    handleShowDocument: (v: Request) => void,
    modalClientSolicitation: boolean,
    handleModalClientSolicitation: (v: boolean) => void,
    modalCongrats: boolean,
    handleModalCongrats: (v: boolean) => void,
    docInfo: DocInfo | undefined,
    handleDocInfo: (v: DocInfo) => void
    openModalProccess: boolean,
    handleOpenModalProccess: (v:boolean) => void,
    newSession: User | undefined,
    handlerNewSession: (v: User) => void
    documentoSolicitado: Request | undefined,
    handlerDocumentoSolicitado: (v: Request) => void,
    openModaSolicitacaoDoc: boolean,
    handleOpenModalSolicitacaoDoc: (v: boolean) => void,
    typeDocument: string,
    handlerTypeDocument: (v: string) => void,
    searchSolicitacao: string,
    handlerSearchSolicitacao: (v: string) => void,
    openModalVisualizarSolicitacao: boolean,
    handlerOpenModalVisualizarSolicitacao: (v: boolean) => void,
    edit: boolean,
    handleEdit: (v: boolean) => void,
    editHistoric: Historic | undefined,
    handlerEditHistoric:(v:Historic) => void
}

export const SessionContext = createContext<SessionContextType | null>(null)

type Props = {
    children: React.ReactNode
}

export const SessionProvider = ({ children }: Props) => {
   const [home, setHome] = useState(true)
   const [openModal, setOpenModal] = useState(false)
   const [documentPdf, setDocumentPdf] = useState("")
   const [newDocument, setNewDocument] = useState<Request>()
   const [loading, setLoading] = useState(false)
   const [openModalAdmin, setOpenModalAdmin] = useState(false)
   const [showDocument, setShowDocument] = useState<Request>()
   const [modalClientSolicitation, setModalClientSolicitation] = useState(false)
   const [modalCongrats, setModalCongrats] = useState(false)
   const [docInfo, setDocInfo] = useState<DocInfo>()
   const [openModalProccess, setOpenModalProccess] = useState(false)
   const [newSession, setNewSession] = useState<User>()
   const [documentoSolicitado, setDocumentoSolicitado] = useState<Request>()
   const [openModaSolicitacaoDoc, setOpenModalSolicitacaoDoc] = useState(false)
   const [typeDocument, setTypeDocument] = useState("Matricula")
   const [searchSolicitacao, setSearchSolicitacao] = useState("")
   const [openModalVisualizarSolicitacao, setOpenModalVisualizarSolicitacao] = useState(false)
   const [edit, setEdit] = useState(false)
   const [editHistoric, setEditHistoric] = useState<Historic>()

    const handleHome = (load: boolean) => {
        setHome(load)
    }
    const handleModal = (value: boolean) => {
        setOpenModal(value)
    }
    const handleIDPDF = (value: string) => {
        setDocumentPdf(value)
    }
    const handleNewDocument = (value: Request) => {
        setNewDocument(value)
    }
    const handleLoading = (value: boolean) => {
        setLoading(value)
    }
    const handleOpenModalAdmin = (value: boolean) => {
        setOpenModalAdmin(value)
    }
    const handleShowDocument = (value: Request) => {
        setShowDocument(value)
    }

    const handleModalClientSolicitation = (value: boolean) => {
        setModalClientSolicitation(value)
    }

    const handleModalCongrats = (value: boolean) => {
        setModalCongrats(value)
    }

    const handleDocInfo = (value: DocInfo) => {
        setDocInfo(value)
    }

    const handleOpenModalProccess = (value: boolean) => {
        setOpenModalProccess(value)
    }

    const handlerNewSession = (value: User) => {
        setNewSession(value)
    }

    const handlerDocumentoSolicitado = (value: Request) => {
        setDocumentoSolicitado(value)
    }

    const handleOpenModalSolicitacaoDoc = (value: boolean) => {
        setOpenModalSolicitacaoDoc(value)
    }

    const handlerTypeDocument = (value: string) => {
        setTypeDocument(value)
    }

    const handlerSearchSolicitacao = (value: string) => {
        setSearchSolicitacao(value)
    }
    const handlerOpenModalVisualizarSolicitacao = (value: boolean) => {
        setOpenModalVisualizarSolicitacao(value)
    }
    const handleEdit = (v: boolean) => {
        setEdit(v)
    }
    const handlerEditHistoric = (v: Historic) => {
        setEditHistoric(v)
    }

    const provider = {
        home,
        handleHome,
        openModal,
        handleModal,
        documentPdf,
        handleIDPDF,
        newDocument,
        handleNewDocument,
        loading,
        handleLoading,
        openModalAdmin,
        handleOpenModalAdmin,
        showDocument,
        handleShowDocument,
        modalClientSolicitation,
        handleModalClientSolicitation,
        modalCongrats,
        handleModalCongrats,
        docInfo,
        handleDocInfo,
        openModalProccess,
        handleOpenModalProccess,
        newSession,
        handlerNewSession,
        documentoSolicitado,
        handlerDocumentoSolicitado,
        openModaSolicitacaoDoc,
        handleOpenModalSolicitacaoDoc,
        typeDocument,
        handlerTypeDocument,
        searchSolicitacao,
        handlerSearchSolicitacao,
        openModalVisualizarSolicitacao,
        handlerOpenModalVisualizarSolicitacao,
        edit,
        handleEdit,
        editHistoric,
        handlerEditHistoric
    }

    return (
        <SessionContext.Provider value={provider}>
            {children}
        </SessionContext.Provider>
    )
}