import { Schema } from "./schema";

/**
 * Entry is layer over localstorage with structuring support,
 * and validation
 */
export class Entry {
    key: string;
    schema: Schema;

    constructor(key: string, schema: Schema) {
        this.key = key;
        this.schema = schema;
    }

    validate(saveObj: any) {
        for (let x in saveObj) {
            const propType = this.schema.get(x);
            
            if (propType != typeof saveObj[x]) {
                throw Error(`Schema mismatch for ${x}`);
            }
        }
    }

    save(saveObj: any) {
        this.validate(saveObj);

        window.localStorage.setItem(this.key, saveObj);
    }

    get() {
        return window.localStorage.getItem(this.key);
    }

    flush() {
        window.localStorage.removeItem(this.key);
    }
}
