export type Converter<T> = ((obj: unknown) => T) & { default: T };

export function createConverter<T>(func: (obj: unknown) => T, default_val: T): Converter<T> {
    return Object.assign(func, { default: default_val });
}

type SchemaType<T> = {
    [K in keyof T]: Converter<T[K]>
}

function rawObjToType<T>(obj: unknown, schema: SchemaType<T>): T {
    const result = {} as T;
    const safe_obj = obj as Record<PropertyKey, unknown>;

    for (const key in schema) {
        try {
            result[key] = schema[key](safe_obj[key]) ?? schema[key].default;
        }
        catch {
            result[key] = schema[key].default;
        }
    }

    return result;
}

type Mapper<T> = ((obj: unknown) => T) & { schema: SchemaType<T> };

export function createMapper<T>(schema: SchemaType<T>): Mapper<T> {
    return Object.assign(((obj: unknown) => { return rawObjToType(obj, schema); }), { schema: schema })
}

export function createRestrictedMapper<T, RK extends keyof T>(mapper: Mapper<T>, keys: readonly RK[]): Mapper<Pick<T, RK>> {
    const restricted_schema = {} as SchemaType<Pick<T, RK>>;

    for (const key of keys) {
        restricted_schema[key] = mapper.schema[key];
    }

    return createMapper(restricted_schema);
}
