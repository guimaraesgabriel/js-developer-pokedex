const listPokemonsHTML = document.getElementById("listPokemons");
const btnLoadMore = document.getElementById("btnLoadMore");

isLoading = false;

let offset = 0;
let limit = 21;

const POKEMONS_GEN_1 = 151;
const POKEMONS_GEN_2 = 251;
const POKEMONS_GEN_3 = 386;
const POKEMONS_GEN_4 = 493;
const POKEMONS_GEN_5 = 649;
const POKEMONS_GEN_6 = 721;
const POKEMONS_GEN_7 = 809;
const POKEMONS_GEN_8 = 905;
const POKEMONS_GEN_9 = 1015;

const maxLimitPokemons = POKEMONS_GEN_3;

let pokemonIdToggled = null;

function toggleDetails(pokemonNumber) {
  if (pokemonIdToggled) {
    const divPokemonToggledId = document.getElementById(
      `div-pokemon-details-${pokemonIdToggled}`
    );

    if (pokemonNumber === pokemonIdToggled) {
      divPokemonToggledId.style.display = "none";
      pokemonIdToggled = null;

      return;
    }

    divPokemonToggledId.style.display = "none";
  }

  const divPokemonDetailsId = document.getElementById(
    `div-pokemon-details-${pokemonNumber}`
  );

  divPokemonDetailsId.style.display = "initial";

  pokemonIdToggled = pokemonNumber;
}

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

function mapPokemonAbilitiesToList(abilities) {
  return abilities
    .map(
      (abilities) =>
        `<div class="pokemon_more-details_abilities_list_ability ${
          abilities.is_hidden
            ? "pokemon_more-details_abilities_list_ability_hidden"
            : ""
        }">
          <span>${abilities.ability.name}</span>
          <span>${abilities.is_hidden ? "*" : ""}</span>
        </div>`
    )
    .join("");
}

function mapPokemonStatsToList(stats) {
  return stats
    .map(
      (stats) =>
        `<div class="pokemon_more-details_stats_list_stat">
          <span class="pokemon_more-details_stats_list_stat_name">${stats.stat.name.replace(
            /\-/g,
            " "
          )}</span>

          <span class="pokemon_more-details_stats_list_stat_base-stat">${
            stats.base_stat
          }</span>
        </div>`
    )
    .join("");
}

function mapPokemonHeldItemsToList(heldItems) {
  return heldItems
    .map(
      (heldItems) =>
        `<div class="pokemon_more-details_held-items_list_item">${heldItems.item.name}</div>`
    )
    .join("");
}

function mapPokemonToList(pokemon) {
  return `
    <li
      class="pokemon card_${pokemon.mainType}" 
      onclick="toggleDetails(${pokemon.number})"
    >
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

      <div 
        class="pokemon_more-details" 
        id="div-pokemon-details-${pokemon.number}"
      >
        <div class="pokemon_more-details_short-data">
          <div class="pokemon_more-details_short-data_height">
            Height: ${pokemon.height}
          </div>

          <div class="pokemon_more-details_short-data_weight">
            Weight: ${pokemon.weight}
          </div>

          <div class="pokemon_more-details_short-data_base-experience">
            Base XP: ${pokemon.baseExperience}
          </div>
        </div>

        <div class="pokemon_more-details_abilities">
          <span class="pokemon_more-details_abilities_title">Abilities:</span>

          <div class="pokemon_more-details_abilities_list">
            ${mapPokemonAbilitiesToList(pokemon.abilities)}
          </div>
        </div>

        <div class="pokemon_more-details_stats">
          <span class="pokemon_more-details_stats_title">Base Stats:</span>

          <div class="pokemon_more-details_stats_list">
            ${mapPokemonStatsToList(pokemon.stats)}
          </div>
        </div>

        <div class="pokemon_more-details_held-items" style="display:${
          pokemon.heldItems.length > 0 ? "initial" : "none"
        }">
         <span class="pokemon_more-details_held-items_title">Held Items:</span>
          <div class="pokemon_more-details_held-items_list">
            ${mapPokemonHeldItemsToList(pokemon.heldItems)}
          </div>
        </div>
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

        btnLoadMore.style.display = "none";
      })
      .catch((error) => console.error(error))
      .finally(() => (isLoading = false));

    return;
  }

  pokeApi
    .getListPokemons(limit, offset)
    .then((pokemonsApi = []) => {
      listPokemonsHTML.innerHTML += pokemonsApi.map(mapPokemonToList).join("");
    })
    .catch((error) => console.error(error))
    .finally(() => (isLoading = false));
};
