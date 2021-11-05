export default function authHeader(): any {
    const user = JSON.parse(localStorage.getItem('user') as string);

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}