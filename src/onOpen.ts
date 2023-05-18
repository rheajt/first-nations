export function onOpen() {
    DocumentApp.getUi()
        .createMenu("First Nations")
        .addItem("Open Modal", "openModal")
        .addToUi();
}

export function openModal() {
    const html = HtmlService.createHtmlOutputFromFile("modal");
    DocumentApp.getUi().showModalDialog(html, "First Nations");
}
