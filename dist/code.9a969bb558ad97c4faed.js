var global=this;function insertText(){}function getLanguageById(){}function getLanguages(){}function openModal(){}function onOpen(){}(()=>{"use strict";var e={809:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.insertText=void 0,t.insertText=function(e){const t=DocumentApp.getActiveDocument().getCursor();return t&&t.insertText(e+"\n"),e},global.insertText=t.insertText},249:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getLanguageById=t.getLanguages=void 0,t.getLanguages=function(){const e=DriveApp.getFolderById("171bcVmgOa8xBoC7aoHIy9_d_IxIPao9M").getFiles(),t=[];for(;e.hasNext();){const n=e.next();t.push({id:n.getId(),name:n.getName()}),console.log(n.getName())}return t},t.getLanguageById=function({id:e}){const t=DriveApp.getFileById(e).getBlob().getDataAsString(),n=JSON.parse(t);return console.log("got language",n),n},global.getLanguageById=t.getLanguageById,global.getLanguages=t.getLanguages},910:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.openModal=t.onOpen=void 0,t.onOpen=function(){DocumentApp.getUi().createMenu("First Nations").addItem("Open Modal","openModal").addToUi()},t.openModal=function(){const e=HtmlService.createHtmlOutputFromFile("modal");DocumentApp.getUi().showModalDialog(e,"First Nations Keyboard")},global.openModal=t.openModal,global.onOpen=t.onOpen}},t={};function n(o){var a=t[o];if(void 0!==a)return a.exports;var g=t[o]={exports:{}};return e[o](g,g.exports,n),g.exports}n(910),n(809),n(249)})();