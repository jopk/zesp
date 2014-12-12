function postwith(to, name, file) {
    var sendEncFile = document.createElement('form');
    sendEncFile.method = "post";
    sendEncFile.action = to;

    var inNa = document.createElement('input');
    inNa.setAttribute("file_name", name);
    var inFi = document.createElement('input');
    inFi.setAttribute("file", file);

    document.body.appendChild(sendEncFile);
    sendEncFile.submit();
    document.body.removeChild(sendEncFile);
    saveAs(file, "test.enc");
}
