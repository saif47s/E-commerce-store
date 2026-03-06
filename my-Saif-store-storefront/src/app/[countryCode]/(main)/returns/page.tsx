import { getStore } from "@lib/data/store"

export const metadata = {
    title: "Return Policy",
    description: "Our return and refund policy.",
}

export default async function ReturnsPage() {
    const store = await getStore()
    const content = store?.metadata?.return_policy as string || "We offer a 30-day money-back guarantee on all our products. Terms and conditions apply."

    return (
        <div className="py-12 content-container text-center">
            <h1 className="text-4xl font-semibold mb-4 text-ui-fg-base">Return Policy</h1>
            <p className="text-ui-fg-subtle text-lg max-w-2xl mx-auto whitespace-pre-wrap">
                {content}
            </p>
        </div>
    )
}
