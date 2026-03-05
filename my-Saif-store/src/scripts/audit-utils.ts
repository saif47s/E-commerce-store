import { ExecArgs } from "@medusajs/framework/types"
import * as utils from "@medusajs/framework/utils"

export default async function ({ container }: ExecArgs) {
    const keys = Object.keys(utils)
    const scryptKey = keys.find(k => k.toLowerCase() === "scrypt")

    if (scryptKey) {
        console.log(`FOUND_SCRYPT: ${scryptKey}`)
        console.log(`TYPE: ${typeof (utils as any)[scryptKey]}`)
    } else {
        console.log("NOT_FOUND_SCRYPT")
        console.log("ALL_KEYS:", keys.sort().join(", "))
    }
}
