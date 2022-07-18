const envVariables: { [key: string]: string | boolean | undefined } = import.meta.env;
const envData: { [key: string]: string | boolean | undefined } = {
    "API_URL": envVariables.VITE_API_URL as string
}

export function env(key: string): string | boolean | undefined { 
    return envData[key] || undefined;
}
