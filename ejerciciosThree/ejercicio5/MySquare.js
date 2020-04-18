 
class MySquare extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);
        var parte1 = new THREE.BoxGeometry(0.5,5,2.5);
        var parte2 = new THREE.BoxGeometry(0.5,5,2.5);

        var material = new THREE.MeshNormalMaterial();

        parte2.rotateZ(Math.PI/2);
        parte2.translate(2.25,2.5,0);


        var caja = new THREE.BoxGeometry(0.5,0.5,2.5);
        caja.translate(0.5,2,0);

        var cilindro = new THREE.CylinderGeometry(0.5, 0.5, 2.5, 32);
        cilindro.rotateX(Math.PI/2);
        cilindro.translate(0.75, 1.75, 0.0);


        var agujero1 = new THREE.CylinderGeometry(0.25, 0.25, 7, 32);
        agujero1.translate(3,5,0);

        
        var agujero2 = new THREE.CylinderGeometry(0.25, 0.25,2, 32);
        agujero2.rotateZ(Math.PI/2);
        agujero2.translate(0,-0.5,0);


        var parte1bsp = new ThreeBSP(parte1);
        var parte2bsp = new ThreeBSP(parte2);
        var cajabsp = new ThreeBSP(caja);
        var cilindrobsp = new ThreeBSP(cilindro);
        var agujero1bsp = new ThreeBSP(agujero1);
        var agujero2bps = new ThreeBSP(agujero2);


        var nodo1 =  parte1bsp.union(parte2bsp);
        var nodo2 = nodo1.union(cajabsp);
        var nodo3 = nodo2.subtract(cilindrobsp);
        var nodo4 = nodo3.subtract(agujero1bsp);
        var resultado = nodo4.subtract(agujero2bps);

        this.figure = resultado.toMesh(material);
        this.figure.geometry.computeFaceNormals();
        this.figure.geometry.computeVertexNormals();

        this.add(this.figure);

    }
        
    createGUI (gui,titleGui) {
    }
        
    update () {
        this.figure.rotation.x += 0.01;
        this.figure.rotation.y += 0.01;
    }
  }
  
  

  