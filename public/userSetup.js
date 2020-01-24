//Find cookies from previous page (room code and create vs. join)
function parseCookie(cookId){
    if(document.cookie == ""){
        return "NOCOOKIES";
    }
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookId+"=") == 0) {
            return cookie.substring(cookId.length + 1, cookie.length);
        }
    }
    return "COOKIENOTFOUND";
}
//Make sure room code is valid
function validateCode(code){
    if(code == "CREATE")
        return true;
    if(code.length != 4)
        return false;
    for(let i = 0; i < 4; i++){
        if(code[i] < 'A' || code[i] > 'Z')
            return false;
    }
    return true;
}

$(function(){
    let pickImage = $("#charBox img");
    let pickInput = $("#charBox input[type=file]")
    function openImagePicker(image, input){
        $("#imageUI").show();
        pickImage = image;
        pickInput = input;
        $("#exampleImage").attr("src", "profilePics/01.jpg");
    }

    let code = parseCookie("code").toUpperCase();
    /*if(!validateCode(code.toUpperCase()))
        code = prompt("Room information not found. Re-enter your four letter room code, or leave blank to make a new room.");
    while(!validateCode(code.toUpperCase())){
        code = prompt("Invalid code. Re-enter your four letter room code, or leave blank to make a new room.");
    }
    code = code.toUpperCase();
    */code = "CREATE";
    if(code != "CREATE"){ //Reorganize page to remove "Group Name" if joining a room instead of creating one.
        $("#groupNameBox").remove();
        $("#playerNameBox").css({
            width: "calc(100% - 10em)",
            float: "none",
            margin: "auto"
        });
    }
    $("#charBox img").click(function(){
        openImagePicker($(this), $("#charBox input[type=file]"));
    });

    const profileNum = $("#imageOptions img").length;

    $("#imageOptions img").click(function(){
        $("#exampleImage").attr("src", $(this).attr("src"));
    });
    //Get image from file upload to view the preview
    $("#newImg").change(function(){
        const reader = new FileReader();
        const file = $(this)[0].files[0];
        reader.addEventListener("load", function () {
            $("#exampleImage").attr("src",reader.result);
        }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    });
    $("#confirmImage").click(function(){
        $("#imageUI").hide();
        pickImage.attr("src", $("#exampleImage").attr("src"));
        if(pickInput[0] != null){
            pickInput.remove();
        }
        if($("#exampleImage").attr("src").substr(0,11) != "profilePics") { //If using uploaded image
            pickImage.parent().find("input[type='hidden']").val("0");
            let name = "charImage";
            if(pickImage.parent().attr("class") == "alias"){
                name = "aliasImage" + pickImage.parent().find("input[type='text']").attr("name").substr(9,1);
            }
            pickInput = $("#newImg").clone();
            pickInput.attr("id", "");
            pickInput.attr("name", name);
            pickInput.attr("class", "charImage")
            pickInput.detach().insertAfter(pickImage);
        }else{
            let imageNum = $("#exampleImage").attr("src").substr(12,2);
            pickImage.parent().find("input[type='hidden']").val(imageNum);
        }
    });
    let aliasCount = 0;
    $("#newAlias").click(function(){
        const newAlias = $("<div class='alias'>" +
            "<img src='profilePics/01.jpg'>" +
            "<input type='text' autocomplete=\"off\" spellcheck='false' name='aliasName" + aliasCount + "' required>" +
            "<input type='hidden' name='aliasImageID' value='01'>" +
            "<button type='button' class='removeButton'>Delete</button>" +
            "</div>").insertBefore($(this));
        //$(this).before();
        aliasCount++;
        $("#aliasCount").val(aliasCount);
        newAlias.find("button").click(function(){
            $(this).parent().remove();
            aliasCount--;
            $("#aliasCount").val(aliasCount);
            //Go through other aliases and rename all inputs to be the new order of aliases
            $(".alias").each(function(index,element){
                $(element).find("input").each(function(index1, element1){
                    let name = $(element1).attr("name");
                    $(element1).attr("name", name.substr(0, name.length - 1) + index);
                });
            });
        });
        newAlias.find("img").click(function(){
            openImagePicker($(this),newAlias.find(".charImage"));
        });
    });
});