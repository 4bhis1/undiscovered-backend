const axios = require('axios');

const parseAiData = (data) => {
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

    const { data } = await axios.post(process.env.UNDISCOVERED_AI_ENDPOINT, {
      prompt,
    });

    const { response } = data || {};

    let parsedResponse = parseAiData(response);

    return parsedResponse;
  } catch (error) {
    console.error('Error making POST request:', error);
    throw error;
  }
};

const fetchLocationImage = async (location) => {
  try {
    const imageSource = process.env.IMAGE_SOURCE;
    let response;

    if (imageSource == 'PIXABAY') {
      // Fetch image from Pixabay
      response = await axios.get(
        `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${location}&image_type=photo`,
        {}
      );

      if (response.data.hits.length > 0) {
        return { url: response.data.hits[0].largeImageURL };
      }
    } else {
      response = await axios.get(process.env.UNSPLASH_ENDPOINT, {
        params: {
          query: location,
          client_id: process.env.UNSPLASH_API_KEY,
          per_page: 1,
        },
      });

      if (response.data.results.length > 0) {
        return { url: response.data.results[0].urls.regular };
      }
    }

    return {
      url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    };
  } catch (error) {
    console.error('Error fetching image:', error);
    return '';
  }
};

module.exports = { generateItinerary, fetchLocationImage };
