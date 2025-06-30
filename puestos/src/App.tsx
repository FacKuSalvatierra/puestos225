import React, { useState, useEffect } from 'react'
import ArmarPuestos from './ArmarPuestos'
import './App.css'

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

function dividirHorario(ingreso: string, fin: string, integrantes: Integrante[], puestos: number): Turno[] {
  // Convertir a minutos
  const [h1, m1] = ingreso.split(":").map(Number);
  const [h2, m2] = fin.split(":").map(Number);
  let minutosInicio = h1 * 60 + m1;
  let minutosFin = h2 * 60 + m2;
  if (minutosFin <= minutosInicio) minutosFin += 24 * 60; // Soporta turnos nocturnos
  const duracionTotal = minutosFin - minutosInicio;
  const duracionPorTurno = Math.floor(duracionTotal / integrantes.length);

  let turnos: Turno[] = [];
  let actual = minutosInicio;
  integrantes.forEach((int, idx) => {
    const desde = actual;
    const hasta = idx === integrantes.length - 1 ? minutosFin : actual + duracionPorTurno;
    for (let p = 1; p <= puestos; p++) {
      turnos.push({
        integrante: int,
        puesto: p,
        desde: minutosAHora(desde),
        hasta: minutosAHora(hasta),
      });
    }
    actual += duracionPorTurno;
  });
  return turnos;
}

function minutosAHora(min: number): string {
  min = min % (24 * 60);
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
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
    <div style={{ padding: 24 }}>
      <h1>Servicio de Guardia</h1>
      <button onClick={() => setModalAbierto(true)}>Armar Puestos</button>
      <ArmarPuestos
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onCrearServicio={handleCrearServicio}
      />
      <div style={{ marginTop: 32 }}>
        <h2>Turnos asignados</h2>
        {turnos.length === 0 ? (
          <p>No hay turnos asignados.</p>
        ) : (
          <>
            <button onClick={exportarCSV} style={{ marginBottom: 12 }}>Exportar tabla</button>
            <table border={1} cellPadding={6} style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Puesto</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Desde</th>
                  <th>Hasta</th>
                </tr>
              </thead>
              <tbody>
                {turnos.map((t, i) => (
                  <tr key={i}>
                    <td>{t.puesto}</td>
                    <td>{t.integrante.nombre}</td>
                    <td>{t.integrante.apellido}</td>
                    <td>{t.desde}</td>
                    <td>{t.hasta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
