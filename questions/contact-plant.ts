export interface AllergyQuestion {
  id: number;
  text: string;
  category: 'Contact' | 'Plant';
}

export interface AllergyData {
  name: string;
  description: string;
  questions: AllergyQuestion[];
}

export const contactPlantAllergies: AllergyData[] = [
  {
    name: "Poison Ivy, Oak, or Sumac",
    description: "Allergic reaction to urushiol oil in plants",
    questions: [
      {
        id: 1,
        text: "Did you develop an intensely itchy, red rash, often with lines, streaks, or blisters, 12 to 72 hours after being outdoors, hiking, or gardening?",
        category: "Plant"
      },
      {
        id: 2,
        text: "Is the rash on skin that was likely exposed?",
        category: "Plant"
      }
    ]
  },
  {
    name: "Nickel Contact Dermatitis",
    description: "Allergic reaction to nickel in metal items",
    questions: [
      {
        id: 3,
        text: "Do you get an itchy, red, or bumpy rash in areas where your skin touches metal, such as under a watch, from a belt buckle, or from jean snaps?",
        category: "Contact"
      },
      {
        id: 4,
        text: "Does it get better when you avoid the metal item?",
        category: "Contact"
      }
    ]
  },
  {
    name: "Latex Allergy",
    description: "Allergic reaction to natural rubber latex",
    questions: [
      {
        id: 5,
        text: "Have you developed a rash, itching, or hives after wearing latex gloves, using a condom, or inflating a balloon?",
        category: "Contact"
      },
      {
        id: 6,
        text: "Have you had a more severe reaction like wheezing or trouble breathing?",
        category: "Contact"
      }
    ]
  },
  {
    name: "Fragrance Mix Allergy",
    description: "Allergic reaction to fragrance chemicals",
    questions: [
      {
        id: 7,
        text: "Do you develop a rash, redness, or itchy skin after using scented products like perfumes, colognes, lotions, soaps, or detergents?",
        category: "Contact"
      },
      {
        id: 8,
        text: "Does the rash appear where the product was applied?",
        category: "Contact"
      }
    ]
  }
]; 