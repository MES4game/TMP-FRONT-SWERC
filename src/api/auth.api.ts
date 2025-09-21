export async function register(_email: string, _pseudo: string, _firstname: string, _lastname: string, _password: string): Promise<string> {
    return "registered token";
}

export async function login(_email_pseudo: string, _password: string): Promise<string> {
    return "login token";
}
