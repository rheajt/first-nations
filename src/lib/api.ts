import { GASClient } from "gas-client";
const { serverFunctions } = new GASClient();

export function api<T>(method: string, payload?: any): Promise<T> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await serverFunctions[method](payload);
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}
