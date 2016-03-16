const PORT=8080;

var output = {
  'baskets': {
    'John Doe': [
      {name: "Jacket", price: 70, quantity: 1},
      {name: "Socks", price: 10, quantity: 2}
    ],
    'Nikita Smith': [
      {name: "Dress", price: 50, quantity: 1},
      {name: "Tights", price: 10, quantity: 3},
      {name: "Shoe", price: 90, quantity: 1}
    ]
  }
};

require('http')
  .createServer(function(request, response){
    response.end(JSON.stringify(output));
  })
  .listen(PORT, function(){
    console.log('Server listening on: http://localhost:%s', PORT);
  });
