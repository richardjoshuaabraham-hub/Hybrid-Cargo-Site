const routeCatalog = [
  { id: 'rot-ham', name: 'Rotterdam → Hamburg', distanceNm: 278, seaDays: 1.5, baseWeather: 9, electricBias: 0.34 },
  { id: 'bel-dub', name: 'Belfast → Dublin', distanceNm: 93, seaDays: 0.7, baseWeather: 5, electricBias: 0.58 },
  { id: 'sou-bil', name: 'Southampton → Bilbao', distanceNm: 475, seaDays: 2.3, baseWeather: 14, electricBias: 0.28 },
  { id: 'ant-osl', name: 'Antwerp → Oslo', distanceNm: 503, seaDays: 2.6, baseWeather: 12, electricBias: 0.31 }
];

const cargoTypes = [
  { id: 'consumer', label: 'Consumer goods', loadFactor: 0.92 },
  { id: 'cold', label: 'Refrigerated cargo', loadFactor: 1.06 },
  { id: 'machinery', label: 'Industrial machinery', loadFactor: 1.12 },
  { id: 'retail', label: 'Retail containers', loadFactor: 0.98 }
];

const weatherProfiles = [
  { id: 'calm', label: 'Calm / stable', multiplier: 0.93, risk: 'Low' },
  { id: 'mixed', label: 'Mixed / seasonal', multiplier: 1.0, risk: 'Medium' },
  { id: 'rough', label: 'Rough / high swell', multiplier: 1.12, risk: 'Medium' },
  { id: 'storm', label: 'Storm watch', multiplier: 1.22, risk: 'High' }
];

const heroSlides = [
  {
    title: 'Hybrid berth departure',
    text: 'Battery-assisted departure lowers berth emissions while truck arrivals are synchronized to the loading plan.',
    image: 'https://source.unsplash.com/featured/1600x900/?cargo-ship,port,container&sig=31'
  },
  {
    title: 'Intermodal cargo handoff',
    text: 'Trailer and container movements are timed against vessel ETA to reduce terminal idle time and congestion.',
    image: 'https://source.unsplash.com/featured/1600x900/?container-truck,port,terminal&sig=32'
  },
  {
    title: 'Electric corridor operations',
    text: 'Low-emission routing prioritizes electric propulsion in near-port zones and protected waterways.',
    image: 'https://source.unsplash.com/featured/1600x900/?shipping-port,containers,crane&sig=33'
  },
  {
    title: 'Dynamic fleet visibility',
    text: 'Booking, weather, route progress, and propulsion mode are monitored together in one operating layer.',
    image: 'https://source.unsplash.com/featured/1600x900/?cargo-ship,truck,logistics&sig=34'
  }
];

let vessels = [
  {
    id: 'atlas',
    name: 'MV Atlas Hybrid',
    route: 'Rotterdam → Hamburg',
    status: 'At sea',
    batteryPct: 74,
    fuelPct: 61,
    etaHours: 11.4,
    mode: 'Balanced hybrid',
    emissionsKgHr: 318,
    cargoLoad: 78,
    weather: 'Mixed',
    image: 'https://source.unsplash.com/featured/1200x800/?container-ship,port&sig=41'
  },
  {
    id: 'aurora',
    name: 'MV Aurora Link',
    route: 'Belfast → Dublin',
    status: 'Docking',
    batteryPct: 88,
    fuelPct: 52,
    etaHours: 2.1,
    mode: 'Electric priority',
    emissionsKgHr: 156,
    cargoLoad: 63,
    weather: 'Calm',
    image: 'https://source.unsplash.com/featured/1200x800/?cargo-ship,dock,terminal&sig=42'
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
    image: 'https://source.unsplash.com/featured/1200x800/?ship-port,freight&sig=43'
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
    image: 'https://source.unsplash.com/featured/1200x800/?container-port,truck&sig=44'
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
    { time: '21:40', label: 'Live corridor transit', detail: 'Fuel and electric segments will rebalance based on wave conditions.', state: 'upcoming' }
  }
};

