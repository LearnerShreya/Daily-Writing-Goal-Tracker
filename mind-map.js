// =====================================
// Mind Map - Node and Connection System
// =====================================

// Get the canvas element where nodes will be added
const canvas = document.getElementById('mindmapCanvas');
let selectedNode = null;
let connectingNode = null;


// =====================================
// Function to Create a Node
// =====================================

/**
 * Creates a draggable node at the specified position.
 * @param {number} x - X coordinate of the node.
 * @param {number} y - Y coordinate of the node.
 * @param {string} text - Initial text for the node.
 */

// Utility to create a node
function createNode(x, y, text = 'Node') {
  const node = document.createElement('div');
  node.classList.add('node');
  node.style.left = `${x}px`;
  node.style.top = `${y}px`;


  // Create an input field inside the node for text
  const input = document.createElement('input');
  input.value = text;


  // Prevent input clicks from triggering node movement
  input.addEventListener('click', (e) => e.stopPropagation());
  node.appendChild(input);


  // Enable dragging and connection functionalities
  node.addEventListener('mousedown', (e) => startDrag(e, node));
  node.addEventListener('dblclick', () => startConnection(node));

  canvas.appendChild(node);  // Add node to the canvas
}


// =====================================
// Drag Functionality
// =====================================

/**
 * Starts dragging a node and updates its position.
 * @param {MouseEvent} event - The mouse event.
 * @param {HTMLElement} node - The node being dragged.
 */

function startDrag(event, node) {
  selectedNode = node;
  const offsetX = event.clientX - node.offsetLeft;
  const offsetY = event.clientY - node.offsetTop;

  // Move the node with the mouse
  function drag(e) {
    node.style.left = `${e.clientX - offsetX}px`;
    node.style.top = `${e.clientY - offsetY}px`;
  }

  // Stop dragging when mouse is released
  function stopDrag() {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    selectedNode = null;
  }

  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
}


// =====================================
// Connection Functionality
// =====================================

/**
 * Starts or completes a connection between two nodes.
 * @param {HTMLElement} node - The selected node.
 */

function startConnection(node) {
  if (!connectingNode) {
    // First node selected, highlight it
    connectingNode = node;
    node.style.border = '2px solid yellow';
  } else {

    // Second node selected, draw connection
    drawConnection(connectingNode, node);
    connectingNode.style.border = ''; // Remove highlight
    connectingNode = null; // Reset for next connection
  }
}


/**
 * Draws a line connecting two nodes.
 * @param {HTMLElement} node1 - The first node.
 * @param {HTMLElement} node2 - The second node.
 */

function drawConnection(node1, node2) {
  const line = document.createElement('canvas');
  line.style.position = 'absolute';
  line.style.pointerEvents = 'none';  // Prevent interaction
  canvas.appendChild(line);

  const ctx = line.getContext('2d');
  const rect1 = node1.getBoundingClientRect();
  const rect2 = node2.getBoundingClientRect();

  // Calculate positions relative to the canvas
  const x1 = rect1.left + rect1.width / 2 - canvas.offsetLeft;
  const y1 = rect1.top + rect1.height / 2 - canvas.offsetTop;
  const x2 = rect2.left + rect2.width / 2 - canvas.offsetLeft;
  const y2 = rect2.top + rect2.height / 2 - canvas.offsetTop;

  // Set canvas size to match the container
  line.width = canvas.offsetWidth;
  line.height = canvas.offsetHeight;

  // Draw a line between nodes
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}


// =====================================
// Node Creation on Canvas Double-Click
// =====================================

/**
 * Adds a new node at the clicked position.
*/

canvas.addEventListener('dblclick', (e) => {
  const x = e.clientX - canvas.offsetLeft - 50; 
  const y = e.clientY - canvas.offsetTop - 20;
  createNode(x, y);
});
