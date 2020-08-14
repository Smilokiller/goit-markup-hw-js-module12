import templateCountries from "./templates/countries.hbs";
import templateCountry from "./templates/country.hbs";
import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
const countryList = document.querySelector('.country__list');
const country = document.querySelector('.country');
const body = document.querySelector('body')
const _ = require('lodash');

let countryValue;
country.addEventListener('input',
    _.debounce((() => {
        countryValue = country.value;
        checkBank(countryValue)
            .then((list) => list.json())
            .then((list) => addItem(list))
    }), 300));


const addItem = function(list) {
    const templateItems = templateCountries(list);
    const templateItem = templateCountry(list);
    while (countryList.hasChildNodes()) {
        countryList.removeChild(countryList.firstChild);
    }
    if (list.length === 1) {
        countryList.insertAdjacentHTML('afterbegin', templateItem);
    } else if (list.length > 10) {
        error({
            text: "Too many matches found. Please enter a more specific query!",
        });
    } else {
        countryList.insertAdjacentHTML('afterbegin', templateItems);
    }
}

const checkBank = function(country) {
    const promise = new Promise((resolve, reject) => {
        const find = fetch(`
        https://restcountries.eu/rest/v2/name/${country}`)
        find && resolve(find);
    })
    return promise;
};