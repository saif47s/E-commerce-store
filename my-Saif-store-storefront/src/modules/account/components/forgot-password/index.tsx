import { resetPasswordToken } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import React, { useActionState, useState } from "react"

type Props = {
    setCurrentView: (view: LOGIN_VIEW) => void
}

const ForgotPassword = ({ setCurrentView }: Props) => {
    const [state, formAction] = useActionState(resetPasswordToken, null)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        await formAction(formData)
        setIsSubmitted(true)
    }

    return (
        <div
            className="max-w-sm w-full flex flex-col items-center"
            data-testid="forgot-password-page"
        >
            <h1 className="text-large-semi uppercase mb-6">Forgot Password</h1>
            {isSubmitted && state?.success ? (
                <div className="text-center">
                    <p className="text-base-regular text-ui-fg-base mb-8">
                        If an account exists with this email, you will receive a reset link shortly.
                    </p>
                    <button
                        onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
                        className="underline"
                    >
                        Back to sign in
                    </button>
                </div>
            ) : (
                <>
                    <p className="text-center text-base-regular text-ui-fg-base mb-8">
                        Enter your email address and we&apos;ll send you a link to reset your password.
                    </p>
                    <form className="w-full" action={handleSubmit}>
                        <div className="flex flex-col w-full gap-y-2">
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                title="Enter a valid email address."
                                autoComplete="email"
                                required
                                data-testid="email-input"
                            />
                        </div>
                        <ErrorMessage error={state?.error} data-testid="forgot-password-error-message" />
                        <SubmitButton data-testid="reset-password-button" className="w-full mt-6">
                            Send reset link
                        </SubmitButton>
                    </form>
                    <span className="text-center text-ui-fg-base text-small-regular mt-6">
                        Remembered your password?{" "}
                        <button
                            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
                            className="underline"
                        >
                            Sign in
                        </button>
                        .
                    </span>
                </>
            )}
        </div>
    )
}

export default ForgotPassword
