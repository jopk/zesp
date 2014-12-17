var decryptedFile,
    ciphertext,
    plaintext;

function decryptFile(key) {
    return Aes.Ctr.decrypt(ciphertext, key, 256);
}

function prepareFile(mimetype) {
    var bytes = new Uint8Array(plaintext.length);
    for (var i = 0; i < plaintext.length; i++)
        bytes[i] = plaintext.charCodeAt(i);
    var decrypted = new Blob([bytes], {type: mimetype});
    return decrypted;
}
