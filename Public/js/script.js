window.onload = ()=>{
    // SELECTION DE LA BARRE DE NAVIGATION AVEC CHANGEMENT DE COULEUR
    const navBars = document.querySelectorAll('.top_bar a');
    const listBars = document.querySelectorAll('.top_bar li');
    const image_carousselles = document.querySelectorAll('.image_carousselle_slide');
    const header = document.querySelector('header');
    const hreff = document.querySelectorAll('.top_bar a');
    let etape = 0;
    const nombre_image_carousselle = image_carousselles.length;
    // navBars.forEach(navBar => {
    //     navBar.addEventListener('click', (e)=>{
    //         e.preventDefault();
    //         if(e.target.parentNode.classList != 'active_menu')
    //         {
    //             for (let i = 0; i < listBars.length; i++) {
    //                 const listBar = listBars[i];
    //                 listBar.classList = ''
    //             }
    //             e.target.parentNode.classList = 'active_menu';
    //         }
    //     })
    // })

    // MISE EN MARCHE DU CAROUSELLE DE LA PAGE D'ACCUEILL
    function enlever_class_visible(){
            const image_carousselle = image_carousselles[etape];
                image_carousselle.classList.remove('visible'); 
    }
    function ajouter_class_visible(){
        etape++;
        if (etape >= nombre_image_carousselle ) {
            etape = 0;
        }
        const image_carousselle = image_carousselles[etape];
              image_carousselle.classList.add('visible');  
    }
    setInterval(()=>{
        enlever_class_visible();
        ajouter_class_visible();
    }, 5000)

    // FIXER LA NAV BARRE
    window.addEventListener('scroll', (e)=>{
        const scrollTop = window.scrollY;
        if (scrollTop >= 80) {
         return header.classList.add('sticky');
        }
        header.classList.remove('sticky');

    })


}