import { isDefinedType, Schema, SchemaPropGenericTypes } from "./schema";

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
        // validate required fields
        const requiredProps = this.schema.getRequiredProps();
        for (let requiredProp of requiredProps) {
            if (saveObj[requiredProp] === undefined) {
                throw Error(`Missing required field "${requiredProp}"`);
            }
        }
        for (let x in saveObj) {
            const propType = this.schema.get(x);
            let intendedType: SchemaPropGenericTypes;
            if (isDefinedType(propType)) {
                intendedType = propType.type;
            } else {
                intendedType = propType;
            }

            if (saveObj[x].constructor != intendedType) {
                throw Error(`Schema mismatch for ${x}, expected ${intendedType.name} got ${saveObj[x].constructor.name}`);
            }
        }
    }

    /**
     * 
     * @param saveObj pass the object to be saved in localstorage, it will be validated and stringified
     * @param skipValidation if you want to skip schema validations, pass this param as true
     */
    save(saveObj: Object, skipValidation?: boolean) {
        if (!skipValidation) {
            this.validate(saveObj);
        }

        window.localStorage.setItem(this.key, JSON.stringify(saveObj));
    }

    get() {
        const obj = window.localStorage.getItem(this.key);
        if (!obj) return obj;
        return JSON.parse(obj);
    }

    flush() {
        window.localStorage.removeItem(this.key);
    }
}
