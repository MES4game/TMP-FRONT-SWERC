import { ENV } from "@/shared/config/env.config";

function toQueryString(params?: Record<string, string | number | null | undefined>): string {
    if (!params) return "";

    const filtered = Object.entries(params)
        .filter(([_, value]) => { return value !== null && value !== undefined; })
        .map(([key, value]) => { return [key, String(value)]; });

    return new URLSearchParams(filtered).toString();
}

export async function fetchGet(route: string, token?: string, query_record?: Record<string, string>): Promise<Response> {
    return await fetch(`https://${ENV.dev ? 'dev.' : 'api.'}${ENV.host}${ENV.dev ? '/api' : ''}${route}?${toQueryString(query_record)}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,  // eslint-disable-line @typescript-eslint/naming-convention
        },
    });
}

export async function fetchPost(token: string, route: string, body?: unknown): Promise<Response> {
    return await fetch(`https://${ENV.dev ? 'dev.' : 'api.'}${ENV.host}${ENV.dev ? '/api' : ''}${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",  // eslint-disable-line @typescript-eslint/naming-convention
            Authorization: `Bearer ${token}`,  // eslint-disable-line @typescript-eslint/naming-convention
        },
        body: JSON.stringify(body),
    });
}
