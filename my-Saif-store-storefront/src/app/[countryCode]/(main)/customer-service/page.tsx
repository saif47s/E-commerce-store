import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Customer Service",
  description: "Customer Service instructions.",
}

async function getPageContent() {
  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
  try {
    const res = await fetch(`${backendUrl}/store/storefront-pages/customer-service`, {
      next: { revalidate: 60 } // Revalidate every minute
    })
    if (!res.ok) return null
    const json = await res.json()
    return json.page
  } catch (e) {
    return null
  }
}

export default async function CustomerServicePage() {
  const page = await getPageContent()

  // Fallback to defaults if page not yet created in the admin
  const title = page?.title || "Customer Service"
  const content = page?.content || `
      <div class="flex flex-col gap-y-8">
        <section>
          <h2 class="text-xl-semi mb-4">Frequently Asked Questions</h2>
          <div class="flex flex-col gap-y-4">
            <div class="border border-gray-200 p-6 rounded-md">
              <h3 class="font-semibold mb-2">How can I track my order?</h3>
              <p class="text-ui-fg-base">
                Once your order has shipped, you will receive an email with a tracking link. You can also view your order status in your account dashboard.
              </p>
            </div>
            <div class="border border-gray-200 p-6 rounded-md">
              <h3 class="font-semibold mb-2">What is your return policy?</h3>
              <p class="text-ui-fg-base">
                We accept returns within 30 days of purchase. Items must be in their original condition and packaging.
              </p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 class="text-xl-semi mb-4">Contact Us</h2>
          <p class="text-ui-fg-base mb-4">
            If you need further assistance, reach out to our customer support team, please scroll down to the Contact section below. ⬇️
          </p>
          <ul class="list-disc pl-6 text-ui-fg-base">
        
            <li>Hours: Monday - Friday, 9am - 5pm PKT</li>
          </ul>
        </section>
      </div>
  `

  return (
    <div className="py-12 small:py-24 max-w-5xl mx-auto px-4 sm:px-8">
      <h1 className="text-3xl-semi mb-8">{title}</h1>

      {/* We are dangerously setting inner HTML to allow paragraph spacing and basic tags */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}
