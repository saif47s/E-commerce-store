import { ExecArgs } from "@medusajs/framework/types"
// import { Modules, Scrypt } from "@medusajs/framework/utils"

export default async function ({ container }: ExecArgs) {
    console.log("Script disabled to avoid build errors. Use update-admin-pass.ts instead.")
    /*
    const authModuleService = container.resolve(Modules.AUTH)
    const scrypt = new Scrypt()

    const email = "labpc4472@gmail.com"
    const password = "admin123"

    console.log(`Generating hash for ${password}...`)
    const hashedPassword = await scrypt.hash(password)
    console.log(`Generated hash: ${hashedPassword}`)

    const [providerIdentity] = await authModuleService.listProviderIdentities({
        entity_id: email,
        provider: "emailpass"
    })

    if (!providerIdentity) {
        console.log("No provider identity found for:", email)
        return
    }

    console.log(`Updating provider identity ${providerIdentity.id} with new hash...`)

    await authModuleService.updateProviderIdentities({
        id: providerIdentity.id,
        provider_metadata: {
            password: hashedPassword
        }
    })

    console.log("SUCCESS: Password hash updated directly in provider_metadata.")
    */
}
