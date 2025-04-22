export interface QuizQuestion {
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
  explanations: {
    correct: string;
    incorrect: { [key: string]: string };
  };
}

export const scienceQuestions: QuizQuestion[] = [
  {
    topic: "Earth Science",
    question: "What is the primary source of energy for the Earth?",
    options: ["A) Wind", "B) Sun", "C) Water", "D) Geothermal heat"],
    correctAnswer: "B",
    explanation:
      "The Sun is the primary source of energy for the Earth, providing light and heat through solar radiation.",
    hint: "Think about what powers Earth's climate and ecosystems.",
    explanations: {
      correct:
        "Great job! The Sun provides energy for Earth's climate, ecosystems, and renewable energy sources like solar power.",
      incorrect: {
        A: "Wind is incorrect because it’s a secondary energy source driven by the Sun’s heat, which creates wind patterns.",
        C: "Water is incorrect because its energy (e.g., hydroelectric) comes from the Sun’s role in the water cycle.",
        D: "Geothermal heat is incorrect because it comes from Earth’s core, not the primary energy source for surface processes.",
      },
    },
  },
  {
    topic: "Earth Science",
    question:
      "Which layer of the Earth's atmosphere is closest to the Earth's surface?",
    options: [
      "A) Troposphere",
      "B) Stratosphere",
      "C) Mesosphere",
      "D) Thermosphere",
    ],
    correctAnswer: "A",
    explanation:
      "The troposphere is the layer closest to Earth's surface, where weather events occur.",
    hint: "Consider where clouds and weather phenomena happen.",
    explanations: {
      correct:
        "Nice work! The troposphere is where weather occurs, making it the closest layer to the surface.",
      incorrect: {
        B: "The stratosphere is incorrect because it lies above the troposphere, containing the ozone layer.",
        C: "The mesosphere is incorrect because it’s higher, where meteors burn up.",
        D: "The thermosphere is incorrect because it’s much higher, where auroras occur.",
      },
    },
  },
  {
    topic: "Earth Science",
    question:
      "What is the process by which water changes from a liquid to a gas?",
    options: [
      "A) Condensation",
      "B) Evaporation",
      "C) Precipitation",
      "D) Sublimation",
    ],
    correctAnswer: "B",
    explanation:
      "Evaporation is the process by which water changes from a liquid to a gas when heated.",
    hint: "Think about what happens to water in a heated pan.",
    explanations: {
      correct:
        "Great job! Evaporation occurs when water molecules gain enough energy to become a gas.",
      incorrect: {
        A: "Condensation is incorrect because it’s the opposite process, where gas turns into liquid.",
        C: "Precipitation is incorrect because it involves water falling as rain or snow.",
        D: "Sublimation is incorrect because it’s when a solid turns directly into a gas.",
      },
    },
  },
  {
    topic: "Earth Science",
    question: "Which of the following is a renewable energy source?",
    options: [
      "A) Coal",
      "B) Natural Gas",
      "C) Solar Power",
      "D) Nuclear Power",
    ],
    correctAnswer: "C",
    explanation:
      "Solar power is a renewable energy source derived from the Sun’s radiation, sustainable and environmentally friendly.",
    hint: "Consider energy sources that won’t run out.",
    explanations: {
      correct:
        "Nice work! Solar power is renewable because the Sun’s energy is virtually limitless.",
      incorrect: {
        A: "Coal is incorrect because it’s a finite fossil fuel formed over millions of years.",
        B: "Natural gas is incorrect because it’s also a non-renewable fossil fuel.",
        D: "Nuclear power is incorrect because, while efficient, it relies on finite uranium.",
      },
    },
  },
  {
    topic: "Earth Science",
    question:
      "What is the process by which rocks are broken down into smaller pieces?",
    options: [
      "A) Erosion",
      "B) Deposition",
      "C) Weathering",
      "D) Sedimentation",
    ],
    correctAnswer: "C",
    explanation:
      "Weathering is the process by which rocks are broken down into smaller pieces through physical, chemical, or biological means.",
    hint: "Think about how rocks crumble over time due to wind or water.",
    explanations: {
      correct:
        "Great job! Weathering breaks rocks down without moving them, unlike erosion.",
      incorrect: {
        A: "Erosion is incorrect because it involves moving weathered material, not breaking rocks.",
        B: "Deposition is incorrect because it’s the settling of moved material.",
        D: "Sedimentation is incorrect because it’s the accumulation of sediments, not rock breakdown.",
      },
    },
  },
  {
    topic: "Earth Science",
    question:
      "Which of the following is a natural disaster caused by the Earth's tectonic plates shifting?",
    options: ["A) Hurricane", "B) Earthquake", "C) Tornado", "D) Flood"],
    correctAnswer: "B",
    explanation:
      "Earthquakes are caused by the shifting of Earth’s tectonic plates, resulting in ground shaking.",
    hint: "Consider disasters linked to Earth’s crust movement.",
    explanations: {
      correct:
        "Nice work! Earthquakes occur due to tectonic plate movements along faults.",
      incorrect: {
        A: "Hurricanes are incorrect because they’re weather-related, driven by ocean and atmospheric conditions.",
        C: "Tornadoes are incorrect because they’re caused by atmospheric instability, not tectonic activity.",
        D: "Floods are incorrect because they result from excessive water, not plate movement.",
      },
    },
  },
  {
    topic: "Earth Science",
    question:
      "What is the name of the process by which plants use sunlight to make food?",
    options: [
      "A) Photosynthesis",
      "B) Respiration",
      "C) Transpiration",
      "D) Germination",
    ],
    correctAnswer: "A",
    explanation:
      "Photosynthesis is the process by which plants use sunlight, carbon dioxide, and water to produce glucose and oxygen.",
    hint: "Think about how plants convert sunlight into energy.",
    explanations: {
      correct:
        "Great job! Photosynthesis powers plants by converting sunlight into chemical energy.",
      incorrect: {
        B: "Respiration is incorrect because it’s the process of breaking down glucose for energy, not making food.",
        C: "Transpiration is incorrect because it’s water loss through leaves.",
        D: "Germination is incorrect because it’s seed sprouting, not food production.",
      },
    },
  },
  {
    topic: "Earth Science",
    question: "Which of the following is a natural satellite of the Earth?",
    options: ["A) Mars", "B) Jupiter", "C) Moon", "D) Venus"],
    correctAnswer: "C",
    explanation:
      "The Moon is Earth’s natural satellite, orbiting and affecting tides and ecosystems.",
    hint: "Consider what orbits Earth naturally.",
    explanations: {
      correct:
        "Nice work! The Moon is Earth’s only natural satellite, influencing tides and more.",
      incorrect: {
        A: "Mars is incorrect because it’s a planet, not a satellite of Earth.",
        B: "Jupiter is incorrect because it’s a planet with its own moons, not Earth’s satellite.",
        D: "Venus is incorrect because it’s a planet, not an orbiting satellite.",
      },
    },
  },
  {
    topic: "Earth Science",
    question:
      "What is the name of the imaginary line that runs through the Earth from the North Pole to the South Pole?",
    options: [
      "A) Equator",
      "B) Prime Meridian",
      "C) Tropic of Cancer",
      "D) International Date Line",
    ],
    correctAnswer: "B",
    explanation:
      "The Prime Meridian is the imaginary line from the North Pole to the South Pole, dividing Earth into Eastern and Western Hemispheres.",
    hint: "Think about the line defining zero longitude.",
    explanations: {
      correct:
        "Great job! The Prime Meridian defines zero longitude, passing through Greenwich.",
      incorrect: {
        A: "The Equator is incorrect because it divides Earth into Northern and Southern Hemispheres, not poles.",
        C: "The Tropic of Cancer is incorrect because it’s a latitude line, not pole-to-pole.",
        D: "The International Date Line is incorrect because it’s a time zone boundary, not pole-to-pole.",
      },
    },
  },
  {
    topic: "Earth Science",
    question: "Which of the following is a layer of the Earth's interior?",
    options: ["A) Crust", "B) Mantle", "C) Ionosphere", "D) Exosphere"],
    correctAnswer: "B",
    explanation:
      "The mantle is a layer of Earth’s interior between the crust and core, composed of solid rock material.",
    hint: "Consider the layers beneath Earth’s surface.",
    explanations: {
      correct:
        "Nice work! The mantle is a thick layer of rock between the crust and core.",
      incorrect: {
        A: "While the crust is also a layer, the question allows one correct answer, and mantle is specified here.",
        C: "The ionosphere is incorrect because it’s part of the atmosphere, not Earth’s interior.",
        D: "The exosphere is incorrect because it’s the outermost atmospheric layer, not an interior layer.",
      },
    },
  },
];
