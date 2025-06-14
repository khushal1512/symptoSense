export interface AllergyQuestion {
  id: number;
  text: string;
  category: 'Insect' | 'Environmental';
}

export interface AllergyData {
  name: string;
  description: string;
  questions: AllergyQuestion[];
}

export const insectEnvironmentalAllergies: AllergyData[] = [
  {
    name: "Insect Sting Allergy",
    description: "Allergic reaction to insect venom",
    questions: [
      {
        id: 1,
        text: "When stung by an insect, have you had a reaction that was more than just local pain and swelling?",
        category: "Insect"
      },
      {
        id: 2,
        text: "Did it include widespread hives, swelling of the tongue or throat, difficulty breathing, dizziness, or fainting (anaphylaxis)?",
        category: "Insect"
      }
    ]
  },
  {
    name: "Cockroach Allergy",
    description: "Allergic reaction to cockroach proteins",
    questions: [
      {
        id: 3,
        text: "Do you experience persistent nasal congestion, skin rashes, or asthma symptoms that are worse indoors and don't seem tied to a season?",
        category: "Environmental"
      },
      {
        id: 4,
        text: "Have you ever seen cockroaches in your home or building?",
        category: "Environmental"
      }
    ]
  },
  {
    name: "Pet Dander Allergy",
    description: "Allergic reaction to pet proteins",
    questions: [
      {
        id: 5,
        text: "Do you start sneezing, wheezing, or get itchy eyes and skin shortly after being near a cat or dog, or entering a home where they live?",
        category: "Environmental"
      },
      {
        id: 6,
        text: "Do symptoms resolve when you leave?",
        category: "Environmental"
      }
    ]
  },
  {
    name: "Mold Allergy",
    description: "Allergic reaction to mold spores",
    questions: [
      {
        id: 7,
        text: "Do your symptoms of coughing, sneezing, and a stuffy nose occur or worsen in damp or humid areas like basements, bathrooms, or near a leaky pipe?",
        category: "Environmental"
      },
      {
        id: 8,
        text: "Do you feel worse during rainy weather or in the fall when walking through damp leaves?",
        category: "Environmental"
      }
    ]
  }
]; 