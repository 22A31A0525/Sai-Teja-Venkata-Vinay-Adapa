import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

// This is the main component for the animated background
const AnimatedBackground = () => {
  // This function loads the particles engine
  const particlesInit = useCallback(async (engine) => {
    // loads the slim version of tsparticles, which is lightweight
    await loadSlim(engine);
  }, []);

  // This function is called when the particles container is loaded
  const particlesLoaded = useCallback(async (container) => {
    // You can use the container object here if needed
  }, []);

  // Particle options have been configured for an attractive look
  const particleOptions = {
    // We removed fullScreen and background properties from here
    // to allow the custom gradient background to show.
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "bubble",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 400,
          size: 4,
          duration: 2,
          opacity: 1,
        },
        push: {
          quantity: 1,
        },
      },
    },
    particles: {
      color: {
        value: ["#00ffc8ff", "#3b82f6", "#07ff62ff", "#ffee00ff"],
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: { min: 0.1, max: 0.5 },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 2, max: 4 },
      },
    },
    detectRetina: true,
  };

  // The main return wraps the Particles component in a div with the gradient style
  return (
    <div
      style={{
        position: "fixed", // Or 'absolute' depending on your layout
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Ensure it's behind all other content
        background: "linear-gradient(to bottom, #170a3b, #1d1043 50%, #150a39)",
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleOptions}
        // Set height and width to fill the container
        height="100vh"
        width="100vw"
      />
    </div>
  );
};

export default AnimatedBackground;
