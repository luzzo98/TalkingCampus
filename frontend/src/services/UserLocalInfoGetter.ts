export default function getUser(): any {
    return JSON.parse(localStorage.getItem('user') as string)
}
