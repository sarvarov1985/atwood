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

// Define the pulley as a dynamic body that can rotate
const pulley = Bodies.circle(400, 100, 20, {
  isStatic: false,       // Allows rotation
  inertia: Infinity,     // Prevents the pulley from translating (only rotation)
  render: { fillStyle: 'black' }
});
World.add(world, pulley);

// Add a fixed constraint to anchor the pulley in place
const anchor = Constraint.create({
  pointA: { x: 400, y: 100 }, // Fixed position in the world
  bodyB: pulley,              // Attach to the pulley
  length: 0,                  // No slack
  stiffness: 1                // Keeps the pulley firmly in place
});
World.add(world, anchor);

// Define properties of the masses (weights)
const mass1 = Bodies.rectangle(350, 300, 40, 40, { mass: 2, render: { fillStyle: 'blue' } }); // Lighter mass
const mass2 = Bodies.rectangle(450, 300, 60, 60, { mass: 6, render: { fillStyle: 'red' } });  // Heavier mass
World.add(world, [mass1, mass2]);

// Create two constraints to simulate a single rope hanging through the pulley
const rope1 = Constraint.create({
  bodyA: mass1,
  bodyB: pulley,
  pointB: { x: -20, y: 0 },  // Connect to the left side of the pulley
  stiffness: 1,
  length: 200,                // Adjust length for the left side of the rope
  render: { strokeStyle: 'gray', lineWidth: 2 }
});

const rope2 = Constraint.create({
  bodyA: mass2,
  bodyB: pulley,
  pointB: { x: 20, y: 0 },   // Connect to the right side of the pulley
  stiffness: 1,
  length: 200,                // Adjust length for the right side of the rope
  render: { strokeStyle: 'gray', lineWidth: 2 }
});

World.add(world, [rope1, rope2]);

// Add a ground for visual reference
const ground = Bodies.rectangle(400, 580, 810, 60, {
  isStatic: true,
  render: { fillStyle: 'green' }
});
World.add(world, ground);
