const pokeAPIUrl = "https://pokeapi.co/api/v2";

const pokeApi = {};

function mapPokemonToModel(pokemon) {
  return new Pokemon(pokemon);
}

pokeApi.getPokemonDetails = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then((pokemonDetailed) => mapPokemonToModel(pokemonDetailed))
    .catch((error) => console.error(error));
};

pokeApi.getListPokemons = (limit, offset) => {
  const url = `${pokeAPIUrl}/pokemon?limit=${limit}&offset=${offset}`;

  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => responseJson.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
    .then((detailsRequests) => Promise.all(detailsRequests))
    .then((pokemonDetailedMapped) => pokemonDetailedMapped)
    .catch((error) => console.error(error));
};
