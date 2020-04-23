 
class MyNut extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        var cilindroExterior = new THREE.CylinderGeometry(2, 2, 1.5, 32);

        var cilindroInterior = new THREE.CylinderGeometry(1,1,2,32);

        var esfera = new THREE.SphereGeometry (2.0, 32.0, 32.0);
        
        var borde = new THREE.TorusGeometry (2.15, 1.0, 32.0, 6.0);
        borde.rotateX(Math.PI/2);
        borde.translate(0.0, 0.1, 0.0);

        var material = new THREE.MeshNormalMaterial();



        var cilindroInteriorbsp = new ThreeBSP(cilindroInterior);
        var cilindroExteriorbsp = new ThreeBSP(cilindroExterior);
        var esferabsp = new ThreeBSP(esfera);
        var bordebsp = new ThreeBSP(borde);


        var nodo1 = cilindroExteriorbsp.intersect (esferabsp);
        var nodo2 = nodo1.subtract(cilindroInteriorbsp);
        var resultado = nodo2.union(bordebsp);

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
  
  

  