const routeVisuals = [
  'https://source.unsplash.com/featured/1200x800/?shipping-route,port&sig=51',
  'https://source.unsplash.com/featured/1200x800/?cargo-ship,ocean,containers&sig=52',
  'https://source.unsplash.com/featured/1200x800/?container-terminal,ship&sig=53',
  'https://source.unsplash.com/featured/1200x800/?truck,shipping-container,port&sig=54'
];

const els = {
  menuBtn: document.getElementById('menuBtn'),
  nav: document.querySelector('.nav'),
  route: document.getElementById('route'),
  cargoType: document.getElementById('cargoType'),
  weather: document.getElementById('weather'),
  load: document.getElementById('load'),
  delay: document.getElementById('delay'),
  bookingRef: document.getElementById('bookingRef'),
  shorePower: document.getElementById('shorePower'),
  priorityGreen: document.getElementById('priorityGreen'),
  loadValue: document.getElementById('loadValue'),
  delayValue: document.getElementById('delayValue'),
  voyagePrice: document.getElementById('voyagePrice'),
  etaDays: document.getElementById('etaDays'),
  reliabilityScore: document.getElementById('reliabilityScore'),
  carbonSaved: document.getElementById('carbonSaved'),
  electricBar: document.getElementById('electricBar'),
  fuelBar: document.getElementById('fuelBar'),
  electricText: document.getElementById('electricText'),
  fuelText: document.getElementById('fuelText'),
  hybridEmission: document.getElementById('hybridEmission'),
  conventionalEmission: document.getElementById('conventionalEmission'),
  carbonIntensity: document.getElementById('carbonIntensity'),
  hybridFuelCost: document.getElementById('hybridFuelCost'),
  insightText: document.getElementById('insightText'),
  insightTags: document.getElementById('insightTags'),
  recalculateBtn: document.getElementById('recalculateBtn'),
  fleetGrid: document.getElementById('fleetGrid'),
  vesselFocus: document.getElementById('vesselFocus'),
  toggleSimulation: document.getElementById('toggleSimulation'),
  activeVoyages: document.getElementById('activeVoyages'),
  avgBattery: document.getElementById('avgBattery'),
  avgFuel: document.getElementById('avgFuel'),
  avgEmission: document.getElementById('avgEmission'),
  weeklyCarbonSaved: document.getElementById('weeklyCarbonSaved'),
  timeline: document.getElementById('timeline'),
  trackingSelect: document.getElementById('trackingSelect'),
  advanceTracking: document.getElementById('advanceTracking'),
  heroImage: document.getElementById('heroImage'),
  heroThumbs: document.getElementById('heroThumbs'),
  heroTitle: document.getElementById('heroTitle'),
  heroText: document.getElementById('heroText'),
  prevHero: document.getElementById('prevHero'),
  nextHero: document.getElementById('nextHero'),
  routeHero: document.getElementById('routeHero'),
  routeStatusTitle: document.getElementById('routeStatusTitle'),
  routeRiskTag: document.getElementById('routeRiskTag'),
  routeWind: document.getElementById('routeWind'),
  routeWave: document.getElementById('routeWave'),
  routeMode: document.getElementById('routeMode'),
  routeDistance: document.getElementById('routeDistance'),
  shipDot: document.getElementById('shipDot')
};

let heroIndex = 0;
let heroAuto = null;
let simulationOn = true;
let simulationTimer = null;
let selectedVesselId = vessels[0].id;
let currentTrackingRef = 'BH-2048-NR';

