export interface AllergyQuestion {
  id: number;
  text: string;
  category: 'Food' | 'Drug';
}

export interface AllergyData {
  name: string;
  description: string;
  questions: AllergyQuestion[];
}

export const foodDrugAllergies: AllergyData[] = [
  {
    name: "Peanut Allergy",
    description: "Allergic reaction to proteins in peanuts",
    questions: [
      {
        id: 1,
        text: "Do you experience hives, swelling of the lips or tongue, difficulty breathing, wheezing, or vomiting within minutes to a couple of hours of eating peanuts or foods that might contain them?",
        category: "Food"
      },
      {
        id: 2,
        text: "Have you ever had a severe reaction requiring an epinephrine auto-injector?",
        category: "Food"
      }
    ]
  },
  {
    name: "Tree Nut Allergy",
    description: "Allergic reaction to proteins in tree nuts",
    questions: [
      {
        id: 3,
        text: "Have you had a reaction like a skin rash, abdominal pain, swelling of the mouth, or trouble breathing after eating nuts like walnuts, almonds, pecans, or cashews?",
        category: "Food"
      },
      {
        id: 4,
        text: "Do you have a known peanut allergy (as they can be related)?",
        category: "Food"
      }
    ]
  },
  {
    name: "Milk Allergy",
    description: "Allergic reaction to proteins in cow's milk",
    questions: [
      {
        id: 5,
        text: "Do you develop symptoms like hives, wheezing, vomiting, or stomach cramps shortly after consuming milk, cheese, yogurt, or other dairy products?",
        category: "Food"
      },
      {
        id: 6,
        text: "Note: This is different from lactose intolerance, which primarily causes digestive upset (gas, bloating) and not immune responses like hives or swelling.",
        category: "Food"
      }
    ]
  },
  {
    name: "Egg Allergy",
    description: "Allergic reaction to proteins in eggs",
    questions: [
      {
        id: 7,
        text: "Have you developed skin reactions like hives or eczema, nasal congestion, or digestive issues (like cramps or nausea) after eating eggs or foods containing them?",
        category: "Food"
      },
      {
        id: 8,
        text: "Are reactions less severe if the egg is well-cooked in a baked product?",
        category: "Food"
      }
    ]
  },
  {
    name: "Soy Allergy",
    description: "Allergic reaction to proteins in soybeans",
    questions: [
      {
        id: 9,
        text: "Do you experience a tingling sensation in the mouth, hives, swelling, or digestive problems after consuming soy products like soy milk, tofu, edamame, or soy sauce?",
        category: "Food"
      }
    ]
  },
  {
    name: "Wheat Allergy",
    description: "Allergic reaction to proteins in wheat",
    questions: [
      {
        id: 10,
        text: "Do you develop hives, swelling, nasal congestion, or digestive upset within minutes to hours of eating wheat-containing products like bread, pasta, or cereal?",
        category: "Food"
      },
      {
        id: 11,
        text: "Note: This is an immediate immune response, distinct from the autoimmune reaction of Celiac disease.",
        category: "Food"
      }
    ]
  },
  {
    name: "Fish Allergy",
    description: "Allergic reaction to proteins in fish",
    questions: [
      {
        id: 12,
        text: "Have you had a reaction, such as a skin rash, hives, or difficulty breathing, after eating finned fish like tuna, salmon, or cod?",
        category: "Food"
      },
      {
        id: 13,
        text: "Have you ever reacted just from the smell of fish being cooked?",
        category: "Food"
      }
    ]
  },
  {
    name: "Shellfish Allergy",
    description: "Allergic reaction to proteins in shellfish",
    questions: [
      {
        id: 14,
        text: "Have you experienced tingling of the throat, swelling of the lips and face, hives, or difficulty breathing after eating shellfish like shrimp, crab, lobster, or mollusks like clams and mussels?",
        category: "Food"
      }
    ]
  },
  {
    name: "Penicillin Allergy",
    description: "Allergic reaction to penicillin antibiotics",
    questions: [
      {
        id: 15,
        text: "Have you ever developed a rash, hives, or itching shortly after taking penicillin or a related antibiotic like amoxicillin?",
        category: "Drug"
      },
      {
        id: 16,
        text: "Did you experience more severe symptoms like facial swelling, wheezing, or anaphylaxis?",
        category: "Drug"
      }
    ]
  },
  {
    name: "NSAID Allergy",
    description: "Allergic reaction to nonsteroidal anti-inflammatory drugs",
    questions: [
      {
        id: 17,
        text: "Have you experienced hives, itchy skin, facial swelling, or a flare-up of asthma symptoms shortly after taking nonsteroidal anti-inflammatory drugs (NSAIDs) such as aspirin, ibuprofen (Advil, Motrin), or naproxen (Aleve)?",
        category: "Drug"
      }
    ]
  }
]; 