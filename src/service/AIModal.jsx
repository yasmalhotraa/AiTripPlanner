import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap Budget, Give me a Hotels options list with HotelName (atleast 4), Hotel address, Price with Currency according to the country, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with  PlaceName, Place Details, DayNumber, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time to travel with best timings form and to visit each of the location for 3 days with each day timewise am and pm format plan in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "tripDetails": {\n    "destination": "Las Vegas, Nevada",\n    "duration": "3 Days",\n    "travelers": "Couple",\n    "budget": "Cheap"\n  },\n  "hotels": [\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "address": "2880 Las Vegas Blvd S, Las Vegas, NV 89109, USA",\n      "price": {\n        "currency": "USD",\n        "amount": "50-100"\n      },\n      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/CircusCircusLasVegas.jpg/1280px-CircusCircusLasVegas.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1215,\n        "longitude": -115.1734\n      },\n      "rating": 3.5,\n      "description": "A classic Vegas hotel with a circus theme, known for its affordability and family-friendly atmosphere. Offers some free attractions."\n    },\n    {\n      "hotelName": "The D Las Vegas",\n      "address": "300 Fremont St, Las Vegas, NV 89101, USA",\n      "price": {\n        "currency": "USD",\n        "amount": "60-120"\n      },\n      "imageUrl": "https://www.travelandleisure.com/thmb/z5X2fU2hI-m7xN_e3j7tV8R2J-E=/1500x1000/smart/filters:no_upscale()/the-d-las-vegas-hotel-casino-4a04f04112344f62a0d90967d65a1e69.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1672,\n        "longitude": -115.1408\n      },\n      "rating": 4.0,\n      "description": "Downtown location on Fremont Street. Offers a more modern feel compared to some budget options."\n    },\n    {\n      "hotelName": "Main Street Station Casino, Brewery & Hotel",\n      "address": "200 S Main St, Las Vegas, NV 89101, USA",\n      "price": {\n        "currency": "USD",\n        "amount": "40-90"\n      },\n      "imageUrl": "https://www.mainstreetstationcasino.com/wp-content/uploads/2021/07/MSS-Exterior-Shot-at-Night.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1695,\n        "longitude": -115.1421\n      },\n      "rating": 3.8,\n      "description": "Historic hotel in Downtown Las Vegas with a brewery. Offers affordable rooms."\n    },\n    {\n      "hotelName": "Plaza Hotel & Casino",\n      "address": "1 South Main Street, Las Vegas, NV 89101, USA",\n      "price": {\n        "currency": "USD",\n        "amount": "60-120"\n      },\n      "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Plaza_Hotel_%26_Casino_Las_Vegas_Nevada.jpg/1280px-Plaza_Hotel_%26_Casino_Las_Vegas_Nevada.jpg",\n      "geoCoordinates": {\n        "latitude": 36.1698,\n        "longitude": -115.1425\n      },\n      "rating": 4.0,\n      "description": "Located in Downtown Las Vegas, offering a range of amenities at a competitive price."\n    }\n  ],\n  "itinerary": [\n    {\n      "day": "Day 1",\n      "places": [\n        {\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "Explore the vibrant pedestrian mall, see the Viva Vision light show (best at night).",\n          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Fremont_Street_Experience_at_Night.jpg/1280px-Fremont_Street_Experience_at_Night.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1692,\n            "longitude": -115.1413\n          },\n          "ticketPricing": "Free (shows may have separate costs)",\n          "rating": 4.5,\n          "time": "Evening"\n        }\n      ]\n    },\n    {\n      "day": "Day 2",\n      "places": [\n        {\n          "placeName": "The Strip (South)",\n          "placeDetails": "Walk the south end of the Strip, see the Bellagio fountains (check showtimes), admire the architecture.",\n          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Las_Vegas_Strip_at_night_2010.jpg/1280px-Las_Vegas_Strip_at_night_2010.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1090,\n            "longitude": -115.1719\n          },\n          "ticketPricing": "Free (unless entering casinos/shows)",\n          "rating": 5.0,\n          "time": "Afternoon/Evening"\n        },\n        {\n          "placeName": "Bellagio Conservatory & Botanical Gardens",\n          "placeDetails": "Free to visit, stunning seasonal displays.",\n          "imageUrl": "https://www.bellagio.com/content/dam/bellagio/images/conservatory/conservatory-botanical-gardens-fall-2023-hero.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1111,\n            "longitude": -115.1736\n          },\n          "ticketPricing": "Free",\n          "rating": 4.5,\n          "time": "Anytime"\n        }\n\n      ]\n    },\n    {\n      "day": "Day 3",\n      "places": [\n        {\n          "placeName": "Neon Museum",\n          "placeDetails": "Explore vintage Las Vegas signs.",\n          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Neon_Museum_Boneyard.jpg/1280px-Neon_Museum_Boneyard.jpg",\n          "geoCoordinates": {\n            "latitude": 36.1605,\n            "longitude": -115.1527\n          },\n          "ticketPricing": "Around $25 per person",\n          "rating": 4.6,\n          "time": "Morning"\n        },\n        {\n          "placeName": "Seven Magic Mountains (Optional, requires transport)",\n          "placeDetails": "Art installation south of Las Vegas (requires transportation - Uber/Lyft or rental car).",\n          "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Seven_Magic_Mountains_01.jpg/1280px-Seven_Magic_Mountains_01.jpg",\n          "geoCoordinates": {\n            "latitude": 36.0411,\n            "longitude": -114.9773\n          },\n          "ticketPricing": "Free",\n          "rating": 4.3,\n          "time": "Afternoon"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Important Considerations:**\n\n* **Transportation:**  Factor in transportation costs (Uber/Lyft, bus) when budgeting.  Walking is feasible for many locations, but not all.\n* **Food:** This plan doesn\'t include food costs. Budget for affordable meals at fast food places, food courts, or inexpensive restaurants.\n* **Show Tickets:**  If you want to see a show, that will significantly impact your budget.\n* **Hotel Prices:** Prices are estimates and vary by season and availability.  Always check current rates.\n\n\nRemember to book accommodations and tours/shows in advance, especially if traveling during peak season.  Double-check opening hours and prices before your trip.\n',
        },
      ],
    },
  ],
});
