let pin;

while (!pin) {
  try {
    pin = prompt('PIN').trim();
    if (pin) {
      localStorage.setItem('pin', pin);
      location.href = '/';
    }
  } catch {}
}