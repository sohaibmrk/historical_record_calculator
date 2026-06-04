function timeToMinutes(value) {
  if (!value || !value.includes(':')) return 0;
  const [h, m] = value.split(':').map(Number);
  return (h * 60) + m;
}

function minutesToTime(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.abs(totalMinutes % 60);
  return `${h}:${String(m).padStart(2, '0')}`;
}

function safeParseInt(value) {
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? 0 : n;
}

document.addEventListener('DOMContentLoaded', function () {
  const boton = document.getElementById('calcular');
  const resultado = document.getElementById('resultado');

  if (!boton || !resultado) {
    console.error('No se encontró el botón o el bloque de resultado');
    return;
  }

  boton.addEventListener('click', function () {
    const t1 = document.getElementById('t1').value.trim();
    const t2 = document.getElementById('t2').value.trim();
    const t3 = document.getElementById('t3').value.trim();
    const t4 = document.getElementById('t4').value.trim();

    const n1 = safeParseInt(document.getElementById('n1').value);
    const n2 = safeParseInt(document.getElementById('n2').value);
    const n3 = safeParseInt(document.getElementById('n3').value);
    const n4 = safeParseInt(document.getElementById('n4').value);

    const xTime = timeToMinutes(t1);
    const yTime = timeToMinutes(t2);
    const zTime = timeToMinutes(t3);
    const iTime = timeToMinutes(t4);

    // Validación: el REMOVAL no puede ser menor que la INSTALLATION
    const errorBox = document.getElementById('error');
    const errorText = document.getElementById('error-text');
    const hoursInvalid = iTime < xTime;
    const landingInvalid = n4 < n1;

    if (hoursInvalid || landingInvalid) {
      let msg;
      if (hoursInvalid && landingInvalid) {
        msg = 'Error: removal values < installation values.';
      } else if (hoursInvalid) {
        msg = 'Error: removal hours < installation hours.';
      } else if (landingInvalid){
        msg = 'Error: removal landings < installation landings.';
      } else {
        msg = 'Error'
      }
      errorText.textContent = msg;
      errorBox.hidden = false;
      resultado.hidden = true;
      return;
    }

    errorBox.hidden = true;

    document.getElementById('rt1').textContent = minutesToTime(iTime);
    document.getElementById('rt2').textContent = minutesToTime((iTime - xTime) + yTime);
    document.getElementById('rt3').textContent = (zTime === 0) ? '0:00' : minutesToTime((iTime - xTime) + zTime);

    document.getElementById('rn1r').textContent = n4;
    document.getElementById('rn2r').textContent = (n4 - n1) + n2;
    document.getElementById('rn3r').textContent = (n3 === 0) ? 0 : (n4 - n1) + n3;

    resultado.hidden = false;
  });

  /* ----------  Conversor HH:MM  <->  decimal  ---------- */
  const convHM = document.getElementById('convHM');
  const convDec = document.getElementById('convDec');

  if (convHM && convDec) {
    // HH:MM  ->  decimal
    convHM.addEventListener('input', function () {
      const v = convHM.value.trim();
      if (!v.includes(':')) { convDec.value = ''; return; }
      const [h, m] = v.split(':').map(Number);
      if (Number.isNaN(h) || Number.isNaN(m)) { convDec.value = ''; return; }
      const dec = h + (m / 60);
      convDec.value = (Math.round(dec * 100) / 100).toFixed(2);
    });

    // decimal  ->  HH:MM
    convDec.addEventListener('input', function () {
      const num = parseFloat(convDec.value.replace(',', '.'));
      if (Number.isNaN(num)) { convHM.value = ''; return; }
      let h = Math.floor(num);
      let m = Math.round((num - h) * 60);
      if (m === 60) { h += 1; m = 0; }
      convHM.value = `${h}:${String(m).padStart(2, '0')}`;
    });
  }
});
