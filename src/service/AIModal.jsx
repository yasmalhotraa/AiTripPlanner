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
          text: "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap Budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with PlaceName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "tripName": "Las Vegas Budget Trip for Couples (3 Days)",\n  "hotels": [\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": "Check Online Travel Agencies",\n      "imageUrl": "PLACEHOLDER_IMAGE_URL", \n      "geoCoordinates": {\n        "latitude": 36.1264,\n        "longitude": -115.1735\n      },\n      "rating": "3.5 stars (example)",\n      "description": "Offers budget-friendly rooms, a circus theme, and some free entertainment options."\n    },\n    {\n      "hotelName": "The D Las Vegas",\n      "hotelAddress": "300 Fremont St, Las Vegas, NV 89101",\n      "price": "Check Online Travel Agencies",\n      "imageUrl": "PLACEHOLDER_IMAGE_URL",\n      "geoCoordinates": {\n        "latitude": 36.1692,\n        "longitude": -115.1416\n      },\n      "rating": "4 stars (example)",\n      "description": "Located in downtown Las Vegas, offering a more vintage feel at a reasonable price."\n    },\n    {\n      "hotelName": "Main Street Station Casino, Brewery & Hotel",\n      "hotelAddress": "200 Bonneville Ave, Las Vegas, NV 89101",\n      "price": "Check Online Travel Agencies",\n      "imageUrl": "PLACEHOLDER_IMAGE_URL",\n      "geoCoordinates": {\n        "latitude": 36.1695,\n        "longitude": -115.1408\n      },\n      "rating": "4 stars (example)",\n      "description": "Offers affordable rooms and a historic downtown location."\n    }\n\n  ],\n  "itinerary": {\n    "day1": [\n      {\n        "placeName": "Fremont Street Experience",\n        "placeDetails": "Free light show and street performers in downtown Las Vegas.",\n        "imageUrl": "PLACEHOLDER_IMAGE_URL",\n        "geoCoordinates": {\n          "latitude": 36.1699,\n          "longitude": -115.1401\n        },\n        "ticketPricing": "Free",\n        "rating": "4 stars (example)",\n        "timeToSpend": "2-3 hours",\n        "bestTime": "Evening (for the light show)"\n      },\n      {\n        "placeName": "Downtown Container Park",\n        "placeDetails": "Unique shopping and dining area made from shipping containers.",\n        "imageUrl": "PLACEHOLDER_IMAGE_URL",\n        "geoCoordinates": {\n          "latitude": 36.1668,\n          "longitude": -115.1442\n        },\n        "ticketPricing": "Free entry, prices vary for food and shopping",\n        "rating": "4 stars (example)",\n        "timeToSpend": "1-2 hours",\n        "bestTime": "Afternoon or evening"\n      }\n    ],\n    "day2": [\n      {\n        "placeName": "The Strip (walking tour)",\n        "placeDetails": "Walk the length of the Strip, admiring the hotels and attractions (free).",\n        "imageUrl": "PLACEHOLDER_IMAGE_URL",\n        "geoCoordinates": {\n          "latitude": 36.1124,\n          "longitude": -115.1713\n        }, \n        "ticketPricing": "Free",\n        "rating": "5 stars (example)",\n        "timeToSpend": "3-4 hours",\n        "bestTime": "Daytime or early evening"\n      },\n      {\n        "placeName": "Bellagio Conservatory & Botanical Garden",\n        "placeDetails": "Free stunning floral displays.",\n        "imageUrl": "PLACEHOLDER_IMAGE_URL",\n        "geoCoordinates": {\n          "latitude": 36.115,\n          "longitude": -115.173\n        },\n        "ticketPricing": "Free",\n        "rating": "4.5 stars (example)",\n        "timeToSpend": "1 hour",\n        "bestTime": "Anytime"\n      }\n    ],\n    "day3": [\n      {\n        "placeName": "Seven Magic Mountains",\n        "placeDetails": "Colorful art installation south of Las Vegas (short drive needed, gas costs apply).",\n        "imageUrl": "PLACEHOLDER_IMAGE_URL",\n        "geoCoordinates": {\n          "latitude": 36.0069,\n          "longitude": -114.9565\n        },\n        "ticketPricing": "Free",\n        "rating": "4 stars (example)",\n        "timeToSpend": "1-2 hours",\n        "bestTime": "Daytime"\n      },\n      {\n        "placeName": "Red Rock Canyon National Conservation Area (optional, entry fee applies)",\n        "placeDetails": "Beautiful desert landscape with hiking trails.  Requires car rental or rideshare.",\n        "imageUrl": "PLACEHOLDER_IMAGE_URL",\n        "geoCoordinates": {\n          "latitude": 36.2033,\n          "longitude": -115.8246\n        },\n        "ticketPricing": "Entry fee applies (check NPS website)",\n        "rating": "4.8 stars (example)",\n        "timeToSpend": "3-4 hours",\n        "bestTime": "Morning or late afternoon (avoid midday heat)"\n      }\n    ]\n  }\n}\n```\n\nRemember to replace the `PLACEHOLDER_IMAGE_URL` with actual image URLs and check current pricing on booking websites.  This itinerary prioritizes free activities, but you\'ll need to factor in transportation costs (walking, rideshares, or potentially a rental car for day 3\'s optional activity).  Enjoy your Las Vegas trip!\n',
        },
      ],
    },
  ],
});
