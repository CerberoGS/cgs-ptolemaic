import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import AppLogo from '@/components/app-logo';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
            <Head title="Forgot Password" />

            <Card className="w-full max-w-md bg-slate-800/50 text-white border-slate-700">
                <CardHeader className="text-center">
                    <div className="mb-4 flex justify-center">
                        <AppLogo className="h-12 w-12" />
                    </div>
                    <CardTitle className="text-2xl">Forgot your password?</CardTitle>
                    <CardDescription className="text-slate-400">
                        No problem. Just enter your email address and we will send you a
                        password reset link.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {status && (
                        <div className="mb-4 text-center text-sm font-medium text-green-400">
                            {status}
                        </div>
                    )}

                    <Form
                        {...PasswordResetLinkController.store.form()}
                        className="flex flex-col gap-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        className="bg-slate-900/50 border-slate-700 focus:ring-blue-500"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Email Password Reset Link
                                </Button>
                            </>
                        )}
                    </Form>
                    <div className="mt-4 text-center text-sm text-slate-400">
                        Remembered your password?{' '}
                        <TextLink href={login()} tabIndex={6} className="text-blue-400 hover:text-blue-300">
                            Back to log in
                        </TextLink>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
