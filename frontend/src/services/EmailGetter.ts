export default function getEmail(): string {
    return JSON.parse(localStorage.getItem('user') as string).email
}