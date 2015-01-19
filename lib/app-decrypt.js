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

var decryptedFile; //globalna?
function decryption(key) {
    var ciphertext = this.result;
    var plaintext = decryptFile(key)l
    if (file.type.search(new RegExp("text")) == 0)
        decryptedFile = new Blob([plaintext]);
    else
        decryptedFile = prepareFile();

    // decryptedFile <-- do zapisu


}
