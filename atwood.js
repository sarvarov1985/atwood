const { Engine, Render, Runner, Bodies, World, Constraint } = Matter;

// Initialize engine and world
const engine = Engine.create();
const { world } = engine;

// Create a renderer for the canvas
const render = Render.create({
  element: document.getElementById('simulation-container'),
  engine: engine,
  options: {
    width: 800,
    height: 600,
    wireframes: false,
    background: '#f0f0f0'
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);

// Define pulley properties
const pulley = Bodies.circle(400, 100, 20, {
  isStatic: true,
  render: { fillStyle: 'black' }
});
World.add(world, pulley);

// Define properties of the masses (weights)
const mass1 = Bodies.rectangle(350, 300, 40, 40, { mass: 2, render: { fillStyle: 'blue' } });
const mass2 = Bodies.rectangle(450, 300, 60, 60, { mass: 4, render: { fillStyle: 'red' } });
World.add(world, [mass1, mass2]);

// Create constraints to simulate the rope tied to opposite sides of the pulley
const rope1 = Constraint.create({
  bodyA: mass1,
  pointB: { x: 380, y: 100 }, // Connect to left side of pulley
  stiffness: 1,
  length: 200,
  render: { strokeStyle: 'gray', lineWidth: 2 }
});

const rope2 = Constraint.create({
  bodyA: mass2,
  pointB: { x: 420, y: 100 }, // Connect to right side of pulley
  stiffness: 1,
  length: 200,
  render: { strokeStyle: 'gray', lineWidth: 2 }
});

World.add(world, [rope1, rope2]);

// Add a ground for reference
const ground = Bodies.rectangle(400, 580, 810, 60, {
  isStatic: true,
  render: { fillStyle: 'green' }
});
World.add(world, ground);
