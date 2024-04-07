const ROSS_ALLEY_DIRECTORY: string = "assets/images/ggfcf_rossalley.jpg";
const CITY_LIGHTS_DIRECTORY: string = "assets/images/citylight_alleywaymural.jpg";

// Route class in TypeScript
export class Coordinates {
  latitude: number;
  longitude: number; // Fixed typo in property name

  constructor(latitude: number, longitude: number){
    this.latitude = latitude;
    this.longitude = longitude; // Fixed typo in property name
  }

  toJSON() {
    return {
      latitude: this.latitude,
      longitude: this.longitude
    };
  }
}

export class Clue {
  text: string;

  constructor(text: string) {
    this.text = text;
  }

  get isImage(): boolean {
    return this.text.includes('/');
  }

  toJSON() {
    return {
      text: this.text,
    };
  }
}

export class POI {
  description: string;
  name: string;
  location: Coordinates;
  clues: Clue[];

  constructor(description: string, name: string, location: Coordinates, clues: Clue[]) {
    this.description = description;
    this.name = name;
    this.location = location;
    this.clues = clues;
  }

  toJSON() {
    return JSON.stringify({
      description: this.description,
      name: this.name,
      latitude: this.location.latitude,
      longitude: this.location.longitude,
      clue1: this.clues[0].text,
      clue2: this.clues[1].text,
      clue3: this.clues[2].text
    });
  }
}

export class Rating {
  score: number;
  number_of_reviews: number;

  constructor(score: number, number_of_reviews: number) {
    this.score = score;
    this.number_of_reviews = number_of_reviews;
  }

  toJSON() {
    return {
      score: this.score,
      numberOfRatings: this.number_of_reviews
    };
  }
}

export class Route {
  name: string;
  estimated_time: number;
  transportation_method: string;
  description: string;
  rating: Rating;
  pois: POI[];
  address: string;
  tags: string[];

  constructor(name: string, estimated_time: number, transportation_method: string, description: string, rating: Rating, pois: POI[], address: string, tags: string[]) {
    this.name = name;
    this.estimated_time = estimated_time;
    this.transportation_method = transportation_method;
    this.description = description;
    this.rating = rating;
    this.pois = pois;
    this.address = address;
    this.tags = tags;
  }

  toJSON() {
    return JSON.stringify({
      name: this.name,
      estimated_time: this.estimated_time,
      transportation_method: this.transportation_method,
      description: this.description,
      review_score : this.rating.score,
      number_of_reviews : this.rating.number_of_reviews,
      pois: {createMany : this.pois.map(poi => poi.toJSON())},
      address: this.address,
      tags: this.tags
    });
  }
}


