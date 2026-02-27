import {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { PAGES_MODULE } from "../../../../modules/pages"
import PagesModuleService from "../../../../modules/pages/service"

export async function GET(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const pagesModuleService: PagesModuleService = req.scope.resolve(
        PAGES_MODULE
    )

    const { handle } = req.params;

    const pages = await pagesModuleService.listStorefrontPages({
        handle,
    })

    if (!pages.length) {
        return res.status(404).json({ message: "Page not found" });
    }

    res.json({
        page: pages[0],
    })
}

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
) {
    const pagesModuleService: PagesModuleService = req.scope.resolve(
        PAGES_MODULE
    )

    const { handle } = req.params;
    const { title, content } = req.body as any;

    const pages = await pagesModuleService.listStorefrontPages({ handle })

    if (!pages.length) {
        return res.status(404).json({ message: "Page not found" });
    }

    const page = await pagesModuleService.updateStorefrontPages({
        id: pages[0].id,
        title,
        content,
    })

    res.json({
        page,
    })
}
