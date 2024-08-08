export default class Possession {
  constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement) {
    this.possesseur = possesseur;
    this.libelle = libelle;
    this.valeur = valeur;
    this.dateDebut = new Date(dateDebut); 
    this.dateFin = dateFin ? new Date(dateFin) : null; 
    this.tauxAmortissement = tauxAmortissement;
  }

  getValeur(date) {
    const dateActuelle = new Date(date); 
    return this.getValeurApresAmortissement(dateActuelle);
  }

  getValeurApresAmortissement(dateActuelle) {
    if (dateActuelle < this.dateDebut) {
      return this.valeur; 
    }


    if (this.dateFin && dateActuelle > this.dateFin) {
      return 0;
    }


    const differenceDate = {
      year: dateActuelle.getFullYear() - this.dateDebut.getFullYear(),
      month: dateActuelle.getMonth() - this.dateDebut.getMonth(),
      day: dateActuelle.getDate() - this.dateDebut.getDate(),
    };
    
    const raison = differenceDate.year + differenceDate.month / 12 + differenceDate.day / 365;
    
 
    const result = this.valeur - (this.valeur * (raison * this.tauxAmortissement / 100));
    
    return result > 0 ? result : 0; 
  }
}
