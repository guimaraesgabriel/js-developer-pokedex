const listPokemonsHTML = document.getElementById("listPokemons");
const btnLoadMore = document.getElementById("btnLoadMore");

isLoading = false;

let offset = 0;
let limit = 21;

const maxLimitPokemons = 151;

function mapPokemonTypesToList(types) {
  return types
    .map(
      (types) =>
        `<li class="pokemon_details_types_type ${
          types.type.name
        }">${types.type.name.toUpperCase()}</li>`
    )
    .join("");
}

function mapPokemonToList(pokemon) {
  return `
    <li class="pokemon card_${pokemon.mainType}">
      <div class="pokemon_header">
      <span class="pokemon_header_name">${pokemon.name}</span>
      <span class="pokemon_header_number">#${pokemon.number}</span>
      </div>

      <div class="pokemon_details">
        <ol class="pokemon_details_types">
        ${mapPokemonTypesToList(pokemon.types)}
        </ol>

        <img
          class="pokemon_details_img"
          src="${pokemon.img}"
          alt="${pokemon.name}"
        />
      </div>
    </li>
  `;
}

pokeApi.getListPokemons(limit, offset).then((pokemonsApi = []) => {
  listPokemonsHTML.innerHTML = pokemonsApi.map(mapPokemonToList).join("");
});

loadMorePokemons = () => {
  isLoading = true;

  offset += limit;

  const qtdNextLoad = offset + limit;

  if (qtdNextLoad >= maxLimitPokemons) {
    limit = maxLimitPokemons - offset;

    pokeApi
      .getListPokemons(limit, offset)
      .then((pokemonsApi = []) => {
        listPokemonsHTML.innerHTML += pokemonsApi
          .map(mapPokemonToList)
          .join("");

        isLoading = false;

        btnLoadMore.style.display = "none";
      })
      .catch((error) => {
        console.error(error);
        isLoading = false;
      });

    return;
  }

  pokeApi
    .getListPokemons(limit, offset)
    .then((pokemonsApi = []) => {
      listPokemonsHTML.innerHTML += pokemonsApi.map(mapPokemonToList).join("");

      isLoading = false;
    })
    .catch((error) => {
      console.error(error);
      isLoading = false;
    });
};
