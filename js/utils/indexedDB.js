// js/utils/indexedDB.js
export function abrirDB(nombre = 'koraDB', version = 1) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(nombre, version);

    request.onupgradeneeded = (event) => {
      const db = request.result;

      if (!db.objectStoreNames.contains('productos')) {
        const store = db.createObjectStore('productos', { keyPath: 'id' });
        store.createIndex('nombre', 'nombre', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function guardarProducto(producto) {
  const db = await abrirDB();
  const tx = db.transaction('productos', 'readwrite');
  const store = tx.objectStore('productos');
  store.put(producto);
  await tx.complete;
}

export async function guardarProductosLista(lista) {
  const db = await abrirDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('productos', 'readwrite');
    const store = tx.objectStore('productos');

    lista.forEach(producto => store.put(producto));

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function obtenerTodosLosProductos() {
  const db = await abrirDB();
  const tx = db.transaction('productos', 'readonly');
  const store = tx.objectStore('productos');
  return store.getAll();
}

export async function eliminarProducto(id) {
  const db = await abrirDB();
  const tx = db.transaction('productos', 'readwrite');
  const store = tx.objectStore('productos');
  store.delete(id);
  await tx.complete;
}
