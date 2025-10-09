import logo from '@/assets/logo1.svg?url';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <img
                    src={logo}
                    alt=" Ptolemaic"
                    className="h-8 w-8 rounded-md"
                />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                    Ptolemaic
                </span>
            </div>
        </>
    );
}
