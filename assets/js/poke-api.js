const pokeApi = {};
function convertpokeApiDetailToPokemon(pokemonDetail) {
  const pokemon = new Pokemon();

  pokemon.name = pokemonDetail.name;
  pokemon.number = pokemonDetail.id;

  const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default;
  pokemon.height = pokemonDetail.height;
  pokemon.weight = pokemonDetail.weight;

  const stats = pokemonDetail.stats.map((stat) => stat.base_stat);
  pokemon.stats.hp = stats[0];
  pokemon.stats.attack = stats[1];
  pokemon.stats.defense = stats[2];
  pokemon.stats.special_attack = stats[3];
  pokemon.stats.special_defense = stats[4];
  pokemon.stats.speed = stats[5];

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertpokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 20) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonDetails) => {
      return pokemonDetails;
    })
    .catch((error) => {
      console.log(error);
    });
};
