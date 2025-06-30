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

  // Dividir en bloques de 60 minutos
  const duracionBloque = 60;
  const bloques = Math.ceil(duracionTotal / duracionBloque);

  // Historial de puestos por integrante
  const historial: Record<string, Set<number>> = {};
  integrantes.forEach(int => {
    historial[int.nombre + ' ' + int.apellido] = new Set();
  });

  // Contador de asignaciones por integrante para repartir equitativamente
  const asignaciones: Record<string, number> = {};
  integrantes.forEach(int => {
    asignaciones[int.nombre + ' ' + int.apellido] = 0;
  });

  let turnos: Turno[] = [];
  let actual = minutosInicio;
  let prevAsignados: Set<string> = new Set();

  for (let b = 0; b < bloques; b++) {
    const desde = actual;
    let hasta = actual + duracionBloque;
    if (hasta > minutosFin) hasta = minutosFin;

    // Para este bloque, asignar a cada puesto un integrante que no haya estado en ese puesto
    // y que tenga la menor cantidad de asignaciones y que NO haya estado en el bloque anterior
    const disponibles = [...integrantes];
    const asignadosEsteBloque: Integrante[] = [];
    for (let p = 1; p <= puestos; p++) {
      // Filtrar los que no hayan estado en este puesto y no hayan estado en el bloque anterior
      const candidatos = disponibles.filter(int =>
        !historial[int.nombre + ' ' + int.apellido].has(p) &&
        !prevAsignados.has(int.nombre + ' ' + int.apellido)
      );
      // Si no hay candidatos, permitir a cualquiera que no haya estado en el bloque anterior
      let seleccionables = candidatos.length > 0
        ? candidatos
        : disponibles.filter(int => !prevAsignados.has(int.nombre + ' ' + int.apellido));
      // Si aún no hay suficientes, permitir a cualquiera
      if (seleccionables.length === 0) seleccionables = disponibles;
      // Elegir el que tenga menos asignaciones
      seleccionables = seleccionables.sort((a, b) => asignaciones[a.nombre + ' ' + a.apellido] - asignaciones[b.nombre + ' ' + b.apellido]);
      // Si hay empate, elegir aleatorio
      const minAsign = asignaciones[seleccionables[0].nombre + ' ' + seleccionables[0].apellido];
      const empatados = seleccionables.filter(int => asignaciones[int.nombre + ' ' + int.apellido] === minAsign);
      const elegido = empatados[Math.floor(Math.random() * empatados.length)];
      // Asignar
      turnos.push({
        integrante: elegido,
        puesto: p,
        desde: minutosAHora(desde),
        hasta: minutosAHora(hasta),
      });
      historial[elegido.nombre + ' ' + elegido.apellido].add(p);
      asignaciones[elegido.nombre + ' ' + elegido.apellido]++;
      // Quitar de disponibles para este bloque
      const idx = disponibles.findIndex(int => int.nombre === elegido.nombre && int.apellido === elegido.apellido);
      if (idx !== -1) disponibles.splice(idx, 1);
      asignadosEsteBloque.push(elegido);
    }
    actual = hasta;
    // Guardar los asignados de este bloque para el siguiente
    prevAsignados = new Set(asignadosEsteBloque.map(int => int.nombre + ' ' + int.apellido));
  }
  return turnos;
}

export function minutosAHora(min: number): string {
  min = min % (24 * 60);
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
} 