window.onload = () => {
    const btn_Envoyer = document.querySelector(' form button');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    btn_Envoyer.addEventListener('click', (e) =>{
        if(!email.value || !password.value){
            e.preventDefault();
            if(!email.value){
            email.style.boxShadow = '0 0 3px 1px crimson';
        }
        if(!password.value){
            password.style.boxShadow = '0 0 3px 1px crimson';
        }
            return -1;
        }       
    })
    email.addEventListener('input', (e) => {
        email.style.boxShadow = '0 0 0 0 black';
    })
    password.addEventListener('input', (e) => {
        password.style.boxShadow = '0 0 0 0 black';
    })
}