function formatNumber(value, digits = 1) {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: digits }).format(value);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function populateSelect(select, items, labelKey = 'label') {
  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id || item;
    option.textContent = item[labelKey] || item;
    select.appendChild(option);
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

  let electricEligibleNm = Math.min(route.distanceNm * (priorityGreen ? route.electricBias + 0.08 : route.electricBias), 170);
  const fuelNm = Math.max(route.distanceNm - electricEligibleNm, 0);
  const loadMultiplier = 0.85 + loadTonnes / 500;
  const delayMultiplier = 1 + departureDelay * 0.015;
  const weatherMultiplier = weather.multiplier * (1 + route.baseWeather / 1000);
  const cargoMultiplier = cargo.loadFactor;
  const shoreFactor = shorePower ? 0.94 : 1;

  const fuelEmissionKg = fuelNm * 6.7 * loadMultiplier * weatherMultiplier * cargoMultiplier * delayMultiplier;
  const electricEmissionKg = electricEligibleNm * 1.28 * loadMultiplier * weatherMultiplier * shoreFactor;
  const hybridEmissionKg = fuelEmissionKg + electricEmissionKg;
  const conventionalEmissionKg = route.distanceNm * 8.8 * loadMultiplier * weatherMultiplier * cargoMultiplier * delayMultiplier;
  const carbonSavedKg = conventionalEmissionKg - hybridEmissionKg;

  const hybridFuelCost = fuelNm * 4.55 * loadMultiplier * weatherMultiplier * cargoMultiplier;
  const voyagePrice = hybridFuelCost * 1.34 + loadTonnes * 2.6 + departureDelay * 18 + (weather.id === 'storm' ? 190 : 0);
  const reliabilityScore = clamp(92 - route.baseWeather * 0.25 - departureDelay * 0.9 + (weather.id === 'calm' ? 3 : 0) - (weather.id === 'storm' ? 8 : 0), 66, 97);
  const etaDays = route.seaDays * weatherMultiplier + departureDelay / 24;

  const recommendation = {
    title: priorityGreen ? 'Green-priority booking profile selected.' : 'Balanced booking profile selected.',
    tags: [
      `${weather.risk} weather exposure`,
      `${formatNumber(electricEligibleNm, 0)} nm electric segment`,
      shorePower ? 'Shore power active' : 'Shore power inactive',
      `${formatNumber(reliabilityScore, 0)}/100 delivery confidence`
    ]
  };

  return {
    electricEligibleNm,
    fuelNm,
    hybridEmissionKg,
    conventionalEmissionKg,
    carbonSavedKg,
    hybridFuelCost,
    voyagePrice,
    reliabilityScore,
    etaDays,
    carbonIntensity: hybridEmissionKg / Math.max(loadTonnes, 1),
    recommendation
  };
}

function renderEstimate() {
  const data = calculateEstimate();
  const total = data.electricEligibleNm + data.fuelNm;
  const electricPct = (data.electricEligibleNm / total) * 100;
  const fuelPct = (data.fuelNm / total) * 100;

  els.loadValue.textContent = formatNumber(Number(els.load.value), 0);
  els.delayValue.textContent = formatNumber(Number(els.delay.value), 0);
  els.voyagePrice.textContent = `£${formatNumber(data.voyagePrice)}`;
  els.etaDays.textContent = `${formatNumber(data.etaDays)} days`;
  els.reliabilityScore.textContent = `${formatNumber(data.reliabilityScore, 0)}/100`;
  els.carbonSaved.textContent = `${formatNumber(data.carbonSavedKg / 1000)} t`;
  els.hybridEmission.textContent = `${formatNumber(data.hybridEmissionKg)} kg`;
  els.conventionalEmission.textContent = `${formatNumber(data.conventionalEmissionKg)} kg`;
  els.carbonIntensity.textContent = `${formatNumber(data.carbonIntensity)} kg/t`;
  els.hybridFuelCost.textContent = `£${formatNumber(data.hybridFuelCost)}`;
  els.electricBar.style.width = `${electricPct}%`;
  els.fuelBar.style.width = `${fuelPct}%`;
  els.electricText.textContent = `${formatNumber(data.electricEligibleNm, 0)} nautical miles`;
  els.fuelText.textContent = `${formatNumber(data.fuelNm, 0)} nautical miles`;
  els.insightText.textContent = data.recommendation.title;
  els.insightTags.innerHTML = data.recommendation.tags.map(tag => `<span>${tag}</span>`).join('');
}

