class MyCone extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);

    this.radio = 2;
    this.altura = 5;
    this.segmentos = 3;
 
    // Un Mesh se compone de geometría y material
    var coneGeo = new THREE.ConeGeometry(this.radio,this.altura,this.segmentos);
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
  }
  
  createGUI (gui,titleGui) {
    // Controles para el  radio, altura y resolución del cono
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;
      
      this.rotX = 0.0;
      this.rotY = 0.0;
      this.rotZ = 0.0;
      
      this.posX = 5.0;
      this.posY = 0.0;
      this.posZ = 0.0;

      this.rad = this.radio;
      this.alt = this.altura;
      this.seg = this.segmentos;
    
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;
        
        this.rotX = 0.0;
        this.rotY = 0.0;
        this.rotZ = 0.0;
        
        this.posX = 5.0;
        this.posY = 0.0;
        this.posZ = 0.0;
      }
    } 

    var that = this;
    
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'radio', 0.1, 5.0, 0.1).name ('Radio : ').listen()
      .onChange(function(rad){
        var coneGeo = new THREE.ConeGeometry(rad,this.altura,this.segmentos);
        that.cone.radio = rad;
        that.cone.geometry = coneGeo;
      });
      
    folder.add (this.guiControls, 'altura', 0.1, 5.0, 0.1).name ('Altura : ').listen();
    folder.add (this.guiControls, 'seg', 0.1, 15.0, 0.1).name ('Resolucion : ').listen()
    .onChange(function(seg){
      var coneGeo = new THREE.ConeGeometry(this.radio,this.altura,seg);
      that.cone.segmentos = seg;
      that.cone.geometry = coneGeo;
    });
    
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
  
  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.position.set (this.guiControls.posX,this.guiControls.posY,this.guiControls.posZ);
    this.rotation.set (this.guiControls.rotX,this.guiControls.rotY,this.guiControls.rotZ);
    this.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
    
  }

}