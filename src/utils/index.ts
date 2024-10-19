import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a new UUID (Universally Unique Identifier) using the 'uuidv4' function from the 'uuid' package.
 * @returns A string representing the newly generated UUID.
 */
export const generateUuid = () => {
  return uuidv4() as string;
};
