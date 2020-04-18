 
class MyMug extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        var cilindroExterior = new THREE.CylinderGeometry(2, 2, 5, 32);

        var cilindroInterior = new THREE.CylinderGeometry(1.9,1.9,4.5,32);
        cilindroInterior.translate(0,0.5,0);

        var asa =  new THREE.TorusGeometry (1, 0.3, 15.0, 15.0, 2*Math.PI);
        asa.rotateZ(Math.PI/2);
        asa.translate(-2, 0.0, 0.0);
        var material = new THREE.MeshNormalMaterial();



        var cilindroInteriorbsp = new ThreeBSP(cilindroInterior);
        var cilindroExteriorbsp = new ThreeBSP(cilindroExterior);
        var asabsp = new ThreeBSP(asa);



        var nodo1 = cilindroExteriorbsp.union(asabsp);
        var resultado =  nodo1.subtract(cilindroInteriorbsp);

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
  
  

  