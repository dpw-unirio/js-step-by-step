function getRow(name){
    return $('#'+name+'Row');
}

function getInputs(name){
    return $(".form-control", getRow(name));
}

function getSpans(name){
    return $(".col-xs-6:nth-child(2) span", getRow(name));
}

function getButton(name){
    return $("button", getRow(name));
}
function scrollToRow(name) {
    var body = $('body');

    var row = getRow(name);
    var rowOffset = row.offset().top;
    var rowHeight = row.outerHeight();
    var wH = $(window).height();
    var currentScroll = body.scrollTop();

    var marginBottom = 15;

    var scrollAmount = (rowHeight + rowOffset) - (wH+currentScroll) + marginBottom;

    body.animate({scrollTop: currentScroll+scrollAmount}, 300);
}

function lerNome (){
    var input = getInputs("name");
    var span = getSpans("name");

    span.html(input.val()+'!');

    if (input.val()){
        input.prop('disabled', true);

        input.prop('disabled', true);
        getButton('name').prop('disabled', true);

        getRow("age").show(300, function () {
            scrollToRow('age');
        });
        getInputs('age').focus();
    }
}

function lerIdade(){
    var input = getInputs("age");
    var span = getSpans("age");

    var age = parseInt(input.val());
    if (!isNaN(age) && age <= 100){
        span.html(age);

        input.prop('disabled', true);
        getButton('age').prop('disabled', true);

        getRow("pass").show(300, function () {
            scrollToRow('pass');
        });
        getInputs('pass').first().focus();
    }else{
        alert('Idade inválida.');
    }
}

function lerSenha(){
    var inputs = getInputs("pass");
    var spans = getSpans("pass");

    var passInput = $(inputs[0]);
    var confirmInput = $(inputs[1]);

    spans.css('display', 'none');

    var password = passInput.val();
    var passwordConfirm = confirmInput.val();

    if (!password){
        // no pwd
        $(spans[0]).css('display', 'block');
    }else if(password != passwordConfirm){
        // Don't match
        $(spans[1]).css('display', 'block');
    }else{
        // Success
        $(spans[2]).css('display', 'block');

        inputs.prop('disabled', true);
        getButton('pass').prop('disabled', true);

        getRow("class").show(300, function () {
            scrollToRow('class');
        });
        getInputs('class').focus();
    }
}

function lerClasse() {
    var input = getInputs("class");
    var span = getSpans("class");

    if (input.val()){
        span.html('Você é um '+input.val()+"!");
        input.prop('disabled', true);
        getButton('class').prop('disabled', true);
    }
}

function quandoCarregar(){
    getButton('name').on('click', lerNome);
    getButton('age').on('click', lerIdade);
    getButton('pass').on('click', lerSenha);
    getButton('class').on('click', lerClasse);

    getInputs('name').on('keyup', function(e){
        if (e.which == 13) lerNome()
    });
    getInputs('age').on('keyup', function(e){
        if (e.which == 13) lerIdade()
    });
    getInputs('pass').on('keyup', function(e){
        if (e.which == 13) lerSenha()
    });

    getRow("age").css('display', 'none');
    getRow("pass").css('display', 'none');

    var classInput = getInputs('class');

    for (var i = 0; i < classes.length; i++){
        var className = classes[i];

        var option = $("<option/>")
            .val(className)
            .html(className)
            .appendTo(classInput);
    }


    getInputs('name').focus();
}

classes = ["Guerreiro", "Mago", "Arqueiro"];

window.onload = quandoCarregar;