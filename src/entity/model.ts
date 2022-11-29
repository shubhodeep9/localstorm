import { Schema } from "./schema";
import { Entry } from "./entry";

/**
 * Model function takes in key-pair's key, and structure in Schema
 * returns Entry with functionalities.
 */
export function Model(key: string, schema: Schema) {
    return new Entry(key, schema);
}