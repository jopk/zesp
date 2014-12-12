var decryptedFile;

function decryptFile(ciphertext, key) {
    var plaintext = Aes.Ctr.decrypt(ciphertext, key, 256);
    return plaintext;
}

function prepareFile(plaintext, mimetype) {
    var bytes = new Uint8Array(plaintext.length);
    for (var i = 0; i < plaintext.length; i++)
        bytes[i] = plaintext.charCodeAt(i);
    var decrypted = new Blob([bytes], {type: mimetype});
    return decrypted;
}
