 
class MyDiamond extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);


        var shape = new THREE.Shape();
        shape.moveTo(0,0);
        shape.lineTo(3.0,4.0);
        shape.lineTo(0.0,8.0);
        shape.lineTo(-3.0,4.0);
        
        
        var extrudeSettings = { depth: 0.5, steps: 100, bevelSize: 1, bevelThickness: 0.5, bevelSegments: 100 };

        // Para crear la figura por revolución
        var geo = new THREE.ExtrudeBufferGeometry(shape,extrudeSettings);
        var material =  new THREE.MeshPhongMaterial({color: 0xff0000});
        this.figure = new THREE.Mesh(geo,material);

        
        this.nodo1 = new THREE.Object3D();
        this.nodo1.position.set(-4.0, 3.5, 0.0);
        this.nodo1.add(this.figure);

        this.nodo2 = new THREE.Object3D();
        this.nodo2.add(this.nodo1);
        
        this.add(this.nodo2);


    }
    
    createGUI (gui,titleGui) {
    }
    
    update () {
        this.nodo2.rotation.z += 0.01;
        this.nodo1.rotation.z -= 0.01;
        this.figure.rotation.y += 0.015;
    }
  }
  
  

  