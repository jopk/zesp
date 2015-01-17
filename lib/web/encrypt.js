var encryptedFile,
    plaintext,
    hash,
    enckey,
    qrstring,
    ciphertext;

/*
function preparePlaintext() {
    var bytes = new Uint8Array(reader.result);
    var plaintext = '';
    for (var i = 0; i < bytes.length; i++)
        plaintext += String.fromCharCode(bytes[i]);
    return plaintext;
}
*/

function encryptFile(key) {
    return Aes.Ctr.encrypt(plaintext, key, 256);
}

function prepareFile(mimetype) {
    return new Blob([ciphertext], {type: mimetype});
}
/*
    plaintext = preparePlaintext(); //reader.result
    var tmp = secureRandom(16, {type: 'Uint8Array'});
    enckey = ''
    for (var i = 0; i < tmp.length; i++)
        enckey += String.fromCharCode(tmp[i]);
    ciphertext = encryptFile(enckey); //plaintext
    plaintext = null;
    hashc = Sha256.hash(ciphertext);
    encryptedFile = prepareFile(uploadedFile.type); //ciphertext
    ciphertext = null;
    qrstring = "http://mcz.0x.no:9080/zesp/tmp/" + hashc + enckey + encodeURI(uploadedFile.name);
*/
