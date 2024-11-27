export const SelectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "✈",
    people: "1 Person",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two traveles in tandem",
    icon: "🥂",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of Thrill-Seekers",
    icon: "⛵️",
    people: "5 to 10 People",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "stay consious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side ",
    icon: "💰",
  },
  {
    id: 1,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName (atleast 4), Hotel address, Price with Currency according to the country, hotel image url, geo coordinates, rating, descriptions and suggest itinerary plan with  PlaceName, Place Details, Day, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time to travel with best timings from and to visit each of the location for {totalDays} Days with each day timewise am and pm format plan in JSON format";
