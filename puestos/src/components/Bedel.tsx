import React, { useState, useEffect } from 'react';

interface BedelInfo {
  bedel: string;
  bedelAuxiliar: string;
  encargadoLimpieza: string;
}

const Bedel: React.FC = () => {
  const [aula1] = useState<BedelInfo>({
    bedel: 'Carreras Jeremias',
    bedelAuxiliar: 'Castro Enzo',
    encargadoLimpieza: 'Gez Gustavo'
  });
  
  const [aula2] = useState<BedelInfo>({
    bedel: 'Oviedo Rocio',
    bedelAuxiliar: 'Oviedo Franco',
    encargadoLimpieza: 'Salvatierra Facundo'
  });

  const [proximaRotacion, setProximaRotacion] = useState<string>('');

  // Calcular próxima rotación (cada lunes a las 00:00hs)
  useEffect(() => {
    const calcularProximaRotacion = () => {
      const ahora = new Date();
      let diasHastaLunes = (8 - ahora.getDay()) % 7;
      // Si hoy es lunes, la próxima rotación es el próximo lunes (7 días)
      if (diasHastaLunes === 0) {
        diasHastaLunes = 7;
      }
      const proximoLunes = new Date(ahora);
      proximoLunes.setDate(ahora.getDate() + diasHastaLunes);
      proximoLunes.setHours(0, 0, 0, 0);
      
      const opciones: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      
      setProximaRotacion(proximoLunes.toLocaleDateString('es-ES', opciones));
    };

    calcularProximaRotacion();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Sistema de Bedeles</h1>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-center text-blue-800 font-semibold">
          Próxima rotación: {proximaRotacion}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Aula 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Aula 1</h2>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded">
              <span className="font-semibold text-gray-700">Bedel:</span>
              <p className="text-lg text-black">{aula1.bedel}</p>
              <p className="text-sm text-gray-500">(Bedel encargado del aula 1)</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <span className="font-semibold text-gray-700">Bedel Auxiliar:</span>
              <p className="text-lg text-black">{aula1.bedelAuxiliar}</p>
              <p className="text-sm text-gray-500">(Bedel que queda a cargo si el bedel está ausente)</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <span className="font-semibold text-gray-700">Encargado de limpieza:</span>
              <p className="text-lg text-black">{aula1.encargadoLimpieza}</p>
            </div>
          </div>
        </div>

        {/* Aula 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Aula 2</h2>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded">
              <span className="font-semibold text-gray-700">Bedel:</span>
              <p className="text-lg text-black">{aula2.bedel}</p>
              <p className="text-sm text-gray-500">(Bedel encargado del aula 2)</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <span className="font-semibold text-gray-700">Bedel Auxiliar:</span>
              <p className="text-lg text-black">{aula2.bedelAuxiliar}</p>
              <p className="text-sm text-gray-500">(Bedel que queda a cargo si el bedel está ausente)</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <span className="font-semibold text-gray-700">Encargado de limpieza:</span>
              <p className="text-lg text-black">{aula2.encargadoLimpieza}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">Información de rotación:</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• La rotación se realiza cada lunes a las 00:00hs</li>
          <li>• El Bedel Auxiliar pasa a ser Bedel principal</li>
          <li>• La selección de bedeles va en orden alfabético (de arriba hacia abajo)</li>
          <li>• La selección de encargados de limpieza va en orden inverso (de abajo hacia arriba)</li>
        </ul>
      </div>
    </div>
  );
};

export default Bedel; 