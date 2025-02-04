import { faker } from "@faker-js/faker";

// Function to generate a codename
export const generateCodename = (): string => {
  const adjective = faker.word.adjective();
  const noun = faker.animal.type(); // Generates random animals like Falcon, Wolf, Tiger
  
  // Capitalize the first letter of the adjective and noun, and return the codename
  return `The ${capitalize(adjective)} ${capitalize(noun)}`;
};

// Helper function to capitalize the first letter of a string
const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
