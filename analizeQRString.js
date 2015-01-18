function analyzeStringFromQR(str) {
    var ADR = 8,
        SHA = 64,
        SR = 48;
    var w = new Array(3);

// wyciąganie lokalizacji
    var path = "";
    for (var i = 0; i < ADR; i++) {
        path += str[i];
    }
    if (path[ADR-1] == "S")
        path = "http://mcz.0x.no:9080/zesp/tmp/";

// nazwa pliku na serwerze
    var hash = "";
    for (var i = ADR+1; i <= ADR + SHA; i++) {
        path += str[i];
    }
    w[0] = path + hash;

// "czytelny" klucz szyfrujący
    var qrkey = "";
    for (var i = ADR+SHA+1; i <= ADR+SHA+SR; i++) {
        qrkey += str[i];
    }

// "nieczytelny" klucz szyfrujący
    var l = 0;
    var pass = "";
    for (var i = 0; i < qrkey.length / 3; i++) {
        var tmp = '';
        tmp += qrkey[l++];
        tmp += qrkey[l++];
        tmp += qrkey[l++];
        var code = parseInt(tmp);
        pass += String.fromCharCode(code);
    }
    w[1] = pass;

// nazwa pliku
    var name = "";
    for (var i = ADR+SHA+SR+1; i < str.length; i++) {
        name += str[i];
    }
    w[2] = name;

    return w;
}
