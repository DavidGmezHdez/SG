class MyCone extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    // Un Mesh se compone de geometría y material
    var coneGeo = new THREE.ConeGeometry(this.guiControls.radio,this.guiControls.altura,this.guiControls.segmentos);
    // Como material se crea uno a partir de un color
    var coneMat = new THREE.MeshNormalMaterial();
    
    // Ya podemos construir el Mesh
    this.cone = new THREE.Mesh (coneGeo, coneMat);
    // Y añadirlo como hijo del Object3D (el this)
    this.add (this.cone);
    
    // Las geometrías se crean centradas en el origen.
    // Como queremos que el sistema de referencia esté en la base,
    // subimos el Mesh de la caja la mitad de su altura
    this.cone.position.y = 0.5;
    this.cone.position.x = 5;
  }
  
  createGUI (gui,titleGui) {
    // Controles para el  radio, altura y resolución del cono
    this.guiControls = new function () {

      
      this.radio = 1;
      this.altura = 1;
      this.segmentos = 3;   
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeZ = 1.0;
        
        this.rotX = 0.0;
        this.rotY = 0.0;
        this.rotZ = 0.0;
        
        this.posX = 5.0;
        this.posY = 0.0;
        this.posZ = 0.0;
        this.radio = 1;
        this.altura = 1;
        this.segmentos = 3;  
      }
    } 

    var that = this;
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radio', 1, 5.0, 0.1).name ('Radio : ').listen()
      .onChange(function(rad){
        var coneGeo = new THREE.ConeGeometry(rad,that.guiControls.altura,that.guiControls.segmentos);
        that.cone.geometry = coneGeo;
      });
      
    folder.add (this.guiControls, 'altura', 1, 5.0, 0.1).name ('Altura : ').listen()
    .onChange(function(alt){
      var coneGeo = new THREE.ConeGeometry(that.guiControls.radio,alt,that.guiControls.segmentos);
      that.cone.geometry = coneGeo;
    });


    folder.add (this.guiControls, 'segmentos', 3, 15.0, 0.1).name ('Resolucion : ').listen()
    .onChange(function(seg){
      var coneGeo = new THREE.ConeGeometry(that.guiControls.radio,that.guiControls.altura,seg);
      that.cone.geometry = coneGeo;
    });
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    this.cone.rotation.x += 0.01;
    this.cone.rotation.y += 0.01;

  }

}