var encryptedFile,
    plaintext,
    key,
    ciphertext;

function preparePlaintext() {
    var bytes = new Uint8Array(reader.result);
    var plaintext = '';
    for (var i = 0; i < bytes.length; i++)
        plaintext += String.fromCharCode(bytes[i]);
    return plaintext;
}

function encryptFile(key) {
    return Aes.Ctr.encrypt(plaintext, key, 256);
}

function prepareFile(mimetype) {
    return new Blob([ciphertext], {type: mimetype});
}
