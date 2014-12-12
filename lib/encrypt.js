var encryptedFile;

function preparePlaintext(file) {
    var bytes = new Uint8Array(file);
    var plaintext = '';
    for (var i = 0; i < bytes.length; i++)
        plaintext += String.fromCharCode(bytes[i]);
    return plaintext;
}

function encryptFile(plaintext, key) {
    return Aes.Ctr.encrypt(plaintext, key, 256);
}

function prepareFile(ciphertext, mimetype) {
    return new Blob([ciphertext], {type: mimetype});
}
