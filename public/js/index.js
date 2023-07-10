const myModal= new bootstrap.Modal("#register-modal");
let logged= sessionStorage.getItem("logged");
const session = localStorage.getItem('session');

checkLogged();

//logar no sistema
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email= document.getElementById("email-input").value;
    const password= document.getElementById("Password-input").value;
    const session= document.getElementById("session-check").checked;
    
    const account =getAccount(email);

    if(! account) {
        alert('opps! vereficque o usuário ou a senha.');
        return;
    }

    if(account){
        if(account.password !== password) {
            alert('opps! verefique o usuário ou a senha.');
            return;
        }

        saveSession(email,session);

        window.location.href ="home.html";
    }
 

});

//Criar conta

document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email= document.getElementById("email-create-input").value;
    const password= document.getElementById("Password-create-input").value;
    console.log(email,password);

    if(email.length < 5) {
        alert('preencha o campo com um e-mail válido');
        return;
    }

    if(password.length < 4) {
        alert('Preencha uma senha com no mínimo 4 digitos');
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions:[]
    });

    myModal.hide();
    
    alert ('Conta criada com sucesso');
});

function checkLogged() {
    if(session){
        sessionStorage.getItem("logged", session);
        logged = session;
    }
    
    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
     
    } 
}

function saveAccount(data) {
    localStorage.setItem(data.login,JSON.stringify(data));
}

function saveSession(data,saveSassion) {
    if(saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged",data);
}


function getAccount(key){
    const account = localStorage.getItem(key);

    if(account){
        return JSON.parse(account);
    
    }

    return""; 

    
}