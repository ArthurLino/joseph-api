const isDateValid = (date: Date | any) => {
    return ( date && !isNaN( new Date(date).getTime() ) )
}

export default isDateValid;