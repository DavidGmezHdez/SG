class MyIcosahedron extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
  
      // Un Mesh se compone de geometría y material
      var icoGeo = new THREE.IcosahedronGeometry (this.guiControls.radio,this.guiControls.divisiones);
      // Como material se crea uno a partir de un color
      var icoMat = new THREE.MeshNormalMaterial();
      
      // Ya podemos construir el Mesh
      this.ico = new THREE.Mesh (icoGeo, icoMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.ico);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      this.ico.position.y = 5;
      this.ico.position.x = -5;
    }
    
    createGUI (gui,titleGui) {
      // Controles para el  radio, altura y resolución del cono
      this.guiControls = new function () {
        
        this.radio = 1.0;
        this.divisiones = 0.0;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
            this.radio = 1.0;
            this.divisiones = 0.0;
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
          var icoGeo = new THREE.IcosahedronGeometry (rad,that.guiControls.divisiones);
          that.ico.geometry = icoGeo;
        });

      folder.add (this.guiControls, 'divisiones', 0.0, 3.0, 1.0).name ('Subdivisiones : ').listen()
        .onChange(function(div){
            var icoGeo = new THREE.IcosahedronGeometry (that.guiControls.radio,div);
            that.ico.geometry = icoGeo;
        });

      folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }
    
    update () {
      this.ico.rotation.x += 0.01;
      this.ico.rotation.y += 0.01;
    }
  
  }