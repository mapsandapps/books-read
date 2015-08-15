
var dataset = [ [ '2014', 'January', '7' ],
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

var csvData = "data:text/csv;charset=utf-8,2014,January%0A2014,January%0A2014,February%0A2014,February%0A2014,February%0A2014,February%0A2014,March%0A2014,March%0A2014,March%0A2014,March%0A2014,April%0A2014,April%0A2014,April%0A2014,April%0A2014,May%0A2014,May%0A2014,January%0A2014,January%0A2014,January%0A2014,February%0A2014,March%0A";

d3.csv(csvData, function(data) {
  console.log(data);
});

// d3.select("body").selectAll("div")
//     .data(dataset)
//     .enter()
//     .append("div")
//     .attr("class", "bar")
//     .style("height", function(d) {
//       return d[2] + "px";
//     });

var svg = d3.select("body").append("svg");
var w = 500;
var h = 100;
var barPadding = 1;

svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
    return i * (w / dataset.length);
  })
  .attr("y", function(d) {
    return h - (d[2] * 4);
  })
  .attr("width", w / dataset.length - barPadding)
  .attr("height", function(d) {
    return d[2] * 4;
  })
  .attr("fill", "teal");

svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function(d) {
    return d[1];
  })
  .attr("x", function(d, i) {
    return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
  })
  .attr("y", function(d, i) {
    return h - (d[2] * 4) + 15;
  })
  .attr("text-anchor", "middle");
