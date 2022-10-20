function convertPokemonTypesToLi(pokemonTypes) {
  return pokemonTypes.map((type) => `<li class="type">${type}</li>`).join('');
}

function convertPokemonToLi(pokemon) {
  return ` <li class="pokemon ${pokemon?.type}">
                <!-- id/order -->
                <span class="number">#${pokemon?.number}</span>
                <!-- name -->
                <span class="name">${pokemon?.name}</span>
                <div class="detail">
                <!-- types[0].type.name -->
                <ol class="types">
                    ${convertPokemonTypesToLi(pokemon?.types)}
                </ol>
                <!-- sprites.other.dream_world.front_default -->
                <img
                    src="${pokemon?.photo}"
                    alt="${pokemon?.name}"
                />
                </div>
            </li>`;
}

const pokemonList = document.querySelector('#pokemonList');

pokeApi.getPokemons().then((pokemons = []) => {
  pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
});
