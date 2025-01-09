export interface AuthResponse {
    message: string;
    data?: {
        user: {
            nik: string;
            role: string;
        };
        token: string;
        type: 'Bearer';
    };
}

export interface TokenPayload {
    nik: string;
    role: string;
}