export interface AllergyQuestion {
  id: number;
  text: string;
  category: 'Respiratory' | 'Environmental';
}

export interface AllergyData {
  name: string;
  description: string;
  questions: AllergyQuestion[];
}

export const respiratoryEnvironmentalAllergies: AllergyData[] = [
  {
    name: "Pollen Allergy (Hay Fever)",
    description: "Environmental allergy triggered by various types of pollen",
    questions: [
      {
        id: 1,
        text: "Do your symptoms of sneezing, runny nose, and itchy eyes worsen during specific seasons, such as spring (tree pollen), summer (grass pollen), or fall (weed pollen)?",
        category: "Environmental"
      },
      {
        id: 2,
        text: "Are your symptoms more severe on dry, windy days when pollen counts are high?",
        category: "Environmental"
      },
      {
        id: 3,
        text: "Do your symptoms improve when you stay indoors with the windows closed and the air conditioning on?",
        category: "Environmental"
      }
    ]
  },
  {
    name: "Mold Allergy",
    description: "Allergic reaction to mold spores in damp environments",
    questions: [
      {
        id: 4,
        text: "Do your symptoms of coughing, sneezing, and a stuffy nose occur in damp or humid environments, such as basements, bathrooms, or areas with water damage?",
        category: "Environmental"
      },
      {
        id: 5,
        text: "Do your symptoms flare up after being in a place with a musty odor?",
        category: "Environmental"
      },
      {
        id: 6,
        text: "Are your symptoms worse during rainy seasons or in the fall when decaying leaves are abundant?",
        category: "Environmental"
      }
    ]
  },
  {
    name: "Dust Mite Allergy",
    description: "Allergic reaction to microscopic dust mites",
    questions: [
      {
        id: 7,
        text: "Are your allergy symptoms, such as sneezing, runny nose, and itchy skin, worse in the morning after waking up or after spending time indoors, especially in the bedroom?",
        category: "Respiratory"
      },
      {
        id: 8,
        text: "Do your symptoms improve when you are away from home for an extended period?",
        category: "Respiratory"
      },
      {
        id: 9,
        text: "Have you noticed your symptoms worsening after dusting, vacuuming, or changing bedding?",
        category: "Respiratory"
      }
    ]
  },
  {
    name: "Pet Dander Allergy",
    description: "Allergic reaction to proteins in pet skin cells",
    questions: [
      {
        id: 10,
        text: "Do you experience sneezing, wheezing, or itchy eyes and skin shortly after coming into contact with a specific type of animal, such as a cat or dog?",
        category: "Respiratory"
      },
      {
        id: 11,
        text: "Do your symptoms worsen when you are in a home with pets, even if the pet is not in the same room?",
        category: "Respiratory"
      },
      {
        id: 12,
        text: "Do your symptoms improve when you are in a pet-free environment?",
        category: "Respiratory"
      }
    ]
  }
]; 