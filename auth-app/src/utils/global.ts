interface GenerateOption {
    length: number;
    numbers: boolean;
    letters: boolean;
    symbols: boolean;
}

export const generatePassword = (options: GenerateOption): string => {
    const numbers = '0123456789';
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const symbols = '!@#$%^&*()_+';

    let chars = '';
    let password = '';

    if (options.numbers) chars += numbers;
    if (options.letters) chars += letters;
    if (options.symbols) chars += symbols;

    for (let i = 0; i < options.length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
}