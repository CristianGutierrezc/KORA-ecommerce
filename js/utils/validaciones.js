document.addEventListener('DOMContentLoaded', () => {
  // === Modo oscuro desde cookie ===
  if (document.cookie.includes('modo=oscuro')) {
    document.body.classList.add('modo-oscuro');
  }

  // 🌙 Botón modo oscuro flotante
  const modoBtn = document.createElement('button');
  modoBtn.id = 'toggle-dark-mode';
  modoBtn.textContent = document.body.classList.contains('modo-oscuro') ? '☀️' : '🌙';
  modoBtn.style.position = 'fixed';
  modoBtn.style.bottom = '10px';
  modoBtn.style.right = '10px';
  modoBtn.style.padding = '0.5rem';
  modoBtn.style.zIndex = '1000';
  document.body.appendChild(modoBtn);

  modoBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('modo-oscuro');
    document.cookie = `modo=${isDark ? 'oscuro' : 'claro'};path=/`;
    modoBtn.textContent = isDark ? '☀️' : '🌙';
  });

  // === Controles de búsqueda, filtros y vista ===
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

  // Eventos
  buscador.addEventListener('input', aplicarFiltrosYRenderizar);
  ordenarSelect.addEventListener('change', aplicarFiltrosYRenderizar);
  precioSelect.addEventListener('change', aplicarFiltrosYRenderizar);

  document.getElementById('vista-toggle').addEventListener('click', () => {
    grid.classList.toggle('grid-productos');
    grid.classList.toggle('vista-lista');
  });

  // === Menú hamburguesa en móviles ===
  const hamburguesa = document.getElementById("hamburguesa");
  const fondoOscuro = document.getElementById("fondo-oscuro");

  if (hamburguesa && fondoOscuro) {
    hamburguesa.addEventListener("click", () => {
      document.getElementById("menu-lateral").classList.toggle("activo");
      fondoOscuro.classList.toggle("visible");
    });

    fondoOscuro.addEventListener("click", () => {
      document.getElementById("menu-lateral").classList.remove("activo");
      fondoOscuro.classList.remove("visible");
    });
  }

  // Render inicial
  render(productosOriginales);
});
