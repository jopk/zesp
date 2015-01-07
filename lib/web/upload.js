var reader;
var progress = document.querySelector('.percent');
var uploadedFile;

function abortRead() {
    reader.abort();
}

function errorHandler(evt) {
    switch(evt.target.error.code) {
    case evt.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
    case evt.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
    case evt.target.error.ABORT_ERR:
        break;
    default:
        alert('An error occurred reading this file.');
    };
}

function updateProgress(evt) {
    if (evt.lengthComputable) {
        var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        if (percentLoaded < 100) {
            progress.style.width = percentLoaded + '%';
            progress.textContent = percentLoaded + '%';
        }
    }
}


function handleFileSelect(evt) {
    uploadedFile = evt.target.files[0],
    progress.style.width = '0%';
    progress.textContent = '0%';

    reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onprogress = updateProgress;
    reader.onabort = function(e) {
        alert('Anulowano');
    };
    reader.onloadstart = function(e) {
        if (uploadedFile.size > 10000000) {
            reader.abort();
            alert('Plik przekracza 10MB');
        }
        if (uploadedFile.name.length > 64) {
            reader.abort();
            alert('Nazwa pliku przekracza 64 znaki.');
        }
        document.getElementById('progress_bar').className = 'loading';
    };
    reader.onload = function(e) {
        progress.style.width = '100%';
        progress.textContent = '100%';
        setTimeout("document.getElementById('progress_bar').className='';", 2000);
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
        /* WYŚWIETLANIE KODÓW DO TESTÓW */
        printQRC();
    }
    reader.readAsArrayBuffer(evt.target.files[0]);
}
document.getElementById('files').addEventListener('change', handleFileSelect, false);

