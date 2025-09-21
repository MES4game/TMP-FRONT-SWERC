import { unknownToNumber, unknownToString } from "@/shared/utils/common/convert.util";
import { createConverter, createMapper } from "@/shared/utils/common/mapper.util";

export interface Status {
    id:    number;
    value: string;
    color: string;
}

export const mapStatus = createMapper<Status>({
    id:    createConverter(unknownToNumber, -1),
    value: createConverter(unknownToString, ""),
    color: createConverter(unknownToString, "black"),
});