// Example of creating a new Route instance
export function createSampleRoute(): Route {
  const clues1: Clue[] = [new Clue("This location holds the history and heritage of the Chinese residents of San Francisco, with thousands of their stories inside. "),
      new Clue("\"Perfect place to get some work done. Warm in winter and there's usually desks available. Great collection of DVDs, if you still have a player.\" Five stars."),
      new Clue("The building stands out as one of the few brick buildings in all of Chinatown.")
  ];
  const poi1: POI = new POI("Find a book in Chinese and translate the title to see what you're reading."
      , "Chinatown Library", new Coordinates(37.79575, -122.40729), clues1);

  const clues2: Clue[] = [
        new Clue("This place makes a staple of American Chinese restaurants by hand, despite the fact that the Chinese did not invent this particular treat."),
        new Clue( ROSS_ALLEY_DIRECTORY),
        new Clue("Good fortunes will follow you when you walk between Stockton and  Grant!")
  ];
  const poi2 : POI = new POI("Walk inside and see how many celebrities you recognize on the walls. Also, grab a free sample of the fortune cookies if the workers offer; they're simply the best when they're fresh."
      , "Golden Gate Fortune Cookie Factory", new Coordinates(37.79575, -122.40729), clues2);

  const clues3: Clue[] = [
      new Clue("This was the first business to be declared a historical landmark by the city of San Francisco, thanks to its outsized influence on the literary arts of the city."),
      new Clue(CITY_LIGHTS_DIRECTORY),
      new Clue("The shop faces one of the few triangular bits of San Francisco; look for it across from the spot flanked by Columbus, Broadway, and Kearny.")
  ];
  const poi3: POI = new POI("Ask the person at the register for a book recommendation, then go take a selfie with it.",
      "City Lights", new Coordinates(37.79763, -122.40657), clues3);

  const clues4: Clue[] = [
      new Clue("Don't point fingers at this place, it can do that for itself just fine."),
      new Clue("The name of this great hole-in-the-wall restaurant is reminiscent of the Oscar award."),
      new Clue("The pizza joint is named after one color but located on a street named another. The Golden Boy is on Green Street.")
  ];
  const poi4: POI = new POI("Go check out the ridiculous number of stickers decorating the location. Take a picture of your favorite, and add your own if you can.",
      "Golden Boy Pizza", new Coordinates(37.79965, -122.40809), clues4);

  const clues5 : Clue[] = [
      new Clue("One Nation('s first leader) Under (the house of) God."),
      new Clue("\"Its bells toll for all souls ; I hear them in my apartment. And I can see its lovely architecture bathed in colorful light in the evening.\" Five stars."),
      new Clue("It's impossible to miss the spires of this building from across Columbus Avenue. The beautiful arcitecture towers over North Beach.")
  ];

  const poi5 : POI = new POI("Quietly and respectfully, enter the church to admire the beautiful stained glass and statues decorating the impressive interior.",
      "Saints Peter and Paul Church", new Coordinates(37.80137, -122.41020), clues5);

  const routeRating = new Rating(4.8, 150);
  const route_description: string = "Come for a walk in two of San Francisco's most iconic neighborhoods: North Beach and Chinatown! Here, you'll explore some of the hidden gems of this part of town, meeting the people who have kept this city running for decades.";
  const route_starting_address = "943 Stockton St, San Francisco, CA 94108";
  const tags = ["instagrammable", "Scenic", "Foodie"];
  return new Route(
    "Columbus Corridor",
    1.5,
    "Walking",
    route_description,
    routeRating,
    [poi1, poi2, poi3, poi4, poi5],
      route_starting_address,
      tags
  );
}

export function wanderWestPortal(): Route {
  const route_title = "Wandering West Portal";
  const route_description = "Come visit the southwest corner of the City by the Bay! This route will introduce you to the west side of Twin Peaks, where you can snag some lunch, find some books, and see an interesting playground.";
  const route_rate = new Rating(4.2, 304);
  const route_tags = ["Artistic", "Beautiful", "Walkable"];
  const transportation_method = "Walkable";
  const address = "170 Eucalyptus Dr San Francisco, CA 94132";
  const estimated_time = 1.0;

  const clues1 = [new Clue("This location combines two ancient animals: old reptiles and cephalopods, sandwiched between two roads."),
    new Clue("\"If you didn't know it was there, you might miss it. There are little dinosaur footprints to tell you where to line up.\" Five stars."),
    new Clue("Go land at lakeside for a lovely time. The Bahn Mi at this shop are killer, much like their namesake.")
  ];
  const poi1 = new POI("This wonderful restaurant is a great pit stop for lunch. Grab a sandwich (or a friend if you're not so hungry) and take a picture with the octopus next door. Bonus points for asking the cashier if a dinosaur would win in a fight against a giant squid.",
  "Dinosaurs Sandwiches.",
  new Coordinates(37.73751, -122.46944),
  clues1
  );

  const clues2 = [
    new Clue("This quaint shop is named after materials used to stabilize ships, similar to how their caffeinated products stabilize people."),
    new Clue("\"This is a cute coffee shop to study or do work. There are plenty of tables and there is also a small outdoor patio. I would definitely come back just because I like the vibe and I can do my work here.\" Four stars."),
    new Clue("It's hard to miss this place if you have a keen eye; follow the rail line and look for a picket fence in the street. ")
  ];
  const poi2 = new POI("Head inside and ask someone waiting for an Ube latte which local artist featured on the walls is their favorite.",
    "Ballast Coffee.", new Coordinates(37.74006, -122.46681), clues2
  );

  const clues3 = [
    new Clue("A book can be a portal to a new world!"),
    new Clue("Picture of the cute alleyway between the bookstore and the bank"),
    new Clue("Another staple of Portal Avenue, this bookstore is perfect for anyone searching for a good read in one of the cutest blue-and-red buildings in all of San Francisco."),
  ];

  const poi3 = new POI("Head inside and find a friendly employee to ask for a book recommendation. Maybe your new best friend is betwen those pages",
    "BookShop West Portal.", new Coordinates(37.74006, -122.46681), clues3
  );

  const clues4 = [
    new Clue("This special place is a gateway to another world, if you catch my drift (or my train...)"),
    new Clue("Picture of that wacky dinosaur slide thing (it's kinda disturbing)"),
    new Clue("In front of a station")
  ];

  const poi4 = new POI("Go take a break on a bench and watch the trains roll by. Ask someone in the area if they think the tennis court should be turned into a pickleball court or not.",
    "West Portal Playground.", new Coordinates(37.74139, -122.46542), clues4
  );

  const pois = [poi1,poi2,poi3,poi4]

  const route = new Route(route_title, estimated_time, transportation_method,
     route_description, route_rate, pois, address, route_tags);
    
  return route;
}

