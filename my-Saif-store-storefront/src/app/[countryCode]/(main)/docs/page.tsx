import { Metadata } from "next"
import { Text, Heading } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Store Documentation",
  description: "What you can do on this store – shopping, account, checkout, and more.",
}

export default function StoreDocsPage() {
  return (
    <div className="content-container py-12 px-4">
      <Heading level="h1" className="mb-8">
        Store Documentation
      </Heading>
      <div className="prose prose-ui max-w-none space-y-6 text-ui-fg-subtle">
        <section>
          <Heading level="h2" className="text-ui-fg-base mb-2">
            Is store par kya kya kar sakte hain
          </Heading>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Products dekhen</strong> – Store aur categories se products browse karein, filters aur sort use karein.</li>
            <li><strong>Cart use karein</strong> – Products add karein, quantity change karein, cart se remove karein.</li>
            <li><strong>Checkout karein</strong> – Shipping address, shipping option, aur payment select karke order complete karein.</li>
            <li><strong>Account banaen</strong> – Login / signup karein, profile update karein, addresses manage karein.</li>
            <li><strong>Orders dekhen</strong> – Apne orders ki list aur order details dekh sakte hain.</li>
            <li><strong>Collections & categories</strong> – Collections aur product categories se easily products tak pahunchen.</li>
            <li><strong>Region / currency</strong> – Country select karein, prices apne region ke hisaab se dikhenge.</li>
          </ul>
        </section>
        <section>
          <Heading level="h2" className="text-ui-fg-base mb-2">
            Quick links
          </Heading>
          <ul className="list-disc pl-6 space-y-1">
            <li>Store (sari products) – home ya Store link se.</li>
            <li>Cart – top nav mein cart icon se.</li>
            <li>Account – login ke baad account area se profile, orders, addresses.</li>
          </ul>
        </section>
        <Text className="txt-small text-ui-fg-muted">
          Koi sawal ho to store support se contact karein.
        </Text>
      </div>
    </div>
  )
}
