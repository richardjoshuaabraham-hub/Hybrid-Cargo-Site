const heroSlides = [
  {
    image: 'assets/hero-ship.svg',
    title: 'Hybrid vessel departure mode',
    text: 'Battery-assisted port departure keeps berth-side emissions and noise lower during loading operations.'
  },
  {
    image: 'assets/route-terminal.svg',
    title: 'Terminal and trailer coordination',
    text: 'Port-side trailer sequencing and berth assignment are aligned to the ship loading window.'
  },
  {
    image: 'assets/tracking-hub.svg',
    title: 'Tracking and operations visibility',
    text: 'Cargo milestones, vessel position, and hybrid operating mode remain visible throughout the voyage.'
  }
];

const routeCatalog = [
  { id: 'rot-ham', label: 'Rotterdam → Hamburg', distanceNm: 288, seaDays: 1.4, electricBias: 0.38, baseWeather: 1.0, wind: '18 kn', wave: '1.8 m' },
  { id: 'ant-osl', label: 'Antwerp → Oslo', distanceNm: 492, seaDays: 2.2, electricBias: 0.29, baseWeather: 1.3, wind: '21 kn', wave: '2.2 m' },
  { id: 'sou-bil', label: 'Southampton → Bilbao', distanceNm: 650, seaDays: 2.8, electricBias: 0.24, baseWeather: 1.5, wind: '24 kn', wave: '2.8 m' },
  { id: 'ham-cph', label: 'Hamburg → Copenhagen', distanceNm: 210, seaDays: 1.1, electricBias: 0.44, baseWeather: 0.9, wind: '15 kn', wave: '1.4 m' }
];

const cargoTypes = [
  { id: 'containers', label: 'Containerized freight', loadFactor: 1.0 },
  { id: 'coldchain', label: 'Cold chain logistics', loadFactor: 1.08 },
  { id: 'machinery', label: 'Industrial machinery', loadFactor: 1.12 },
  { id: 'automotive', label: 'Automotive and trailer cargo', loadFactor: 1.05 }
];

const weatherProfiles = [
  { id: 'calm', label: 'Calm', multiplier: 0.94, risk: 'Low' },
  { id: 'mixed', label: 'Mixed', multiplier: 1.0, risk: 'Moderate' },
  { id: 'rough', label: 'Rough', multiplier: 1.1, risk: 'Elevated' },
  { id: 'storm', label: 'Storm exposure', multiplier: 1.22, risk: 'High' }
];

let vessels = [
  {
    id: 'aurora',
    name: 'MV Aurora Link',
    route: 'Rotterdam → Hamburg',
    status: 'Approaching berth',
    batteryPct: 76,
    fuelPct: 61,
    etaHours: 5.4,
    mode: 'Electric blend',
    emissionsKgHr: 242,
    cargoLoad: 72,
    weather: 'Calm',
    image: 'assets/hero-ship.svg'
  },
  {
    id: 'nexus',
    name: 'MV Nexus Hybrid',
    route: 'Southampton → Bilbao',
    status: 'At sea',
    batteryPct: 49,
    fuelPct: 81,
    etaHours: 26.8,
    mode: 'Fuel priority',
    emissionsKgHr: 552,
    cargoLoad: 85,
    weather: 'Rough',
    image: 'assets/route-terminal.svg'
  },
  {
    id: 'vector',
    name: 'MV Vector Tide',
    route: 'Antwerp → Oslo',
    status: 'Loading',
    batteryPct: 67,
    fuelPct: 73,
    etaHours: 19.6,
    mode: 'Electric blend',
    emissionsKgHr: 412,
    cargoLoad: 81,
    weather: 'Mixed',
    image: 'assets/tracking-hub.svg'
  }
];

