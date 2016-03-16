var _ = require('lodash');

var animals = [
  {species: 'dog', name: 'Pongo'},
  {species: 'cat', name: 'Duchesse'},
  {species: 'cat', name: 'Thomas O\'Malley'},
  {species: 'dog', name: 'Perdita'},
  {species: 'dog', name: 'Lucky'},
  {species: 'cat', name: 'Berlioz'},
  {species: 'cat', name: 'Toulouse'},
];

var isSomeSpecies = function(species, animal) {
  return animal.species === species;
};
isSomeSpecies = _.curry(isSomeSpecies);

var dogs = animals.filter(isSomeSpecies('dog'));
console.log(JSON.stringify(dogs, null, 2));
