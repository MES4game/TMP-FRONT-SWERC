import { mapUser, User } from "@/shared/models/user.model";

export async function getSelf(token: string): Promise<User> {
    return mapUser({ id: (token === "login token" || token === "registered token") ? 1 : -1 });
}
