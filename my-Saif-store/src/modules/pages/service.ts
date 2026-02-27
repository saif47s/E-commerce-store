import { MedusaService } from "@medusajs/framework/utils"
import { StorefrontPage } from "./models/storefront-page"

class PagesModuleService extends MedusaService({
    StorefrontPage,
}) { }

export default PagesModuleService
