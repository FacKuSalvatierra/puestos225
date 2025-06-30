import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Integrante {
  nombre: string;
  apellido: string;
}

interface Turno {
  integrante: Integrante;
  puesto: number;
  desde: string;
  hasta: string;
}

interface TablaTurnosProps {
  turnos: Turno[];
  exportarCSV: () => void;
}

const TablaTurnos: React.FC<TablaTurnosProps> = ({ turnos, exportarCSV }) => {
  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text('Turnos asignados', 14, 16);
    autoTable(doc, {
      startY: 22,
      head: [["Puesto", "Nombre", "Apellido", "Desde", "Hasta"]],
      body: turnos.map(t => [
        t.puesto,
        t.integrante.nombre,
        t.integrante.apellido,
        t.desde,
        t.hasta
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });
    doc.save('turnos.pdf');
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Turnos asignados</h2>
      {turnos.length === 0 ? (
        <p>No hay turnos asignados.</p>
      ) : (
        <>
          <div className="flex gap-2 mb-3">
            <button onClick={exportarCSV} className="bg-green-600 text-white px-4 py-2 rounded">Exportar tabla</button>
            <button onClick={exportarPDF} className="bg-blue-600 text-white px-4 py-2 rounded">Exportar PDF</button>
          </div>
          <table className="border border-gray-400 w-full text-center rounded overflow-hidden bg-white text-black">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th className="p-2">Puesto</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Apellido</th>
                <th className="p-2">Desde</th>
                <th className="p-2">Hasta</th>
              </tr>
            </thead>
            <tbody>
              {turnos.map((t, i) => (
                <tr key={i} className="odd:bg-gray-100 even:bg-gray-50">
                  <td className="p-2">{t.puesto}</td>
                  <td className="p-2">{t.integrante.nombre}</td>
                  <td className="p-2">{t.integrante.apellido}</td>
                  <td className="p-2">{t.desde}</td>
                  <td className="p-2">{t.hasta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default TablaTurnos; 