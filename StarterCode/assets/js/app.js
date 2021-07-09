// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);



// Load data from miles-walked-this-month.csv
d3.csv("data.csv").then(function(stateData) {

  // Print the stateData
  console.log(stateData);
  xdata = stateData.map(data => +data.poverty);
  ydata = stateData.map(data => +data.healthcare);
  console.log(xdata);
  var xScale = d3.scaleLinear()
    .domain(d3.extent(xdata))
    .range([0, chartWidth]);
    
  var yScale = d3.scaleLinear()
    .domain(d3.extent(ydata))
    .range([chartHeight, 0]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);



  // Append a group area, then set its margins
  var chartGroup = svg.selectAll("g")
      .data(stateData);


  /*Create and place the "blocks" containing the circle and the text */  
  var elemEnter = chartGroup.enter()
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  /*Create the circle for each block */
  var circle = elemEnter.append("circle")
      .attr("cx", d => xScale(+d.poverty))
      .attr("cy", d => yScale(+d.healthcare))
      .attr("r", "13")
      .attr("fill", "cyan");

  /* Create the text for each block */
  elemEnter.append("text")
      .attr("text-anchor", "middle")
      .attr("dx", d => xScale(+d.poverty))
      .attr("dy", d => yScale(+d.healthcare))
      .text(d => d.abbr);
  elemEnter.append("g")
      .call(leftAxis);
  
  elemEnter.append("g")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(bottomAxis);

  elemEnter.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top -1})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("In Poverty (%)");

    elemEnter.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (chartHeight / 2))
    .attr("dy", "1em")
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("Lacks Healthcare (%)");

}).catch(function(error) {
  console.log(error);
});