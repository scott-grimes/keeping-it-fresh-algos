// REFACTOR THIS AS A CLASS

const cities = {
  'Montgomery, Alabama': [32.361538, -86.279118],
  'Phoenix, Arizona': [33.448457, -112.073844],
  'Little Rock, Arkansas': [34.736009, -92.331122],
  'Sacramento, California': [38.555605, -121.468926],
  'Denver, Colorado': [39.7391667, -104.984167],
  'Hartford, Connecticut': [41.767, -72.677],
  'Dover, Delaware': [39.161921, -75.526755],
  'Tallahassee, Florida': [30.4518, -84.27277],
  'Atlanta, Georgia': [33.76, -84.39],
  'Boise, Idaho': [43.613739, -116.237651],
  'Springfield, Illinois': [39.78325, -89.650373],
  'Indianapolis, Indiana': [39.790942, -86.147685],
  'Des Moines, Iowa': [41.590939, -93.620866],
  'Topeka, Kansas': [39.04, -95.69],
  'Frankfort, Kentucky': [38.197274, -84.86311],
  'Baton Rouge, Louisiana': [30.45809, -91.140229],
  'Augusta, Maine': [44.323535, -69.765261],
  'Annapolis, Maryland': [38.972945, -76.501157],
  'Boston, Massachusetts': [42.2352, -71.0275],
  'Lansing, Michigan': [42.7335, -84.5467],
  'Saint Paul, Minnesota': [44.95, -93.094],
  'Jackson, Mississippi': [32.32, -90.207],
  'Jefferson City, Missouri': [38.572954, -92.189283],
  'Helana, Montana': [46.595805, -112.027031],
  'Lincoln, Nebraska': [40.809868, -96.675345],
  'Carson City, Nevada': [39.160949, -119.753877],
  'Concord, New Hampshire': [43.220093, -71.549127],
  'Trenton, New Jersey': [40.221741, -74.756138],
  'Santa Fe, New Mexico': [35.667231, -105.964575],
  'Albany, New York': [42.659829, -73.781339],
  'Raleigh, North Carolina': [35.771, -78.638],
  'Bismarck, North Dakota': [48.813343, -100.779004],
  'Columbus, Ohio': [39.962245, -83.000647],
  'Oklahoma City, Oklahoma': [35.482309, -97.534994],
  'Salem, Oregon': [44.931109, -123.029159],
  'Harrisburg, Pennsylvania': [40.269789, -76.875613],
  'Providence, Rhode Island': [41.82355, -71.422132],
  'Columbia, South Carolina': [34, -81.035],
  'Pierre, South Dakota': [44.367966, -100.336378],
  'Nashville, Tennessee': [36.165, -86.784],
  'Austin, Texas': [30.266667, -97.75],
  'Salt Lake City, Utah': [40.7547, -111.892622],
  'Montpelier, Vermont': [44.26639, -72.57194],
  'Richmond, Virginia': [37.54, -77.46],
  'Olympia, Washington': [47.042418, -122.893077],
  'Charleston, West Virginia': [38.349497, -81.633294],
  'Madison, Wisconsin': [43.074722, -89.384444],
  'Cheyenne, Wyoming': [41.145548, -104.802042],
};
const citiesPixels = {
  'Montgomery, Alabama': [549, 324],
  'Phoenix, Arizona': [170, 304],
  'Little Rock, Arkansas': [453, 301],
  'Sacramento, California': [59, 196],
  'Denver, Colorado': [280, 221],
  'Hartford, Connecticut': [698, 141],
  'Dover, Delaware': [674, 200],
  'Tallahassee, Florida': [579, 350],
  'Atlanta, Georgia': [584, 305],
  'Boise, Idaho': [151, 130],
  'Springfield, Illinois': [496, 218],
  'Indianapolis, Indiana': [533, 210],
  'Des Moines, Iowa': [432, 185],
  'Topeka, Kansas': [394, 229],
  'Frankfort, Kentucky': [564, 234],
  'Baton Rouge, Louisiana': [479, 361],
  'Augusta, Maine': [717, 78],
  'Annapolis, Maryland': [656, 193],
  'Boston, Massachusetts': [714, 122],
  'Lansing, Michigan': [540, 151],
  'Saint Paul, Minnesota': [428, 122],
  'Jackson, Mississippi': [496, 329],
  'Jefferson City, Missouri': [461, 240],
  'Helana, Montana': [209, 97],
  'Lincoln, Nebraska': [383, 194],
  'Carson City, Nevada': [93, 196],
  'Concord, New Hampshire': [703, 109],
  'Trenton, New Jersey': [685, 168],
  'Santa Fe, New Mexico': [261, 286],
  'Albany, New York': [668, 118],
  'Raleigh, North Carolina': [648, 252],
  'Bismarck, North Dakota': [342, 91],
  'Columbus, Ohio': [577, 190],
  'Oklahoma City, Oklahoma': [380, 287],
  'Salem, Oregon': [67, 108],
  'Harrisburg, Pennsylvania': [640, 167],
  'Providence, Rhode Island': [713, 136],
  'Columbia, South Carolina': [617, 283],
  'Pierre, South Dakota': [343, 145],
  'Nashville, Tennessee': [528, 269],
  'Austin, Texas': [378, 365],
  'Salt Lake City, Utah': [186, 204],
  'Montpelier, Vermont': [685, 97],
  'Richmond, Virginia': [649, 217],
  'Olympia, Washington': [78, 52],
  'Charleston, West Virginia': [604, 210],
  'Madison, Wisconsin': [482, 152],
  'Cheyenne, Wyoming': [272, 184],
};

