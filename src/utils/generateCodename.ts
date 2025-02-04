import { faker } from "@faker-js/faker";

export const generateCodename = (): string => {
  const adjective = faker.word.adjective();
  const noun = faker.animal.type(); // Generates random animals like Falcon, Wolf, Tiger
  return `The ${adjective.charAt(0).toUpperCase() + adjective.slice(1)} ${noun.charAt(0).toUpperCase() + noun.slice(1)}`;
};
