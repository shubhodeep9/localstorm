import { Schema } from "./schema";
import { Entry } from "./entry";

/**
 * Model function takes in key-pair's key, and structure in Schema
 * returns Entry with functionalities.
 * @param key name for localstorage `K`
 * @param schema an object of Schema class with required structured for validations
 */
export function Model(key: string, schema: Schema) {
    return new Entry(key, schema);
}