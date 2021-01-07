import { ColorInput } from "@ctrl/tinycolor";
/**
 * Converts a hexadecimal string to a char-code composed string
 * @param str the string to convert from a hex string representation to a charcode representation
 * @returns the char-code string
 */
export declare function unhexlify(str: string): string;
/**
 * Converts a number to it's hexadecimal string representation in least significant byte first
 * @param value the value to convert between 0 and 65535
 * @returns the LSB First string reprensenting `value`
 */
export declare function int2hexlittle(value: number): string;
/**
 * Converts an 8bit number to it's hexadecimal string representation
 * @param int the number to convert
 * @returns the hexadecimal string reprensetation
 */
export declare function number2HexString(int: number): string;
/**
 * Convert a boolean to `00` or `01`
 * @param bool a boolean
 * @returns a string representing the boolean
 */
export declare function boolean2HexString(bool: boolean): string;
/**
 * Converts a color to an hexadecimal string representation
 * @param color the color to convert
 */
export declare function color2HexString(color: ColorInput): string;
/**
 * Converts the brightness to a hex string
 * @param brightness the brightness
 * @returns the hex string
 */
export declare function brightness2HexString(brightness: number): string;