const trackingSets = {
  'BH-2048-NR': [
    { time: '08:10', label: 'Booking confirmed', detail: 'Commercial rate, hybrid mode forecast, and emissions baseline locked in.', state: 'done' },
    { time: '09:45', label: 'Cargo assigned', detail: 'Container slot allocated and trailer dispatch synchronized to terminal availability.', state: 'done' },
    { time: '12:30', label: 'Port gate-in', detail: 'Freight entered the terminal and loading queue was validated.', state: 'done' },
    { time: '16:20', label: 'Hybrid dispatch plan', detail: 'Electric departure segment reserved for low-emission berth exit.', state: 'active' },
    { time: '19:10', label: 'Live transit monitoring', detail: 'ETA, route weather, and carbon intensity continue updating during transit.', state: 'upcoming' }
  ],
  'BH-3162-AX': [
    { time: '06:35', label: 'Booking confirmed', detail: 'Long-haul mixed-weather route priced with fuel-mode reserve margin.', state: 'done' },
    { time: '07:40', label: 'Customs validation', detail: 'Documents matched against vessel slot and sailing window.', state: 'done' },
    { time: '11:10', label: 'Terminal queue update', detail: 'Trailer arrival retimed to avoid peak gate congestion.', state: 'active' },
    { time: '14:00', label: 'Departure forecast', detail: 'Revised ETA issued after wind exposure model refresh.', state: 'upcoming' },
    { time: '21:40', label: 'Live corridor transit', detail: 'Fuel and electric segments rebalance based on wave conditions.', state: 'upcoming' }
  }
};

const els = {
  menuToggle: document.getElementById('menuToggle'),
  sidebar: document.getElementById('sidebar'),
  heroImage: document.getElementById('heroImage'),
  heroTitle: document.getElementById('heroTitle'),
  heroText: document.getElementById('heroText'),
  heroThumbs: document.getElementById('heroThumbs'),
  route: document.getElementById('route'),
  cargoType: document.getElementById('cargoType'),
  weather: document.getElementById('weather'),
  bookingRef: document.getElementById('bookingRef'),
  load: document.getElementById('load'),
  delay: document.getElementById('delay'),
  shorePower: document.getElementById('shorePower'),
  priorityGreen: document.getElementById('priorityGreen'),
  loadValue: document.getElementById('loadValue'),
  delayValue: document.getElementById('delayValue'),
  voyagePrice: document.getElementById('voyagePrice'),
  etaDays: document.getElementById('etaDays'),
  reliabilityScore: document.getElementById('reliabilityScore'),
  carbonSaved: document.getElementById('carbonSaved'),
  electricText: document.getElementById('electricText'),
  fuelText: document.getElementById('fuelText'),
  electricBar: document.getElementById('electricBar'),
  fuelBar: document.getElementById('fuelBar'),
  hybridEmission: document.getElementById('hybridEmission'),
  conventionalEmission: document.getElementById('conventionalEmission'),
  carbonIntensity: document.getElementById('carbonIntensity'),
  hybridFuelCost: document.getElementById('hybridFuelCost'),
  insightTitle: document.getElementById('insightTitle'),
  insightText: document.getElementById('insightText'),
  insightTags: document.getElementById('insightTags'),
  recalculateBtn: document.getElementById('recalculateBtn'),
  routeStatusTitle: document.getElementById('routeStatusTitle'),
  routeRiskTag: document.getElementById('routeRiskTag'),
  routeWind: document.getElementById('routeWind'),
  routeWave: document.getElementById('routeWave'),
  routeMode: document.getElementById('routeMode'),
  routeDistance: document.getElementById('routeDistance'),
  routeImage: document.getElementById('routeImage'),
  shipShape: document.getElementById('shipShape'),
  shipGlow: document.getElementById('shipGlow'),
  fleetGrid: document.getElementById('fleetGrid'),
  vesselFocus: document.getElementById('vesselFocus'),
  toggleSimulation: document.getElementById('toggleSimulation'),
  trackingSelect: document.getElementById('trackingSelect'),
  timeline: document.getElementById('timeline'),
  advanceTracking: document.getElementById('advanceTracking'),
  trackingHeadline: document.getElementById('trackingHeadline'),
  trackingBody: document.getElementById('trackingBody'),
  trackingTags: document.getElementById('trackingTags'),
  mCarbon: document.getElementById('mCarbon'),
  mReliability: document.getElementById('mReliability'),
  mBattery: document.getElementById('mBattery'),
  mEmission: document.getElementById('mEmission'),
  sidebarActiveVessels: document.getElementById('sidebarActiveVessels'),
  sidebarCarbon: document.getElementById('sidebarCarbon'),
  themePulseBtn: document.getElementById('themePulseBtn')
};

