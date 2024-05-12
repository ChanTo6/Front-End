export interface Register
{
    name: string;
    surname: string;
    email: string;
    id: string;
    password: string;
    PersonalID: string;
    VerificationCodeGeneratedTime: Date | null;
    verificationCode: null;
    registerByAdmin: boolean;
    photo ?: string;
    cv ?:string;
    bio? :string;
}