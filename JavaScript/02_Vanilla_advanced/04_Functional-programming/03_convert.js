var fs = require('fs');

var output = fs.readFileSync('03_input.csv', 'utf8')
  .trim()
  .split('\n')
  .map(line => line.split(','))
  .reduce((customers, line) => {
    var name = line[0] + ' ' + line[1];
    customers[name] = customers[name] || [];
    customers[name].push({
      name: line[2],
      price: line[3],
      quantity: line[4]
    });
    return customers;
  }, {});

console.log(JSON.stringify(output, null, 2));
