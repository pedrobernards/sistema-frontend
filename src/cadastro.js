window.onload = function (e) {

    var btnCadastrar = document.getElementById("btnCadastrar");

    var txtNome = document.getElementById("txtNome");

    var txtSobrenome = document.getElementById("txtSobrenome");

    var txtEmail = document.getElementById("txtEmail");

    var txtTelefone = document.getElementById("txtTelefone");

    var slcGenero = document.getElementById("slcGenero");

    var txtSenha = document.getElementById("txtSenha");

    txtNome.focus();

    btnCadastrar.onclick = function (e) {

        e.preventDefault();

        var nome = txtNome.value;

        var sobrenome = document.getElementById("txtSobrenome").value;

        var senha = document.getElementById("txtSenha").value;

        var telefone = document.getElementById("txtTelefone").value;

        var email = document.getElementById("txtEmail").value;

        var genero = document.getElementById("slcGenero").value;

        if (nome == "" ||
            sobrenome == "" ||
            senha == "" ||
            telefone == "" ||
            email == "" ||
            genero == "") {

            var mensagem = "Os campos acima são obrigatórios.";

            exibirMensagemErro(mensagem);
        }
        else {
            fazerCadastro(nome, sobrenome, email, telefone, genero, senha);

        }
    };

    function fazerCadastro(nome, sobrenome, email, telefone, genero, senha) {

        var data = JSON.stringify({
            "nome": nome,
            "Sobrenome": sobrenome,
            "email": email,
            "telefone": telefone,
            "genero": genero,
            "senha": senha
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {

                    localStorage.setItem("usuarioGuid", result.usuarioGuid);

                    window.location.href = "home.html";
                }
                else {
                    exibirMensagemErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "http://localhost:21399/api/usuario/cadastro");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }


    function exibirMensagemErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "nome";
        }, 5000);

    }
}

