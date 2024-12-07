import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a new UUID (Universally Unique Identifier) using the 'uuidv4' function from the 'uuid' package.
 * @returns A string representing the newly generated UUID.
 */
export const generateUuid = () => {
  return uuidv4() as string;
};

/**
 * Converts an object to a string representation.
 *
 * This function uses `JSON.stringify` to convert the provided object to a string.
 * It handles circular references and other potential errors by logging an error message to the console and returning the default string conversion of the object.
 *
 * @param obj - The object to convert to a string.
 * @returns A string representation of the input object.
 *
 * @example
 * ```typescript
 * const obj = { name: 'John', age: 30 };
 * const objString = objectToString(obj);
 * console.log(objString); // Output: "{\n  "name": "John",\n  "age": 30\n}"
 * ```
 */
export function objectToString(obj: any): string {
  try {
    // Convert the object to a string using JSON.stringify
    return JSON.stringify(obj, null, 2); // Pretty print with 2-space indentation
  } catch (error) {
    // Handle circular references or other errors
    console.error('Error converting object to string:', error);
    return String(obj); // Fallback to default string conversion
  }
}
