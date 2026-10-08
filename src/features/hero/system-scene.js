import {
  Scene, PerspectiveCamera, WebGLRenderer, Group, BoxGeometry, MeshStandardMaterial,
  Mesh, HemisphereLight, DirectionalLight, EdgesGeometry, LineSegments, LineBasicMaterial,
  BufferGeometry, Vector3, Line, SphereGeometry,
} from "three";

export function createSystemScene(host, onUnavailable) {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);
  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, .1, 100);
  camera.position.set(5.7, 5.2, 7.3);
  camera.lookAt(0, .1, 0);
  scene.add(new HemisphereLight(0xbfe8ff, 0x15243e, 3));
  const light = new DirectionalLight(0xffffff, 4);
  light.position.set(3, 6, 2);
  scene.add(light);
  const group = new Group();
  scene.add(group);
  const positions = [[-2, 0, 0], [0, 0, -1.5], [2, 0, 0], [0, 0, 1.5]];
  const blocks = positions.map((position, index) => {
    const geometry = new BoxGeometry(1.15, index === 3 ? 1.1 : .7, 1.15);
    const material = new MeshStandardMaterial({ color: 0x25415d, roughness: .4, metalness: .25, emissive: 0x061325 });
    const block = new Mesh(geometry, material);
    block.position.set(...position);
    group.add(block);
    const edges = new LineSegments(new EdgesGeometry(geometry), new LineBasicMaterial({ color: 0x7dd3fc }));
    block.add(edges);
    return block;
  });
  const platform = new Mesh(new BoxGeometry(6.5, .12, 4.8), new MeshStandardMaterial({ color: 0x101f32, roughness: .8 }));
  platform.position.y = -.85;
  group.add(platform);
  const points = positions.map(([x, , z]) => new Vector3(x, .65, z));
  const route = new Line(new BufferGeometry().setFromPoints(points), new LineBasicMaterial({ color: 0x4c87a8 }));
  group.add(route);
  const packet = new Mesh(new SphereGeometry(.12, 12, 8), new MeshStandardMaterial({ color: 0xbae6fd, emissive: 0x7dd3fc, emissiveIntensity: 2 }));
  packet.position.copy(points[0]);
  group.add(packet);
  let frame = 0;
  let visible = true;
  let reduced = false;
  let destroyed = false;
  let selected = 0;
  const render = () => { if (!destroyed && visible) renderer.render(scene, camera); };
  const stop = () => { cancelAnimationFrame(frame); frame = 0; };
  const select = (index) => {
    stop();
    selected = index;
    blocks.forEach((block, i) => { block.material.color.setHex(i === index ? 0x3b88b0 : 0x25415d); block.material.emissiveIntensity = i === index ? 1.5 : .3; });
    packet.position.copy(points[index]);
    render();
  };
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render();
  };
  const pointer = (event) => {
    if (reduced || !visible) return;
    const bounds = host.getBoundingClientRect();
    group.rotation.y = ((event.clientX - bounds.left) / bounds.width - .5) * .3;
    group.rotation.x = ((event.clientY - bounds.top) / bounds.height - .5) * .08;
    render();
  };
  const reset = () => { group.rotation.set(0, 0, 0); select(selected); };
  const lost = (event) => { event.preventDefault(); stop(); onUnavailable(); };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  host.addEventListener("pointermove", pointer);
  host.addEventListener("pointerleave", reset);
  renderer.domElement.addEventListener("webglcontextlost", lost);
  resize();
  select(0);
  return {
    select,
    reset,
    setVisible(value) { visible = value; if (!value) stop(); else render(); },
    setReduced(value) { reduced = value; if (value) reset(); },
    trace() {
      stop();
      if (reduced || !visible) { select(3); return; }
      const started = performance.now();
      const animate = (time) => {
        if (destroyed || !visible || reduced) return;
        const progress = Math.min((time - started) / 2100, 1) * 3;
        const segment = Math.min(Math.floor(progress), 2);
        packet.position.lerpVectors(points[segment], points[segment + 1], progress - segment);
        render();
        if (progress < 3) frame = requestAnimationFrame(animate);
        else { frame = 0; select(3); }
      };
      frame = requestAnimationFrame(animate);
    },
    dispose() {
      if (destroyed) return;
      destroyed = true;
      stop();
      observer.disconnect();
      host.removeEventListener("pointermove", pointer);
      host.removeEventListener("pointerleave", reset);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (object.material) object.material.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
