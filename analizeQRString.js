function analyzeStringFromQR(str) {
    var ADR = 30,
        SHA = 64,
        SR = 16;
    var w = new Array(3);
    var path = "";
    for (var i = 0; i <= ADR + SHA; i++) {
        path += str[i];
    }
    w[0] = path;

    var pass = "";
    for (var i = ADR+SHA+1; i <= ADR+SHA+SR; i++) {
        pass += str[i];
    }
    w[1] = pass;
    var name = "";
    for (var i = ADR+SHA+SR+1; i < str.length; i++) {
        name += str[i];
    }
    w[2] = name;

    return w;
}
