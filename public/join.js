function setCookies(code){
    const d = new Date();
    d.setTime(d.getTime() + 172800000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = "code=" + code + ";" + expires + ";path=/";
}