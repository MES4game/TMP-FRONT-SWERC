import { unknownToNumber, unknownToString } from "@/shared/utils/common/convert.util";
import { createConverter, createMapper } from "@/shared/utils/common/mapper.util";

export interface Problem {
    id:                 number;
    color:              string;
    letter:             string;
    title:              string;
    statement:          string;
    max_time:           number;
    max_memory:         number;
    validation_points:  number;
    performance_points: number;
}

export const mapProblem = createMapper<Problem>({
    id:                 createConverter(unknownToNumber, -1),
    color:              createConverter(unknownToString, "white"),
    letter:             createConverter(unknownToString, ""),
    title:              createConverter(unknownToString, ""),
    statement:          createConverter(unknownToString, ""),
    max_time:           createConverter(unknownToNumber, 0),  // eslint-disable-line @typescript-eslint/naming-convention
    max_memory:         createConverter(unknownToNumber, 0),  // eslint-disable-line @typescript-eslint/naming-convention
    validation_points:  createConverter(unknownToNumber, 0),  // eslint-disable-line @typescript-eslint/naming-convention
    performance_points: createConverter(unknownToNumber, 0),  // eslint-disable-line @typescript-eslint/naming-convention
});

export interface Example {
    name:    string;
    input:   string;
    output:  string;
    comment: string;
}

export const mapExample = createMapper<Example>({
    name:    createConverter(unknownToString, ""),
    input:   createConverter(unknownToString, ""),
    output:  createConverter(unknownToString, ""),
    comment: createConverter(unknownToString, ""),
});
