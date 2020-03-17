class MyTorus extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
  
      // Un Mesh se compone de geometría y material
      var torGeo = new THREE.TorusGeometry(this.guiControls.radio,this.guiControls.radioTubo,this.guiControls.segToro,this.guiControls.segTubo,this.guiControls.arco);
      // Como material se crea uno a partir de un color
      var torMat = new THREE.MeshNormalMaterial();
      
      // Ya podemos construir el Mesh
      this.tor = new THREE.Mesh (torGeo, torMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.tor);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      this.tor.position.y = 5;
      this.tor.position.x = 5;
    }
    
    createGUI (gui,titleGui) {
      // Controles para el  radio, altura y resolución del cono
      this.guiControls = new function () {
        
        this.radio = 1.0;
        this.radioTubo = 0.2;
        this.segToro = 3.0;
        this.segTubo = 3.0;
        this.arco = Math.PI*2;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
            this.radio = 1.0;
            this.radioTubo = 0.2;
            this.segToro = 3.0;
            this.segTubo = 3.0;
            this.arco = Math.PI*2;
        }
      } 
  
      var that = this;
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'radio', 1, 5.0, 0.1).name ('Radio Principal: ').listen()
        .onChange(function(rad){
          var torGeo = new THREE.TorusGeometry(rad,that.guiControls.radioTubo,that.guiControls.segToro,that.guiControls.segTubo,that.guiControls.arco);
          that.tor.geometry = torGeo;
        });

      folder.add (this.guiControls, 'radioTubo', 0.2, 1.0, 0.1).name ('Radio Tubo : ').listen()
        .onChange(function(radtub){
          var torGeo = new THREE.TorusGeometry(that.guiControls.radio,radtub,that.guiControls.segToro,that.guiControls.segTubo,that.guiControls.arco);
          that.tor.geometry = torGeo;
        });
        
      folder.add (this.guiControls, 'segToro', 3, 25.0, 0.1).name ('Resolucion Toro : ').listen()
      .onChange(function(segTor){
        var torGeo = new THREE.TorusGeometry(that.guiControls.radio,that.guiControls.radioTubo,segTor,that.guiControls.segTubo,that.guiControls.arco);
        that.tor.geometry = torGeo;
      });

      folder.add (this.guiControls, 'segTubo', 3, 25.0, 0.1).name ('Resolucion Tubo : ').listen()
      .onChange(function(segTub){
        var torGeo = new THREE.TorusGeometry(that.guiControls.radio,that.guiControls.radioTubo,that.guiControls.segToro,segTub,that.guiControls.arco);
        that.tor.geometry = torGeo;
      });
      
      folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }
    
    update () {
      this.tor.rotation.x += 0.01;
      this.tor.rotation.y += 0.01;
    }
  
  }