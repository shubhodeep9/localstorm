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

type IRegisteredPreFn = {
    save?: SaveFun;
    flush?: VoidFun;
};

type IRegisteredPostFn = {
    save?: SaveFun;
    flush?: VoidFun;
};


type SaveFun = (saveObj: Object) => void;

type VoidFun = () => void;

/**
 * Just like mongoose, Schema serves the purpose for declaration of structure
 */
export class Schema {
    properties: PropTypes;
    registeredPreFns: IRegisteredPreFn;
    registeredPostFns: IRegisteredPostFn;
    constructor(props: PropTypes) {
        this.properties = props;
        this.registeredPreFns = {};
        this.registeredPostFns = {};
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

    pre(action: 'save' | 'flush', 
        callback: SaveFun | VoidFun) {
       if (!['save', 'flush'].includes(action)) {
        throw new Error('Error in defining pre hook, mentioned type invalid.');
       }
       // register the functions
       if (action === 'save')
        this.registeredPreFns[action] = callback;
       else
        this.registeredPreFns[action] = callback as VoidFun;
    }

    post(action: 'save' | 'flush', 
        callback: SaveFun | VoidFun) {
       if (!['save', 'flush'].includes(action)) {
        throw new Error('Error in defining pre hook, mentioned type invalid.');
       }
       // register the functions
       // need to find a better way to handle this typecasting
       if (action === 'save')
        this.registeredPostFns[action] = callback;
       else 
        this.registeredPostFns[action] = callback as VoidFun;
    }

    executePreSave(saveObj: Object) {
        if (this.registeredPreFns.save) {
            this.registeredPreFns.save(saveObj)
        }
    }

    executePostSave(saveObj: Object) {
        if (this.registeredPostFns.save) {
            this.registeredPostFns.save(saveObj)
        }
    }

    executePreFlush() {
        if (this.registeredPreFns.flush) {
            this.registeredPreFns.flush()
        }
    }

    executePostFlush() {
        if (this.registeredPostFns.flush) {
            this.registeredPostFns.flush()
        }
    }
}