export const AUTH_MESSAGES = {
    ERRORS: {
        NIK_LENGTH: 'NIK must be 16 characters',
        NIK_REGISTERED: 'NIK already registered',
        INVALID_CREDENTIAL: 'credential not match',
        SERVER_ERROR: 'Internal server error',
        UNAUTHORIZED: 'Unauthorized'
    },
    SUCCESS: {
        REGISTERED: 'User Registered',
        LOGIN: 'Login success',
        PRIVATE_CLAIMS: 'Private Claims'
    },
} as const;