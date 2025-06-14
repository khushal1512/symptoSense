import { foodDrugAllergies } from "../../questions/food-drug";
import { contactPlantAllergies } from "../../questions/contact-plant";
import { insectEnvironmentalAllergies } from "../../questions/insect-environmental";

export interface AllergyCategory {
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface AllergyData {
  name: string;
  description: string;
  questions: Array<{
    id: number;
    text: string;
    category: string;
  }>;
}

// Dynamically calculate test counts
const foodCount = foodDrugAllergies.filter((a: AllergyData) => a.questions[0].category === 'Food').length;
const drugCount = foodDrugAllergies.filter((a: AllergyData) => a.questions[0].category === 'Drug').length;
const contactCount = contactPlantAllergies.filter((a: AllergyData) => a.questions[0].category === 'Contact').length;
const plantCount = contactPlantAllergies.filter((a: AllergyData) => a.questions[0].category === 'Plant').length;
const insectCount = insectEnvironmentalAllergies.filter((a: AllergyData) => a.questions[0].category === 'Insect').length;
const environmentalCount = insectEnvironmentalAllergies.filter((a: AllergyData) => a.questions[0].category === 'Environmental').length;
const respiratoryCount = 2; // Asthma + Rhinitis (hardcoded as in category page)

export const categories: AllergyCategory[] = [
  {
    name: "Food Allergies",
    description: "Test for common food allergies like peanuts, tree nuts, milk, eggs, and more",
    icon: "🍽️",
    count: foodCount
  },
  {
    name: "Drug Allergies",
    description: "Check for medication allergies including antibiotics and pain relievers",
    icon: "💊",
    count: drugCount
  },
  {
    name: "Contact Allergies",
    description: "Identify skin reactions to materials like nickel, latex, and fragrances",
    icon: "👋",
    count: contactCount
  },
  {
    name: "Plant Allergies",
    description: "Test for reactions to poison ivy, oak, sumac, and other plant allergens",
    icon: "🌿",
    count: plantCount
  },
  {
    name: "Insect Allergies",
    description: "Check for reactions to bee stings, wasp venom, and other insect bites",
    icon: "🐝",
    count: insectCount
  },
  {
    name: "Environmental Allergies",
    description: "Test for reactions to dust mites, pet dander, and mold",
    icon: "🏠",
    count: environmentalCount
  },
  {
    name: "Respiratory Allergies",
    description: "Identify allergies affecting the respiratory system",
    icon: "🫁",
    count: respiratoryCount
  }
];

export const categorySlugs: Record<string, string> = {
  "Food Allergies": "food",
  "Drug Allergies": "drug",
  "Contact Allergies": "contact",
  "Plant Allergies": "plant",
  "Insect Allergies": "insect",
  "Environmental Allergies": "environmental",
  "Respiratory Allergies": "respiratory",
}; 