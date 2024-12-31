const flagImage = document.querySelector(".flag-img")
const conName = document.querySelector(".conName")
const nativeName = document.querySelector(".nativeName")
const population = document.querySelector(".population")
const region = document.querySelector(".region")
const subRegion = document.querySelector(".sub-region")
const capital = document.querySelector(".capital")
const topLevelDomain = document.querySelector(".top-level-domain")
const currencies = document.querySelector(".currencies")
const languages = document.querySelector(".languages")
const borderCountries = document.querySelector(".border-countries")
const backButton = document.querySelector(".button-back")
const themeChanger = document.querySelector(".theme-changer")

backButton.addEventListener("click", () => {
    history.back();
})


const countryName = new URLSearchParams(location.search).get("name")

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((country) => {
            // console.log(country);

            flagImage.src = country.flags.svg;
            conName.innerText = country.name.common;
            if (country.name.nativeName) {
                nativeName.innerText = (Object.values(country.name.nativeName)[0].common)
            }
            population.innerText = country.population.toLocaleString("en-in")
            region.innerText = country.region
            if (country.subregion) {
                subRegion.innerText = country.subregion
            }

            if (country.capital) {
                capital.innerText = country.capital
            }
            if (country.tld) {
                topLevelDomain.innerText = country.tld
            }

            if (country.currencies) {
                currencies.innerText = (Object.values(country.currencies).map((currency) => currency.name).join(" ,"))
                console.log(data[0].currency)
            }

            if (country.languages) {
                languages.innerText = Object.values(country.languages).join(", ")
            }

            if (country.borders) {
                country.borders.forEach((border) => {
                    // console.log(border)
                    fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                        .then((res) => res.json())
                        .then(([borderCountry]) => {
                            console.log(borderCountry)
                            const borderCountryTag = document.createElement("a")
                            borderCountryTag.innerText = borderCountry.name.common
                            console.log(borderCountryTag)
                            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                            borderCountries.append(borderCountryTag)
                        })
                })
            }
        })

    })



themeChanger.addEventListener("click", () => {
    document.body.classList.toggle("dark")
})
















