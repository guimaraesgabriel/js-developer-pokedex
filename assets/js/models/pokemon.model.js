class Pokemon {
  number;
  name;
  mainType;
  types = [];
  img;
  height;
  weight;
  baseExperience;
  stats = [];
  types = [];
  abilities = [];
  heldItems = [];

  constructor(pokemon) {
    this.number = pokemon.id;
    this.name = pokemon.name;
    this.mainType = pokemon.types[0].type.name;
    this.img = pokemon.sprites.other["official-artwork"].front_default;
    this.height = pokemon.height;
    this.weight = pokemon.weight;
    this.baseExperience = pokemon.base_experience;
    this.stats = pokemon.stats;
    this.types = pokemon.types;
    this.abilities = pokemon.abilities;
    this.heldItems = pokemon.held_items;
  }
}
