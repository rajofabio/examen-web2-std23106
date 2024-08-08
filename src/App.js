import React, { useState, useEffect } from "react";
import patrimoineData from './models/data.json'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Patrimoine from './models/Patrimoine'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"; 


const getValeurPatrimoine = (patrimoine, date) => {
  if (!patrimoine) return 0;
  return patrimoine.getValeur(date);
};

function App() {
  const [date, setDate] = useState(new Date());
  const [valeurPatrimoine, setValeurPatrimoine] = useState(null);
  const [patrimoine, setPatrimoine] = useState(null);

  useEffect(() => {
    const patrimoineDataObj = patrimoineData.find(item => item.model === 'Patrimoine');

    if (patrimoineDataObj) {
      const { possesseur, possessions } = patrimoineDataObj.data;
      const patrimoineInstance = new Patrimoine(possesseur.nom, possessions);
      setPatrimoine(patrimoineInstance);
    }
  }, []);


  const handleValidation = () => {
    const valeurTotale = getValeurPatrimoine(patrimoine, date);
    setValeurPatrimoine(valeurTotale);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Gestion du Patrimoine</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Valeur Initiale</th>
            <th>Date de Début</th>
            <th>Date de Fin</th>
            <th>Amortissement</th>
          </tr>
        </thead>
        <tbody>
          {patrimoine && patrimoine.possessions.map((possession, index) => (
            <tr key={index}>
              <td>{possession.libelle}</td>
              <td>{possession.valeur.toLocaleString()} Ar</td>
              <td>{new Date(possession.dateDebut).toLocaleDateString()}</td>
              <td>
                {possession.dateFin
                  ? new Date(possession.dateFin).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                {possession.tauxAmortissement
                  ? `${possession.tauxAmortissement}%`
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="my-3">
        <DatePicker
          selected={date}
          onChange={date => setDate(date)}
          className="form-control"
        />
        <button className="btn btn-primary mt-3" onClick={handleValidation}>
          Valider
        </button>
      </div>

      {valeurPatrimoine !== null && (
        <h2>
          Valeur du Patrimoine au {date.toLocaleDateString()} :{" "}
          {valeurPatrimoine.toLocaleString()} Ar
        </h2>
      )}
    </div>
  );
}

export default App;
