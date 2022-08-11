const pokemonName = document.querySelector('.pokemonname')
const pokemonNumber = document.querySelector('span#numero')
const pokemonImage = document.querySelector('.pokemonimg')
const form = document.querySelector('.form')
const input = document.querySelector('#inputsearch')
const prev = document.querySelector('.btnprev')
const next = document.querySelector('.btnnext')
const info = document.querySelector(".info")
const popup = document.querySelector('.popup')
let searchPokemon = 1

//função arrow assincrona que busca o pokemon pesquisado na API e verifica se o pokemon foi encontrado antes de retornar os dados
const fetchPokemon = async (pokemon) => {
    
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if(APIresponse.status === 200){
        
        const data = await APIresponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    
    const data = await fetchPokemon(pokemon)
    if(data){
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name   //Busca o nome do pokemon
        pokemonNumber.innerHTML = data.id   //O numero do pokemon dentro da pokédex
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'] //Busca a imagem animada
        popup.innerHTML =  //Adicionando texto do pop-up
        `<br>Tipo: ${data['types']['0']['type']['name']} 
        <p>Habilidades: ${data['abilities']['0']['ability']['name']}</p>
        <p>Peso: ${data.weight/10}Kg</p>` 
        input.value = ''
        searchPokemon = data.id
    } else{
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not Found'
        pokemonNumber.innerHTML = '???'
    }
}

form.addEventListener('submit', (event) => {
    
    event.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

//botão prev subtrai 1 ao valor de searchPokemon para buscar o pokemon anterior quando clicar
prev.addEventListener('click', () =>{
    if(searchPokemon > 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

//botão next soma 1 ao valor de searchPokemon para buscar o pokemon seguinte quando clicar
next.addEventListener('click', () =>{
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

//EventListener para acionar o 'pop-up' quando o mouse passar por cima do botão de classe info, e sumir quando sair de cima.
info.addEventListener('mouseover', () => {
    popup.style.display = 'block'
})
info.addEventListener('mouseleave', () => {
    popup.style.display = 'none'
})

renderPokemon(searchPokemon)//Chamando a função renderPokemon com o parâmetro searchPokemon para carregar a tela com um pokemon