export function richmondZigZag(): Route {
  const route_title = "Richmond Zig-Zag";
  const route_description = "Visit a place that's sometimes known as San Francisco's second Chinatown. Here, you'll bounce across Inner Richmond, exploring some local business stars.";
  const route_rate = new Rating(4.95, 30400);
  const route_tags = ["Instagrammable", "Beautiful", "Walkable"];
  const transportation_method = "Walkable";
  const address = "7 Clement St, San Francisco, CA  94118";
  const estimated_time = 2.0;

  const clues1 = [
    new Clue("This location is named after an instagram model's favorite time of day. "),
    new Clue("\"Incredible selection of earrings, fun cards, beautiful garments, and interesting shoes all amidst thriving plants! What a shop!\" Five stars."),
    new Clue("This store has an aesthetic (and iconic!) red door; look out for it among the building's large windows and you'll be right there.")
  ];

  const poi1 = new POI("Go inside and ask the owner, Morgan, for a fashion recommendation; she's an amazing resource! No pressure to buy, just come with an open mind.",
    "The Golden Hour.", new Coordinates(37.78304, -122.46094), clues1
  );

  const clues2 = [
    new Clue("This artsy spot started out exclusively as a framing shop, and it's old enough to remember the days when all framing was done in secret."),
    new Clue("\"I'm extremely happy with the repair Joe did to my Great-Grandfather's picture frame, he went above and beyond, he definitely brought it to life (literally) Thank you Joe!!!!!! \""),
    new Clue("This is the shortest building facing California street on its block")
  ];

  const poi2 = new POI("This is a local framing store with a history dating back to the late 1940s. Head inside to check out some prints they have for sale and ask the owner what is the most famous art piece he has framed.",
    "Artisans of San Francisco.", new Coordinates(37.78517, -122.46381), clues2
  );

  const clues3 = [
    new Clue("This store would make your teacher proud, both for its literature and its prominent use of apples."),
    new Clue("I hope you like Christimas colors! This place's green exterior goes well with its neighbors red facades."),
    new Clue("The front of the building is quite peculiar and unique.")
  ];

  const poi3 = new POI("This is one the best local bookstores in San Francisco. Go inside and peruse their new and used specialties. Ask a local worker for a recommendation and they'll be happy you asked!",
    "Green Apple Books.", new Coordinates(37.78301, -122.46470), clues3
  );

  const clues4 = [
    new Clue("\"Like the inside of a jewelry box, this enchanting and feminine architecture never fails to delight and soothe a weary soul. So much beauty is great Rx for the mind, heart and soul.\" Five Stars"),
    new Clue("The interios of the building is quite holy."),
    new Clue("The spires atop this brilliantly white building are visible for a long way down Geary Boulevard.")
  ];

  const poi4 = new POI("Enter respectfully and enjoy the beautiful art architecture.",
    "Star of the Sea Parish.", new Coordinates(37.78107, -122.46669), clues4
  );


  const pois = [poi1, poi2, poi3, poi4];

  const route = new Route(route_title, estimated_time, transportation_method,
    route_description, route_rate, pois, address, route_tags);

  return route;
}

//const test_route: Route = createSampleRoute();
//console.log(test_route.toJSON());