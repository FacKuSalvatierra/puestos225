import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import TablaTurnos from './components/TablaTurnos'
import ArmarPuestos from './ArmarPuestos'
import { dividirHorario } from './utils/horarios'
import type { Turno } from './utils/horarios'

interface Integrante {
  nombre: string;
  apellido: string;
}

const App: React.FC = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [turnos, setTurnos] = useState<Turno[]>([]);

  useEffect(() => {
    // Al iniciar, cargar turnos guardados
    const guardados = localStorage.getItem('turnos');
    if (guardados) {
      setTurnos(JSON.parse(guardados));
    }
  }, []);

  useEffect(() => {
    // Guardar turnos cada vez que cambian
    localStorage.setItem('turnos', JSON.stringify(turnos));
  }, [turnos]);

  const handleCrearServicio = (puestos: number, ingreso: string, fin: string, integrantes: Integrante[]) => {
    setTurnos(dividirHorario(ingreso, fin, integrantes, puestos));
  };

  const exportarCSV = () => {
    if (turnos.length === 0) return;
    const encabezado = 'Puesto,Nombre,Apellido,Desde,Hasta\n';
    const filas = turnos.map(t => `${t.puesto},${t.integrante.nombre},${t.integrante.apellido},${t.desde},${t.hasta}`).join('\n');
    const csv = encabezado + filas;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'turnos.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <Navbar onArmarPuestos={() => setModalAbierto(true)} />
      <div className="p-6 max-w-3xl mx-auto">
        <ArmarPuestos
          isOpen={modalAbierto}
          onClose={() => setModalAbierto(false)}
          onCrearServicio={handleCrearServicio}
        />
        <TablaTurnos turnos={turnos} exportarCSV={exportarCSV} />
      </div>
    </div>
  );
};

export default App;
