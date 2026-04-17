const routeCatalog = [
  { id: 'rot-ham', name: 'Rotterdam → Hamburg', distanceNm: 255, baseWeather: 18, corridor: 'Short-sea EU corridor', seaDays: 1.2 },
  { id: 'fel-ant', name: 'Felixstowe → Antwerp', distanceNm: 178, baseWeather: 24, corridor: 'North Sea feeder lane', seaDays: 1.0 },
  { id: 'bel-dub', name: 'Belfast → Dublin', distanceNm: 89, baseWeather: 12, corridor: 'Irish Sea short route', seaDays: 0.5 },
  { id: 'sou-bil', name: 'Southampton → Bilbao', distanceNm: 515, baseWeather: 29, corridor: 'Atlantic short-sea route', seaDays: 2.4 }
];

const cargoTypes = [
  { id: 'consumer', label: 'Consumer goods', loadFactor: 1.0 },
  { id: 'cold', label: 'Cold-chain cargo', loadFactor: 1.14 },
  { id: 'industrial', label: 'Industrial components', loadFactor: 1.08 },
  { id: 'hazmat', label: 'Hazmat / regulated cargo', loadFactor: 1.18 }
];

const weatherProfiles = [
  { id: 'calm', label: 'Calm seas', multiplier: 0.92 },
  { id: 'mixed', label: 'Mixed weather', multiplier: 1.0 },
  { id: 'rough', label: 'Rough weather', multiplier: 1.18 },
  { id: 'storm', label: 'Storm-risk corridor', multiplier: 1.34 }
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
  recalculateBtn: document.getElementById('recalculateBtn')
};

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

let simulationOn = true;
let intervalId = null;

function tickSimulation() {
  vessels = vessels.map(vessel => ({
    ...vessel,
    batteryPct: clamp(vessel.batteryPct + (Math.random() * 8 - 4), 15, 98),
    fuelPct: clamp(vessel.fuelPct + (Math.random() * 4 - 2), 18, 96),
    etaHours: clamp(vessel.etaHours + (Math.random() * 1.2 - 0.6), 0.8, 40),
    emissionsKgHr: clamp(vessel.emissionsKgHr + (Math.random() * 28 - 14), 110, 620)
  }));
  renderFleet();
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

  renderEstimate();
  renderFleet();
  renderTimeline();
  startSimulation();
}

init();
