// __test__/usuario.model.test.js

import {
  loginUsuario,
  agregarUsuario,
  obtenerUsuarios
} from '../js/models/usuario.model.js';

describe('👤 Usuario Model', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test('debería hacer login correctamente con un usuario válido', () => {
    const mockUsuario = {
      nombre: 'Admin',
      email: 'admin@kora.com',
      password: '1234',
      rol: 'admin'
    };

    agregarUsuario(mockUsuario);

    const resultado = loginUsuario('admin@kora.com', '1234');
    expect(resultado).not.toBeNull();
    expect(resultado.email).toBe('admin@kora.com');
    expect(resultado.rol).toBe('admin');
  });

  test('debería fallar login con credenciales incorrectas', () => {
    agregarUsuario({
      nombre: 'Usuario',
      email: 'user@kora.com',
      password: 'demo123',
      rol: 'usuario'
    });

    const resultado = loginUsuario('user@kora.com', 'wrongpassword');
    expect(resultado).toBeNull();
  });

  test('debería agregar un nuevo usuario', () => {
    const nuevo = {
      nombre: 'Cristian',
      email: 'cristian@kora.com',
      password: 'abc123',
      rol: 'usuario'
    };

    agregarUsuario(nuevo);

    const usuarios = obtenerUsuarios();
    expect(usuarios).toHaveLength(1);
    expect(usuarios[0].email).toBe('cristian@kora.com');
  });

  test('debería retornar lista vacía si no hay usuarios', () => {
    const usuarios = obtenerUsuarios();
    expect(usuarios).toEqual([]);
  });
});