let heroIndex = 0;
let selectedVesselId = vessels[0].id;
let currentTrackingRef = 'BH-2048-NR';
let shipProgress = 0.14;
let simulationOn = true;
let simTimer = null;

function formatNumber(value, digits = 1) {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: digits }).format(value);
}

function populateSelect(select, items) {
  items.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.label;
    select.appendChild(option);
  });
}

function renderHero() {
  const slide = heroSlides[heroIndex];
  els.heroImage.src = slide.image;
  els.heroTitle.textContent = slide.title;
  els.heroText.textContent = slide.text;
  [...els.heroThumbs.children].forEach((btn, idx) => btn.classList.toggle('active', idx === heroIndex));
}

function buildHeroThumbs() {
  heroSlides.forEach((slide, index) => {
    const btn = document.createElement('button');
    btn.className = 'thumb-btn' + (index === 0 ? ' active' : '');
    btn.innerHTML = `<img src="${slide.image}" alt="${slide.title}">`;
    btn.addEventListener('click', () => {
      heroIndex = index;
      renderHero();
    });
    els.heroThumbs.appendChild(btn);
  });
}

function calculateEstimate() {
  const route = routeCatalog.find(item => item.id === els.route.value);
  const cargo = cargoTypes.find(item => item.id === els.cargoType.value);
  const weather = weatherProfiles.find(item => item.id === els.weather.value);
  const loadTonnes = Number(els.load.value);
  const departureDelay = Number(els.delay.value);
  const shorePower = els.shorePower.checked;
  const priorityGreen = els.priorityGreen.checked;

  const electricEligibleNm = Math.min(route.distanceNm * (priorityGreen ? route.electricBias + 0.08 : route.electricBias), 185);
  const fuelNm = Math.max(route.distanceNm - electricEligibleNm, 0);
  const loadMultiplier = 0.84 + loadTonnes / 500;
  const weatherMultiplier = weather.multiplier * (1 + route.baseWeather / 12);
  const cargoMultiplier = cargo.loadFactor;
  const delayMultiplier = 1 + departureDelay * 0.015;
  const shoreFactor = shorePower ? 0.93 : 1;

  const fuelEmissionKg = fuelNm * 6.8 * loadMultiplier * weatherMultiplier * cargoMultiplier * delayMultiplier;
  const electricEmissionKg = electricEligibleNm * 1.4 * loadMultiplier * weatherMultiplier * shoreFactor;
  const hybridEmissionKg = fuelEmissionKg + electricEmissionKg;
  const conventionalEmissionKg = route.distanceNm * 8.9 * loadMultiplier * weatherMultiplier * cargoMultiplier * delayMultiplier;
  const carbonSavedKg = Math.max(conventionalEmissionKg - hybridEmissionKg, 0);

  const hybridFuelCost = fuelNm * 4.7 * loadMultiplier * weatherMultiplier * cargoMultiplier;
  const voyagePrice = hybridFuelCost * 1.37 + loadTonnes * 2.7 + departureDelay * 22 + (weather.id === 'storm' ? 220 : 0);
  const reliabilityScore = Math.max(66, Math.min(97, 94 - route.baseWeather * 6 - departureDelay * .85 - (weather.id === 'storm' ? 8 : weather.id === 'rough' ? 3 : -2)));
  const etaDays = route.seaDays * weatherMultiplier + departureDelay / 24;

  return {
    route,
    weather,
    electricEligibleNm,
    fuelNm,
    hybridEmissionKg,
    conventionalEmissionKg,
    carbonSavedKg,
    hybridFuelCost,
    voyagePrice,
    reliabilityScore,
    etaDays,
    carbonIntensity: hybridEmissionKg / Math.max(loadTonnes, 1)
  };
}

