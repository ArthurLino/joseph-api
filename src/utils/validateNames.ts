const validateNames = (name: string): false | string => {
    if ( !name ) return false;
    if ( name.trim().length == 0 ) return false;

    return name.trim().toLowerCase();
}

export default validateNames;