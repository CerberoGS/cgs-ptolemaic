import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useLocale, useTrans } from '@/hooks/useTrans';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M20.94 11.0001C20.94 10.3301 20.88 9.68008 20.76 9.06008H12V12.8801H17.04C16.83 14.1201 16.02 15.1501 14.88 15.8101V18.3101H18.09C20.02 16.5601 20.94 13.9801 20.94 11.0001Z" />
        <path d="M12 21.0001C14.56 21.0001 16.74 20.1501 18.09 18.3101L14.88 15.8101C14.04 16.3601 13.08 16.6901 12 16.6901C9.93 16.6901 8.13 15.3401 7.44 13.5901H4.18V16.1801C5.54 18.9801 8.53 21.0001 12 21.0001Z" />
        <path d="M7.44 13.5901C7.22 12.9301 7.11 12.2501 7.11 11.5501C7.11 10.8501 7.22 10.1701 7.44 9.5101V6.9201H4.18C3.43 8.3801 3 9.9101 3 11.5501C3 13.1901 3.43 14.7201 4.18 16.1801L7.44 13.5901Z" />
        <path d="M12 6.41008C13.34 6.41008 14.44 6.86008 14.92 7.32008L18.16 4.27008C16.73 2.99008 14.56 2.10008 12 2.10008C8.53 2.10008 5.54 4.12008 4.18 6.92008L7.44 9.51008C8.13 7.76008 9.93 6.41008 12 6.41008Z" />
    </svg>
);

export default function Login({ status, canResetPassword }: LoginProps) {
    const currentLocale = useLocale();
    const t = useTrans();

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
            <Head title={t('Log in')} />

            <Card className="w-full max-w-md border-slate-700 bg-slate-800/50 text-white">
                <CardHeader className="text-center">
                    <div className="mb-4 flex justify-center">
                        <AppLogo className="h-12 w-12" />
                    </div>
                    <CardTitle className="text-2xl">
                        {t('Log in to your account')}
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        {t('Welcome back! Please enter your details.')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <Button
                            variant="outline"
                            className="w-full bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900"
                            asChild
                        >
                            <a href="/login-google">
                                <GoogleIcon className="mr-2 h-5 w-5" />
                                {t('Continue with Google')}
                            </a>
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-700" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-800/50 px-2 text-slate-400">
                                    {t('Or continue with')}
                                </span>
                            </div>
                        </div>

                        <Form
                            {...AuthenticatedSessionController.store.form()}
                            resetOnSuccess={['password']}
                            className="flex flex-col gap-4"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">
                                            {t('Email')}
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                            className="border-slate-700 bg-slate-900/50 focus:ring-blue-500"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">
                                                {t('Password')}
                                            </Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request({
                                                        locale: currentLocale,
                                                    })}
                                                    className="ml-auto text-sm text-blue-400 hover:text-blue-300"
                                                    tabIndex={5}
                                                >
                                                    {t('Forgot password?')}
                                                </TextLink>
                                            )}
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="********"
                                            className="border-slate-700 bg-slate-900/50 focus:ring-blue-500"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                            className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                                        />
                                        <Label htmlFor="remember">
                                            {t('Remember me')}
                                        </Label>
                                    </div>

                                    {status && (
                                        <div className="text-center text-sm font-medium text-green-400">
                                            {status}
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && (
                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        {t('Log In')}
                                    </Button>
                                </>
                            )}
                        </Form>

                        <div className="mt-4 text-center text-sm text-slate-400">
                            {t("Don't have an account?")}{' '}
                            <TextLink
                                href={register({ locale: currentLocale })}
                                tabIndex={5}
                                className="text-blue-400 hover:text-blue-300"
                            >
                                {t('Sign up')}
                            </TextLink>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
