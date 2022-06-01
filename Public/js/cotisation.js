window.onload = () => {
    const btn_envoyer = document.querySelector('#form button');
    const montant = document.querySelector('#montant_cotisation');
    console.log('alerte')
    console.log(btn_envoyer)
    console.log(montant)
    btn_envoyer.addEventListener('click', (e) => {
        console.log('first')
        if(!montant.value || isNaN(montant.value) || montant.value == ''){
            e.preventDefault();
            montant.style.boxShadow = '0 0 3px 1px crimson';
            montant.style.border = 'none';
        }
    })
    montant.addEventListener('keyup', (e)=>{
        if(montant.value.length >= 0){
            montant.style.boxShadow = '0 0 0 0 black';

        }
    }) 

}