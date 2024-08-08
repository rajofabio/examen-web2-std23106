import Possession from "./possessions/Possession"; 

export default class Patrimoine {
  constructor(possesseur, possessions) {
    this.possesseur = possesseur;
    this.possessions = possessions.map(
      (p) =>
        new Possession(
          p.possesseur,
          p.libelle,
          p.valeur,
          p.dateDebut,
          p.dateFin,
          p.tauxAmortissement
        )
    );
  }

  getValeur(date) {
    return this.possessions.reduce(
      (acc, possession) => acc + possession.getValeur(date),
      0
    );
  }
}
