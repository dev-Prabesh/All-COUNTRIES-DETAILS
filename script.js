const countriesContainer = document.querySelector(".countries-container")


const region = document.querySelector(".region")

const searchInput = document.querySelector(".search-container")

const subRegion = document.querySelector(".sub-region")

const currencies = document.querySelector(".currencies")

const languages = document.querySelector(".languages")

const filterByRegion = document.querySelector(".filter-by-region")
const themeChanger = document.querySelector(".theme-changer")




let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then(renderCountries)

function renderCountries(data) {
    countriesContainer.innerHTML = " ";
    allCountriesData = data;
    console.log(allCountriesData)
    data.forEach((country) => {
        const countryCard = document.createElement("a")
        countryCard.classList.add("country-card")
        countryCard.href = `/country.html?name=${country.name.common}`

        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="flag">
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital}</p>
            </div>
        `
        countriesContainer.append(countryCard)

    })
}

searchInput.addEventListener("input", (e) => {
    console.log(e.target.value)
    console.log(allCountriesData)
    const filteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    console.log(filteredCountries)
    renderCountries(filteredCountries)
})













filterByRegion.addEventListener("change", (e) => {
    console.log(e.target.value)
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
        .then((res) => res.json())
        .then((data) => {
            renderCountries(data)
        }) 
})



themeChanger.addEventListener("click",()=>{
    document.body.classList.toggle("dark")
})