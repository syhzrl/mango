export interface IQr {
    id: string;
    name: string;
    qrType: number;
    status: number;
    createdAt: string;
    numberOfScans: string;
}

export interface IUniqueCode {
    code: string;
    isUsed?: boolean;
}

export interface UploadUniqueCode {
    UniqueCode: string;
}

export interface ICreateQR {
    qrId: string;
    name: string;
    qrType: number;
    uniqueCodes?: Array<string>;
    status: number;
}

export interface IQrDetails {
    id: string;
    name: string;
    createdAt: string;
    numberOfScans: string;
    status: number; // 0 is active, 1 is inactive
    qrType: number; // 0 is answer once, 1 is can answer multiple times,
    hasUniqueCodes: boolean;
}

export interface IUpdateQr {
    qrId: string;
    name: string;
    qrType: number;
    status: number;
    uniqueCodes?: Array<string>;
}
