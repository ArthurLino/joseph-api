const isDateValid = (date: Date | any): boolean => {
    return ( date && !isNaN( new Date(date).getTime() ) )
}

export default isDateValid;