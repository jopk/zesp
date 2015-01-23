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
    ciphertext =  Aes.Ctr.encrypt(plaintext, qrkey, 256);
//    plaintext = null;
    hashc = Sha256.hash(ciphertext);
    encryptedFile = new Blob([ciphertext], {type: uploadedFile.type});
//    ciphertext = null;
    qrstring = "http://S",
    qrstring += (uploadedFile.type.search(new RegExp("text")) == 0) ? "T" : "I";
    qrstring += hashc + qrkey + encodeURI(uploadedFile.name);
}

