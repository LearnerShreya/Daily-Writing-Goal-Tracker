const canvas = document.getElementById('mindmapCanvas');
let selectedNode = null;
let connectingNode = null;

// Utility to create a node
function createNode(x, y, text = 'Node') {
  const node = document.createElement('div');
  node.classList.add('node');
  node.style.left = `${x}px`;
  node.style.top = `${y}px`;

  const input = document.createElement('input');
  input.value = text;
  input.addEventListener('click', (e) => e.stopPropagation());
  node.appendChild(input);

  node.addEventListener('mousedown', (e) => startDrag(e, node));
  node.addEventListener('dblclick', () => startConnection(node));
  canvas.appendChild(node);
}

// Drag functionality
function startDrag(event, node) {
  selectedNode = node;
  const offsetX = event.clientX - node.offsetLeft;
  const offsetY = event.clientY - node.offsetTop;

  function drag(e) {
    node.style.left = `${e.clientX - offsetX}px`;
    node.style.top = `${e.clientY - offsetY}px`;
  }

  function stopDrag() {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    selectedNode = null;
  }

  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);
}

// Connection functionality
function startConnection(node) {
  if (!connectingNode) {
    connectingNode = node;
    node.style.border = '2px solid yellow';
  } else {
    drawConnection(connectingNode, node);
    connectingNode.style.border = '';
    connectingNode = null;
  }
}

// Draw a connection between two nodes
function drawConnection(node1, node2) {
  const line = document.createElement('canvas');
  line.style.position = 'absolute';
  line.style.pointerEvents = 'none';
  canvas.appendChild(line);

  const ctx = line.getContext('2d');
  const rect1 = node1.getBoundingClientRect();
  const rect2 = node2.getBoundingClientRect();
  const x1 = rect1.left + rect1.width / 2 - canvas.offsetLeft;
  const y1 = rect1.top + rect1.height / 2 - canvas.offsetTop;
  const x2 = rect2.left + rect2.width / 2 - canvas.offsetLeft;
  const y2 = rect2.top + rect2.height / 2 - canvas.offsetTop;

  line.width = canvas.offsetWidth;
  line.height = canvas.offsetHeight;

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

// Add nodes on double-click
canvas.addEventListener('dblclick', (e) => {
  const x = e.clientX - canvas.offsetLeft - 50; 
  const y = e.clientY - canvas.offsetTop - 20;
  createNode(x, y);
});
