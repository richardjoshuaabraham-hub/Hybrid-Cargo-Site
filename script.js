const routeCatalog = [
  { id: 'rot-ham', name: 'Rotterdam → Hamburg', distanceNm: 255, seaDays: 1.2, baseWeather: 0.92 },
  { id: 'bel-dub', name: 'Belfast → Dublin', distanceNm: 92, seaDays: 0.7, baseWeather: 0.86 },
  { id: 'sou-bil', name: 'Southampton → Bilbao', distanceNm: 530, seaDays: 2.9, baseWeather: 1.06 },
  { id: 'ant-osl', name: 'Antwerp → Oslo', distanceNm: 468, seaDays: 2.4, baseWeather: 1.01 }
];

const cargoTypes = [
  { id: 'fcl', label: 'Containerised freight', loadFactor: 1.0 },
  { id: 'reefer', label: 'Reefer cargo', loadFactor: 1.08 },
  { id: 'automotive', label: 'Automotive parts', loadFactor: 0.96 },
  { id: 'heavy', label: 'Heavy equipment', loadFactor: 1.16 }
];

const weatherProfiles = [
  { id: 'calm', label: 'Calm weather', multiplier: 0.92 },
  { id: 'mixed', label: 'Mixed weather', multiplier: 1.0 },
  { id: 'rough', label: 'Rough weather', multiplier: 1.18 },
  { id: 'storm', label: 'Storm-risk corridor', multiplier: 1.34 }
];

const heroSlides = [
  {
    title: 'Port departure in electric mode',
    text: 'Low-emission berth exit, battery-assisted manoeuvring, and connected freight visibility.',
    image: 'assets/hero-1.svg'
  },
  {
    title: 'Terminal trailers and container transfer',
    text: 'Trailer-side logistics, container staging, and digitally coordinated cargo handoff.',
    image: 'assets/hero-2.svg'
  },
  {
    title: 'Hybrid vessel on long-haul route',
    text: 'Fuel-supported ocean transit with monitored battery reserve and route-aware propulsion switching.',
    image: 'assets/hero-3.svg'
  },
  {
    title: 'Dockside cargo and truck operations',
    text: 'Port-side trucking, container handling, and real-time shipment updates for SME logistics operators.',
    image: 'assets/hero-4.svg'
  }
];

let vessels = [
  {
    id: 'aurora', name: 'MV Aurora Hybrid', route: 'Rotterdam → Hamburg', status: 'Underway',
    batteryPct: 72, fuelPct: 64, etaHours: 11.4, mode: 'Electric + Fuel blend', emissionsKgHr: 418,
    cargoLoad: 78, weather: 'Moderate wind'
  },
  {
    id: 'atlas', name: 'MV Atlas GreenLine', route: 'Belfast → Dublin', status: 'Docking',
    batteryPct: 88, fuelPct: 52, etaHours: 2.1, mode: 'Electric priority', emissionsKgHr: 156,
    cargoLoad: 63, weather: 'Calm'
  },
  {
    id: 'nexus', name: 'MV Nexus Hybrid', route: 'Southampton → Bilbao', status: 'At sea',
    batteryPct: 49, fuelPct: 81, etaHours: 26.8, mode: 'Fuel priority', emissionsKgHr: 552,
    cargoLoad: 85, weather: 'Rough swell'
  }
];

const trackingEvents = [
  { time: '08:10', label: 'Booking confirmed', detail: 'Carbon forecast, route window, and dynamic price locked.' },
  { time: '09:45', label: 'Cargo assigned', detail: 'Container slot and vessel capacity allocated automatically.' },
  { time: '12:30', label: 'Port gate-in', detail: 'Terminal arrival logged and loading queue synchronised.' },
  { time: '16:20', label: 'Hybrid dispatch plan', detail: 'Electric mode reserved for berth exit and low-emission zone.' },
  { time: '19:10', label: 'Live transit monitoring', detail: 'ETA, weather risk, and carbon intensity refreshed in real time.' }
];

const routeStatusOptions = [
  { title: 'Rotterdam → Hamburg', wind: '18 kn', wave: '1.4 m', mode: 'Electric blend', risk: 'Low', progress: 22 },
  { title: 'Belfast → Dublin', wind: '12 kn', wave: '0.8 m', mode: 'Electric priority', risk: 'Low', progress: 44 },
  { title: 'Southampton → Bilbao', wind: '26 kn', wave: '2.6 m', mode: 'Fuel priority', risk: 'Medium', progress: 63 },
  { title: 'Antwerp → Oslo', wind: '20 kn', wave: '1.9 m', mode: 'Balanced hybrid', risk: 'Medium', progress: 37 }
];

