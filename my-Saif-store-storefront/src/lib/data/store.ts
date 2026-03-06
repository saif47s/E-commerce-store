"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

import { Client } from "pg"

export async function getStore() {
    const next = {
        ...(await getCacheOptions("store")),
    }

    // Try API first (backend may not expose /store/store in all versions)
    try {
        const response = await sdk.client.fetch<any>(`/store/store`, {
            method: "GET",
            next,
            cache: "no-store",
        })
        if (response && response.store) {
            return response.store
        }
    } catch (err: any) {
        const msg = err?.message ?? String(err)
        if (msg !== "Not Found" && !msg.includes("404")) {
            console.error("API fetch failed for /store/store:", msg)
        }
    }

    // Fallback: Direct Database Query
    let client;
    try {
        if (!process.env.DATABASE_URL) {
            console.warn("DATABASE_URL not defined in storefront environment. Fallback to API data only.")
            return { name: "Store" }
        }

        client = new Client({
            connectionString: process.env.DATABASE_URL,
        })
        await client.connect()
        const res = await client.query('SELECT name, metadata FROM "store" LIMIT 1')

        if (res.rows.length > 0) {
            console.log("Fetched store name and metadata from DB")
            return {
                name: res.rows[0].name,
                metadata: res.rows[0].metadata
            }
        }
    } catch (dbErr: any) {
        console.error("Database fallback failed in getStore:", dbErr.message || dbErr)
    } finally {
        if (client) {
            try { await client.end() } catch { }
        }
    }

    return { name: "Store" }
}
