 
class MyHeartColumn extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde a la caja
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);

      var material = new THREE.MeshPhongMaterial({color: 0x088A29});
      var x = 0, y = 0;
      
      var shape = new THREE.Shape();

      shape.moveTo( x + 5, y + 5 );
      shape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
      shape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
      shape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
      shape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
      shape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
      shape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
  
      // Ruta de la columna
      var puntos = [];
  
      for(var i = 0; i < 5; i++) {
          puntos[i] = (new THREE.Vector3(( i - 4.5 ) * 10, THREE.Math.randFloat( -10, 10 ), THREE.Math.randFloat( -10, 10 )));
      }
  
      var ruta = new THREE.CatmullRomCurve3(puntos);
  
      var extrudeSettings = { steps: 200, bevelEnabled: false, extrudePath: ruta };
  
      this.heartSpline = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
  
      this.columna = new THREE.Mesh(this.heartSpline, material);
  
      this.columna.position.set(15.0, 4.0, 0.0);
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
  
  

  