const els = {
  route: document.getElementById('route'),
  cargoType: document.getElementById('cargoType'),
  weather: document.getElementById('weather'),
  load: document.getElementById('load'),
  delay: document.getElementById('delay'),
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
  fleetGrid: document.getElementById('fleetGrid'),
  timeline: document.getElementById('timeline'),
  toggleSimulation: document.getElementById('toggleSimulation'),
  activeVoyages: document.getElementById('activeVoyages'),
  avgBattery: document.getElementById('avgBattery'),
  avgFuel: document.getElementById('avgFuel'),
  avgEmission: document.getElementById('avgEmission'),
  weeklyCarbonSaved: document.getElementById('weeklyCarbonSaved'),
  recalculateBtn: document.getElementById('recalculateBtn'),
  heroImage: document.getElementById('heroImage'),
  heroThumbs: document.getElementById('heroThumbs'),
  heroCaptionTitle: document.getElementById('heroCaptionTitle'),
  heroCaptionText: document.getElementById('heroCaptionText'),
  prevHero: document.getElementById('prevHero'),
  nextHero: document.getElementById('nextHero'),
  routeStatusTitle: document.getElementById('routeStatusTitle'),
  routeWind: document.getElementById('routeWind'),
  routeWave: document.getElementById('routeWave'),
  routeMode: document.getElementById('routeMode'),
  routeRisk: document.getElementById('routeRisk'),
  shipDot: document.getElementById('shipDot')
};

let heroIndex = 0;
let heroIntervalId = null;
let routeStatusIndex = 0;
let simulationOn = true;
let intervalId = null;

function formatNumber(value, digits = 1) {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: digits }).format(value);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function populateSelect(select, items, labelKey = 'label') {
  items.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item[labelKey];
    select.appendChild(option);
  });
}

