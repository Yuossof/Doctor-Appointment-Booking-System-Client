import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
const im = "https://github.com/shadcn.png"
export function AvatarCmp({
    imgSrc = im,
    w = 11,
    h = 11
    }: { imgSrc?: string, w?: number, h?: number }) {
    return (
        <Avatar className={`w-${w} h-${h}`}>
            <AvatarImage src={imgSrc} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}