function renderHeroThumbs() {
  els.heroThumbs.innerHTML = heroSlides.map((slide, index) => `
    <button class="${index === heroIndex ? 'active' : ''}" data-index="${index}" aria-label="Show scenario ${index + 1}">
      <img src="${slide.image}" alt="${slide.title}" />
    </button>
  `).join('');

  els.heroThumbs.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      heroIndex = Number(button.dataset.index);
      renderHeroSlide();
      restartHeroAuto();
    });
  });
}

function setImageFallback(img, label) {
  img.onerror = () => {
    img.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'>
        <defs>
          <linearGradient id='g' x1='0' x2='1'>
            <stop offset='0' stop-color='#0b1b30'/>
            <stop offset='1' stop-color='#123c61'/>
          </linearGradient>
        </defs>
        <rect width='1600' height='900' fill='url(%23g)'/>
        <circle cx='1240' cy='180' r='170' fill='rgba(103,232,249,0.12)'/>
        <rect x='140' y='590' width='1320' height='80' rx='20' fill='#0e223a'/>
        <rect x='460' y='500' width='520' height='110' rx='16' fill='#132e4f'/>
        <rect x='980' y='470' width='160' height='120' rx='12' fill='#1d436d'/>
        <rect x='1015' y='420' width='80' height='50' rx='8' fill='#d9eefc'/>
        <rect x='425' y='430' width='70' height='70' rx='10' fill='#f6b756'/>
        <rect x='505' y='430' width='90' height='70' rx='10' fill='#67e8f9'/>
        <rect x='605' y='430' width='90' height='70' rx='10' fill='#4f93ff'/>
        <rect x='705' y='430' width='90' height='70' rx='10' fill='#2dd4bf'/>
        <text x='120' y='170' fill='#e9f1fb' font-size='64' font-family='Inter,Arial,sans-serif' font-weight='800'>${label}</text>
        <text x='120' y='232' fill='#cce3ff' font-size='28' font-family='Inter,Arial,sans-serif'>Fallback visual loaded locally</text>
      </svg>
    `)}`;
  };
}

function renderHeroSlide() {
  const slide = heroSlides[heroIndex];
  els.heroImage.src = slide.image;
  setImageFallback(els.heroImage, slide.title);
  els.heroImage.alt = slide.title;
  els.heroTitle.textContent = slide.title;
  els.heroText.textContent = slide.text;
  renderHeroThumbs();
}

function nextHero(step = 1) {
  heroIndex = (heroIndex + step + heroSlides.length) % heroSlides.length;
  renderHeroSlide();
}

function startHeroAuto() {
  clearInterval(heroAuto);
  heroAuto = setInterval(() => nextHero(1), 4600);
}

function restartHeroAuto() {
  startHeroAuto();
}

function renderFleet() {
  els.fleetGrid.innerHTML = vessels.map(vessel => `
    <article class="vessel-card ${vessel.id === selectedVesselId ? 'active' : ''}" data-id="${vessel.id}">
      <div class="vessel-top">
        <div>
          <h3>${vessel.name}</h3>
          <div class="vessel-meta">${vessel.route}</div>
        </div>
        <span class="tag">${vessel.status}</span>
      </div>
      <div class="vessel-grid">
        <article><strong>${formatNumber(vessel.batteryPct, 0)}%</strong><span>Battery</span></article>
        <article><strong>${formatNumber(vessel.fuelPct, 0)}%</strong><span>Fuel</span></article>
        <article><strong>${formatNumber(vessel.etaHours)} hrs</strong><span>ETA</span></article>
        <article><strong>${formatNumber(vessel.emissionsKgHr, 0)} kg/hr</strong><span>Emissions</span></article>
      </div>
    </article>
  `).join('');

  els.fleetGrid.querySelectorAll('.vessel-card').forEach(card => {
    card.addEventListener('click', () => {
      selectedVesselId = card.dataset.id;
      renderFleet();
      renderVesselFocus();
      renderRouteStatus();
    });
  });

  const avgBattery = vessels.reduce((sum, vessel) => sum + vessel.batteryPct, 0) / vessels.length;
  const avgFuel = vessels.reduce((sum, vessel) => sum + vessel.fuelPct, 0) / vessels.length;
  const avgEmission = vessels.reduce((sum, vessel) => sum + vessel.emissionsKgHr, 0) / vessels.length;

  els.activeVoyages.textContent = String(vessels.length);
  els.avgBattery.textContent = `${formatNumber(avgBattery, 0)}%`;
  els.avgFuel.textContent = `${formatNumber(avgFuel, 0)}%`;
  els.avgEmission.textContent = `${formatNumber(avgEmission, 0)} kg/hr`;
  els.weeklyCarbonSaved.textContent = `${formatNumber((avgBattery * 0.14 + 9.1), 1)} t`;
}

