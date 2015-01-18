var decryptedFile,
    ciphertext,
    plaintext;

function decryptFile(key) {
    return Aes.Ctr.decrypt(ciphertext, key, 256);
}

function prepareFile() {
    var bytes = new Uint8Array(plaintext.length);
    for (var i = 0; i < plaintext.length; i++)
        bytes[i] = plaintext.charCodeAt(i);
    var decrypted = new Blob([bytes]);
    return decrypted;
}

function convertToKey(qrkey) {
    var key = "";
    var l = 0;
    for (i = 0; i < qrkey.length/3; i++) {
        tmp = '';
        tmp += qrkey[l++];
        tmp += qrkey[l++];
        tmp += qrkey[l++];
        code = parseInt(tmp);
        key += String.fromCharCode(code);
    }
    return key;
}

