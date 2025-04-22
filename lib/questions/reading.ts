export interface QuizQuestion {
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
  passage?: string; // Add passage field for comprehension questions
  explanations: {
    correct: string;
    incorrect: { [key: string]: string };
  };
}

export const readingQuestions: { [topic: string]: QuizQuestion[] } = {
  Comprehension: [
    {
      topic: "Comprehension",
      passage:
        "Recycling is an important way to help protect our planet. Every day, we throw away items like plastic bottles, paper, and glass, but these can often be reused or turned into new products. By recycling, we reduce waste in landfills and save natural resources like trees and water.",
      question: "What is the main idea of the passage?",
      options: [
        "A) The importance of recycling",
        "B) How to bake a cake",
        "C) Benefits of exercise",
        "D) History of computers",
      ],
      correctAnswer: "A",
      explanation:
        "The passage discusses how recycling helps protect the planet by reducing waste and saving resources, making the main idea the importance of recycling.",
      hint: "Think about the overall message the passage is trying to convey.",
      explanations: {
        correct:
          "Great job! The passage focuses on how recycling helps the environment, which matches option A.",
        incorrect: {
          B: "How to bake a cake is incorrect because the passage is about recycling, not baking.",
          C: "Benefits of exercise is incorrect because the passage does not discuss exercise.",
          D: "History of computers is incorrect because the passage is about environmental protection, not technology.",
        },
      },
    },
    {
      topic: "Comprehension",
      passage:
        "In a small village, a young girl named Lila loved to read books. She would sit under a big oak tree every afternoon, reading stories about faraway lands. Her favorite story was about a brave explorer who discovered hidden treasures.",
      question: "What does it mean to make an inference while reading?",
      options: [
        "A) Predicting the ending",
        "B) Making a guess based on evidence",
        "C) Repeating the main idea",
        "D) Skimming the text",
      ],
      correctAnswer: "B",
      explanation:
        "Making an inference means using clues from the text to make an educated guess about what is not explicitly stated, like guessing that Lila dreams of adventure because she loves stories about explorers.",
      hint: "Consider how you might guess what Lila wants to do in the future based on her actions.",
      explanations: {
        correct:
          "Nice work! Making an inference involves using clues, like Lila’s love for adventure stories, to guess her dreams.",
        incorrect: {
          A: "Predicting the ending is incorrect because inferring is about understanding deeper meanings, not just the end.",
          C: "Repeating the main idea is incorrect because inferring involves deeper thinking beyond the main idea.",
          D: "Skimming the text is incorrect because inferring requires careful reading, not quick skimming.",
        },
      },
    },
    {
      topic: "Comprehension",
      passage:
        "Exercise is great for your health. It helps you stay strong, improves your mood, and can even help you sleep better at night. Many people enjoy activities like running, swimming, or playing sports to stay active.",
      question: "What is the purpose of a conclusion in a text?",
      options: [
        "A) To introduce the main characters",
        "B) To summarize key points",
        "C) To set the scene",
        "D) To add extra details",
      ],
      correctAnswer: "B",
      explanation:
        "A conclusion in a text wraps up the main ideas, like summarizing the benefits of exercise mentioned in the passage.",
      hint: "Think about how the passage might end by restating its key ideas.",
      explanations: {
        correct:
          "Great job! The conclusion would summarize the benefits of exercise, tying up the passage’s main points.",
        incorrect: {
          A: "Introducing characters is incorrect because the passage is about exercise, not characters.",
          C: "Setting the scene is incorrect because that’s typically done at the beginning, not the conclusion.",
          D: "Adding extra details is incorrect because a conclusion focuses on summarizing, not adding new information.",
        },
      },
    },
    {
      topic: "Comprehension",
      passage:
        "Long ago, people told stories to share lessons and entertain others. These stories often had characters who faced challenges and learned important lessons. Today, we still enjoy stories that teach us about life.",
      question: "What is a synonym for the word 'happy'?",
      options: ["A) Sad", "B) Joyful", "C) Angry", "D) Tired"],
      correctAnswer: "B",
      explanation:
        "A synonym for 'happy' is 'joyful,' which fits the context of enjoying stories that teach lessons.",
      hint: "Think about how people might feel when they enjoy a good story.",
      explanations: {
        correct:
          "Nice work! 'Joyful' means the same as 'happy,' matching the positive tone of enjoying stories.",
        incorrect: {
          A: "Sad is incorrect because it’s the opposite of happy, not a synonym.",
          C: "Angry is incorrect because it describes a negative emotion, unlike happy.",
          D: "Tired is incorrect because it relates to exhaustion, not happiness.",
        },
      },
    },
    {
      topic: "Comprehension",
      passage:
        "In a forest, two friends, Mia and Leo, loved exploring together. One day, they found a hidden cave and decided to go inside. They discovered glowing crystals that lit up the cave like stars.",
      question: "What is the purpose of dialogue in a story?",
      options: [
        "A) To describe the setting",
        "B) To reveal characters' thoughts",
        "C) To list events in order",
        "D) To introduce conflicts",
      ],
      correctAnswer: "B",
      explanation:
        "Dialogue in a story shows characters speaking, revealing their thoughts and feelings, like Mia and Leo discussing their excitement about the cave.",
      hint: "Think about how Mia and Leo might talk to show their feelings about the cave.",
      explanations: {
        correct:
          "Great job! Dialogue would let Mia and Leo share their excitement, revealing their thoughts.",
        incorrect: {
          A: "Describing the setting is incorrect because the passage already does that; dialogue focuses on characters.",
          C: "Listing events is incorrect because dialogue is about communication, not event order.",
          D: "Introducing conflicts is incorrect because dialogue in this context shows emotions, not conflict.",
        },
      },
    },
    {
      topic: "Comprehension",
      passage:
        "The story took place in a small town during the 1800s. Every morning, the townspeople gathered in the square to trade goods and share news. It was a busy and lively place filled with laughter.",
      question: "What is the setting of a story?",
      options: [
        "A) The problem to be solved",
        "B) The time and place of the story",
        "C) The main character's traits",
        "D) The lesson learned",
      ],
      correctAnswer: "B",
      explanation:
        "The setting of a story is the time and place where it happens, like the small town in the 1800s described in the passage.",
      hint: "Think about where and when the story happens according to the passage.",
      explanations: {
        correct:
          "Nice work! The setting is the small town in the 1800s, as described in the passage.",
        incorrect: {
          A: "The problem to be solved is incorrect because the passage describes a location, not a problem.",
          C: "The main character’s traits are incorrect because the passage focuses on the town, not characters.",
          D: "The lesson learned is incorrect because the setting is about time and place, not lessons.",
        },
      },
    },
    {
      topic: "Comprehension",
      passage:
        "A young boy named Sam loved to explore the forest near his home. One day, he found a small stream filled with colorful fish. He sat by the stream for hours, watching the fish swim.",
      question: "What is a key detail in a text?",
      options: [
        "A) A minor event",
        "B) An important fact or description",
        "C) A character's name",
        "D) A random thought",
      ],
      correctAnswer: "B",
      explanation:
        "A key detail in a text is an important fact, like the colorful fish in the stream, which helps understand the main idea of Sam’s exploration.",
      hint: "Think about an important fact in the passage that helps you understand Sam’s experience.",
      explanations: {
        correct:
          "Great job! The colorful fish in the stream is a key detail that shows what Sam discovered.",
        incorrect: {
          A: "A minor event is incorrect because key details are significant, not minor.",
          C: "A character’s name is incorrect because Sam’s name is not the important detail here.",
          D: "A random thought is incorrect because key details are relevant to the main idea.",
        },
      },
    },
    {
      topic: "Comprehension",
      passage:
        "Penguins are amazing birds that live in cold places like Antarctica. They waddle on the ice and swim in the ocean to catch fish for food. Penguins are great at surviving in harsh, icy environments.",
      question: "What does it mean to summarize a text?",
      options: [
        "A) Create a detailed illustration",
        "B) Retell the main points in your own words",
        "C) Write a sequel to the story",
        "D) Compare two characters",
      ],
      correctAnswer: "B",
      explanation:
        "To summarize a text is to briefly restate the main points, like saying penguins live in cold places and catch fish, based on the passage.",
      hint: "Think about how you would briefly describe the passage to a friend.",
      explanations: {
        correct:
          "Nice work! Summarizing the passage involves restating that penguins live in cold places and catch fish.",
        incorrect: {
          A: "Creating an illustration is incorrect because summarizing uses words, not pictures.",
          C: "Writing a sequel is incorrect because summarizing is about the existing text, not adding to it.",
          D: "Comparing characters is incorrect because the passage is about penguins, not character comparison.",
        },
      },
    },
    {
      topic: "Comprehension",
      passage:
        "A little dog named Max learned to be brave. At first, he was scared of loud noises, but his owner helped him feel safe. By the end, Max would bark at thunderstorms to show his courage.",
      question: "What is the theme of a story?",
      options: [
        "A) The main idea or message",
        "B) The physical setting",
        "C) The order of events",
        "D) The protagonist's journey",
      ],
      correctAnswer: "A",
      explanation:
        "The theme of a story is the main message, like learning to be brave, which Max shows in the passage by overcoming his fear.",
      hint: "Think about the lesson Max learned in the passage.",
      explanations: {
        correct:
          "Great job! The theme is about bravery, as Max learns to overcome his fear.",
        incorrect: {
          B: "The physical setting is incorrect because the theme is the message, not the location.",
          C: "The order of events is incorrect because the theme is the lesson, not the sequence.",
          D: "The protagonist’s journey is incorrect because the theme is the broader message, not just Max’s story.",
        },
      },
    },
    {
      topic: "Comprehension",
      passage:
        "Ella was a kind girl who always helped her friends. One day, she shared her lunch with a friend who forgot theirs. Everyone admired Ella’s generous nature.",
      question: "What is a character trait in a story?",
      options: [
        "A) The main event",
        "B) A character's personality trait",
        "C) The story's climax",
        "D) The resolution",
      ],
      correctAnswer: "B",
      explanation:
        "A character trait is a personality quality, like Ella’s kindness, shown by her sharing her lunch in the passage.",
      hint: "Think about a word that describes Ella based on her actions.",
      explanations: {
        correct:
          "Nice work! Ella’s kindness is a character trait, shown by her generous actions.",
        incorrect: {
          A: "The main event is incorrect because a trait is about personality, not events.",
          C: "The story’s climax is incorrect because a trait is a quality, not a plot point.",
          D: "The resolution is incorrect because a trait describes Ella, not the story’s end.",
        },
      },
    },
  ],
  Vocabulary: [
    {
      topic: "Vocabulary",
      question: "What does the word 'ominous' mean?",
      options: ["A) hopeful", "B) dangerous", "C) shiny", "D) quiet"],
      correctAnswer: "B",
      explanation:
        "The word 'ominous' means something that suggests danger or harm, like a dark cloud before a storm.",
      hint: "Think about a word that describes something threatening.",
      explanations: {
        correct:
          "Great job! 'Ominous' means dangerous, like a warning sign of trouble.",
        incorrect: {
          A: "Hopeful is incorrect because it means optimistic, the opposite of ominous.",
          C: "Shiny is incorrect because it describes appearance, not danger.",
          D: "Quiet is incorrect because it relates to sound, not threat.",
        },
      },
    },
    {
      topic: "Vocabulary",
      question: "Which word means the opposite of 'expand'?",
      options: ["A) grow", "B) increase", "C) extend", "D) contract"],
      correctAnswer: "D",
      explanation:
        "The word 'contract' means to make something smaller or reduce its size, opposite of 'expand' which means to make something larger.",
      hint: "Think about a word that means to shrink or reduce.",
      explanations: {
        correct:
          "Nice work! 'Contract' is the opposite of 'expand,' meaning to reduce in size.",
        incorrect: {
          A: "Grow is incorrect because it means to increase, similar to expand.",
          B: "Increase is incorrect because it also means to expand or get bigger.",
          C: "Extend is incorrect because it means to stretch out, like expanding.",
        },
      },
    },
    {
      topic: "Vocabulary",
      question: "What is the meaning of the word 'dilapidated'?",
      options: [
        "A) new",
        "B) old and in poor condition",
        "C) clean",
        "D) expensive",
      ],
      correctAnswer: "B",
      explanation:
        "The word 'dilapidated' describes something that is old and in a state of disrepair, usually run-down or falling apart.",
      hint: "Think about a word that describes an old, broken-down building.",
      explanations: {
        correct:
          "Great job! 'Dilapidated' means old and in poor condition, like a crumbling house.",
        incorrect: {
          A: "New is incorrect because dilapidated means old, not new.",
          C: "Clean is incorrect because dilapidated refers to condition, not cleanliness.",
          D: "Expensive is incorrect because dilapidated describes wear, not cost.",
        },
      },
    },
    {
      topic: "Vocabulary",
      question: "Which word is a synonym for 'enormous'?",
      options: ["A) tiny", "B) massive", "C) small", "D) little"],
      correctAnswer: "B",
      explanation:
        "The word 'enormous' means very large in size or quantity, similar to 'massive' which also indicates something big or huge.",
      hint: "Think about a word that means very big, like enormous.",
      explanations: {
        correct:
          "Nice work! 'Massive' is a synonym for 'enormous,' both meaning very large.",
        incorrect: {
          A: "Tiny is incorrect because it means small, the opposite of enormous.",
          C: "Small is incorrect because it’s the opposite of enormous.",
          D: "Little is incorrect because it also means small, not large.",
        },
      },
    },
    {
      topic: "Vocabulary",
      question: "What does the term 'simile' refer to in language?",
      options: [
        "A) a type of poem",
        "B) a comparison using 'like' or 'as'",
        "C) a punctuation mark",
        "D) a type of sentence",
      ],
      correctAnswer: "B",
      explanation:
        "A simile is a figure of speech that compares two different things using 'like' or 'as', such as 'as brave as a lion' or 'like a bolt of lightning'.",
      hint: "Think about a phrase that compares things using 'like' or 'as'.",
      explanations: {
        correct:
          "Great job! A simile compares things using 'like' or 'as,' like 'fast as a cheetah.'",
        incorrect: {
          A: "A type of poem is incorrect because a simile is a figure of speech, not a poem.",
          C: "A punctuation mark is incorrect because a simile is a language device, not punctuation.",
          D: "A type of sentence is incorrect because a simile is a comparison, not a sentence structure.",
        },
      },
    },
    {
      topic: "Vocabulary",
      question: "Which word means the opposite of 'beginning'?",
      options: ["A) start", "B) launch", "C) opening", "D) end"],
      correctAnswer: "D",
      explanation:
        "The word 'end' is the opposite of 'beginning', as it signifies the conclusion or final part of something, contrasting with the start or beginning.",
      hint: "Think about a word that means the finish or conclusion.",
      explanations: {
        correct:
          "Nice work! 'End' is the opposite of 'beginning,' meaning the conclusion.",
        incorrect: {
          A: "Start is incorrect because it means the same as beginning.",
          B: "Launch is incorrect because it also means to begin something.",
          C: "Opening is incorrect because it’s similar to beginning, not its opposite.",
        },
      },
    },
    {
      topic: "Vocabulary",
      question: "What does the term 'synonym' mean?",
      options: [
        "A) a word that means the same as another word",
        "B) a word that means the opposite of another word",
        "C) a word with multiple meanings",
        "D) a made-up word",
      ],
      correctAnswer: "A",
      explanation:
        "A synonym is a word that has the same or nearly the same meaning as another word, like 'happy' and 'joyful' are synonyms because they convey similar emotions.",
      hint: "Think about a term that describes words with similar meanings.",
      explanations: {
        correct:
          "Great job! A synonym is a word with the same meaning, like 'big' and 'large.'",
        incorrect: {
          B: "A word that means the opposite is incorrect because that’s an antonym, not a synonym.",
          C: "A word with multiple meanings is incorrect because that’s a different concept, like homonyms.",
          D: "A made-up word is incorrect because synonyms are real words with similar meanings.",
        },
      },
    },
    {
      topic: "Vocabulary",
      question: "Which word is an antonym for 'bright'?",
      options: ["A) sunny", "B) shining", "C) dark", "D) glowing"],
      correctAnswer: "C",
      explanation:
        "The word 'dark' is the antonym of 'bright', representing the absence of light or a lack of brightness.",
      hint: "Think about a word that means the opposite of bright, like no light.",
      explanations: {
        correct:
          "Nice work! 'Dark' is the opposite of 'bright,' meaning a lack of light.",
        incorrect: {
          A: "Sunny is incorrect because it means bright and full of light.",
          B: "Shining is incorrect because it also means bright, like a light.",
          D: "Glowing is incorrect because it describes something bright, not dark.",
        },
      },
    },
    {
      topic: "Vocabulary",
      question: "What does the term 'context' mean in reading?",
      options: [
        "A) the main idea of a passage",
        "B) the setting of a story",
        "C) the tone of a text",
        "D) the words and sentences surrounding a particular word",
      ],
      correctAnswer: "D",
      explanation:
        "Context refers to the words and sentences that surround a particular word or passage, providing clues to help understand its meaning within a larger text.",
      hint: "Think about what helps you understand a new word in a sentence.",
      explanations: {
        correct:
          "Great job! Context is the surrounding text that helps you understand a word’s meaning.",
        incorrect: {
          A: "The main idea is incorrect because context is about surrounding words, not the overall message.",
          B: "The setting is incorrect because context is about text, not the story’s location.",
          C: "The tone is incorrect because context is about nearby words, not the mood.",
        },
      },
    },
    {
      topic: "Vocabulary",
      question: "Which word is a synonym for 'brave'?",
      options: ["A) scared", "B) cowardly", "C) courageous", "D) timid"],
      correctAnswer: "C",
      explanation:
        "The word 'courageous' is a synonym for 'brave', both describing someone who acts with bravery or fearlessness in the face of danger or adversity.",
      hint: "Think about a word that means brave, like facing danger without fear.",
      explanations: {
        correct:
          "Nice work! 'Courageous' is a synonym for 'brave,' both meaning fearless.",
        incorrect: {
          A: "Scared is incorrect because it means afraid, the opposite of brave.",
          B: "Cowardly is incorrect because it means lacking bravery.",
          D: "Timid is incorrect because it means shy or fearful, not brave.",
        },
      },
    },
  ],
  "Dystopian Themes": [
    {
      topic: "Dystopian Themes",
      question: "What is a common theme in dystopian literature?",
      options: [
        "A) Utopian societies",
        "B) Control by a totalitarian government",
        "C) Happy endings",
        "D) Perfect societies",
      ],
      correctAnswer: "B",
      explanation:
        "In modern times, dystopian literature often explores themes of control by authoritarian governments or oppressive societies, reflecting concerns about power and freedom.",
      hint: "Think about a common problem in dystopian stories.",
      explanations: {
        correct:
          "Great job! Dystopian literature often focuses on oppressive control by governments.",
        incorrect: {
          A: "Utopian societies are incorrect because dystopian stories show flawed societies, not perfect ones.",
          C: "Happy endings are incorrect because dystopian stories often have dark or unresolved endings.",
          D: "Perfect societies are incorrect because dystopian stories highlight oppression, not perfection.",
        },
      },
    },
    {
      topic: "Dystopian Themes",
      question: "Which of the following best describes a dystopian society?",
      options: [
        "A) Peaceful and harmonious",
        "B) Surveillance and control",
        "C) Equal opportunities for all",
        "D) Lack of conflict",
      ],
      correctAnswer: "B",
      explanation:
        "In a world where technology and surveillance play significant roles, dystopian societies often depict themes of constant monitoring and control, similar to concerns about privacy in the digital age.",
      hint: "Think about a society where people are always watched.",
      explanations: {
        correct:
          "Nice work! Dystopian societies are often marked by surveillance and control.",
        incorrect: {
          A: "Peaceful and harmonious is incorrect because dystopian societies are oppressive, not peaceful.",
          C: "Equal opportunities is incorrect because dystopian societies often have inequality.",
          D: "Lack of conflict is incorrect because dystopian stories are full of conflict.",
        },
      },
    },
    {
      topic: "Dystopian Themes",
      question: "What is a common feature of dystopian novels?",
      options: [
        "A) Optimistic outlook on society",
        "B) Rebellion against authority",
        "C) Perfect government systems",
        "D) Lack of conflict",
      ],
      correctAnswer: "B",
      explanation:
        "Dystopian novels frequently feature protagonists who rebel against oppressive governments or systems, mirroring contemporary narratives of standing up against injustice or inequality.",
      hint: "Think about what the main character often does in dystopian stories.",
      explanations: {
        correct:
          "Great job! Rebellion against authority is a common feature in dystopian novels.",
        incorrect: {
          A: "Optimistic outlook is incorrect because dystopian novels are usually dark and critical.",
          C: "Perfect government systems are incorrect because dystopian governments are oppressive.",
          D: "Lack of conflict is incorrect because dystopian novels are full of conflict.",
        },
      },
    },
    {
      topic: "Dystopian Themes",
      question:
        "In dystopian literature, what does the term 'Big Brother' often represent?",
      options: [
        "A) A caring sibling",
        "B) Government surveillance and control",
        "C) Friendly neighbors",
        "D) Avoiding conflict",
      ],
      correctAnswer: "B",
      explanation:
        "The concept of 'Big Brother' in dystopian literature symbolizes an authoritarian figure or government entity that monitors and controls the population, similar to concerns about intrusive surveillance in modern society.",
      hint: "Think about a term that means constant watching by the government.",
      explanations: {
        correct:
          "Nice work! 'Big Brother' represents government surveillance in dystopian stories.",
        incorrect: {
          A: "A caring sibling is incorrect because Big Brother is about control, not family.",
          C: "Friendly neighbors is incorrect because Big Brother is about oppression, not friendliness.",
          D: "Avoiding conflict is incorrect because Big Brother creates conflict through control.",
        },
      },
    },
    {
      topic: "Dystopian Themes",
      question:
        "What role do protagonists typically play in dystopian stories?",
      options: [
        "A) Passive observers",
        "B) Agents of change and rebellion",
        "C) Supporters of the government",
        "D) Bystanders",
      ],
      correctAnswer: "B",
      explanation:
        "Protagonists in dystopian stories often serve as catalysts for change, challenging oppressive systems and advocating for freedom and justice, akin to modern narratives of activism and social change.",
      hint: "Think about what the main character often does in a dystopian story.",
      explanations: {
        correct:
          "Nice work! Protagonists in dystopian stories often rebel against oppressive systems.",
        incorrect: {
          A: "Passive observers is incorrect because protagonists in dystopian stories are usually active.",
          C: "Supporters of the government is incorrect because protagonists typically oppose the government.",
          D: "Bystanders is incorrect because protagonists drive change, not just watch events.",
        },
      },
    },
    {
      topic: "Dystopian Themes",
      question:
        "How do dystopian themes in literature reflect real-world concerns?",
      options: [
        "A) By promoting conformity",
        "B) By warning about dangers of unchecked power",
        "C) By advocating for authoritarian rule",
        "D) By ignoring societal issues",
      ],
      correctAnswer: "B",
      explanation:
        "Dystopian themes in literature often serve as cautionary tales, highlighting the potential dangers of unchecked power and control, similar to contemporary discussions about the impact of technology and government surveillance on individual freedoms.",
      hint: "Think about what dystopian stories warn us about in today’s world.",
      explanations: {
        correct:
          "Great job! Dystopian themes warn about unchecked power, like surveillance concerns today.",
        incorrect: {
          A: "Promoting conformity is incorrect because dystopian stories often critique it.",
          C: "Advocating for authoritarian rule is incorrect because dystopian stories oppose it.",
          D: "Ignoring societal issues is incorrect because dystopian stories highlight them.",
        },
      },
    },
    {
      topic: "Dystopian Themes",
      question: "What is a common setting in dystopian novels?",
      options: [
        "A) Utopian paradise",
        "B) Post-apocalyptic world",
        "C) Peaceful countryside",
        "D) Luxury resorts",
      ],
      correctAnswer: "B",
      explanation:
        "Dystopian novels often take place in post-apocalyptic or oppressive societies, reflecting concerns about environmental destruction, social inequality, and political unrest in the modern world.",
      hint: "Think about a typical setting for a dystopian story.",
      explanations: {
        correct:
          "Nice work! Post-apocalyptic worlds are common settings in dystopian novels.",
        incorrect: {
          A: "Utopian paradise is incorrect because dystopian settings are flawed, not perfect.",
          C: "Peaceful countryside is incorrect because dystopian settings are often harsh.",
          D: "Luxury resorts is incorrect because dystopian settings are typically oppressive.",
        },
      },
    },
    {
      topic: "Dystopian Themes",
      question: "What do dystopian societies often lack?",
      options: [
        "A) Surveillance and control",
        "B) Individual freedoms",
        "C) Equality for all",
        "D) Optimism and hope",
      ],
      correctAnswer: "B",
      explanation:
        "Dystopian societies are characterized by a lack of individual freedoms and autonomy, highlighting themes of oppression and authoritarian rule, which resonate with contemporary discussions about democracy and human rights.",
      hint: "Think about what people lose in a dystopian society.",
      explanations: {
        correct:
          "Great job! Dystopian societies often lack individual freedoms due to oppression.",
        incorrect: {
          A: "Surveillance and control is incorrect because dystopian societies have too much of it.",
          C: "Equality for all is incorrect because dystopian societies often have inequality.",
          D: "Optimism and hope is incorrect because the lack of freedom is more defining.",
        },
      },
    },
    {
      topic: "Dystopian Themes",
      question:
        "How do dystopian novels explore the consequences of power and control?",
      options: [
        "A) By promoting rebellion",
        "B) By depicting dystopian societies",
        "C) By advocating for peaceful solutions",
        "D) By ignoring societal issues",
      ],
      correctAnswer: "B",
      explanation:
        "Dystopian novels offer insights into the consequences of power and control, depicting societies where authoritarian rule leads to oppression and resistance, similar to contemporary debates about democracy and social justice.",
      hint: "Think about how dystopian stories show the effects of power.",
      explanations: {
        correct:
          "Nice work! Dystopian novels depict societies to show the effects of power and control.",
        incorrect: {
          A: "Promoting rebellion is incorrect because depicting societies is the broader method.",
          C: "Advocating for peaceful solutions is incorrect because dystopian stories often show conflict.",
          D: "Ignoring societal issues is incorrect because dystopian stories address them.",
        },
      },
    },
    {
      topic: "Dystopian Themes",
      question: "What do dystopian themes often reveal about human nature?",
      options: [
        "A) Inherent goodness and kindness",
        "B) Capacity for resistance and rebellion",
        "C) Desire for control and power",
        "D) Lack of empathy and compassion",
      ],
      correctAnswer: "B",
      explanation:
        "Dystopian themes often highlight humanity's capacity for resistance and rebellion against oppressive forces, shedding light on the values of freedom and justice that are central to modern discussions about democracy and human rights.",
      hint: "Think about what humans do in dystopian stories when faced with oppression.",
      explanations: {
        correct:
          "Great job! Dystopian themes show humans’ capacity for resistance and rebellion.",
        incorrect: {
          A: "Inherent goodness is incorrect because dystopian stories focus on struggle, not kindness.",
          C: "Desire for control is incorrect because this is more about the oppressors, not human nature broadly.",
          D: "Lack of empathy is incorrect because dystopian themes often show empathy through rebellion.",
        },
      },
    },
  ],
};
