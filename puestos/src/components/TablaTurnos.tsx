import React from 'react';

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

const TablaTurnos: React.FC<TablaTurnosProps> = ({ turnos, exportarCSV }) => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-2">Turnos asignados</h2>
    {turnos.length === 0 ? (
      <p>No hay turnos asignados.</p>
    ) : (
      <>
        <button onClick={exportarCSV} className="bg-green-600 text-white px-4 py-2 rounded mb-3">Exportar tabla</button>
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

export default TablaTurnos; 