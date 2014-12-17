function analyzeStringFromQR(str) {
    var w = new Array(3);
    var tmp = "";
    for (var i=0; str[i] != " "; i++) {
        tmp += str[i];
    }
    w[0] = tmp;

    tmp = "";
    var p = ++i;
    for (i; i < p+64; i++) {
        tmp += str[i];
    }
    w[1] = tmp;

    tmp = "";
    for (i; i < str.length; i++) {
        tmp += str[i];
    }
    w[2] = tmp;

    return w;
}

/* wymaga zaimportowania Sha256 */
function getFileURL(str) {
    var file_name = Sha256.gash(str);
    var file_url = 'http://mcz.0x.no/tmp/';
    file_url=file_url.concat(file_name);
    return file_url;
}
