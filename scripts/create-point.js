function populateUFs () {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
        for ( const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value
    // const citySelect = document.querySelector("select[name=city]")
    // const stateinput = document.querySelector("input[name=state]")
    

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    // Nessas duas linhas de código, sera feita a limpeza do campo, caso seja escolhido outro estado, dessa forma, nao ficaram cidades acumuladas.
    // citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    //citySelect.disabled = true

    fetch(url)
    .then( res => res.json())
    .then( cities => {
        for( const city of cities ) {
             /* Apresenta a opção selecionada no Front do HTML */
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
           
        }
        citySelect.disabled = false
    })
}

document
        .querySelector("select[name=uf]")
        .addEventListener("change", getCities)
        /* Se quiser pode ser também: getCities(event) */
