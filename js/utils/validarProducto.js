export function validarProducto(producto, lista = []) {
  if (!producto.nombre || !producto.descripcion || !producto.precio || !producto.imagen) {
    return { valido: false, mensaje: 'Todos los campos son obligatorios.' };
  }

  if (producto.descripcion.length > 150) {
    return { valido: false, mensaje: 'La descripción no puede superar los 150 caracteres.' };
  }

  if (isNaN(producto.precio) || Number(producto.precio) <= 0) {
    return { valido: false, mensaje: 'El precio debe ser un número válido.' };
  }

  const urlRegex = /\.(jpeg|jpg|png|webp|gif)$/i;
  if (!urlRegex.test(producto.imagen)) {
    return { valido: false, mensaje: 'La URL debe ser válida y apuntar a una imagen.' };
  }

  const duplicado = lista.some(
    p => p.nombre.toLowerCase() === producto.nombre.toLowerCase() && p.id !== producto.id
  );
  if (duplicado) {
    return { valido: false, mensaje: 'Ya existe un producto con ese nombre.' };
  }

  return { valido: true };
}
