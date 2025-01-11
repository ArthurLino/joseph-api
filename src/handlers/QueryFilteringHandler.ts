import { AuthenticatedUserRequest } from "@auth/AuthValidation";
import isDateValid from "@utils/isDateValid";
import validateActivityType from "@utils/validateActivityType";
import validateNames from "@utils/validateNames";

export async function queryFilteringHandler(request: AuthenticatedUserRequest) {

    const query = request.query as { [key: string]: unknown };

    const validatedFilters: { [key: string]: any } = {};

    const queryFiltersValidator: { [key: string]: (value: any) => any } = {
        "type": (type: string) => validateActivityType(type) && validateActivityType(type) as string,
        "date": (date: Date) => isDateValid(date) && new Date(date),
        "from": (from: Date) => isDateValid(from) && new Date(from),
        "to": (to: Date) => isDateValid(to) && new Date(to),
        "categories": (categories: Array<string> | string) => {
            if ( typeof categories === 'string' ) {
                if ( validateNames(categories) ) return [ categories ];
            } 
            else {
                if ( categories.every((category: string) => validateNames(category)) ) return categories;
            }
        },
        "skip": (skip: number) => ( Number.isInteger(skip) && skip > 0 ) && skip,
        "take": (take: number) => ( Number.isInteger(take) && take > 0 ) && take,
    };

    Object.entries(query).forEach(([key, value]: [string, unknown]) => {

        if (value === undefined) return; // query parameters not provided

        if (!queryFiltersValidator[key](value)) throw new Error(`Invalid query ${key} parameter provided`); // query parameter was provided but did not pass validation

        validatedFilters[key] = queryFiltersValidator[key](value); // query parameter provided and passed validation

    });

    request.query = validatedFilters;
}