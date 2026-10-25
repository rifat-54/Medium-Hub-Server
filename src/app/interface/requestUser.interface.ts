
export interface IRequestUser {
    id: string;
    role: string;
    name: string;
    email: string;
    image: string | null;
    emailVerified: boolean | null;
}