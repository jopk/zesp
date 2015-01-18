var encryptedFile,
    plaintext,
    hashc,
    enckey,
    qrkey,
    qrstring,
    ciphertext;

function encryption() {
    plaintext = reader.result;
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
    ciphertext =  Aes.Ctr.encrypt(plaintext, key, 256);
//    plaintext = null;
    hashc = Sha256.hash(ciphertext);
    encryptedFile = new Blob([ciphertext]);
//    ciphertext = null;
    qrstring = "http://S/" + hashc + qrkey + encodeURI(uploadedFile.name);
}

