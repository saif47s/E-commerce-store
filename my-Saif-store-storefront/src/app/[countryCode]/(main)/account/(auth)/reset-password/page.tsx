import ResetPassword from "@modules/account/components/reset-password"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
    title: "Reset Password",
    description: "Reset your account password.",
}

type Props = {
    searchParams: Promise<{
        token?: string
        email?: string
    }>
}

export default async function ResetPasswordPage(props: Props) {
    const searchParams = await props.searchParams
    const { token, email } = searchParams

    if (!token || !email) {
        return notFound()
    }

    return (
        <div className="w-full flex justify-center px-8 py-8">
            <ResetPassword token={token} email={email} />
        </div>
    )
}
