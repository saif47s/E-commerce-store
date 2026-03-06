import { MEDUSA_BACKEND_URL } from "@lib/config"

export const sanitizeImageUrl = (url?: string | null): string | undefined => {
    if (!url) return undefined;
    return url;
}
