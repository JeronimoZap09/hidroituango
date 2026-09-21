let personalData = [];

document.addEventListener('DOMContentLoaded', () => {
  cargarPersonal();
});

async function cargarPersonal() {
  try {
    const response = await fetch('/api/personal');
    personalData = await response.json();
    renderizarCards(personalData);
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
}

function renderizarCards(lista) {
  const contenedor = document.getElementById('grid-personal');
  contenedor.innerHTML = '';

  lista.forEach(persona => {
    const card = document.createElement('div');
    card.className = `card ${persona.tipo.toLowerCase()}`;
    card.innerHTML = `
      <h3>${persona.nombre}</h3>
      <span class="badge">${persona.tipo} - ${persona.area}</span>
      <p><strong>Cargo:</strong> ${persona.cargo}</p>
      <p style="margin-top: 8px;"><strong>Función:</strong> ${persona.funcion}</p>
    `;
    contenedor.appendChild(card);
  });
}

function filtrarPersonal(tipo) {
  if (tipo === 'Todos') {
    renderizarCards(personalData);
  } else {
    const filtrados = personalData.filter(p => p.tipo === tipo);
    renderizarCards(filtrados);
  }
}