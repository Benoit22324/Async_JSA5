/* Import */
import { getCommunes, getDepartements, getRegions } from "./geoApi";

/* Dom Loaded Event */
document.addEventListener('DOMContentLoaded', async () => {
    // DOM Elements
    const form = document.getElementById('administration');
    const regionsSelector = document.getElementById('regions');
    const departementSelector = document.getElementById('departements');
    const communesList = document.getElementById('communes');

    // Initialisation
    const regions = await getRegions();
    regions.forEach(region => {
        loadOptions(region, regionsSelector);
    });
    loadDepartement(11, departementSelector);

    /* Event Listener */
    // Region Selected Event
    regionsSelector.addEventListener('change', (e) => {
        loadDepartement(e.target.value, departementSelector);
    })

    // Form Submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target)

        const communes = await getCommunes(formData.get('departements'));
        communesList.innerHTML = communes.sort((a, b) => b.population - a.population)
        .map(commune => `<li>${commune.nom} (${commune.population} habitans)</li>`).join('');
    })
})

/* Dom Loader */
// Departement Loader
const loadDepartement = async (code, where) => {
    const departements = await getDepartements(code);

    where.innerHTML = "";
    departements.forEach(departement => {
        loadOptions(departement, where);
    })
}

// Options Loader
const loadOptions = (element, where) => {
    return where.innerHTML += `<option value=${element.code}>${element.nom}</option>`;
}