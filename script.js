(() => {
  const $ = (id) => document.getElementById(id);
  const canvas = $('armCanvas');
  const ctx = canvas.getContext('2d');
  const sliders = ['q1', 'q2', 'q3'];
  const lengths = [1.0, 0.78, 0.58]; // illustrative link lengths in metres
  const initial = [25, -35, 45];
  const origin = { x: 165, y: 330 };
  const scale = 175;

  function forward(angles) {
    let x = 0, y = 0, theta = 0;
    const points = [{ x: 0, y: 0 }];
    angles.forEach((deg, i) => {
      theta += deg * Math.PI / 180;
      x += lengths[i] * Math.cos(theta);
      y += lengths[i] * Math.sin(theta);
      points.push({ x, y });
    });
    return points;
  }

  function draw() {
    const angles = sliders.map(id => Number($(id).value));
    const points = forward(angles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Grid and world axes.
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(144,170,197,.12)';
    for (let x = 0; x <= canvas.width; x += 35) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += 35) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(107,224,193,.38)';
    ctx.beginPath(); ctx.moveTo(20, origin.y); ctx.lineTo(canvas.width - 20, origin.y); ctx.stroke();
    // Faint reach envelope.
    ctx.beginPath(); ctx.arc(origin.x, origin.y, lengths.reduce((a,b)=>a+b,0)*scale, Math.PI, Math.PI*2);
    ctx.strokeStyle = 'rgba(126,184,255,.14)'; ctx.setLineDash([5, 7]); ctx.stroke(); ctx.setLineDash([]);
    // Arm links.
    const pix = points.map(p => ({ x: origin.x + p.x*scale, y: origin.y - p.y*scale }));
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(pix[i].x, pix[i].y); ctx.lineTo(pix[i+1].x, pix[i+1].y);
      ctx.lineWidth = 18 - i*3; ctx.lineCap = 'round'; ctx.strokeStyle = ['#6be0c1','#76b7e8','#b5a0ee'][i]; ctx.stroke();
      ctx.beginPath(); ctx.arc(pix[i+1].x, pix[i+1].y, 9, 0, Math.PI*2); ctx.fillStyle = '#edf3fb'; ctx.fill();
      ctx.beginPath(); ctx.arc(pix[i+1].x, pix[i+1].y, 5, 0, Math.PI*2); ctx.fillStyle = '#1a3447'; ctx.fill();
    }
    ctx.beginPath(); ctx.arc(pix[0].x, pix[0].y, 13, 0, Math.PI*2); ctx.fillStyle = '#a6c5d4'; ctx.fill();
    // End effector marker.
    const end = pix[3];
    ctx.beginPath(); ctx.arc(end.x, end.y, 8, 0, Math.PI*2); ctx.fillStyle = '#6be0c1'; ctx.fill();
    ctx.beginPath(); ctx.arc(end.x, end.y, 15, 0, Math.PI*2); ctx.strokeStyle = 'rgba(107,224,193,.45)'; ctx.stroke();
    ctx.fillStyle = '#91a7bd'; ctx.font = '12px DM Sans, sans-serif'; ctx.fillText('BASE', origin.x - 18, origin.y + 28);
    ctx.fillStyle = '#6be0c1'; ctx.fillText('EE', end.x + 12, end.y - 10);
    angles.forEach((a, i) => { $(sliders[i] + 'val').textContent = `${a}°`; });
    $('eePosition').textContent = `x: ${points[3].x.toFixed(2)} m   y: ${points[3].y.toFixed(2)} m`;
    $('demo-status').textContent = 'Kinematic model updated';
  }

  sliders.forEach(id => $(id).addEventListener('input', draw));
  $('resetArm').addEventListener('click', () => {
    sliders.forEach((id, i) => { $(id).value = initial[i]; });
    draw();
  });
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
  }));
  $('year').textContent = new Date().getFullYear();
  draw();
})();
