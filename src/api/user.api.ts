import { mapUser, User } from "@/shared/models/user.model";

const USERS = [] as User[];

export async function getUserAll(): Promise<User[]> {
    return USERS;
}

export async function getSelf(): Promise<User> {
    return mapUser({ id: 1 });
}
