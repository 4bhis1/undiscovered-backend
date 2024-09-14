const axios = require('axios');

const parseData = (data) => {
  let content = data;

  try {
    content = JSON.parse(content);
  } catch (e) {
    const resultArray = content?.split('```');

    let resultData = resultArray?.[1] || resultArray?.[0] || '';

    if (resultData && resultData.startsWith('json')) {
      resultData = resultData.substring(4);
    }

    resultData = resultData.replace(/\n/g, '');

    content = JSON.parse(resultData);
  }

  console.log(JSON.stringify(content));

  return content;
};

const generateItinerary = async (generateItineraryDto) => {
  console.log('🚀 ~ generateItinerary ~ generateItineraryDto:', generateItineraryDto);

  try {
    const { destination, budget, interests, checkinDate, checkoutDate, members = {} } = generateItineraryDto || {};

    const { adults, kids } = members || {};

    const differenceInTime = new Date(checkoutDate) - new Date(checkinDate);

    const noOfDays = differenceInTime / (1000 * 3600 * 24);

    const format = `{destination: {numberOfDays: Number,destinationCities: array of String // possible cities to visit in span days ,destinationCountry: String,currency: String,oneDollarInLocalCurrency: Number,languagesSpoken: Array,timeThereInUtcFormat: String // eg. UTC + 2,capitalOfTheCountry: String, localWeather: String // eg. monsoon or continental or etc, temperatureRangeThroughTheYear: String,shortDescription: String // 2-3 sentances, shortHistory: String // 2-3 sentances,startDate: String,endDate: String},itinerary:[{day: number, date: String // eg. dayoftheweek day month, program: [{id: Number // continue with the next number on the next day,programOrPlaceName: String, timeSpentThere: String, location: String, coordinateOfEvent: [lng: number // longtitude as 5 decimals, lat: number // latitude as 5 decimals] // array like [lng, lat], shortDescriptionOfProgram: String // 2-3 sentances}, // ... Repeat for each program]}, // ... Repeat for each day], estimatedCosts: [{category: Accommodation, hostelCostPerNight: Number, hotelCostPerNight: Number,luxuryHotelCostPerNight: Number,airbnbCostPerNight: Number}, {category: Transportation,busCost: Number,taxiCost: Number,trainCost: Number,rentalCost: Number},{category: Food,streetFoodCost: Number,budgetRestaurantCost: Number,fancyRestaurantCost: Number,traditionalFoodCost: Number}, {category: Activities, mainActivityForEachDay: [{mainActivityName: String,costOfProgram: Number}, // ... Repeat for each day's main event and cost of program should be in INR]}]}`;

    const destinationPrompt = `Create a ${noOfDays}-day itinerary for a ${adults} adults and ${kids} childrens group trip to ${destination}`;

    const budgetPrompt = `with a budget of: ${budget}Rs`;

    const datePrompt = `starting on: ${checkinDate}. These are interests ${interests}.Plan no of programs accordingly for each day. Return the requested data according to the specified details in the form of a json object with the following outline/format. Only return the requested json and nothing else, no matter what! Make sure to watch out for the types too. Here comes the format:${format}`;

    const prompt = budget ? `${destinationPrompt} ${budgetPrompt}, ${datePrompt}` : `${destinationPrompt}, ${datePrompt}`;

    const { data } = await axios.post('http://172.18.0.13:5000/generate', {
      prompt,
    });

    const { response } = data || {};

    let parsedResponse = parseData(response);

    return parsedResponse;
  } catch (error) {
    console.error('Error making POST request:', error);
    throw error;
  }
};

module.exports = { generateItinerary };
