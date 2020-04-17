 
class MyClub extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        this.puntos = [];
        this.puntos.push(new THREE.Vector3(0.0,0.0, 0.0));
        this.puntos.push(new THREE.Vector3(4.0,0.0, 0.0));
        this.puntos.push(new THREE.Vector3(1.0,2.0, 0.0));
        this.puntos.push(new THREE.Vector3(1.0,8.0, 0.0));
        this.puntos.push(new THREE.Vector3(0.0,8.0, 0.0));

        var piegeo = new THREE.LatheGeometry(this.puntos);
        var material = new THREE.MeshPhongMaterial({color: 0x0208ca});
        this.pie = new THREE.Mesh(piegeo,material);
    

        var shape = new THREE.Shape();

        shape.moveTo( 0, 5 );
        shape.bezierCurveTo( -4.5, -3.7, -3, 5.3, 0, 3 )
        shape.bezierCurveTo( -1.4, 7.5, 4.4, 7, 3, 3)
        shape.bezierCurveTo( 6.5, 4.3, 7.0, -3.7, 1.5, 0.0);
        
        var extrudeSettings = { depth: 0.5, steps: 100, bevelSize: 1, bevelThickness: 0.5, bevelSegments: 100 };

        // Para crear la figura por revolución
        var geo = new THREE.ExtrudeBufferGeometry(shape,extrudeSettings);
        this.figure = new THREE.Mesh(geo,material);
        this.figure.rotation.set(0,0,10);
        this.figure.position.set(2,12,0);

        this.nodo1 = new THREE.Object3D();
        this.nodo1.add(this.figure);
        this.nodo1.add(this.pie);
        this.nodo1.position.set(-0.5, -0.5, 0.0);

        this.nodo2 = new THREE.Object3D();
        this.nodo2.position.set(-5.0, -4.5, 0.0);
        this.nodo2.add(this.nodo1);


        this.trebol = new THREE.Object3D();
        this.trebol.add(this.nodo2);
    
        this.add(this.trebol);

    }
        
    createGUI (gui,titleGui) {
    }
        
    update () {
        this.trebol.rotation.z += 0.01;
        this.nodo2.rotation.z -= 0.01;
        this.nodo1.rotation.y += 0.015;
    }
  }
  
  

  