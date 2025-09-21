import { Status } from "@/shared/models/status.model";

const STATUSES: Status[] = [];

export async function getStatusAll(): Promise<Status[]> {
    return STATUSES;
}
