type Status = 'Success' | 'Failed';

const Auth = {
    storeAuthToken: (authToken: string): void => {
        localStorage.setItem('authToken', authToken);
    },
    getAuthToken: (): string | null => {
        return localStorage.getItem('authToken');
    },
    clearAuthToken: (): void => {
        localStorage.removeItem('authToken');
    },
};

const LocalStorage = {
    getItem<T>(key: string): T | null {
        const storageItem = localStorage.getItem(key);

        if (!storageItem) return null;

        return JSON.parse(storageItem);
    },
    setItem: (key: string, item: any | null): Status => {
        if (!item) return 'Failed';
        const parse = JSON.stringify(item);

        localStorage.setItem(key, parse);
        return 'Success';
    },
    removeItem: (key: string): void => {
        localStorage.removeItem(key);
    },
};

export default {
    Auth,
    LocalStorage,
};
