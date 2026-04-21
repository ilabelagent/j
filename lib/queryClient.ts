export async function apiRequest(url: string, options: any) {
    console.log(`[API] ${options.method} ${url}`, options.body);
    return { ok: true };
}
