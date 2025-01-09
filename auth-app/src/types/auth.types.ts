export interface authResponse {
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