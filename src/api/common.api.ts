import { ENV } from "@/shared/config/env.config";

function toQueryString(params: Record<string, string | number | null | undefined>): string {
    const filtered = Object.entries(params)
        .filter(([_, value]) => { return value !== null && value !== undefined; }) // remove empty ones
        .map(([key, value]) => { return [key, String(value)]; }); // ensure string conversion

    return new URLSearchParams(filtered).toString();
}

export async function fetchGet(token: string, route: string, query_record: Record<string, string>) {
    return await fetch(`https://${ENV.dev ? 'dev.' : 'api.'}${ENV.host}${ENV.dev ? '/api' : ''}${route}?${toQueryString(query_record)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",  // eslint-disable-line @typescript-eslint/naming-convention
            Authorization: `Bearer ${token}`,  // eslint-disable-line @typescript-eslint/naming-convention
        },
    });
}

export async function fetchPost(token: string, route: string, body: unknown) {
    return await fetch(`https://${ENV.dev ? 'dev.' : 'api.'}${ENV.host}${ENV.dev ? '/api' : ''}${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",  // eslint-disable-line @typescript-eslint/naming-convention
            Authorization: `Bearer ${token}`,  // eslint-disable-line @typescript-eslint/naming-convention
        },
        body: JSON.stringify(body),
    });
}
