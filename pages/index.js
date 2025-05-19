import { useState } from 'react';

export default function Home() {
  const [sensorWidth, setSensorWidth] = useState(36);
  const [sensorHeight, setSensorHeight] = useState(24);
  const [focalLength, setFocalLength] = useState(50);
  const [distance, setDistance] = useState(1000);
  const [cropFactor, setCropFactor] = useState(1);

  const effectiveFocal = focalLength * cropFactor;
  const radToDeg = rad => rad * (180 / Math.PI);
  const degToRad = deg => deg * (Math.PI / 180);

  const angleOfView = (dim) => 2 * radToDeg(Math.atan(dim / (2 * effectiveFocal)));
  const fieldOfView = (angle) => 2 * distance * Math.tan(degToRad(angle / 2));

  const hAoV = angleOfView(sensorWidth);
  const vAoV = angleOfView(sensorHeight);
  const hFoV = fieldOfView(hAoV);
  const vFoV = fieldOfView(vAoV);

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Field of View Calculator</h1>
      <div className="grid grid-cols-2 gap-4">
        <label>Sensor Width (mm): <input type="number" value={sensorWidth} onChange={e => setSensorWidth(+e.target.value)} className="border p-1 w-full" /></label>
        <label>Sensor Height (mm): <input type="number" value={sensorHeight} onChange={e => setSensorHeight(+e.target.value)} className="border p-1 w-full" /></label>
        <label>Focal Length (mm): <input type="number" value={focalLength} onChange={e => setFocalLength(+e.target.value)} className="border p-1 w-full" /></label>
        <label>Crop Factor: <input type="number" step="0.1" value={cropFactor} onChange={e => setCropFactor(+e.target.value)} className="border p-1 w-full" /></label>
        <label>Distance (ft): <input type="number" value={distance} onChange={e => setDistance(+e.target.value)} className="border p-1 w-full" /></label>
      </div>
      <div className="bg-gray-100 p-4 rounded shadow">
        <h2 className="font-semibold">Results</h2>
        <p>Effective Focal Length: {effectiveFocal.toFixed(2)} mm</p>
        <p>Horizontal AoV: {hAoV.toFixed(2)}°</p>
        <p>Vertical AoV: {vAoV.toFixed(2)}°</p>
        <p>Horizontal FoV: {hFoV.toFixed(2)} ft</p>
        <p>Vertical FoV: {vFoV.toFixed(2)} ft</p>
      </div>
    </main>
  );
}