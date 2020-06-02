 
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

//import { Clock } from "../libs/Clock";

class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    // El gestor de hebras
    Physijs.scripts.worker = './physijs/physijs_worker.js';
    // El motor de física de bajo nivel, en el cual se apoya Physijs
    Physijs.scripts.ammo   = './ammo.js';
    super();
    
    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI ();
    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
    
    // Creamos el escenario
    this.createEscenario ();
    
    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    
    this.nave = new MyShip(this.gui, "Controles Nave");
    this.nave.position.y = 5;
    this.nave.position.z = 30;

    this.nave.addEventListener ('collision',function (o,v,r,n) {
      console.log("entra");
      alert("entra nave");
    });
    
    this.add (this.nave);



    

    this.borde1 = new Border(this.gui, "Controles Cilindro");
    this.add (this.borde1);
    this.borde1.position.x = -30;

    this.borde2 = new Border(this.gui, "Controles Cilindro");
    this.add (this.borde2);
    this.borde2.position.x = 30;

    this.laseres = new Array();

    this.enemigos = new Array();
    
    this.keys = { };

    this.objetos = [];
    this.sistemaColisiones = new THREEx.ColliderSystem();
    this.objetos.push(this.colisionadorNave);

    this.generarOleada(1);

    //this.controlColisiones();

    this.enemigosCargados = false;

    setInterval(()=>this.disparosEnemigos(),5000);
/*
    var enemy = new Enemy(-20,-35);
    enemy.position.set(-20,5,-35);
    this.add(enemy);
    this.enemigos.push(enemy)

    var enemy = new Enemy(-12,-25);
    enemy.position.set(-12,5,-25);
    this.add(enemy);
    this.enemigos.push(enemy)
*/
  
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (0, 100, 0);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new THREE.TrackballControls (this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
  }
  
  createEscenario () {
    // El suelo es un Mesh, necesita una geometría y un material.
    

    var geometry = new THREE.BoxGeometry (200,-1,200);
    
    var texturaSpace = new THREE.TextureLoader().load('../imgs/space.jpg');
    var materialSpace = new THREE.MeshPhongMaterial ({map: texturaSpace});
    
    // Ya se puede construir el Mesh

    var espacio = new THREE.Mesh (geometry, materialSpace);

    
    // Todas las figuras se crean centradas en el origen.
    // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
    espacio.y = -0.1;
    
    // Que no se nos olvide añadirlo a la escena, que en este caso es  this
    this.add (espacio);
  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new dat.GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = new function() {
      // En el contexto de una función   this   alude a la función
      this.lightIntensity = 0.5;
      this.axisOnOff = true;
      this.animacion = false;
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz, Ejes y Animación');
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 1, 0.1).name('Intensidad de la Luz : ');
    
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }

  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  onKeyDown (event){
    var tecla = event.which || event.keyCode;
    this.keys[tecla] = true;
  }

  onKeyUp (event){
    var tecla = event.which || event.keyCode;
    this.keys[tecla] = false;

  }

  
  onKeyPress (event){
    var tecla = event.which || event.keyCode;
    this.keys[tecla] = true;
    if(this.keys[32])
    this.disparar();
    
  }

  disparar(){
    var laser = new Laser(true);
    laser.position.set(this.nave.position.x,this.nave.position.y,this.nave.position.z);
    this.laseres.push(laser);
    this.add(laser);
  }

  eliminarLaser(laser){
    this.remove(laser);
    laser = null;
  }

  ejecutarMovimiento(){
    if(this.keys[37])
      this.nave.mover(true);
    
    if(this.keys[39])
      this.nave.mover(false);
    
    if(!this.keys[37] && !this.keys[39])
      this.nave.ponerRecta();
  }

  ejecutarMovimientoEnemigos(){
    for(let i=0;i<this.enemigos.length;i++){
      this.enemigos[i].movimiento();
    }
  }

  generarOleada(numeroOleada){
    switch(numeroOleada){
      case 1:
        
        for(let i=-20;i<=20;i+=8){
          for(let j = -35;j<=-15;j+=10){
            var enemy = new Enemy(i,j);
            enemy.position.set(i,5,j);
            enemy.addEventListener ('collision',function (o,v,r,n) {
              console.log("entra enemigo");
              alert("entra enemigo");
            });
            this.add(enemy);
            this.enemigos.push(enemy)
          }
        }
        this.enemigosCargados = true;
        break;
      case 2:
        for(let i = -35;i<=-5;i+=10){
          for(let j=-20;j<=20;j+=8){
            var enemy = new Enemy(j,i);

            this.add(enemy);
            this.enemigos.push(enemy)
          }
        }
        this.enemigosCargados = true;
        break;
    }
    
  }

  dispararLasers(){
    for(let i=0;i<this.laseres.length;i++){
      var laser = this.laseres[i];
      laser.update();
      if(laser == -60){
        this.eliminarLaser(laser);
      }
    }
  }

  disparosEnemigos(){
    var laser = new Laser(false);
    var enemigo = this.enemigos[Math.floor(Math.random() * this.enemigos.length)];
    laser.position.set(enemigo.getX(),5,enemigo.getZ());

    laser.addEventListener ('collision',function (o,v,r,n) {
      console.log("entra laser");
      alert("entra laser");
    });
    
    this.laseres.push(laser);
    this.add(laser);
  }

  controlColisiones(){

  }



  update () {
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())

    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
    this.spotLight.intensity = this.guiControls.lightIntensity;
    
    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();
    
    // Se actualiza el resto del modelo
    
    
    this.nave.update();


    this.dispararLasers();

    //this.borde1.update();

    this.ejecutarMovimiento();

    //this.comprobarEnemigos();
    
    
    //this.ejecutarMovimientoEnemigos();

    this.ejecutarMovimientoEnemigos();
    

    //this.sistemaColisiones.computeAndNotify(this.objetos);

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

  }
}

/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  var finjuego = false;

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());

  window.addEventListener ("keydown", () => scene.onKeyDown(event));

  window.addEventListener ("keyup", () => scene.onKeyUp(event));

  window.addEventListener ("keypress", () => scene.onKeyPress(event));

  

  
  // Que no se nos olvide, la primera visualización.
  scene.update();




});
