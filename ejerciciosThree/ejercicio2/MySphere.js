class MySphere extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
  
      // Un Mesh se compone de geometría y material
      var spheGeo = new THREE.SphereGeometry(this.guiControls.radio,this.guiControls.segancho,this.guiControls.segalto);
      // Como material se crea uno a partir de un color
      var spheMat = new THREE.MeshNormalMaterial();
      
      // Ya podemos construir el Mesh
      this.sphe = new THREE.Mesh (spheGeo, spheMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.sphe);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      this.sphe.position.y = 5;
    }
    
    createGUI (gui,titleGui) {
      // Controles para el  radio, altura y resolución del cono
      this.guiControls = new function () {
        
        this.radio = 1.0;
        this.segancho = 3.0;
        this.segalto = 2.0;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
            this.radio = 1.0;
            this.segancho = 3.0;
            this.segalto = 2.0;
        }
      } 
  
      var that = this;
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'radio', 1, 5.0, 0.1).name ('Radio: ').listen()
        .onChange(function(rad){
          var spheGeo = new THREE.SphereGeometry(rad,that.guiControls.segancho,that.guiControls.segalto);
          that.sphe.geometry = spheGeo;
        });

      folder.add (this.guiControls, 'segancho', 3, 25.0, 0.1).name ('Res. Ecuador : ').listen()
        .onChange(function(ancho){
            var spheGeo = new THREE.SphereGeometry(that.guiControls.radio,ancho,that.guiControls.segalto);
            that.sphe.geometry = spheGeo;
        });
        
      folder.add (this.guiControls, 'segalto', 2, 25.0, 0.1).name ('Res. Meridiano : ').listen()
      .onChange(function(alt){
        var spheGeo = new THREE.SphereGeometry(that.guiControls.radio,that.guiControls.segancho,alt);
        that.sphe.geometry = spheGeo;
      });
      
      folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }
    
    update () {
      this.sphe.rotation.x += 0.01;
      this.sphe.rotation.y += 0.01;
    }
  
  }