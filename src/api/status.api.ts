import { Status } from "@/shared/models/status.model";

const STATUSES = [] as Status[];

export async function getStatusAll(): Promise<Status[]> {
    return STATUSES;
}
