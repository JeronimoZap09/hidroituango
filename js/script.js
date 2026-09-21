let personalData = [];

document.addEventListener('DOMContentLoaded', () => {
  // Solo se ejecuta si estamos en la página que contiene el contenedor de empleados
  if (document.getElementById('grid-personal')) {
    cargarPersonal();
  }
});

async function cargarPersonal() {
  try {
    const response = await fetch('/api/personal');
    if (!response.ok) {
      throw new Error(`Error en la consulta HTTP: ${response.status}`);
    }
    personalData = await response.json();
    renderizarCards(personalData);
  } catch (error) {
    console.error('Error al cargar datos del personal:', error);
    const contenedor = document.getElementById('grid-personal');
    if (contenedor) {
      contenedor.innerHTML = `<p style="color: #ef4444; font-weight: bold;">Error al conectar con el servidor. Verifica que Node.js esté activo.</p>`;
    }
  }
}

function renderizarCards(lista) {
  const contenedor = document.getElementById('grid-personal');
  if (!contenedor) return;
  
  contenedor.innerHTML = '';

  if (lista.length === 0) {
    contenedor.innerHTML = '<p>No se encontraron registros de personal.</p>';
    return;
  }

  lista.forEach(persona => {
    const card = document.createElement('div');
    const tipoClass = persona.tipo ? persona.tipo.toLowerCase() : '';
    
    card.className = `card ${tipoClass}`;
    card.innerHTML = `
      <h3>${persona.nombre}</h3>
      <span class="badge">${persona.tipo} • ${persona.area}</span>
      <div class="card-info">
        <strong>Cargo:</strong> ${persona.cargo}
      </div>
      <div class="card-funcion">
        <strong>Función:</strong> ${persona.funcion}
      </div>
    `;
    contenedor.appendChild(card);
  });
}

function filtrarPersonal(tipo, botonPresionado) {
  const botones = document.querySelectorAll('.filter-controls button');
  botones.forEach(btn => btn.classList.remove('active'));
  
  if (botonPresionado) {
    botonPresionado.classList.add('active');
  }

  if (tipo === 'Todos') {
    renderizarCards(personalData);
  } else {
    const filtrados = personalData.filter(p => p.tipo === tipo);
    renderizarCards(filtrados);
  }
}