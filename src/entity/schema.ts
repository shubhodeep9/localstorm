/**
 * PropTypes currently supports number and string
 * @TODO: support more structures
 */

export type SchemaPropGenericTypes = NumberConstructor | StringConstructor | ArrayConstructor
export type SchemaPropDefinedType = {
    required: boolean,
    type: SchemaPropGenericTypes
}
interface PropTypes {
    [key: string]: SchemaPropDefinedType | SchemaPropGenericTypes;
}

export function isDefinedType(propType: SchemaPropDefinedType | SchemaPropGenericTypes): propType is SchemaPropDefinedType {
    return (<SchemaPropDefinedType>propType).type != undefined;
}

/**
 * Just like mongoose, Schema serves the purpose for declaration of structure
 */
export class Schema {
    properties: PropTypes;
    constructor(props: PropTypes) {
        this.properties = props;
    }

    get(key: string) {
        return this.properties[key];
    }

    getRequiredProps(): Array<string> {
        let requiredProps = [] as Array<string>;
        for (let x in this.properties) {
            const prop = this.properties[x];
            if (isDefinedType(prop)) {
                const isRequired = prop.required;
                if (isRequired) {
                    requiredProps.push(x);
                }
            }
        }
        return requiredProps;
    }
}