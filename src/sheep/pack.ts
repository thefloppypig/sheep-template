import { saveAs } from 'file-saver';

function dataURItoBase64(dataUrl: string) {
    return dataUrl.replace(/^data:image\/(png|jpg);base64,/, "")
}

export function downloadFile(filename: string, blob: Blob) {
    saveAs(blob, filename)
}