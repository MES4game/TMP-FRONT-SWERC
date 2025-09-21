import { unknownToNumber, unknownToString } from "@/shared/utils/common/convert.util";
import { createConverter, createMapper } from "@/shared/utils/common/mapper.util";
import { getRandomNumber } from "@/shared/utils/common/random.util";

export interface UserScore {
    user_id: number;
    pseudo:  string;
    total:   number;
    points:  number[];
}

export const mapUserScore = createMapper<UserScore>({
    user_id: createConverter(unknownToNumber, -1),  // eslint-disable-line @typescript-eslint/naming-convention
    pseudo:  createConverter(unknownToString, ""),
    total:   createConverter(unknownToNumber, 0),
    points:  createConverter((_obj) => { return Array.from({ length: 6 }, () => { return getRandomNumber(0, 128); }); }, Array.from({ length: 6 }, () => { return 0; })),
});
