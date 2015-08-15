var _ = require('underscore');

var arrData = [ [ '2014', 'January', '7' ],
  [ '2014', 'January', '19' ],
  [ '2014', 'February', '10' ],
  [ '2014', 'February', '18' ],
  [ '2014', 'February', '18' ],
  [ '2014', 'February', '26' ],
  [ '2014', 'March', '22' ],
  [ '2014', 'March', '24' ],
  [ '2014', 'March', '24' ],
  [ '2014', 'March', '29' ],
  [ '2014', 'April', '16' ],
  [ '2014', 'April', '25' ],
  [ '2014', 'April', '27' ],
  [ '2014', 'April', '27' ],
  [ '2014', 'May', '3' ],
  [ '2014', 'May', '5' ],
  [ '2014', 'January', '16' ],
  [ '2014', 'January', '22' ],
  [ '2014', 'January', '25' ],
  [ '2014', 'February', '24' ],
  [ '2014', 'March', '17' ] ];

// counts by date:
var results = _.reduce(arrData, function(counts,key){ counts[key]++; return counts },
  _.object(_.map(_.uniq(arrData), function(key) { return [key, 0] })));

console.log(results);

// counts by month:
// remove column of array:
var arrByMonth = arrData;
for (var i = 0; i < arrByMonth.length; i++) {
  arrByMonth[i].splice(2,1);
};
// similar to results equation above:
var byMonth = _.reduce(arrByMonth, function(counts,key){ counts[key]++; return counts },
  _.object(_.map(_.uniq(arrByMonth), function(key) { return [key, 0] })));

console.log(byMonth);

var csvContent = "data:text/csv;charset=utf-8,";
arrData.forEach(function(infoArray, index) {
  dataString = infoArray.join(",");
  csvContent += dataString + "\n";
});

console.log(csvContent);

var encodedUri = encodeURI(csvContent);
console.log(encodedUri);
