import { Request as interfaceDocument } from '@/interfaces/request';
import { SessionContext } from '@/providers/SessionProvider';
import { PDFViewer, StyleSheet, Document, Page, Text } from '@react-pdf/renderer'
import { Document as ReactDocument, Page as ReactPage} from 'react-pdf'
import { useContext, useState } from 'react';
import { pdfjs } from 'react-pdf';
import IconBxsDownload from '../../../../public/icons/iconBxsDownload';
import type { PDFDocumentProxy } from 'pdfjs-dist';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

// Create styles
const styles = StyleSheet.create({
    body:{
        textAlign:'justify',
        padding: 8,
    },
    page: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        color: '#545454'
    },
    viewer:{
        width:1000,
        '@media max-width: 400':{
            width: 300
        }
    },
    pageNumber:{
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey'
    }
  });

  type Props = {
    pdfbase64: string
  }

const PDFDocumentAdmin = ({pdfbase64}:Props) => {
    const [numPages, setNumPages] = useState<number>();
     
    function onDocumentSuccess({numPages: nextNumPages}:PDFDocumentProxy):void {
        setNumPages(nextNumPages);
    }
    return(
        <div className="w-[50%] bg-slate-300 border border-slate-600 overflow-auto">
            <div className="h-10 w-full bg-slate-900 flex items-center px-4">
                <div className="text-white">
                    <IconBxsDownload />
                </div>
            </div>
            <div className="p-2 flex flex-col items-center">
                <ReactDocument
                    file={`${pdfbase64}`}
                    onLoadSuccess={onDocumentSuccess}
                >
                    {Array.from(new Array(numPages), (el, index) => (
                        <ReactPage
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        key={`page_${index + 1}`}
                        pageNumber={index + 1} />
                        ))}
                </ReactDocument>
            </div>
        </div>
    )
}
export default PDFDocumentAdmin