var menuItems = [
  {id: 1, parent: null, title: 'root'},
  {id: 2, parent: 1, title: 'Menu 1'},
  {id: 3, parent: 1, title: 'Menu 2'},
  {id: 4, parent: 2, title: 'Menu 1/1'},
  {id: 5, parent: 2, title: 'Menu 1/2'},
  {id: 6, parent: 3, title: 'Menu 2/1'},
  {id: 7, parent: 3, title: 'Menu 2/2'}
];

function makeTree(flatList, parentId) {
  var tree = {};
  flatList
    .filter(function(item){
      return item.parent === parentId;
    })
    .forEach(function(item){
      tree[item.title] = makeTree(flatList, item.id);
    });
  return tree;
}

var tree = makeTree(menuItems, null);

console.log(JSON.stringify(tree, null, 2));
