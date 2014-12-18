function analyzeStringFromQR(str) {
    var w = new Array(2);
    var tmp = "";
    var n = str.length - 1;
    for (var i = str.length-64; i < str.length; i++) {
        tmp += str[i];
    }
    w[0] = tmp;

    tmp = "";
    for (i = 0; i < str.length-64; i++) {
        tmp += str[i];
    }
    w[1] = tmp;

    return w;
}
