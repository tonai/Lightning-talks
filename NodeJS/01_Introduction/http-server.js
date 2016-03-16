const PORT=8080;

require('http')
  .createServer(function(request, response){
    response.end('It Works!');
  })
  .listen(PORT, function(){
    console.log('Server listening on: http://localhost:%s', PORT);
  });
