
const pokemonList = document.getElementById('pokemonList');
const loadmorebutton = document.getElementById('loadmorebutton');

const maxRecords=1050
const limit = 15
let offset = 0;


function loadPokemonItens(offset, limit) {
  pokeapi.getPoke(offset, limit).then((poke = []) => {
    const newHtml = poke.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}" alt="${pokemon.name}">  
          </div>
        </li>
      `)
      .join('')

    pokemonList.innerHTML += newHtml
  });
}
loadPokemonItens(offset,limit )
 

loadmorebutton.addEventListener('click', () => {
  offset += limit
  debugger

  const qtdRegisternexpage = offset+limit

  if (qtdRegisternexpage>=maxRecords){

    const newlimit=maxRecords-offset
    loadPokemonItens(offset,newlimit )
    

    loadmorebutton.parentElement.removeChild(loadmorebutton)

  } else  {
  }
  loadPokemonItens(offset,limit)
})