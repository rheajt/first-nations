import { folderId } from "./lib/folderId";

export interface Language {
    id: string;
    name: string;
}

export function getLanguages(): Language[] {
    const files = DriveApp.getFolderById(folderId).getFiles();
    const languages = [];

    while (files.hasNext()) {
        const file = files.next();
        languages.push({
            id: file.getId(),
            name: file.getName(),
        });
    }

    return languages;
}

export function getLanguageById({ id }: { id: string }) {
    const file = DriveApp.getFileById(id);
    const blob = file.getBlob();
    const text = blob.getDataAsString();
    return JSON.parse(text);
}
