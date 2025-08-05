document.addEventListener('DOMContentLoaded', () => {
  // 🌙 Botón de modo oscuro
  const modoBtn = document.createElement('button');
  modoBtn.textContent = '🌙';
  modoBtn.className = 'btn-modo';
  modoBtn.setAttribute('aria-label', 'Alternar modo oscuro');
  document.body.appendChild(modoBtn);

  // Contenedor de controles (orden, precio, vista, búsqueda)
  const controles = document.createElement('div');
  controles.className = 'barra-controles';
  controles.innerHTML = `
    <select id="ordenar">
      <option value="defecto">Ordenar</option>
      <option value="az">A-Z</option>
      <option value="za">Z-A</option>
    </select>
    <select id="precio">
      <option value="defecto">Filtrar precio</option>
      <option value="mayor">Mayor a menor</option>
      <option value="menor">Menor a mayor</option>
    </select>
    <button id="vista-toggle">Cambiar Vista</button>
    <input type="text" id="busqueda-productos" placeholder="Buscar productos..." class="busqueda-input" />
  `;
  document.querySelector('main')?.prepend(controles);

  const grid = document.getElementById('contenedor-productos');
  const ordenarSelect = document.getElementById('ordenar');
  const precioSelect = document.getElementById('precio');
  const buscador = document.getElementById('busqueda-productos');

  const productosOriginales = JSON.parse(localStorage.getItem('productos')) || [];

  // Búsqueda
  buscador.addEventListener('input', aplicarFiltrosYRenderizar);

  // Aplicar filtros
  ordenarSelect.addEventListener('change', aplicarFiltrosYRenderizar);
  precioSelect.addEventListener('change', aplicarFiltrosYRenderizar);

  // Cambiar vista
  document.getElementById('vista-toggle').addEventListener('click', () => {
    grid.classList.toggle('grid-productos');
    grid.classList.toggle('vista-lista');
  });

  // Aplicar filtros y búsqueda
  function aplicarFiltrosYRenderizar() {
    let productosAMostrar = [...productosOriginales];
    const orden = ordenarSelect.value;
    const precio = precioSelect.value;
    const texto = buscador.value.trim().toLowerCase();

    if (orden === 'az') productosAMostrar.sort((a, b) => a.nombre.localeCompare(b.nombre));
    else if (orden === 'za') productosAMostrar.sort((a, b) => b.nombre.localeCompare(a.nombre));

    if (precio === 'mayor') productosAMostrar.sort((a, b) => b.precio - a.precio);
    else if (precio === 'menor') productosAMostrar.sort((a, b) => a.precio - b.precio);

    if (texto) {
      productosAMostrar = productosAMostrar.filter(p => p.nombre.toLowerCase().includes(texto));
    }

    render(productosAMostrar);
  }

  // Pintar productos
  function render(productos) {
    grid.innerHTML = '';
    if (productos.length === 0) {
      document.getElementById('mensaje-vacio').style.display = 'block';
      return;
    }
    document.getElementById('mensaje-vacio').style.display = 'none';

    productos.forEach(producto => {
      const card = document.createElement('div');
      card.className = 'producto-card';
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img"/>
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <span class="precio">${producto.precio} €</span>
        <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
      `;
      grid.appendChild(card);
    });
  }

  // Modo oscuro con cookie
  modoBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('modo-oscuro');
    document.cookie = `modo=${isDark ? 'oscuro' : 'claro'};path=/`;
  });

  if (document.cookie.includes('modo=oscuro')) {
    document.body.classList.add('modo-oscuro');
  }

  render(productosOriginales);
});

// ☰ Abrir/Cerrar menú lateral en móviles (solo si existen los elementos)
document.getElementById("hamburguesa")?.addEventListener("click", () => {
  document.getElementById("menu-lateral")?.classList.toggle("activo");
  document.getElementById("fondo-oscuro")?.classList.toggle("visible");
});

document.getElementById("fondo-oscuro")?.addEventListener("click", () => {
  document.getElementById("menu-lateral")?.classList.remove("activo");
  document.getElementById("fondo-oscuro")?.classList.remove("visible");
});

// Aplica modo oscuro automáticamente si está activado por cookie
document.addEventListener("DOMContentLoaded", () => {
  if (document.cookie.includes("modo=oscuro")) {
    document.body.classList.add("modo-oscuro");
  }
});