function renderEstimate() {
  const data = calculateEstimate();
  const totalDistance = data.electricEligibleNm + data.fuelNm;
  const electricPct = totalDistance ? data.electricEligibleNm / totalDistance * 100 : 0;
  const fuelPct = totalDistance ? data.fuelNm / totalDistance * 100 : 0;

  els.loadValue.textContent = `${formatNumber(Number(els.load.value), 0)} tonnes`;
  els.delayValue.textContent = `${formatNumber(Number(els.delay.value), 0)} hours`;
  els.voyagePrice.textContent = `£${formatNumber(data.voyagePrice)}`;
  els.etaDays.textContent = `${formatNumber(data.etaDays)} days`;
  els.reliabilityScore.textContent = `${formatNumber(data.reliabilityScore, 0)}/100`;
  els.carbonSaved.textContent = `${formatNumber(data.carbonSavedKg / 1000)} t`;
  els.hybridEmission.textContent = `${formatNumber(data.hybridEmissionKg)} kg`;
  els.conventionalEmission.textContent = `${formatNumber(data.conventionalEmissionKg)} kg`;
  els.carbonIntensity.textContent = `${formatNumber(data.carbonIntensity)} kg/t`;
  els.hybridFuelCost.textContent = `£${formatNumber(data.hybridFuelCost)}`;
  els.electricText.textContent = `${formatNumber(data.electricEligibleNm, 0)} nautical miles`;
  els.fuelText.textContent = `${formatNumber(data.fuelNm, 0)} nautical miles`;
  els.electricBar.style.width = `${electricPct}%`;
  els.fuelBar.style.width = `${fuelPct}%`;

  els.insightTitle.textContent = data.weather.risk === 'High' ? 'Storm-resilient booking recommended' : 'Balanced hybrid booking recommended';
  els.insightText.textContent = `This voyage is forecast with ${data.weather.risk.toLowerCase()} weather exposure and an estimated reliability score of ${formatNumber(data.reliabilityScore, 0)}/100. Electric operations remain strongest during berth departure and coastal entry.`;
  els.insightTags.innerHTML = '';
  [
    `${data.weather.risk} weather exposure`,
    `${formatNumber(data.electricEligibleNm, 0)} nm electric segment`,
    `${formatNumber(data.carbonSavedKg / 1000)} t CO₂ avoided`,
    els.shorePower.checked ? 'Shore power enabled' : 'Shore power off'
  ].forEach(tag => {
    const span = document.createElement('span');
    span.className = 'chip';
    span.textContent = tag;
    els.insightTags.appendChild(span);
  });

  renderRoutePanel(data.route, data.weather, electricPct);
}

function routePoint(t) {
  const p0 = [110, 380], p1 = [230, 350], p2 = [270, 280], p3 = [380, 250], p4 = [560, 220], p5 = [660, 180], p6 = [810, 140], p7 = [860, 110];
  // Piecewise cubic-ish interpolation simplified for visual motion.
  const lerp = (a, b, x) => a + (b - a) * x;
  if (t < 0.5) {
    const x = t / 0.5;
    return [
      lerp(110, 380, x),
      lerp(380, 250, x) - Math.sin(x * Math.PI) * 26
    ];
  }
  const x = (t - 0.5) / 0.5;
  return [
    lerp(380, 860, x),
    lerp(250, 110, x) - Math.sin(x * Math.PI) * 18
  ];
}