let bestDistance = -1;
let bestTour = [];

/*
*
* Parameters
*
*/
const sCurveAmplitude = 4000;
const sCurveCenter = 0;
const sCurveWidth = 3000;
const iterationsToRun = 25000;
let iteration = 0;
const chunkSize = 500;
let chunkRunnerID = null;
const redrawDelay = 500;

// Solves the problem
// 1 - starts with a random tour
// 2 - pick a new candidate tour
// 3 - if the new tour is better, adopt it
// 4 - if the new tour is worse, maybe still accept it based on a probability
//      determined by the current value of the annealing function
// 5 - repeat, reducing the temperature
// When the iterations are 0, you are done!
const anneal = function () {
  bestTour = getRandomTour();
  bestDistance = tourDistance(bestTour);

  chunkRunnerID = setInterval(runChunk, redrawDelay);
};

// Runs a small amount of iterations and redraws the cities and edges
var runChunk = function () {
  for (let i = 0; i < chunkSize; i++) {
    const candidate = getNeighbor(bestTour);
    const candidateDist = tourDistance(candidate);

    const temp = currentTemperature();
    const ratio = Math.exp((bestDistance - candidateDist) / temp);
    const rand = Math.random();

    // Always adopt a better function
    // Adopt poorer functions when the temperature is high,
    // and less frequently when the temperature is low
    if (candidateDist < bestDistance || rand < ratio) {
      bestTour = candidate;
      bestDistance = candidateDist;
    }

    iteration++;
  }

  drawGraph();
  if (iteration >= iterationsToRun) {
    clearInterval(chunkRunnerID);
  }
};

// Randomly generates a path through all of our cities
var getRandomTour = function getRandomTour() {
  return _.shuffle(Object.keys(cities));
};

// Generates a 'neighboring tour', given the current tour
// Pick two cities on the tour randomly, and reverse the
// portion of the tour that lies between them
var getNeighbor = function getNeighbor(tour) {
  const startIndex = Math.floor(Math.random() * tour.length);
  let endIndex = Math.floor(Math.random() * tour.length);

  while (Math.abs(endIndex - startIndex) < 2) {
    endIndex = Math.floor(Math.random() * tour.length);
  }

  const neighbor = [];

  // Middle section of the route needs to be reversed because endIndex is greater than startIndex
  if (endIndex > startIndex) {
    const first = tour.slice(0, startIndex + 1);
    const middle = tour.slice(startIndex + 1, endIndex);
    const last = tour.slice(endIndex);

    middle.reverse();

    return first.concat(middle).concat(last);
  }

  // Start index is after end, rotate tour so startingIndex is position 0
  const reorderedTour = tour.slice(startIndex).concat(tour.slice(0, startIndex));
  const lengthToBeShuffled = startIndex - endIndex - 1;

  // Rotate the new middle of the tour
  const first = reorderedTour.slice(0, 1);
  const middle = reorderedTour.slice(1, 1 + lengthToBeShuffled);
  const last = reorderedTour.slice(1 + lengthToBeShuffled);

  middle.reverse();

  return first.concat(middle).concat(last);
};

