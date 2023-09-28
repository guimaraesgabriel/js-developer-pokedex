class Pokemon {
  number;
  name;
  mainType;
  types = [];
  img;

  constructor(pokemon) {
    this.number = pokemon.id;
    this.name = pokemon.name;
    this.mainType = pokemon.types[0].type.name;
    this.types = pokemon.types;
    this.img = pokemon.sprites.other["official-artwork"].front_default;
  }
}