function renderRoutePanel(route, weather, electricPct) {
  els.routeStatusTitle.textContent = route.label;
  els.routeRiskTag.textContent = `${weather.risk} weather risk`;
  els.routeWind.textContent = route.wind;
  els.routeWave.textContent = route.wave;
  els.routeMode.textContent = electricPct > 34 ? 'Electric blend' : 'Fuel priority';
  els.routeDistance.textContent = `${formatNumber(route.distanceNm * (1 - shipProgress), 0)} nm`;
  els.routeImage.src = route.id === 'sou-bil' ? 'assets/tracking-hub.svg' : route.id === 'ant-osl' ? 'assets/route-terminal.svg' : 'assets/hero-ship.svg';

  const [x, y] = routePoint(shipProgress);
  els.shipShape.setAttribute('transform', `translate(${x - 200} ${y - 346})`);
  els.shipGlow.setAttribute('cx', x);
  els.shipGlow.setAttribute('cy', y);
}

function renderFleet() {
  els.fleetGrid.innerHTML = '';
  vessels.forEach(vessel => {
    const card = document.createElement('article');
    card.className = 'vessel-card card inset' + (vessel.id === selectedVesselId ? ' active' : '');
    card.innerHTML = `
      <img src="${vessel.image}" alt="${vessel.name}">
      <h4>${vessel.name}</h4>
      <div class="vessel-meta">
        <div><span>Route</span><strong>${vessel.route}</strong></div>
        <div><span>Status</span><strong>${vessel.status}</strong></div>
        <div><span>Battery</span><strong>${vessel.batteryPct}%</strong></div>
        <div><span>Fuel</span><strong>${vessel.fuelPct}%</strong></div>
      </div>
    `;
    card.addEventListener('click', () => {
      selectedVesselId = vessel.id;
      renderFleet();
    });
    els.fleetGrid.appendChild(card);
  });

  const vessel = vessels.find(item => item.id === selectedVesselId);
  els.vesselFocus.innerHTML = `
    <img src="${vessel.image}" alt="${vessel.name}">
    <span class="mini-label">Selected vessel</span>
    <h3>${vessel.name}</h3>
    <p style="color:var(--muted); line-height:1.65; margin-top:8px;">${vessel.route} · ${vessel.status}. Hybrid dispatch is currently set to <strong>${vessel.mode}</strong> under ${vessel.weather.toLowerCase()} weather exposure.</p>
    <div class="focus-grid">
      <article><strong>${vessel.batteryPct}%</strong><span>Battery state</span></article>
      <article><strong>${vessel.fuelPct}%</strong><span>Fuel reserve</span></article>
      <article><strong>${formatNumber(vessel.etaHours)} h</strong><span>ETA</span></article>
      <article><strong>${vessel.emissionsKgHr} kg/hr</strong><span>Emission rate</span></article>
      <article><strong>${vessel.cargoLoad}%</strong><span>Cargo fill</span></article>
      <article><strong>${vessel.weather}</strong><span>Weather exposure</span></article>
    </div>
  `;

  const avgBattery = vessels.reduce((sum, item) => sum + item.batteryPct, 0) / vessels.length;
  const avgEmission = vessels.reduce((sum, item) => sum + item.emissionsKgHr, 0) / vessels.length;
  const avgReliability = Math.round(95 - vessels.reduce((sum, item) => sum + (item.weather === 'Rough' ? 6 : item.weather === 'Mixed' ? 3 : 1), 0) / vessels.length);
  const weeklyCarbon = (18 + avgBattery / 100).toFixed(1);

  els.mBattery.textContent = `${Math.round(avgBattery)}%`;
  els.mEmission.textContent = `${Math.round(avgEmission)} kg/hr`;
  els.mReliability.textContent = `${avgReliability}/100`;
  els.mCarbon.textContent = `${weeklyCarbon} t`;
  els.sidebarActiveVessels.textContent = `${vessels.length} vessels active`;
  els.sidebarCarbon.textContent = `${weeklyCarbon} t CO₂`;
}

