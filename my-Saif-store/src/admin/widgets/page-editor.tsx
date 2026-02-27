import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text, Input, Button, Textarea } from "@medusajs/ui"
import { useState, useEffect } from "react"
import { sdk } from "../../../../admin/lib/sdk"

const PageEditorWidget = () => {
    const [page, setPage] = useState<any>(null)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    const handle = "customer-service" // We're hardcoding for this specific page first

    useEffect(() => {
        sdk.client.fetch(`/admin/storefront-pages/${handle}`, {
            method: "GET"
        }).then((res: any) => {
            if (res.page) {
                setPage(res.page)
                setTitle(res.page.title)
                setContent(res.page.content)
            }
        }).catch(() => {
            // Not found, will be created on save
        })
    }, [])

    const handleSave = async () => {
        setLoading(true)
        try {
            if (page) {
                await sdk.client.fetch(`/admin/storefront-pages/${handle}`, {
                    method: "POST",
                    body: { title, content }
                })
            } else {
                await sdk.client.fetch(`/admin/storefront-pages`, {
                    method: "POST",
                    body: { handle, title, content }
                })
            }
            alert("Page saved successfully!")

            // Refetch to get the ID if newly created
            const res: any = await sdk.client.fetch(`/admin/storefront-pages/${handle}`, { method: "GET" })
            setPage(res.page)
        } catch (e) {
            console.error(e)
            alert("Failed to save page")
        }
        setLoading(false)
    }

    return (
        <Container className="p-8 flex flex-col gap-y-4">
            <Heading level="h2">Edit Customer Service Page</Heading>
            <Text className="text-ui-fg-subtle mb-4">
                Update the content of your public customer service page.
            </Text>

            <div className="flex flex-col gap-y-2">
                <Text size="small" weight="plus">Page Title</Text>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Customer Service FAQs"
                />
            </div>

            <div className="flex flex-col gap-y-2">
                <Text size="small" weight="plus">Page Content (HTML supported)</Text>
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your FAQs here..."
                    rows={10}
                />
            </div>

            <div className="flex justify-end mt-4">
                <Button
                    variant="primary"
                    onClick={handleSave}
                    isLoading={loading}
                >
                    Save Changes
                </Button>
            </div>
        </Container>
    )
}

// Ensure sdk is configured (you might need to create admin/lib/sdk.ts first)
export const config = defineWidgetConfig({
    zone: "product.details.after",
})

export default PageEditorWidget
