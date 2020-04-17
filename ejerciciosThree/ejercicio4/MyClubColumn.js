 
class MyClubColumn extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);

      var material = new THREE.MeshPhongMaterial({color: 0x088A29});

      var shape = new THREE.Shape();

      shape.moveTo( 0, 5 );
      shape.bezierCurveTo( -4.5, -3.7, -3, 5.3, 0, 3 )
      shape.bezierCurveTo( -1.4, 7.5, 4.4, 7, 3, 3)
      shape.bezierCurveTo( 6.5, 4.3, 7.0, -3.7, 1.5, 0.0);
  
      var puntos = [];
  
      for(var i = 0; i < 5; i++) {
          puntos[i] = (new THREE.Vector3(( i - 4.5 ) * 10, THREE.Math.randFloat( -10, 10 ), THREE.Math.randFloat( -10, 10 )));
      }
  
      var ruta = new THREE.CatmullRomCurve3(puntos);
  
      var extrudeSettings = { steps: 200, bevelEnabled: false, extrudePath: ruta };
  
      this.spadeSpline = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
  
      this.columna = new THREE.Mesh(this.spadeSpline, material);
  
      this.columna.position.set(-15.0, 4.0, 0.0);
      this.columna.rotation.z = 1/2 * Math.PI;
  
      this.add(this.columna);

    }
    
    createGUI (gui,titleGui) {
    }
    
    update () {
      this.columna.rotation.y += 0.01;
      this.columna.rotation.x += 0.005;
    }
  }
  
  

  