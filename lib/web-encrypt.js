var encryptedFile,
    plaintext,
    hashc,
    enckey,
    qrkey,
    qrstring,
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

function prepareFile() {
    return new Blob([ciphertext]);
}

function encryption() {
    plaintext = preparePlaintext(); //reader.result
    var tmp = secureRandom(16, {type: 'Uint8Array'});
    qrkey = '';
    for (i = 0; i < tmp.length; i++) { 
        if (tmp[i] < 100) {
            qrkey += 0; 
            if (tmp[i] < 10)
                qrkey += 0;
        }
        qrkey += tmp[i];
    }
    enckey = '';
    for (i = 0; i < tmp.length; i++) 
        enckey += String.fromCharCode(tmp[i]);
    ciphertext = encryptFile(enckey); //plaintext
//    plaintext = null;
    hashc = Sha256.hash(ciphertext);
    encryptedFile = new Blob([ciphertext]);
//    ciphertext = null;
    qrstring = "http://S/" + hashc + qrkey + encodeURI(uploadedFile.name);
}

