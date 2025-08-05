export function initDB() {
  const request = indexedDB.open('koraDB', 1);

  request.onupgradeneeded = (e) => {
    const db = e.target.result;

    if (!db.objectStoreNames.contains('productos')) {
      db.createObjectStore('productos', { keyPath: 'id' });
    }

    if (!db.objectStoreNames.contains('usuarios')) {
      db.createObjectStore('usuarios', { keyPath: 'email' });
    }
  };

  request.onerror = () => console.error("❌ Error en IndexedDB");
  request.onsuccess = () => console.log("✅ IndexedDB lista");
}
