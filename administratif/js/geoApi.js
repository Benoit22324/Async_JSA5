const baseUrl = 'https://geo.api.gouv.fr';

/* Data Fetcher */
// Regions Data Fetcher
export const getRegions = async () => {
    return (await fetch(`${baseUrl}/regions`)).json();
}

// Departements Data Fetcher
export const getDepartements = async (code) => {
    return (await fetch(`${baseUrl}/regions/${code}/departements`)).json();
}

// Communes Data Fetcher
export const getCommunes = async (code) => {
    return (await fetch(`${baseUrl}/departements/${code}/communes`)).json();
}