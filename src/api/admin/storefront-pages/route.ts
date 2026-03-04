import {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { PAGES_MODULE } from "../../../modules/pages"
import PagesModuleService from "../../../modules/pages/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const pagesModuleService: PagesModuleService = req.scope.resolve(
        PAGES_MODULE
    )

    const pages = await pagesModuleService.listStorefrontPages()

    res.json({
        pages,
    })
}

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const pagesModuleService: PagesModuleService = req.scope.resolve(
        PAGES_MODULE
    )

    const page = await pagesModuleService.createStorefrontPages(req.body as any)

    res.json({
        page,
    })
}
