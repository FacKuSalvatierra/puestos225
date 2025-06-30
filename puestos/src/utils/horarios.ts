export interface Integrante {
  nombre: string;
  apellido: string;
}

export interface Turno {
  integrante: Integrante;
  puesto: number;
  desde: string;
  hasta: string;
}

export function dividirHorario(ingreso: string, fin: string, integrantes: Integrante[], puestos: number): Turno[] {
  // Convertir a minutos
  const [h1, m1] = ingreso.split(":").map(Number);
  const [h2, m2] = fin.split(":").map(Number);
  let minutosInicio = h1 * 60 + m1;
  let minutosFin = h2 * 60 + m2;
  if (minutosFin <= minutosInicio) minutosFin += 24 * 60; // Soporta turnos nocturnos
  const duracionTotal = minutosFin - minutosInicio;

  // El número de bloques es el menor entre puestos y integrantes
  const bloques = Math.min(integrantes.length, puestos);
  const duracionPorBloque = Math.floor(duracionTotal / bloques);

  // Barajar aleatoriamente los integrantes
  let integrantesBarajados = [...integrantes];
  for (let i = integrantesBarajados.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [integrantesBarajados[i], integrantesBarajados[j]] = [integrantesBarajados[j], integrantesBarajados[i]];
  }

  let turnos: Turno[] = [];
  let actual = minutosInicio;

  for (let b = 0; b < bloques; b++) {
    const desde = actual;
    let hasta = actual + duracionPorBloque;
    if (b === bloques - 1) hasta = minutosFin;
    // Asignar a cada puesto una persona distinta
    for (let p = 0; p < puestos; p++) {
      const idx = b * puestos + p;
      const integrante = integrantesBarajados[idx];
      if (integrante) {
        turnos.push({
          integrante,
          puesto: p + 1,
          desde: minutosAHora(desde),
          hasta: minutosAHora(hasta),
        });
      } else {
        // Si no hay suficiente gente, el puesto queda vacío (no se agrega turno)
      }
    }
    actual = hasta;
  }
  return turnos;
}

export function minutosAHora(min: number): string {
  min = min % (24 * 60);
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
} 