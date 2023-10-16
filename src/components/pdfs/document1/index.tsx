import { Request as interfaceDocument } from '@/interfaces/request';
import { SessionContext } from '@/providers/SessionProvider';
import {Page, Text, View, Document, StyleSheet, PDFViewer, Image} from '@react-pdf/renderer'
import { useContext, useState } from 'react';
import { Page as PageView, Document as DocumentView } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { pdfjs } from 'react-pdf';
import IconBxsDownload from '../../../../public/icons/iconBxsDownload';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

// Create styles
const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        color: '#545454'
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      margin: 10,
      padding: 10,
    },
    header:{
        display: 'flex',
        flexDirection: 'row',
        borderBottom: 0.5,
        borderColor: '#8b8b8b',
        paddingBottom: 14
    },
    logo:{
        width:130,
        height:42,
    },
    logoMontreal: {
        width: 80,
        height:25,
        marginTop: 10,
    },
    title:{
        fontSize: 25,
        textAlign: 'center',
        width: '100%',
        alignSelf: 'center',
    },
    navbar:{
        textAlign:'right',
        fontSize:8,
        marginTop: 4
    },
    body:{
        textAlign:'justify',
        padding: 8,
    },
    nomeCliente:{
        fontSize: 12,
        marginBottom:5,
    },
    documentoCliente:{
        fontSize:12,
        marginBottom: 5,
    },
    infoDocument:{
        display: 'flex',
        textAlign: 'justify'
    },
    documentTitle:{
        textAlign: 'center',
        fontSize: 12,
        marginBottom: 10
    },
    documentText:{
        marginTop: 5,
        fontSize: 10
    },
    pageNumber:{
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey'
    },
    viewer:{
        width:1000,
        '@media max-width: 400':{
            width: 300
        }
    }
  });

type Props = {
    pdfbase64: string
}

const Document1PDF = ({pdfbase64}:Props) => {
    const [pageNumber, setPageNumber] = useState()
    const modalCtx = useContext(SessionContext)
    
    const [numPages, setNumPages] = useState<number>();
     
    function onDocumentSuccess({numPages: nextNumPages}:PDFDocumentProxy):void {
        setNumPages(nextNumPages);
    }
   return(
    <div className="p-2 flex flex-col items-center">
                <DocumentView
                file={`${pdfbase64}`}
                onLoadSuccess={onDocumentSuccess}
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <PageView
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    key={`page_${index + 1}`}
                    pageNumber={index + 1} />
                    ))}
            </DocumentView>
            </div>
             
   )
}

const PDFDocument1View = ({pdfbase64}:Props) => {
    const [pageNumber, setPageNumber] = useState()
    const modalCtx = useContext(SessionContext)
    
    const [numPages, setNumPages] = useState<number>();
     
    function onDocumentSuccess({numPages: nextNumPages}:PDFDocumentProxy):void {
        setNumPages(nextNumPages);
    }
    return(
        <div className="w-[50%] bg-slate-300 border border-slate-600 overflow-auto">
            <div className="h-10 w-full bg-slate-900 flex items-center px-4">
                <a href={`${pdfbase64}`} className="text-lg text-white" download>
                    <IconBxsDownload />
                </a>
            </div>
        <div className="p-2 flex flex-col items-center">
                    <DocumentView
                    file={`${pdfbase64}`}
                    onLoadSuccess={onDocumentSuccess}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <PageView
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        key={`page_${index + 1}`}
                        pageNumber={index + 1} />
                        ))}
                </DocumentView>
                </div>
        </div>      
       )
}
export default PDFDocument1View