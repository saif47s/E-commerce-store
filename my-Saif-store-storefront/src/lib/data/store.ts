"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

export async function getStore() {
    const next = {
        ...(await getCacheOptions("store")),
    }

    return await sdk.client
        .fetch<any>(`/store/store`, {
            method: "GET",
            next,
            cache: "no-store",
        })
        .then(({ store }) => store as any)
        .catch(() => null)
}
