export const userFormatDateCertidao = (date: string) => {
    if(date){
        const arrayDate: string[] = date.split("-")
    
        let aux = `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`
        
        return aux
    }
    
    
}