import { setCookie, getCookie } from './cookies.js';

function initDarkMode() {
  const btn = document.createElement('button');
  btn.id = 'toggle-dark-mode';
  btn.textContent = getCookie('modo') === 'oscuro' ? '☀️' : '🌙';
  document.body.appendChild(btn);

  if (getCookie('modo') === 'oscuro') {
    document.body.classList.add('modo-oscuro');
  }

  btn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('modo-oscuro');
    setCookie('modo', isDark ? 'oscuro' : 'claro');
    btn.textContent = isDark ? '☀️' : '🌙';
  });
}

document.addEventListener('DOMContentLoaded', initDarkMode);
