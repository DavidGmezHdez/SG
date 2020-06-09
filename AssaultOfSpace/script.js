
/// La escena que tendrá todo lo que se tiene en cuenta al hacer un render
//  Lo que no esté incluido en la escena no será procesado por el renderer
scene = null;

/// La variable que referenciará al renderer
renderer = null;

/// El objeto que referencia a la interfaz gráfica de usuario
gui = null;


/// Se crea y configura un renderer WebGL
/**
 * El renderer recorrerá el grafo de escena para procesarlo y crear la imagen resultante. 
 * Debe hacer este trabajo para cada frame.
 * Si se cambia el grafo de escena después de visualizar un frame, los cambios se verán en el siguiente frame.
 * 
 * @return El renderer
 */
function createRenderer () {
  var renderer = new THREE.WebGLRenderer();
  // Se establece un color de fondo en las imágenes que genera el render
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  
  // Se establece el tamaño, se aprovoche la totalidad de la ventana del navegador
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  return renderer;  
}

/// Función que se encarga de renderizar un frame
/**
 * Se renderiza la escena, captada por una cámara.
 */
function render() {
  // Se solicita que La próxima vez que haya que refrescar la ventana se ejecute una determinada función, en este caso la funcion render.
  // La propia función render es la que indica que quiere ejecutarse la proxima vez
  // Por tanto, esta instrucción es la que hace posible que la función  render  se ejecute continuamente y por tanto podamos crear imágenes que tengan en cuenta los cambios que se la hayan hecho a la escena después de un render.
  requestAnimationFrame(render);
  
  // Se le pide a la escena que se actualice antes de ser renderizada
  scene.update();
  
  // Por último, se le pide al renderer que renderice la escena que capta una determinada cámara, que nos la proporciona la propia escena.
  renderer.render(scene, scene.getCamera());
}

/// Función que actualiza la razón de aspecto de la cámara y el tamaño de la imagen que genera el renderer en función del tamaño que tenga la ventana
function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}

// Se procesa, o el movimiento de cámara, con Ctrl; o los impulsos a las figuras.
function onMouseDown (event) {
  if (event.ctrlKey) {
    scene.getCameraControls().enabled = true;
  } else {
    scene.pushBox (event);
  }
}


/// La función principal
$(function () {
    // El gestor de hebras
    Physijs.scripts.worker = './physijs/physijs_worker.js'
    // El motor de física de bajo nivel, en el cual se apoya Physijs
    Physijs.scripts.ammo   = './ammo.js'
  
  // Se crea el renderer
  renderer = createRenderer();
  
  // La salida del renderer se muestra en un DIV de la página index.html
  $("#WebGL-output").append(renderer.domElement);
  
  // listeners
  
  // Se crea una interfaz gráfica de usuario vacia
  gui = new dat.GUI();
  
  // Se crea la escena. La escena es una instancia de nuestra propia clase encargada de crear y gestionar todos los elementos que intervienen en la escena.
  scene = new MyScene (renderer.domElement,1);


  window.addEventListener ("resize", () => scene.onWindowResize());

  window.addEventListener ("keydown", () => scene.onKeyDown(event));

  window.addEventListener ("keyup", () => scene.onKeyUp(event));

  window.addEventListener ("keypress", () => scene.onKeyPress(event));

  scene.update();
  // Finalmente, realizamos el primer renderizado.
  render();
});
