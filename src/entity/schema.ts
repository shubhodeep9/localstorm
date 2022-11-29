/**
 * PropTypes currently supports number and string
 * @TODO: support more structures, or build support for constructors
 */
interface PropTypes {
    [key: string]: "number" | "string"
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

}


