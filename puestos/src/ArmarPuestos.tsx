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
    <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-60 flex items-center justify-center z-[1000]">
      <div className="bg-white text-black p-6 rounded-lg min-w-[350px] shadow-2xl border-2 border-gray-300 relative">
        <h2 className="text-xl font-bold mb-4">Armar Puestos</h2>
        <label className="block mb-2">
          Cantidad de puestos:
          <input type="number" min={2} max={4} value={puestos} onChange={e => setPuestos(Number(e.target.value))} className="ml-2 p-1 rounded border text-black" />
        </label>
        <label className="block mb-2">
          Horario de ingreso:
          <input type="time" value={ingreso} onChange={e => setIngreso(e.target.value)} className="ml-2 p-1 rounded border text-black" />
        </label>
        <label className="block mb-2">
          Horario de finalización:
          <input type="time" value={fin} onChange={e => setFin(e.target.value)} className="ml-2 p-1 rounded border text-black" />
        </label>
        <div className="mb-4">
          <strong>Integrantes:</strong>
          {integrantes.map((int, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input
                type="text"
                placeholder="Nombre"
                value={int.nombre}
                onChange={e => handleIntegranteChange(idx, 'nombre', e.target.value)}
                className="p-1 rounded border text-black"
              />
              <input
                type="text"
                placeholder="Apellido"
                value={int.apellido}
                onChange={e => handleIntegranteChange(idx, 'apellido', e.target.value)}
                className="p-1 rounded border text-black"
              />
              {integrantes.length > 1 && (
                <button onClick={() => quitarIntegrante(idx)} className="bg-red-600 text-white px-2 rounded">-</button>
              )}
            </div>
          ))}
          <button onClick={agregarIntegrante} className="bg-blue-600 text-white px-2 py-1 rounded mt-2">Agregar integrante</button>
        </div>
        <button onClick={handleCrear} className="bg-green-600 text-white px-4 py-2 rounded">Crear servicio</button>
        <button onClick={onClose} className="ml-2 bg-gray-600 text-white px-4 py-2 rounded">Cancelar</button>
      </div>
    </div>
  );
};

export default ArmarPuestos; 