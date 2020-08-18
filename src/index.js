import templateCountries from "./templates/countries.hbs";
import templateCountry from "./templates/country.hbs";
import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
const countryList = document.querySelector('.country__list');
const country = document.querySelector('.country');
const _ = require('lodash');


let countryValue;

const countryItems = function() {
    countryValue = country.value;
    checkCountry(countryValue)
        .then((list) => list.json())
        .then((list) => addItem(list));
}


const addItem = function(list) {
    while (countryList.hasChildNodes()) {
        countryList.removeChild(countryList.firstChild);
    }
    drowItem(list);
}

const drowItem = function(list) {
    const templateItems = templateCountries(list);
    const templateItem = templateCountry(list);
    if (list.length === 1) {
        drowFromHbs(templateItem)
    } else if (list.length > 10) {
        err();
    } else {
        drowFromHbs(templateItems);
    }
}
const drowFromHbs = function(item) {
    countryList.insertAdjacentHTML('afterbegin', item);
}
const err = function() {
    error({
        text: "Too many matches found. Please enter a more specific query!",
    });
}

const checkCountry = function(country) {
    const find = fetch(`
        https://restcountries.eu/rest/v2/name/${country}`)
    return find;
};

country.addEventListener('input', _.debounce(countryItems, 300));