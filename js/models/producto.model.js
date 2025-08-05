
export function agregarProducto(producto) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('koraDB');
    request.onsuccess = (e) => {
      const db = e.target.result;
      const tx = db.transaction('productos', 'readwrite');
      const store = tx.objectStore('productos');
      store.put(producto);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject('Error al guardar producto');
    };
  });
}

export function obtenerTodosLosProductos() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('koraDB');
    request.onsuccess = (e) => {
      const db = e.target.result;
      const tx = db.transaction('productos', 'readonly');
      const store = tx.objectStore('productos');
      const productos = [];

      store.openCursor().onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
          productos.push(cursor.value);
          cursor.continue();
        } else {
          resolve(productos);
        }
      };
    };
    request.onerror = () => reject('Error al leer productos');
  });
}
export function crearProductoEjemplo() {
  return {
    id: crypto.randomUUID(),
    nombre: 'Camiseta Test',
    descripcion: 'Un producto de prueba',
    precio: 20,
    imagen: 'img/test.png'
  };
}
