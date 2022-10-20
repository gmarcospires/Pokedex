const pokemonList = document.querySelector('#pokemonList');
const loadMoreButton = document.querySelector('#loadMore');
let offset = 0;
const limit = 20;
const maxPokemons = 251;

function convertPokemonTypesToLi(pokemonTypes) {
  return pokemonTypes
    .map((type) => `<li class="type ${type}">${type}</li>`)
    .join('');
}

function convertPokemonToLi(pokemon) {
  return ` <li class="pokemon ${pokemon?.type}">
                <span class="number">#${pokemon?.number}</span>
                <span class="name">${pokemon?.name}</span>
                <div class="detail">
                <ol class="types">
                    ${convertPokemonTypesToLi(pokemon?.types)}
                </ol>
                <img
                    src="${pokemon?.photo}"
                    alt="${pokemon?.name}"
                />
                </div>
            </li>`;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  const qtdRecords = offset + limit;
  if (qtdRecords >= maxPokemons) {
    const newLimit = maxPokemons - offset;
    loadPokemonItens(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
