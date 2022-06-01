// CALCUL DU MONTANT TOTAL DES COTISATION
window.onload = () => {
  const montant_td = document.querySelectorAll("#montant");
  const type_cotisation = document.querySelectorAll("#type_cotisation");
  const montant_total = document.querySelector(".montant_total");
  const class_montant_total = document.querySelector("#class_montant_total");
  class_montant_total.addEventListener("change", (e) => {
    if (class_montant_total.value == "Montant total") {
      Total();
    }
    if (class_montant_total.value == "Cotisation de soutenance de thèse") {
      Autre_Total("Cotisation de soutenance de thèse");
    }
    if (class_montant_total.value == "Cotisation de mariage") {
      Autre_Total("Cotisation de mariage");
    }
    if (class_montant_total.value == "Cotisation de naissance") {
      Autre_Total("Cotisation de naissance");
    }
    if (class_montant_total.value == "Cotisation de gala") {
      Autre_Total("Cotisation de gala");
    }
    if (class_montant_total.value == "Cotisation de décès") {
      Autre_Total("Cotisation de décès");
    }
    if (class_montant_total.value == "Les autres Cotisations") {
      Autre_Total("Les autres Cotisations");
    }
  });

  Total();

  function Total() {
    let t_montant = [];
    let prix = 0;
    for (let i = 0; i < montant_td.length; i++) {
      let montant = montant_td[i].innerHTML;
      t_montant.push(montant);
    }
    t_montant.forEach((tableau) => {
      prix = parseInt(tableau) + prix;
    });
    montant_total.innerHTML = prix + " F CFA";
    return 1;
  }
  function Autre_Total(valeur) {
    let t_montant = [];
    let prix = 0;
    type_cotisation.forEach((type) => {
      if (type.innerHTML == valeur) {
        const type_montant = type.nextElementSibling.innerHTML;
        t_montant.push(type_montant);
      }
    });
    t_montant.forEach((tableau) => {
      prix = parseInt(tableau) + prix;
    });
    montant_total.innerHTML = prix + " F CFA";
    return 1;
  }
};
