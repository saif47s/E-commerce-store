import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function ({ container }: ExecArgs) {
    const authModuleService = container.resolve(Modules.AUTH)

    const email = "labpc4472@gmail.com"
    const password = "admin123"

    console.log(`Searching for provider identity with entity_id: ${email}`)

    const [providerIdentity] = await authModuleService.listProviderIdentities({
        entity_id: email,
        provider: "emailpass"
    })

    if (!providerIdentity) {
        console.log("No provider identity found for:", email)
        return
    }

    console.log(`Updating provider identity: ${providerIdentity.id}`)

    // Update the provider identity with the new plaintext password
    // Medusa's emailpass provider should handle the hashing
    await authModuleService.updateProviderIdentities({
        id: providerIdentity.id,
        user_metadata: {
            ...(providerIdentity.user_metadata as object || {}),
            password // Some implementations put it here
        }
    })

    // We also try to set a top-level password if the schema supports it via internal methods
    // But let's check if the service update accepts 'password' directly
    try {
        await (authModuleService as any).updateProviderIdentities({
            id: providerIdentity.id,
            password: password
        })
        console.log("Updated via top-level password property.")
    } catch (e) {
        console.log("Top-level password property not supported by service call directly.")
    }

    console.log("Update sequence completed.")
}
