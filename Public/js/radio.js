window.onload = ()=>{
    const radioButtons = document.querySelectorAll("input[type='radio']");
    const infoSoutenance = document.querySelector('#info_generale');
    radioButtons.forEach(radioButton =>{
            if(radioButton.value == 'false'){
                infoSoutenance.classList.add('masquer');
              return -1;
            }
    })
    radioButtons.forEach(radioButton =>{
        radioButton.addEventListener('change', (e) =>{
            if(radioButton.value == 'false'){
                infoSoutenance.classList.add('masquer');
                return -1;
            }
            infoSoutenance.classList.remove('masquer');
            return 1;
        })
    })
// CHANGEMENT QUAND ON AJOUTE UNE PHOTO DE PROFIL
const photo_profile = document.querySelector('#photo_profile');
const champs_vide = document.querySelector('#champs_vide');
photo_profile.addEventListener('change', (e)=>{
    if(photo_profile.value.length >= 0){
        champs_vide.style.backgroundColor='rgba(0, 0, 0, 0.5)';
        champs_vide.style.opacity = 1;
        champs_vide.value = 'Photo insérée';
    }
})


}