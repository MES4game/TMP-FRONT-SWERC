import { unknownToDate, unknownToNumber, unknownToString } from "@/shared/utils/common/convert.util";
import { createConverter, createMapper } from "@/shared/utils/common/mapper.util";

export interface Submit {
    id:          number;
    user_id:     number;
    problem_id:  number;
    status_id:   number;
    points:      number;
    posted_on:   Date;
    finished_on: Date;
    code:        string;
    log:         string;
}

export const mapSubmit = createMapper<Submit>({
    id:          createConverter(unknownToNumber, -1),
    user_id:     createConverter(unknownToNumber, -1),  // eslint-disable-line @typescript-eslint/naming-convention
    problem_id:  createConverter(unknownToNumber, -1),  // eslint-disable-line @typescript-eslint/naming-convention
    status_id:   createConverter(unknownToNumber, -1),  // eslint-disable-line @typescript-eslint/naming-convention
    points:      createConverter(unknownToNumber, 0),
    posted_on:   createConverter(unknownToDate, new Date()),  // eslint-disable-line @typescript-eslint/naming-convention
    finished_on: createConverter(unknownToDate, new Date()),  // eslint-disable-line @typescript-eslint/naming-convention
    code:        createConverter(unknownToString, ""),
    log:         createConverter(unknownToString, ""),
});

export interface PostBodySubmit {
    code: string;
}

export const mapPostBodySubmit = createMapper<PostBodySubmit>({
    code:        createConverter(unknownToString, ""),
});
