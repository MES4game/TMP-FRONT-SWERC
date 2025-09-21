import { unknownToDate, unknownToNumber, unknownToString } from "@/shared/utils/common/convert.util";
import { createConverter, createMapper } from "@/shared/utils/common/mapper.util";

export interface DecodedToken {
    iat: Date;
    exp: Date;
    aud: string;
    iss: string;
    sub: number;
}

export const mapDecodedToken = createMapper<DecodedToken>({
    iat: createConverter(unknownToDate, new Date()),
    exp: createConverter(unknownToDate, new Date((new Date()).getTime() + 14400000)),
    aud: createConverter(unknownToString, ""),
    iss: createConverter(unknownToString, ""),
    sub: createConverter(unknownToNumber, -1),
});

export interface PostBodyRegister {
    email:     string;
    pseudo:    string;
    password:  string;
    firstname: string;
    lastname:  string;
}

export const mapPostBodyRegister = createMapper<PostBodyRegister>({
    email:     createConverter(unknownToString, ""),
    pseudo:    createConverter(unknownToString, ""),
    password:  createConverter(unknownToString, ""),
    firstname: createConverter(unknownToString, ""),
    lastname:  createConverter(unknownToString, ""),
});

export interface PostBodyLogin {
    email_pseudo: string;
    password:     string;
}

export const mapPostBodyLogin = createMapper<PostBodyLogin>({
    email_pseudo: createConverter(unknownToString, ""),  // eslint-disable-line @typescript-eslint/naming-convention
    password:     createConverter(unknownToString, ""),
});
