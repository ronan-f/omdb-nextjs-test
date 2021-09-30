export default function isMobile() {
    if (typeof window !== "undefined") {
        return window.matchMedia("only screen and (max-width: 760px)").matches
    }
    return false
}
