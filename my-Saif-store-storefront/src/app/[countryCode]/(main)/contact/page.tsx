import { getStore } from "@lib/data/store"

export const metadata = {
    title: "Contact",
    description: "Get in touch with us.",
}

export default async function ContactPage() {
    const store = await getStore()
    const content = store?.metadata?.contact_us as string || "Have questions? We'd love to hear from you. Email us at support@store.com"

    return (
        <div className="py-12 content-container text-center">
            <h1 className="text-4xl font-semibold mb-4 text-ui-fg-base">Contact Us</h1>
            <p className="text-ui-fg-subtle text-lg max-w-2xl mx-auto whitespace-pre-wrap">
                {content}
            </p>
        </div>
    )
}
