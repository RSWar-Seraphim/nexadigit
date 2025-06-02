// src/components/notify.ts

let notifyRoot: HTMLElement | null = null;

export function notify(msg: string, type: 'success' | 'error' = 'success', timeout = 3000) {
  if (!notifyRoot) {
    notifyRoot = document.createElement('div');
    notifyRoot.className = 'fixed top-5 right-5 z-[9999] flex flex-col gap-3 items-end pointer-events-none';
    document.body.appendChild(notifyRoot);
  }

  const el = document.createElement('div');
  el.className = [
    'pointer-events-auto shadow-xl rounded-lg px-5 py-3 min-w-[210px] max-w-xs flex items-center gap-2',
    'text-sm font-montserrat font-semibold',
    type === 'success'
      ? 'bg-[#006E49] text-white'
      : 'bg-red-600 text-white'
  ].join(' ');
    el.innerHTML = `
    <span>${msg}</span>
    <button
      class="nx-notify-x ml-3 text-lg leading-none hover:scale-125 transition"
      style="pointer-events:auto;"
    >&times;</button>
  `;
  notifyRoot.appendChild(el);

  // Cerrar al hacer click en la X
  const btn = el.querySelector('button');
  btn?.addEventListener('click', () => el.remove());

  setTimeout(() => el.remove(), timeout);
}
