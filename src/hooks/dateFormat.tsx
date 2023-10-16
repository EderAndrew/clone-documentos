import { useState } from "react"

export const useDateFormat = (newDate:Date) => {
    const [date, setDate] = useState(newDate)
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let correctDay = day <= 9 ? `0${day}` : day
    let correctMonth = month <= 9 ? `0${month}` : month
    let reorgDate = `${correctDay}/${correctMonth}/${year} - ${hour}:${minutes}:${seconds}`

    return reorgDate

}