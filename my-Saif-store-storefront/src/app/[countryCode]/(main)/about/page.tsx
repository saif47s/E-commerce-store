import { getStore } from "@lib/data/store"

export const metadata = {
    title: "About Us",
    description: "Learn more about our store.",
}

export default async function AboutUsPage() {
    const store = await getStore()
    const content = store?.metadata?.about_us as string || "Welcome to our store! We are dedicated to providing the best products and customer service."

    return (
        <div className="py-12 content-container text-center">
            <h1 className="text-4xl font-semibold mb-4 text-ui-fg-base">About Us</h1>
            <p className="text-ui-fg-subtle text-lg max-w-2xl mx-auto whitespace-pre-wrap">
                {content}
            </p>
        </div>
    )
}
