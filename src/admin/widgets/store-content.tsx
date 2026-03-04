import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text, Button, Input, Textarea, toast } from "@medusajs/ui"
import { useState, useEffect } from "react"

export const config = defineWidgetConfig({
    zone: "store.details.after",
})

export default function StoreContentWidget() {
    const [storeId, setStoreId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [formData, setFormData] = useState({
        about_us: "",
        contact_us: "",
        return_policy: "",
        github: "",
        facebook: "",
        instagram: "",
        twitter: "",
        tiktok: ""
    })

    useEffect(() => {
        fetch("/admin/stores", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                if (data.stores && data.stores.length > 0) {
                    const store = data.stores[0]
                    setStoreId(store.id)

                    if (store.metadata) {
                        setFormData({
                            about_us: store.metadata.about_us || "",
                            contact_us: store.metadata.contact_us || "",
                            return_policy: store.metadata.return_policy || "",
                            github: store.metadata.github || "",
                            facebook: store.metadata.facebook || "",
                            instagram: store.metadata.instagram || "",
                            twitter: store.metadata.twitter || "",
                            tiktok: store.metadata.tiktok || ""
                        })
                    }
                }
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching store:", err)
                toast.error("Failed to load store data.")
                setLoading(false)
            })
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = async () => {
        if (!storeId) return
        setSaving(true)

        try {
            const res = await fetch(`/admin/stores/${storeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({
                    metadata: formData
                })
            })

            if (res.ok) {
                toast.success("Store content updated successfully!")
            } else {
                const err = await res.json()
                toast.error(err.message || "Failed to save content.")
            }
        } catch (err) {
            toast.error("An unexpected error occurred.")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <Container className="p-8 mt-4">
                <Text>Loading Store Content details...</Text>
            </Container>
        )
    }

    return (
        <Container className="p-8 flex flex-col gap-y-8 mt-4">
            <div>
                <Heading level="h1" className="mb-2">Website Content & Socials</Heading>
                <Text className="text-ui-fg-subtle">
                    Manage the text content for your informational pages (About, Contact, Return Policy) and setup links for your Footer social media icons.
                </Text>
            </div>

            <div className="flex flex-col gap-y-4">
                <Heading level="h2" className="text-xl">Pages Content</Heading>

                <div className="flex flex-col gap-y-2">
                    <Text size="small" weight="plus">About Us Page</Text>
                    <Textarea
                        name="about_us"
                        placeholder="Write your about us description..."
                        rows={5}
                        value={formData.about_us}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <Text size="small" weight="plus">Contact Page</Text>
                    <Textarea
                        name="contact_us"
                        placeholder="Write contact instructions, email, phone..."
                        rows={5}
                        value={formData.contact_us}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-y-2">
                    <Text size="small" weight="plus">Return Policy Page</Text>
                    <Textarea
                        name="return_policy"
                        placeholder="Outline your return policy here..."
                        rows={5}
                        value={formData.return_policy}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-y-4 mt-4">
                <Heading level="h2" className="text-xl">Footer Social Links</Heading>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-y-2">
                        <Text size="small" weight="plus">GitHub URL</Text>
                        <Input
                            name="github"
                            placeholder="https://github.com/..."
                            value={formData.github}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Text size="small" weight="plus">Facebook URL</Text>
                        <Input
                            name="facebook"
                            placeholder="https://facebook.com/..."
                            value={formData.facebook}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Text size="small" weight="plus">Instagram URL</Text>
                        <Input
                            name="instagram"
                            placeholder="https://instagram.com/..."
                            value={formData.instagram}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Text size="small" weight="plus">Twitter / X URL</Text>
                        <Input
                            name="twitter"
                            placeholder="https://twitter.com/..."
                            value={formData.twitter}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Text size="small" weight="plus">TikTok URL</Text>
                        <Input
                            name="tiktok"
                            placeholder="https://tiktok.com/@..."
                            value={formData.tiktok}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <Button variant="primary" onClick={handleSave} isLoading={saving}>
                    Save Content
                </Button>
            </div>
        </Container>
    )
}
