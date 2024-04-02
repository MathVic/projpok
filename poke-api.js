const pokeapi = {};

function convertpokeapiDetailpokemon(pokeDetail){
  const pokemon=new Pokemon()
  pokemon.name=pokeDetail.name
  pokemon.number=pokeDetail.id

  const types=pokeDetail.types.map((typeSlot)=>typeSlot.type.name)
  const [type]=types

  pokemon.types= types
  pokemon.type= type

pokemon.photo=pokeDetail.sprites.other.dream_world.front_default

return pokemon
}

pokeapi.getPokeDetail = (pokemon) => {

  return fetch(pokemon.url)
  
  .then((response) => response.json())   
  .then(convertpokeapiDetailpokemon)  
  
    };
    

pokeapi.getPoke = (offset = 0, limit = 25) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      return response.json();
    })
    .then((jsonBody) => jsonBody.results)
    .then((poke) => poke.map(pokeapi.getPokeDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokeDetails) => pokeDetails)
    .catch((error) => {
      console.error('Erro:', error);
      throw error; // Rethrow para propagar o erro
    });
};

/*const pokeapi = {};

function convertpokeapiDetailpokemon(pokeDetail){
  const pokemon=new Pokemon()
  pokemon.name=pokeDetail.name
  pokemon.number=pokeDetail.order
  pokemon.types=pokeDetail
}

pokeapi.getPokeDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((pokemon)=>{


    })
    .then((response) => {
    
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      return response.json();   
      
    });
    
  };

pokeapi.getPoke = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      return response.json();
    })
    .then((jsonBody) => jsonBody.results)
    .then((poke) => poke.map(pokeapi.getPokeDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokeDetails) => pokeDetails)
    .catch((error) => {
      console.error('Erro:', error);
      throw error; // Rethrow para propagar o erro
    });
};*/