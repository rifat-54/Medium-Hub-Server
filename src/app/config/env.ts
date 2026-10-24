import "dotenv/config";

interface EnvConfig {
    FRONTEND_URL: string;
    BETTER_AUTH_URL: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_EXPIRE_IN: string;
    REFRESH_TOKEN_EXPIRE_IN: string;
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables = [
        'FRONTEND_URL',
        'BETTER_AUTH_URL',
        'ACCESS_TOKEN_SECRET',
        'REFRESH_TOKEN_SECRET',
        'ACCESS_TOKEN_EXPIRE_IN',
        'REFRESH_TOKEN_EXPIRE_IN'
    ];

    requiredEnvVariables.forEach((variable) => {
        if (!process.env[variable]) {
            throw new Error(`Missing required environment variable: ${variable}`);
        }
    });

    return {
        FRONTEND_URL: process.env.FRONTEND_URL!,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL!,
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
        ACCESS_TOKEN_EXPIRE_IN: process.env.ACCESS_TOKEN_EXPIRE_IN!,
        REFRESH_TOKEN_EXPIRE_IN: process.env.REFRESH_TOKEN_EXPIRE_IN!
    };
}

export const envVariables = loadEnvVariables();