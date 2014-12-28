function postwith(to, name, file) {
    form = new FormData(),
    request = new XMLHttpRequest();

    form.append("file",file, name);
    form.append("file_name", name);
    request.open(
            "POST",
            to,
            true
    );
    request.send(form);
}