// Returns the distance between two cities (in degrees)
const distanceBetweenCities = function distanceBetweenCities(cityNameA, cityNameB) {
  const x1 = cities[cityNameA][0];
  const x2 = cities[cityNameB][0];
  const y1 = cities[cityNameA][1];
  const y2 = cities[cityNameB][1];

  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

// Estimates the total tour distance, assuming that 1 degree is 69 miles
var tourDistance = function (tour) {
  let distance = 0;

  for (let i = 0; i < tour.length - 1; i++) {
    distance += distanceBetweenCities(tour[i], tour[i + 1]);
  }

  distance += distanceBetweenCities(tour[tour.length - 1], tour[0]);

  return Math.floor(distance * 69);
};

// Returns the current temperature of our Annealing function
var currentTemperature = function () {
  return sCurveAmplitude * sCurve(iteration);
};

// Plots the shape of our sCurve (used to determine probability of accepting a 'poor' solution)
// Poor solutions might help us hop out of local minimums in the function
var sCurve = function (x) {
  return 1 / (1 + Math.exp((x - sCurveCenter) / sCurveWidth));
};

// Place a red dot on the map where a given city is located
const drawCity = function drawCity(cityName) {
  const coord = citiesPixels[cityName];
  const svg = d3.select('svg');


  const circle = svg.append('circle')
    .attr('cx', coord[0])
    .attr('cy', coord[1])
    .attr('r', 3)
    // Adds a pop-up city name on mouseover
    .on('mouseenter', () => {
      svg.append('svg:text')
        .attr('x', coord[0])
        .attr('y', coord[1])
        .text(() => cityName)
        .attr('id', 'mouseOverLabel')
        .style('pointer-events', 'none');
    })
    .on('mouseleave', () => {
      const selected = d3.select('#mouseOverLabel').remove();
    })
    .style('fill', 'red');
};

// Draws a line connecting two named cities
const drawEdge = function drawEdge(aCityName, bCityName) {
  const coord1 = citiesPixels[aCityName];
  const coord2 = citiesPixels[bCityName];

  const svg = d3.select('svg');

  const line = svg.append('line')
    .style('stroke', 'black')
    .attr('x1', coord1[0])
    .attr('y1', coord1[1])
    .attr('x2', coord2[0])
    .attr('y2', coord2[1]);
};

// Draws the current map including cities and the current route
var drawGraph = function drawGraph(tour) {
  const bodySelection = d3.select('body');
  bodySelection.html('');

  const svgSelection = bodySelection.append('svg')
    .attr('width', 786)
    .attr('height', 570);

  const img = svgSelection.append('svg:image')
    .attr('xlink:href', 'usMap.png')
    .attr('x', '0')
    .attr('y', '0')
    .attr('width', '786')
    .attr('height', '570');

  const tempText = svgSelection.append('svg:text')
    .attr('x', '50')
    .attr('y', '380')
    .text(() => `Temperature: ${Math.floor(currentTemperature())}`);

  const iterText = svgSelection.append('svg:text')
    .attr('x', '50')
    .attr('y', '400')
    .text(() => `Iteration: ${iteration}`);

  const distText = svgSelection.append('svg:text')
    .attr('x', '50')
    .attr('y', '420')
    .text(() => `Distance: ${bestDistance}`);

  for (const city in citiesPixels) {
    drawCity(city);
  }

  drawEdges();
};

// Draws all paths connecting cities for the current best tour
var drawEdges = function () {
  for (let i = 0; i < bestTour.length - 1; i++) {
    drawEdge(bestTour[i], bestTour[i + 1]);
  }

  drawEdge(bestTour[bestTour.length - 1], bestTour[0]);
};


window.onload = function () {
  anneal();
};
