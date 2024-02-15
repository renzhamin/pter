import { Link, useLocation } from "react-router-dom"
import { useSessionContext } from "supertokens-auth-react/recipe/session"
import { signOut } from "supertokens-web-js/recipe/session"
import { ThemeToggle } from "./theme-toggle"
import { Button, buttonVariants } from "./ui/button"

export const NavBar = () => {
    const session = useSessionContext()
    const isSignedIn = !session.loading && session.doesSessionExist

    return (
        <div className="w-full h-16 bg-accent flex items-center gap-4 p-4">
            <Link to="/">IUT</Link>
            <div className="ml-auto flex-center gap-4">
                <ThemeToggle />
                <AuthButton isSignedIn={isSignedIn} />
            </div>
        </div>
    )
}
const AuthButton = ({ isSignedIn }: { isSignedIn: boolean }) => {
    const location = useLocation()
    if (location.pathname === "/auth") return null

    if (isSignedIn) {
        return (
            <Button
                onClick={async () => {
                    await signOut()
                }}
            >
                Logout
            </Button>
        )
    }

    return (
        <Link to="/auth" className={buttonVariants()}>
            Login
        </Link>
    )
}
