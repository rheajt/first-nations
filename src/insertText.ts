/**
 * insert text into document
 */
export function insertText(text: string) {
    const cursor = DocumentApp.getActiveDocument().getCursor();
    if (cursor) {
        cursor.insertText(text + "\n");
    }

    return text;
}
