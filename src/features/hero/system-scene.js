import { Scene, PerspectiveCamera, WebGLRenderer, Group, BoxGeometry, CylinderGeometry, TorusGeometry, TubeGeometry, CatmullRomCurve3, MeshStandardMaterial, MeshPhysicalMaterial, MeshBasicMaterial, Mesh, HemisphereLight, DirectionalLight, PlaneGeometry, ShadowMaterial, Vector3, SphereGeometry, CanvasTexture, ACESFilmicToneMapping, PCFSoftShadowMap } from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { createRequestTrace } from "./request-trace";

export function createSystemScene(host, onUnavailable, onStage, onState, onStep) {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  const narrow = window.matchMedia("(max-width: 767px)").matches;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, narrow ? 1 : 1.5));
  renderer.toneMapping = ACESFilmicToneMapping; renderer.toneMappingExposure = 1.35;
  renderer.shadowMap.enabled = !narrow; renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.domElement.setAttribute("aria-hidden", "true"); host.appendChild(renderer.domElement);
  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, .1, 100);
  camera.position.set(3.8, 5, 9.7); camera.lookAt(0, .95, 0);
  scene.add(new HemisphereLight(0xeafff4, 0x24362e, 2.3));
  const key = new DirectionalLight(0xffffff, 4); key.position.set(-3, 7, 5); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024); key.shadow.camera.left = -6; key.shadow.camera.right = 6; key.shadow.camera.top = 6; key.shadow.camera.bottom = -6; key.shadow.normalBias = .04; key.shadow.radius = 4; scene.add(key);
  const rim = new DirectionalLight(0x84dec2, 3); rim.position.set(4, 3, -3); scene.add(rim);
  const group = new Group(); scene.add(group);
  const bodies = [], accents = [], glass = [], layers = [];
  const materialCache = new Map();
  const roundedCache = new Map();
  const labelTextures = [];
  const layerLabel = (parent, text) => {
    const canvas = document.createElement("canvas"); canvas.width = 512; canvas.height = 96;
    const context = canvas.getContext("2d");
    context.fillStyle = "#10261c"; context.fillRect(0, 0, 512, 96);
    context.fillStyle = "#a4ead0"; context.font = "600 38px monospace"; context.textAlign = "center"; context.textBaseline = "middle"; context.fillText(text, 256, 48);
    const texture = new CanvasTexture(canvas); labelTextures.push(texture);
    const plaque = new Mesh(new PlaneGeometry(1.42, .17), new MeshBasicMaterial({map: texture}));
    plaque.position.set(0, .02, .832); parent.add(plaque);
  };
  const make = (parent, geometry, position, kind = "body") => {
    let owner = parent;
    while (owner.parent && owner.parent !== group) owner = owner.parent;
    const materialKey = `${owner.uuid}:${kind}`;
    let material = materialCache.get(materialKey);
    if (!material) {
      material = kind === "glass" ? new MeshPhysicalMaterial({ color: 0x74d7b0, transparent: true, opacity: .22, roughness: .12, metalness: .1, clearcoat: 1, depthWrite: false }) : new MeshStandardMaterial({ color: kind === "accent" ? 0x74d7b0 : 0x303a35, roughness: .28, metalness: .45 });
      materialCache.set(materialKey, material);
    }
    const mesh = new Mesh(geometry, material); mesh.position.set(...position); mesh.castShadow = kind !== "glass"; mesh.receiveShadow = true; parent.add(mesh);
    (kind === "glass" ? glass : kind === "accent" ? accents : bodies).push(mesh); return mesh;
  };
  const rounded = (w, h, d, r = .08) => {
    const key = `${w}:${h}:${d}:${r}`;
    if (!roundedCache.has(key)) roundedCache.set(key, new RoundedBoxGeometry(w, h, d, 2, r));
    return roundedCache.get(key);
  };
  const nodes = [new Group(), new Group(), new Group()];
  nodes[0].position.set(-2.5, .1, .9); nodes[1].position.set(0, .15, -.25); nodes[2].position.set(2.45, .1, .8);
  nodes.forEach(node => group.add(node));
  // The service core is deliberately larger than its input and persistence peers.
  make(nodes[0], rounded(1.45, .95, .15), [0, .65, 0]);
  make(nodes[0], rounded(1.22, .6, .025, .01), [0, .6, .085], "glass");
  for (let i = 0; i < 3; i++) make(nodes[0], new SphereGeometry(.035, 10, 8), [-.51 + i * .12, 1.03, .095], "accent");
  for (let i = 0; i < 3; i++) make(nodes[0], new BoxGeometry(.55 + i * .12, .035, .025), [-.16 + i * .05, .75 - i * .14, .11], "accent");
  make(nodes[0], rounded(1.6, .09, .85, .035), [0, .1, .2]);
  for (let i = 0; i < 3; i++) {
    const layer = new Group(); layer.position.y = .25 + i * .59; nodes[1].add(layer); layers.push(layer);
    make(layer, rounded(1.92, .23, 1.62), [0, 0, 0]);
    make(layer, rounded(1.76, .04, 1.46, .015), [0, .14, 0], "glass");
    make(layer, new BoxGeometry(1.45, .025, .025), [0, -.025, .825], "accent");
    for (let j = 0; j < 3; j++) make(layer, new SphereGeometry(.035, 10, 8), [.56 + j * .1, .065, .825], "accent");
    layerLabel(layer, ["Data access", "Business logic", "API / validation"][i]);
  }
  make(nodes[1], rounded(.75, .13, .75, .04), [0, 1.65, 0], "accent");
  for (let i = 0; i < 7; i++) {
    const offset = -.65 + i * .215;
    make(nodes[1], new BoxGeometry(.035, .035, .19), [offset, 1.65, .54], "accent");
    make(nodes[1], new BoxGeometry(.19, .035, .035), [.54, 1.65, offset], "accent");
  }
  make(nodes[1], rounded(2.14, 1.72, 1.82), [0, .92, 0], "glass");
  for (let i = 0; i < 3; i++) {
    make(nodes[2], new CylinderGeometry(.56, .56, .28, 48), [0, .25 + i * .31, 0]);
    const ring = make(nodes[2], new TorusGeometry(.56, .022, 8, 48), [0, .4 + i * .31, 0], "accent"); ring.rotation.x = Math.PI / 2;
  }
  nodes.forEach((node, i) => {
    make(node, rounded(i === 1 ? 2.25 : 1.7, .12, i === 1 ? 2 : 1.5), [0, -.13, 0]);
  });
  const ground = new Mesh(new PlaneGeometry(20, 20), new ShadowMaterial({opacity: .18})); ground.rotation.x = -Math.PI / 2; ground.position.y = -.2; ground.receiveShadow = true; scene.add(ground);
  const points = [new Vector3(-2.5, .4, .9), new Vector3(-.45, 1.75, -.25), new Vector3(.45, .65, -.25), new Vector3(2.45, .5, .8), new Vector3(.3, .4, 1.25), new Vector3(-2.5, .4, 1.35)];
  const curves = points.slice(0, -1).map((p, i) => { const end = points[i + 1]; const mid = p.clone().lerp(end, .5); mid.y += i === 1 ? 0 : .18; return new CatmullRomCurve3([p, mid, end]); });
  const routes = curves.map(curve => {
    const mesh = new Mesh(new TubeGeometry(curve, 28, .012, 6, false), new MeshBasicMaterial({color: 0x74d7b0, transparent: true, opacity: .4})); group.add(mesh); return mesh;
  });
  const packet = make(group, new SphereGeometry(.095, 16, 12), [-2.5, .4, .9], "accent");
  const halo = new Mesh(new SphereGeometry(.19, 16, 12), new MeshBasicMaterial({color: 0x74d7b0, transparent: true, opacity: .16, depthWrite: false})); group.add(halo);
  let destroyed = false, visible = true, reduced = false, lightTheme = false, selected = 1, introduced = false;
  const render = () => { if (!destroyed && visible) renderer.render(scene, camera); };
  const highlight = index => {
    selected = index;
    nodes.forEach((node, i) => node.traverse(mesh => { if (mesh.material?.emissive) { mesh.material.emissive.setHex(i === index ? 0x126342 : 0); mesh.material.emissiveIntensity = lightTheme ? .08 : .28; } }));
    onStage(index); render();
  };
  const trace = createRequestTrace({duration: 4800, lastStage: 5,
    onStage(index) { onStep(index); highlight([0, 1, 1, 2, 1, 0][index]); }, onState,
    onPosition(progress) {
      const segment = Math.min(Math.floor(progress), 4);
      const fraction = progress - segment;
      packet.position.copy(curves[segment].getPoint(fraction)); halo.position.copy(packet.position);
      packet.material.emissive.setHex(lightTheme ? 0x126342 : 0x74d7b0); packet.material.emissiveIntensity = lightTheme ? .25 : 1.2;
      layers.forEach((layer, i) => { layer.position.y = .25 + i * .59 + (reduced ? 0 : Math.sin(Math.min(progress / 5, 1) * Math.PI) * i * .09); });
      routes.forEach((route, i) => { route.material.opacity = i === segment ? .9 : .23; }); render();
    },
  });
  const resize = () => {
    const {width, height: hostHeight} = host.getBoundingClientRect(); const height = hostHeight - 36; if (!width || height <= 0) return;
    renderer.setSize(width, height, false); camera.aspect = width / height;
    // Fit both axes rather than shrinking or clipping the scene at narrow aspect ratios.
    const tangent = Math.tan(camera.fov * Math.PI / 360);
    const distance = Math.max(3.9 / (tangent * camera.aspect), 2.05 / tangent);
    const target = new Vector3(0, .8, .25);
    camera.position.copy(new Vector3(3.3, 4.5, 9.7).normalize().multiplyScalar(distance).add(target));
    camera.lookAt(target); camera.updateProjectionMatrix(); render();
  };
  const pointer = event => { if (reduced) return; const box = host.getBoundingClientRect(); group.rotation.y = ((event.clientX - box.left) / box.width - .5) * .16; group.rotation.x = ((event.clientY - box.top) / box.height - .5) * .06; render(); };
  const leave = () => { group.rotation.set(0, 0, 0); render(); };
  const lost = event => { event.preventDefault(); trace.cancel(); onUnavailable(); };
  const observer = new ResizeObserver(resize); observer.observe(host);
  host.addEventListener("pointermove", pointer); host.addEventListener("pointerleave", leave); renderer.domElement.addEventListener("webglcontextlost", lost);
  resize(); highlight(1);
  return {
    select(index) { trace.cancel(); highlight(index); },
    inspectStep(index) { trace.select(index); },
    pause() { trace.cancel(); }, trace() { trace.start(reduced || !visible); },
    setTheme(value) {
      lightTheme = value === "light";
      bodies.forEach(mesh => mesh.material.color.setHex(lightTheme ? 0xa6bfb3 : 0x283b32));
      accents.forEach(mesh => mesh.material.color.setHex(lightTheme ? 0x126342 : 0x74d7b0));
      glass.forEach(mesh => { mesh.material.color.setHex(lightTheme ? 0x459b78 : 0x74d7b0); mesh.material.opacity = lightTheme ? .15 : .2; });
      const flowAccent = lightTheme ? 0x126342 : 0x74d7b0;
      routes.forEach(route => route.material.color.setHex(flowAccent));
      halo.material.color.setHex(flowAccent);
      packet.material.emissive.setHex(flowAccent);
      packet.material.emissiveIntensity = lightTheme ? .25 : 1.2;
      highlight(selected);
    },
    setReduced(value) { reduced = value; if (value) { trace.completeIfRunning(); layers.forEach((layer, i) => { layer.position.y = .25 + i * .59; }); leave(); } },
    setVisible(value) { visible = value; if (!value) trace.cancel(); else { render(); if (!introduced) { introduced = true; if (!reduced) trace.start(); } } },
    dispose() { destroyed = true; trace.cancel(); observer.disconnect(); host.removeEventListener("pointermove", pointer); host.removeEventListener("pointerleave", leave); renderer.domElement.removeEventListener("webglcontextlost", lost); labelTextures.forEach(texture => texture.dispose()); const geometries = new Set(), materials = new Set(); scene.traverse(object => { if (object.geometry) geometries.add(object.geometry); if (object.material) materials.add(object.material); }); geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose()); renderer.dispose(); renderer.domElement.remove(); },
  };
}