function renderVesselFocus() {
  const vessel = vessels.find(item => item.id === selectedVesselId) || vessels[0];
  els.vesselFocus.innerHTML = `
    <div class="focus-image" id="focusImage" style="background-image:url('${vessel.image}')">
      <div class="focus-copy">
        <span class="overlay-tag">Selected vessel</span>
        <h3>${vessel.name}</h3>
        <p>${vessel.route} · ${vessel.mode} · Cargo load ${vessel.cargoLoad}% · Current weather ${vessel.weather}</p>
      </div>
    </div>
    <div class="focus-grid">
      <article><strong>${formatNumber(vessel.batteryPct, 0)}%</strong><span>Battery availability</span></article>
      <article><strong>${formatNumber(vessel.fuelPct, 0)}%</strong><span>Fuel reserve</span></article>
      <article><strong>${formatNumber(vessel.etaHours)} hrs</strong><span>Arrival forecast</span></article>
      <article><strong>${formatNumber(vessel.emissionsKgHr, 0)} kg/hr</strong><span>Current emissions</span></article>
    </div>
    <div class="glass-panel" style="padding:16px; border-radius:18px; background:rgba(255,255,255,0.03);">
      <span class="eyebrow">Operational note</span>
      <p style="margin:8px 0 0; color: var(--muted); line-height: 1.65;">
        This vessel is currently operating in <strong style="color:white;">${vessel.mode}</strong> mode. The platform balances fuel security, weather resilience,
        and emissions by shifting electric usage toward port approach, berth exit, and congestion-sensitive corridor segments.
      </p>
    </div>
  `;

  const focusImage = document.getElementById('focusImage');
  const fallback = document.createElement('img');
  fallback.style.display = 'none';
  setImageFallback(fallback, vessel.name);
  fallback.src = vessel.image;
  fallback.onerror = () => {
    focusImage.style.backgroundImage = fallback.src;
  };
}

function renderTrackingOptions() {
  Object.keys(trackingSets).forEach(ref => {
    const option = document.createElement('option');
    option.value = ref;
    option.textContent = ref;
    els.trackingSelect.appendChild(option);
  });
  els.trackingSelect.value = currentTrackingRef;
}

function renderTimeline() {
  const items = trackingSets[currentTrackingRef];
  els.timeline.innerHTML = items.map(item => `
    <article class="timeline-item ${item.state === 'active' ? 'active' : ''}">
      <div class="timeline-time">${item.time}</div>
      <strong>${item.label}</strong>
      <p>${item.detail}</p>
    </article>
  `).join('');
}

function advanceTracking() {
  const items = trackingSets[currentTrackingRef];
  const activeIndex = items.findIndex(item => item.state === 'active');
  if (activeIndex >= 0) {
    items[activeIndex].state = 'done';
    if (items[activeIndex + 1]) items[activeIndex + 1].state = 'active';
  }
  renderTimeline();
}

