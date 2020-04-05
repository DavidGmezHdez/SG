 
class MyPawn extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);

    // Puntos
    this.points = [];

    // Se añaden los puntos al array
    this.points.push(new THREE.Vector3(0.0, -1.4, 0.0));
    this.points.push(new THREE.Vector3(1.0, -1.4, 0.0));
    this.points.push(new THREE.Vector3(1.0, -1.1, 0.0));
    this.points.push(new THREE.Vector3(0.5, -0.7, 0.0));
    this.points.push(new THREE.Vector3(0.4, -0.4, 0.0));
    this.points.push(new THREE.Vector3(0.4, 0.5, 0.0));
    this.points.push(new THREE.Vector3(0.5, 0.6, 0.0));
    this.points.push(new THREE.Vector3(0.3, 0.6, 0.0));
    this.points.push(new THREE.Vector3(0.5, 0.8, 0.0));
    this.points.push(new THREE.Vector3(0.55, 1.0, 0.0));
    this.points.push(new THREE.Vector3(0.5, 1.2, 0.0));
    this.points.push(new THREE.Vector3(0.3, 1.4, 0.0));
    this.points.push(new THREE.Vector3(0.0, 1.4, 0.0));


    // Para crear la figura por revolución
    var pawngeo = new THREE.LatheGeometry(this.points,this.guiControls.segmentos, 0, this.guiControls.arco);
    var material = new THREE.MeshNormalMaterial();
    this.pawn = new THREE.Mesh(pawngeo,material);

    this.add(this.pawn);

    // Para crear una línea visible, como en el vídeo
    var lineGeometry = new THREE.Geometry();

    

    lineGeometry.vertices = this.points;

    var line = new THREE.Line (lineGeometry, material);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      this.pawn.position.y = 1.5;
      this.add(line);
      line.position.set(3, 1.4, 0);
      line.rotation.y = -1.5;
    }
    
    createGUI (gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = new function () {
        
        this.segmentos = 3.0;
        this.arco = 1.0;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
            this.segmentos = 3.0;
            this.arco = 1.0;    
        }
      } 
      
      var that = this;
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'segmentos', 3, 14, 1.0).name ('Resolucion : ').listen()        
      .onChange(function(seg){
        var pawnGeo = new THREE.LatheGeometry(that.points,seg,0,that.guiControls.arco);
        that.pawn.geometry = pawnGeo;
      });
      
      folder.add (this.guiControls, 'arco', 1.0, 2*Math.PI, 0.1).name ('Angulo : ').listen()        
      .onChange(function(ang){
        var pawnGeo = new THREE.LatheGeometry(that.points,that.guiControls.segmentos,0,ang);
        that.pawn.geometry = pawnGeo;
      });
    }
    
    update () {
      
    }
  }
  
  

  