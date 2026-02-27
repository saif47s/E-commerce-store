import { finalizePasswordReset } from "@lib/data/customer"
import ErrorMessage from "../../../checkout/components/error-message"
import { SubmitButton } from "../../../checkout/components/submit-button"
import Input from "../../../common/components/input"
import React, { useActionState, useState } from "react"
import LocalizedClientLink from "../../../common/components/localized-client-link"

type Props = {
    token: string
    email: string
}

const ResetPassword = ({ token, email }: Props) => {
    const [state, formAction] = useActionState(finalizePasswordReset, null)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        // Hidden fields for token and email are handled by the form
        await formAction(formData)
        setIsSubmitted(true)
    }

    return (
        <div
            className="max-w-sm w-full flex flex-col items-center"
            data-testid="reset-password-page"
        >
            <h1 className="text-large-semi uppercase mb-6">Reset Password</h1>
            {isSubmitted && state?.success ? (
                <div className="text-center">
                    <p className="text-base-regular text-ui-fg-base mb-8">
                        Your password has been successfully reset.
                    </p>
                    <LocalizedClientLink
                        href="/account"
                        className="underline"
                    >
                        Go to login
                    </LocalizedClientLink>
                </div>
            ) : (
                <>
                    <p className="text-center text-base-regular text-ui-fg-base mb-8">
                        Please enter your new password below.
                    </p>
                    <form className="w-full" action={handleSubmit}>
                        <input type="hidden" name="token" value={token} />
                        <input type="hidden" name="email" value={email} />
                        <div className="flex flex-col w-full gap-y-2">
                            <Input
                                label="New Password"
                                name="password"
                                type="password"
                                required
                                data-testid="new-password-input"
                            />
                            <Input
                                label="Confirm Password"
                                name="confirm_password"
                                type="password"
                                required
                                data-testid="confirm-password-input"
                            />
                        </div>
                        <ErrorMessage error={state?.error} data-testid="reset-password-error-message" />
                        <SubmitButton data-testid="reset-password-button" className="w-full mt-6">
                            Reset Password
                        </SubmitButton>
                    </form>
                </>
            )}
        </div>
    )
}

export default ResetPassword