function calculateEstimate() {
  const route = routeCatalog.find(item => item.id === els.route.value);
  const cargo = cargoTypes.find(item => item.id === els.cargoType.value);
  const weather = weatherProfiles.find(item => item.id === els.weather.value);
  const loadTonnes = Number(els.load.value);
  const departureDelay = Number(els.delay.value);

  const electricEligibleNm = Math.min(route.distanceNm * 0.34, 160);
  const fuelNm = route.distanceNm - electricEligibleNm;
  const loadMultiplier = 0.85 + loadTonnes / 500;
  const delayMultiplier = 1 + departureDelay * 0.015;
  const weatherMultiplier = weather.multiplier * (1 + route.baseWeather / 1000);
  const cargoMultiplier = cargo.loadFactor;

  const fuelEmissionKg = fuelNm * 6.8 * loadMultiplier * weatherMultiplier * cargoMultiplier * delayMultiplier;
  const electricEmissionKg = electricEligibleNm * 1.4 * loadMultiplier * weatherMultiplier;
  const hybridEmissionKg = fuelEmissionKg + electricEmissionKg;
  const conventionalEmissionKg = route.distanceNm * 8.9 * loadMultiplier * weatherMultiplier * cargoMultiplier * delayMultiplier;
  const carbonSavedKg = conventionalEmissionKg - hybridEmissionKg;

  const hybridFuelCost = fuelNm * 4.6 * loadMultiplier * weatherMultiplier * cargoMultiplier;
  const voyagePrice = hybridFuelCost * 1.32 + loadTonnes * 2.4 + departureDelay * 18;
  const reliabilityScore = clamp(92 - route.baseWeather * 0.25 - departureDelay * 0.9 + (weather.id === 'calm' ? 3 : 0) - (weather.id === 'storm' ? 7 : 0), 68, 97);
  const etaDays = route.seaDays * weatherMultiplier + departureDelay / 24;

  return {
    electricEligibleNm, fuelNm, hybridEmissionKg, conventionalEmissionKg, carbonSavedKg,
    hybridFuelCost, voyagePrice, reliabilityScore, etaDays, carbonIntensity: hybridEmissionKg / Math.max(loadTonnes, 1)
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
  els.electricText.textContent = `${formatNumber(data.electricEligibleNm, 0)} nautical miles in electric mode`;
  els.fuelText.textContent = `${formatNumber(data.fuelNm, 0)} nautical miles in fuel mode`;
}

function renderTimeline() {
  els.timeline.innerHTML = trackingEvents.map(item => `
    <div class="timeline-item">
      <div class="timeline-time">${item.time}</div>
      <strong>${item.label}</strong>
      <p>${item.detail}</p>
    </div>
  `).join('');
}

function renderFleet() {
  els.fleetGrid.innerHTML = vessels.map(vessel => `
    <article class="vessel-card">
      <div class="vessel-head">
        <div>
          <h3>${vessel.name}</h3>
          <div class="vessel-meta">${vessel.route} · ${vessel.mode}</div>
        </div>
        <span class="tag">${vessel.status}</span>
      </div>
      <div class="vessel-stats">
        <div class="metric"><span>${formatNumber(vessel.batteryPct, 0)}%</span><label>Battery</label></div>
        <div class="metric"><span>${formatNumber(vessel.fuelPct, 0)}%</span><label>Fuel</label></div>
        <div class="metric"><span>${formatNumber(vessel.etaHours)} hrs</span><label>ETA</label></div>
        <div class="metric"><span>${formatNumber(vessel.emissionsKgHr, 0)} kg/hr</span><label>Emissions</label></div>
      </div>
      <div class="vessel-meta" style="margin-top:12px;">Cargo load ${vessel.cargoLoad}% · Weather ${vessel.weather}</div>
    </article>
  `).join('');

  const avgBattery = vessels.reduce((s, v) => s + v.batteryPct, 0) / vessels.length;
  const avgFuel = vessels.reduce((s, v) => s + v.fuelPct, 0) / vessels.length;
  const avgEmission = vessels.reduce((s, v) => s + v.emissionsKgHr, 0) / vessels.length;
  els.activeVoyages.textContent = String(vessels.length);
  els.avgBattery.textContent = `${formatNumber(avgBattery, 0)}%`;
  els.avgFuel.textContent = `${formatNumber(avgFuel, 0)}%`;
  els.avgEmission.textContent = `${formatNumber(avgEmission, 0)} kg/hr`;
}

function tickSimulation() {
  vessels = vessels.map(vessel => ({
    ...vessel,
    batteryPct: clamp(vessel.batteryPct + (Math.random() * 8 - 4), 15, 98),
    fuelPct: clamp(vessel.fuelPct + (Math.random() * 4 - 2), 18, 96),
    etaHours: clamp(vessel.etaHours + (Math.random() * 1.2 - 0.6), 0.8, 40),
    emissionsKgHr: clamp(vessel.emissionsKgHr + (Math.random() * 28 - 14), 110, 620)
  }));
  renderFleet();
  renderRouteStatus();
}

function startSimulation() {
  clearInterval(intervalId);
  intervalId = setInterval(tickSimulation, 2400);
  els.toggleSimulation.textContent = 'Pause live simulation';
}

function stopSimulation() {
  clearInterval(intervalId);
  els.toggleSimulation.textContent = 'Resume live simulation';
}

function renderHeroThumbs() {
  els.heroThumbs.innerHTML = heroSlides.map((slide, index) => `
    <button class="thumb ${index === heroIndex ? 'active' : ''}" data-index="${index}" aria-label="Show image ${index + 1}">
      <img src="${slide.image}" alt="${slide.title}" />
    </button>
  `).join('');

  els.heroThumbs.querySelectorAll('.thumb').forEach(btn => {
    btn.addEventListener('click', () => {
      heroIndex = Number(btn.dataset.index);
      renderHeroSlide();
      restartHeroAuto();
    });
  });
}

function renderHeroSlide() {
  const slide = heroSlides[heroIndex];
  els.heroImage.src = slide.image;
  els.heroImage.alt = slide.title;
  els.heroCaptionTitle.textContent = slide.title;
  els.heroCaptionText.textContent = slide.text;
  renderHeroThumbs();
}

function nextHero(step = 1) {
  heroIndex = (heroIndex + step + heroSlides.length) % heroSlides.length;
  renderHeroSlide();
}

function startHeroAuto() {
  clearInterval(heroIntervalId);
  heroIntervalId = setInterval(() => nextHero(1), 4200);
}

function restartHeroAuto() {
  startHeroAuto();
}


function renderRouteStatus() {
  const item = routeStatusOptions[routeStatusIndex % routeStatusOptions.length];
  els.routeStatusTitle.textContent = item.title;
  els.routeWind.textContent = item.wind;
  els.routeWave.textContent = item.wave;
  els.routeMode.textContent = item.mode;
  els.routeRisk.textContent = item.risk;
  els.shipDot.style.left = `${item.progress}%`;
  routeStatusIndex += 1;
}

function init() {
  populateSelect(els.route, routeCatalog, 'name');
  populateSelect(els.cargoType, cargoTypes, 'label');
  populateSelect(els.weather, weatherProfiles, 'label');
  els.route.value = routeCatalog[0].id;
  els.cargoType.value = cargoTypes[0].id;
  els.weather.value = weatherProfiles[1].id;

  [els.route, els.cargoType, els.weather, els.load, els.delay].forEach(el => {
    el.addEventListener('input', renderEstimate);
    el.addEventListener('change', renderEstimate);
  });
  els.recalculateBtn.addEventListener('click', renderEstimate);

  els.toggleSimulation.addEventListener('click', () => {
    simulationOn = !simulationOn;
    simulationOn ? startSimulation() : stopSimulation();
  });

  els.prevHero.addEventListener('click', () => {
    nextHero(-1);
    restartHeroAuto();
  });

  els.nextHero.addEventListener('click', () => {
    nextHero(1);
    restartHeroAuto();
  });

  renderEstimate();
  renderFleet();
  renderTimeline();
  renderRouteStatus();
  renderHeroSlide();
  startSimulation();
  startHeroAuto();
}

init();
