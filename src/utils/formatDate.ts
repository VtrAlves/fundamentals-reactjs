import { format, parseISO } from 'date-fns'

const formattedDate = (date: Date): string => format(date, 'dd/MM/yyyy')

export default formattedDate
