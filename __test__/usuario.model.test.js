
import {
  agregarUsuario,
  loginUsuario,
  obtenerUsuarios,
  limpiarUsuarios,
} from '../js/models/usuario.model';

beforeEach(() => {
  localStorage.clear();
});

describe('👤 Usuario Model', () => {
  test('debería agregar un nuevo usuario', () => {
    const usuario = {
      nombre: 'Test',
      email: 'test@kora.com',
      password: '1234',
    };

    agregarUsuario(usuario);
    const usuarios = obtenerUsuarios();

    expect(usuarios).toHaveLength(1);
    expect(usuarios[0].email).toBe('test@kora.com');
  });

  test('debería hacer login correctamente con un usuario válido', () => {
    const usuario = {
      nombre: 'Admin',
      email: 'admin@kora.com',
      password: '1234',
    };

    agregarUsuario(usuario);
    const resultado = loginUsuario('admin@kora.com', '1234');

    expect(resultado).not.toBeNull();
    expect(resultado.email).toBe('admin@kora.com');
  });

  test('debería fallar login con credenciales incorrectas', () => {
    agregarUsuario({
      nombre: 'Usuario',
      email: 'user@kora.com',
      password: 'demo123',
    });

    const resultado = loginUsuario('user@kora.com', 'mal');
    expect(resultado).toBeNull();
  });

  test('debería retornar lista vacía si no hay usuarios', () => {
    limpiarUsuarios();
    const usuarios = obtenerUsuarios();
    expect(usuarios).toEqual([]);
  });
});
