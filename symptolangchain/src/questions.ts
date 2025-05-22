import { Question, AllergyCategory } from './types/index.ts';

export const questions: Question[] = [
    {
        id: 1,
        text: "Do you often experience sneezing, itchy eyes, or a runny nose when exposed to dust, mold, or pollen?",
        category: 'Environmental'
    },
    {
        id: 2,
        text: "Have you ever felt your throat tightening or difficulty breathing after eating certain foods or taking medications?",
        category: 'Food'
    },
    {
        id: 3,
        text: "Do you develop headaches, dizziness, or fatigue when exposed to strong odors like perfumes or cleaning chemicals?",
        category: 'Chemical'
    },
    {
        id: 4,
        text: "Have you noticed skin irritation, redness, or rashes after contact with specific fabrics, cosmetics, or jewelry?",
        category: 'Skin'
    },
    {
        id: 5,
        text: "Are your allergy symptoms worse during specific seasons, especially spring or fall?",
        category: 'Environmental'
    },
    {
        id: 6,
        text: "Do you frequently feel congested or short of breath in damp areas, possibly indicating mold sensitivity?",
        category: 'Respiratory'
    },
    {
        id: 7,
        text: "Have you noticed discomfort, coughing, or sneezing when exposed to pet dander (cats, dogs, or birds)?",
        category: 'Environmental'
    },
    {
        id: 8,
        text: "Do you develop rashes, itching, or swelling after wearing jewelry, watches, or items containing metals like nickel?",
        category: 'Skin'
    },
    {
        id: 9,
        text: "Have you noticed skin redness or irritation after using certain soaps, shampoos, or laundry detergents?",
        category: 'Skin'
    },
    {
        id: 10,
        text: "Do you get blisters, swelling, or itchy patches after handling latex gloves or rubber-based products?",
        category: 'Skin'
    },
    {
        id: 11,
        text: "Have you had an extreme reaction (swelling, pain, or difficulty breathing) after being stung by bees or bitten by insects?",
        category: 'Insect'
    },
    {
        id: 12,
        text: "Do you experience allergic symptoms after taking medications like penicillin, aspirin, or ibuprofen?",
        category: 'Medication'
    },
    {
        id: 13,
        text: "Are you sensitive to air pollution, cigarette smoke, or strong fragrances, causing coughing or respiratory discomfort?",
        category: 'Respiratory'
    },
    {
        id: 14,
        text: "Have you experienced eye irritation, headaches, or breathing problems after using cleaning products or air fresheners?",
        category: 'Chemical'
    }
]; 