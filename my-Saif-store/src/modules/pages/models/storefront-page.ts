import { model } from "@medusajs/framework/utils"

export const StorefrontPage = model.define("storefront_page", {
    id: model.id().primaryKey(),
    handle: model.text().unique(),
    title: model.text(),
    content: model.text().nullable(),
})
