let myChart;

function calculer() {
    // Récupération des valeurs saisies
    const prixEssence = parseFloat(document.getElementById('prix_essence').value);
    const prixElectricite = parseFloat(document.getElementById('prix_electricite').value);
    const consoThermique = parseFloat(document.getElementById('conso_thermique').value);
    const consoElectrique = parseFloat(document.getElementById('conso_electrique').value);
    const distance = parseFloat(document.getElementById('distance').value);
    const prixAchatThermique = parseFloat(document.getElementById('prix_achat_thermique').value);
    const prixAchatElectrique = parseFloat(document.getElementById('prix_achat_electrique').value);
    const aideAchatThermique = parseFloat(document.getElementById('aide_achat_thermique').value);
    const aideAchatElectrique = parseFloat(document.getElementById('aide_achat_electrique').value);
    const duree = parseFloat(document.getElementById('duree').value);
    const assuranceThermique = parseFloat(document.getElementById('assurance_thermique').value);
    const assuranceElectrique = parseFloat(document.getElementById('assurance_electrique').value);
    const revisionThermique = parseFloat(document.getElementById('revision_thermique').value);
    const revisionElectrique = parseFloat(document.getElementById('revision_electrique').value);

    // Calcul des coûts annuels
    const coutAnnuelThermique = (prixEssence * consoThermique * distance) / 100 + assuranceThermique + revisionThermique;
    const coutAnnuelElectrique = (prixElectricite * consoElectrique * distance) / 100 + assuranceElectrique + revisionElectrique;

    // Calcul des coûts totaux en incluant le prix d'achat et les aides
    const coutTotalThermique = prixAchatThermique - aideAchatThermique;
    const coutTotalElectrique = prixAchatElectrique - aideAchatElectrique;

    // Tableaux pour les données du graphique
    const labels = [];
    const dataThermique = [];
    const dataElectrique = [];

    for (let i = 1; i <= duree; i++) {
        labels.push(`Année ${i}`);
        dataThermique.push(coutTotalThermique + coutAnnuelThermique * i);
        dataElectrique.push(coutTotalElectrique + coutAnnuelElectrique * i);
    }

    // Affichage du résultat
    const resultatElement = document.getElementById('resultat');
    resultatElement.innerHTML = `
      <p>Coût annuel thermique : ${coutAnnuelThermique.toFixed(2)} €</p>
      <p>Coût annuel électrique : ${coutAnnuelElectrique.toFixed(2)} €</p>
      <p>Coût total thermique sur ${duree} ans : ${(coutTotalThermique + coutAnnuelThermique * duree).toFixed(2)} €</p>
      <p>Coût total électrique sur ${duree} ans : ${(coutTotalElectrique + coutAnnuelElectrique * duree).toFixed(2)} €</p>
    `;

    // Mise à jour du graphique avec Chart.js
    if (myChart) {
        myChart.destroy();
    }
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Coût total thermique (€)',
          data: dataThermique,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }, {
          label: 'Coût total électrique (€)',
          data: dataElectrique,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
}

function reset() {
    // Réinitialisation des champs de saisie
    document.getElementById('prix_achat_thermique').value = '';
    document.getElementById('conso_thermique').value = '';
    document.getElementById('assurance_thermique').value = '';
    document.getElementById('revision_thermique').value = '';
    document.getElementById('prix_achat_electrique').value = '';
    document.getElementById('conso_electrique').value = '';
    document.getElementById('assurance_electrique').value = '';
    document.getElementById('revision_electrique').value = '';
    document.getElementById('prix_essence').value = '';
    document.getElementById('prix_electricite').value = '';
    document.getElementById('aide_achat_thermique').value = '';
    document.getElementById('aide_achat_electrique').value = '';
    document.getElementById('duree').value = '';
    document.getElementById('distance').value = '';

    // Réinitialisation du résultat
    document.getElementById('resultat').innerHTML = '';

    // Réinitialisation du graphique
    if (myChart) {
        myChart.destroy();
    }
}
