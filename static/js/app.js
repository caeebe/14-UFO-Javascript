// from data.js
var tableData = data;

// Set the dropdown menus

var uniqueCities = []; 
tableData.forEach(function(ufo) {
    var unique = uniqueCities.includes(ufo.city);
    if (!unique) {
        uniqueCities.push(ufo.city);
        var optionElement = d3.select("#city").append("option").text(ufo.city);
    }
});
var uniqueStates = []; 
tableData.forEach(function(ufo) {
    var unique = uniqueStates.includes(ufo.state);
    if (!unique) {
        uniqueStates.push(ufo.state);
        var optionElement = d3.select("#state").append("option").text(ufo.state);
    }
});
var uniqueCountry = []; 
tableData.forEach(function(ufo) {
    var unique = uniqueCountry.includes(ufo.country);
    if (!unique) {
        uniqueCountry.push(ufo.country);
    }
});
uniqueCountry.sort();
uniqueCountry.forEach(function(country) {
    d3.select("#country").append("option").text(country);
});
var uniqueShape = []; 
tableData.forEach(function(ufo) {
    var unique = uniqueShape.includes(ufo.shape);
    if (!unique) {
        uniqueShape.push(ufo.shape);
    }
});
uniqueShape.sort();
uniqueShape.forEach(function(shape) {
    d3.select("#shape").append("option").text(shape);
});


// Append a table to your web page and then adds new rows of data for each UFO sighting.

function makeTable(ufoData) {
	var tableBody = d3.select("tbody");
    d3.selectAll("td").remove();
	ufoData.forEach(row => {
        cell = tableBody.append('tr'); 
        Object.entries(row).forEach(([key,value]) => {
            cell.append('td').text(value);
        });
    });
}

makeTable(tableData);

// Use a date form in your HTML document and write JavaScript code that will listen for events and search through the date/time column to find rows that match user input.

var filterButton = d3.select("#filter-btn");

filterButton.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node & the datetime value
  var inputDate = d3.select("#datetime");
  var DateValue = inputDate.property("value");
  //Select the input element and get the raw HTML node & the city value
  var inputCity = d3.select("#city");
  var CityValue = inputCity.property("value");
      // Select the input element and get the raw HTML node & the state value
  var inputState = d3.select("#state");
  var StateValue = inputState.property("value");
  // Select the input element and get the raw HTML node & the country value
  var inputCountry = d3.select("#country");
  var CountryValue = inputCountry.property("value");
  // Select the input element and get the raw HTML node & the shape value
  var inputShape = d3.select("#shape");
  var ShapeValue = inputShape.property("value");
    
    
  console.log(DateValue + ", " + CityValue + ", " + CountryValue + ", " + ShapeValue);

  // filter the data by date
    if (DateValue === "") {
        var filteredDate = tableData;
    }
    else {
        var filteredDate = tableData.filter((ufo) => ufo.datetime === DateValue);
    }
    
  // filter the data by city
    if (CityValue === "all") {
        var filteredCity = filteredDate;
    }
    else {
        var filteredCity = filteredDate.filter((ufo) => ufo.city === CityValue);
    }
    
  // filter the data by state
    if (StateValue === "all") {
        var filteredState = filteredCity;
    }
    else {
        var filteredState = filteredCity.filter((ufo) => ufo.state === StateValue);
    }
          
  // filter the data by country
    if (CountryValue === "all") {
        var filteredCountry = filteredState;
    }
    else {
        var filteredCountry = filteredState.filter((ufo) => ufo.country === CountryValue);
    }
        
  // filter the data by shape
    if (ShapeValue === "all") {
        var filteredAll = filteredCountry;
    }
    else {
        var filteredAll = filteredCountry.filter((ufo) => ufo.shape === ShapeValue);
    }
    
  // print only the filtered data
  makeTable(filteredAll);

});