function renderTracking() {
  const set = trackingSets[currentTrackingRef];
  els.timeline.innerHTML = '';
  set.forEach(item => {
    const row = document.createElement('div');
    row.className = `timeline-item ${item.state}`;
    row.innerHTML = `
      <div class="timeline-dot"></div>
      <div>
        <span class="timeline-time">${item.time}</span>
        <h5>${item.label}</h5>
        <p>${item.detail}</p>
      </div>
    `;
    els.timeline.appendChild(row);
  });

  const active = set.find(item => item.state === 'active') || set[set.length - 1];
  els.trackingHeadline.textContent = active.label;
  els.trackingBody.textContent = active.detail;
  els.trackingTags.innerHTML = '';
  [currentTrackingRef, active.state === 'active' ? 'Live milestone' : 'Queued milestone', 'Trailer sync active'].forEach(tag => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.textContent = tag;
    els.trackingTags.appendChild(chip);
  });
}

function advanceTrackingState() {
  const set = trackingSets[currentTrackingRef];
  const activeIndex = set.findIndex(item => item.state === 'active');
  if (activeIndex >= 0) {
    set[activeIndex].state = 'done';
    if (set[activeIndex + 1]) set[activeIndex + 1].state = 'active';
  }
  renderTracking();
}

function toggleCardState(target) {
  target.closest('.toggle-card').classList.toggle('active', target.checked);
  renderEstimate();
}

function stepSimulation() {
  shipProgress += 0.01;
  if (shipProgress > 0.96) shipProgress = 0.14;
  vessels = vessels.map((vessel, index) => {
    const batteryDelta = vessel.mode === 'Electric blend' ? -1 : 1;
    const fuelDelta = vessel.mode === 'Fuel priority' ? -1 : 0;
    return {
      ...vessel,
      batteryPct: Math.max(36, Math.min(88, vessel.batteryPct + batteryDelta * (index === 0 ? 1 : 0.5))),
      fuelPct: Math.max(42, Math.min(90, vessel.fuelPct + fuelDelta * 0.6)),
      etaHours: Math.max(3.2, vessel.etaHours - 0.25),
      emissionsKgHr: Math.max(210, Math.round(vessel.emissionsKgHr + (Math.random() * 24 - 12))),
      status: vessel.etaHours < 7 ? 'Approaching berth' : vessel.status
    };
  });
  renderFleet();
  renderEstimate();
}

function initSimulation() {
  simTimer = setInterval(() => {
    if (simulationOn) stepSimulation();
  }, 2200);
}

function init() {
  populateSelect(els.route, routeCatalog);
  populateSelect(els.cargoType, cargoTypes);
  populateSelect(els.weather, weatherProfiles);
  Object.keys(trackingSets).forEach(key => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;
    els.trackingSelect.appendChild(option);
  });

  els.route.value = routeCatalog[0].id;
  els.cargoType.value = cargoTypes[0].id;
  els.weather.value = weatherProfiles[1].id;
  buildHeroThumbs();
  renderHero();
  renderEstimate();
  renderFleet();
  renderTracking();
  initSimulation();

  els.menuToggle.addEventListener('click', () => els.sidebar.classList.toggle('open'));
  els.load.addEventListener('input', renderEstimate);
  els.delay.addEventListener('input', renderEstimate);
  els.route.addEventListener('change', renderEstimate);
  els.cargoType.addEventListener('change', renderEstimate);
  els.weather.addEventListener('change', renderEstimate);
  els.recalculateBtn.addEventListener('click', renderEstimate);
  els.shorePower.addEventListener('change', (e) => toggleCardState(e.target));
  els.priorityGreen.addEventListener('change', (e) => toggleCardState(e.target));
  els.toggleSimulation.addEventListener('click', () => {
    simulationOn = !simulationOn;
    els.toggleSimulation.textContent = simulationOn ? 'Pause live simulation' : 'Resume live simulation';
  });
  els.trackingSelect.addEventListener('change', () => {
    currentTrackingRef = els.trackingSelect.value;
    renderTracking();
  });
  els.advanceTracking.addEventListener('click', advanceTrackingState);
  els.themePulseBtn.addEventListener('click', () => document.body.classList.toggle('pulse-mode'));

  document.querySelectorAll('.side-nav a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.side-nav a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
      els.sidebar.classList.remove('open');
    });
  });
}

init();
