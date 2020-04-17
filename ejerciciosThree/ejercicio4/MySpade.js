 
class MySpade extends THREE.Object3D {
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
        var material =  new THREE.MeshPhongMaterial({color: 0x0208ca});
        this.pie = new THREE.Mesh(piegeo,material);
    

        var x = 0, y = 0;
        var shape = new THREE.Shape();

        shape.moveTo( x + 5, y + 5 );
        shape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
        shape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
        shape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
        shape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
        shape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
        shape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
        
        var extrudeSettings = { depth: 0.5, steps: 100, bevelSize: 1, bevelThickness: 0.5, bevelSegments: 100 };

        // Para crear la figura por revolución
        var geo = new THREE.ExtrudeBufferGeometry(shape,extrudeSettings);
        this.figure = new THREE.Mesh(geo,material);
        this.figure.rotation.set(0,0,10);
        this.figure.scale.set(0.5,0.5,0.5);
        this.figure.position.set(-2,5,0);
        this.figure.rotation.set(0,0,2*Math.PI);
        
        this.nodo1 = new THREE.Object3D();
        this.nodo1.add(this.pie);
        this.nodo1.add(this.figure);
        this.nodo1.position.set(-0.8, -1.7, 0.0);

        this.nodo2 = new THREE.Object3D();
        this.nodo2.position.set(4.5, 4.5, 0.0);
        this.nodo2.add(this.nodo1);


        this.spade = new THREE.Object3D();
        this.spade.add(this.nodo2);       
        this.add(this.spade);

    }
        
    createGUI (gui,titleGui) {
    }
        
    update () {
        this.spade.rotation.z += 0.01;
        this.nodo2.rotation.z -= 0.01;
        this.nodo1.rotation.y += 0.015;
    }
  }
  
  

  