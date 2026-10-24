import "dotenv/config";

interface EnvConfig {
  FRONTEND_URL: string;
  BETTER_AUTH_URL: string;
}

const loadEnvVariables=(): EnvConfig => {
    const requiredEnvVariables = [
        'FRONTEND_URL',
        'BETTER_AUTH_URL'
    ];

    requiredEnvVariables.forEach((variable) => {
        if(!process.env[variable]) {
            throw new Error(`Missing required environment variable: ${variable}`);
        }
    });

    return {
        FRONTEND_URL: process.env.FRONTEND_URL!,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL!
    };
}

export const envVariables = loadEnvVariables();