import React, { useState } from 'react';

interface Integrante {
  nombre: string;
  apellido: string;
}

interface ArmarPuestosProps {
  isOpen: boolean;
  onClose: () => void;
  onCrearServicio: (puestos: number, ingreso: string, fin: string, integrantes: Integrante[]) => void;
}

const ArmarPuestos: React.FC<ArmarPuestosProps> = ({ isOpen, onClose, onCrearServicio }) => {
  const [puestos, setPuestos] = useState(2);
  const [ingreso, setIngreso] = useState('');
  const [fin, setFin] = useState('');
  const [integrantes, setIntegrantes] = useState<Integrante[]>([{ nombre: '', apellido: '' }]);

  if (!isOpen) return null;

  const handleIntegranteChange = (index: number, field: keyof Integrante, value: string) => {
    const nuevos = [...integrantes];
    nuevos[index][field] = value;
    setIntegrantes(nuevos);
  };

  const agregarIntegrante = () => {
    setIntegrantes([...integrantes, { nombre: '', apellido: '' }]);
  };

  const quitarIntegrante = (index: number) => {
    setIntegrantes(integrantes.filter((_, i) => i !== index));
  };

  const handleCrear = () => {
    onCrearServicio(puestos, ingreso, fin, integrantes);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(20,20,20,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#111', color: '#fff', padding: 24, borderRadius: 8, minWidth: 350, boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
        <h2>Armar Puestos</h2>
        <label>
          Cantidad de puestos:
          <input type="number" min={2} max={4} value={puestos} onChange={e => setPuestos(Number(e.target.value))} />
        </label>
        <br />
        <label>
          Horario de ingreso:
          <input type="time" value={ingreso} onChange={e => setIngreso(e.target.value)} />
        </label>
        <br />
        <label>
          Horario de finalización:
          <input type="time" value={fin} onChange={e => setFin(e.target.value)} />
        </label>
        <br />
        <div>
          <strong>Integrantes:</strong>
          {integrantes.map((int, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
              <input
                type="text"
                placeholder="Nombre"
                value={int.nombre}
                onChange={e => handleIntegranteChange(idx, 'nombre', e.target.value)}
              />
              <input
                type="text"
                placeholder="Apellido"
                value={int.apellido}
                onChange={e => handleIntegranteChange(idx, 'apellido', e.target.value)}
              />
              {integrantes.length > 1 && (
                <button onClick={() => quitarIntegrante(idx)}>-</button>
              )}
            </div>
          ))}
          <button onClick={agregarIntegrante}>Agregar integrante</button>
        </div>
        <br />
        <button onClick={handleCrear}>Crear servicio</button>
        <button onClick={onClose} style={{ marginLeft: 8 }}>Cancelar</button>
      </div>
    </div>
  );
};

export default ArmarPuestos; 