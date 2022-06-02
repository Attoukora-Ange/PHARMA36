window.onload = () =>{
    const btn_Envoyer = document.querySelector('#form button');
    const inputs = document.querySelectorAll('form input');
    const password = document.querySelector('#password');
    const conf_password = document.querySelector('#conf_password');
    btn_Envoyer.addEventListener('click', (e) =>{
        inputs.forEach(input => {
            if(!input.value){
                e.preventDefault();
                input.style.boxShadow = '0 0 3px 1px crimson';    
            }
            input.addEventListener('input', (e) => {
                input.style.boxShadow = '0 0 0 0 black';
        })
        })
        if(password.value || conf_password.value){
            if(password.value == '' || conf_password.value == ''){
            alert('Renseigner le mot de passe et confirmation de mot de passe');
            e.preventDefault();
            return -1;
        }
        }
      })  
           // CHANGEMENT QUAND ON AJOUTE UNE PHOTO DE PROFIL
const photo_profile = document.querySelector('#photo_profile');
const champs_vide = document.querySelector('#champs_vide');
if(photo_profile.value.length >= 0){
    champs_vide.style.boxShadow = '0 0 0 0 black';
    champs_vide.style.opacity = 1;
    champs_vide.value = 'Choisir photo';
}
photo_profile.addEventListener('change', (e)=>{
    if(photo_profile.value.length >= 0){
        champs_vide.style.opacity = 1;
        champs_vide.value = 'Photo insérée';
    }
}) 
    
 

}