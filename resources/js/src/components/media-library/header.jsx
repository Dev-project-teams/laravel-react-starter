import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Link } from "react-router-dom"

export const Header = () => {
    return (
        <header className="w-full border-b px-6 py-3 flex items-center  bg-background shadow-sm">
            <div className="text-xl font-semibold">MyApp</div>

            <nav className="hidden md:flex gap-4 ms-auto me-5 items-center">
                <Link to={'/media-library/home'}>
                    <Button variant="ghost" >Home</Button>
                </Link>
                <Button variant="ghost">Gallery</Button>
                <Button variant="ghost">Upload</Button>
            </nav>

            <div className="flex items-center gap-3">

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
