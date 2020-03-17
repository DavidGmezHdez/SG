class MyCylinder extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
  
      // Un Mesh se compone de geometría y material
      var cylGeo = new THREE.CylinderGeometry(this.guiControls.radioSup,this.guiControls.radioInf,this.guiControls.altura,this.guiControls.segmentos);
      // Como material se crea uno a partir de un color
      var cylMat = new THREE.MeshNormalMaterial();
      
      // Ya podemos construir el Mesh
      this.cyl = new THREE.Mesh (cylGeo, cylMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add (this.cyl);
      
      // Las geometrías se crean centradas en el origen.
      // Como queremos que el sistema de referencia esté en la base,
      // subimos el Mesh de la caja la mitad de su altura
      this.cyl.position.y = 0.5;
      this.cyl.position.x = -5;
    }
    
    createGUI (gui,titleGui) {
      // Controles para el  radio, altura y resolución del cono
      this.guiControls = new function () {
        
        this.radioSup = 1.0;
        this.radioInf = 1.0;
        this.altura = 1.0;
        this.segmentos = 3.0;   
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
          this.radioSup = 1.0;
          this.radioInf = 1.0;
          this.altura = 1.0;
          this.segmentos = 3.0;   
        }
      } 
  
      var that = this;
      
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder (titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'radioSup', 1, 5.0, 0.1).name ('Radio Superior : ').listen()
        .onChange(function(rad){
          var cylGeo = new THREE.CylinderGeometry(rad,that.guiControls.radioInf,that.guiControls.altura,that.guiControls.segmentos);
          that.cyl.geometry = cylGeo;
        });

      folder.add (this.guiControls, 'radioInf', 1, 5.0, 0.1).name ('Radio Inferior : ').listen()
        .onChange(function(rad){
          var cylGeo = new THREE.CylinderGeometry(that.guiControls.radioSup,rad,that.guiControls.altura,that.guiControls.segmentos);
          that.cyl.geometry = cylGeo;
        });
        
      folder.add (this.guiControls, 'altura', 1, 5.0, 0.1).name ('Altura : ').listen()
      .onChange(function(alt){
        var cylGeo = new THREE.CylinderGeometry(that.guiControls.radioSup,that.guiControls.radioInf,alt,that.guiControls.segmentos);
        that.cyl.geometry = cylGeo;
      });
  
  
      folder.add (this.guiControls, 'segmentos', 3, 15.0, 0.1).name ('Resolucion : ').listen()
      .onChange(function(seg){
        var cylGeo = new THREE.CylinderGeometry(that.guiControls.radioSup,that.guiControls.radioInf,that.guiControls.altura,seg);
        that.cyl.geometry = cylGeo;
      });
      
      folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }
    
    update () {
      this.cyl.rotation.x += 0.01;
      this.cyl.rotation.y += 0.01;
    }
  
  }