function renderRouteStatus() {
  const vessel = vessels.find(item => item.id === selectedVesselId) || vessels[0];
  const route = routeCatalog.find(item => vessel.route === item.name) || routeCatalog[0];
  const weather = weatherProfiles.find(item => item.label.startsWith(vessel.weather)) || weatherProfiles[1];
  const progress = clamp(100 - (vessel.etaHours / (route.seaDays * 24)) * 100, 8, 92);

  els.routeHero.style.backgroundImage = `url('${routeVisuals[(routeCatalog.indexOf(route) + heroIndex) % routeVisuals.length]}')`;
  els.routeStatusTitle.textContent = vessel.route;
  els.routeRiskTag.textContent = `${weather.risk} risk`;
  els.routeWind.textContent = `${formatNumber(10 + route.baseWeather)} kn`;
  els.routeWave.textContent = `${formatNumber(0.8 + route.baseWeather / 10)} m`;
  els.routeMode.textContent = vessel.mode;
  els.routeDistance.textContent = `${route.distanceNm} nm`;
  els.shipDot.style.left = `${progress}%`;
}

function tickSimulation() {
  vessels = vessels.map(vessel => ({
    ...vessel,
    batteryPct: clamp(vessel.batteryPct + (Math.random() * 8 - 4), 15, 98),
    fuelPct: clamp(vessel.fuelPct + (Math.random() * 4 - 2), 18, 96),
    etaHours: clamp(vessel.etaHours + (Math.random() * 1.2 - 0.65), 0.8, 40),
    emissionsKgHr: clamp(vessel.emissionsKgHr + (Math.random() * 28 - 14), 110, 620),
    cargoLoad: clamp(vessel.cargoLoad + (Math.random() * 4 - 2), 54, 92)
  }));
  renderFleet();
  renderVesselFocus();
  renderRouteStatus();
}

function startSimulation() {
  clearInterval(simulationTimer);
  simulationTimer = setInterval(tickSimulation, 2600);
  els.toggleSimulation.textContent = 'Pause live simulation';
}

function stopSimulation() {
  clearInterval(simulationTimer);
  els.toggleSimulation.textContent = 'Resume live simulation';
}

function bindEvents() {
  [els.route, els.cargoType, els.weather, els.load, els.delay, els.shorePower, els.priorityGreen].forEach(el => {
    el.addEventListener('input', renderEstimate);
    el.addEventListener('change', renderEstimate);
  });

  document.querySelectorAll('.toggle-card').forEach(card => {
    const input = card.querySelector('input');
    input.addEventListener('change', () => {
      card.classList.toggle('active', input.checked);
      renderEstimate();
    });
  });

  els.recalculateBtn.addEventListener('click', renderEstimate);
  els.prevHero.addEventListener('click', () => { nextHero(-1); restartHeroAuto(); });
  els.nextHero.addEventListener('click', () => { nextHero(1); restartHeroAuto(); });

  els.toggleSimulation.addEventListener('click', () => {
    simulationOn = !simulationOn;
    simulationOn ? startSimulation() : stopSimulation();
  });

  els.trackingSelect.addEventListener('change', (event) => {
    currentTrackingRef = event.target.value;
    renderTimeline();
  });

  els.advanceTracking.addEventListener('click', advanceTracking);

  els.menuBtn.addEventListener('click', () => {
    els.nav.classList.toggle('open');
  });
}

function init() {
  populateSelect(els.route, routeCatalog, 'name');
  populateSelect(els.cargoType, cargoTypes, 'label');
  populateSelect(els.weather, weatherProfiles, 'label');
  renderTrackingOptions();

  els.route.value = routeCatalog[0].id;
  els.cargoType.value = cargoTypes[0].id;
  els.weather.value = weatherProfiles[1].id;

  bindEvents();
  renderEstimate();
  renderHeroSlide();
  renderFleet();
  renderVesselFocus();
  renderTimeline();
  renderRouteStatus();
  startHeroAuto();
  startSimulation();
}

init();
