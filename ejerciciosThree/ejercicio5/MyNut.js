 
class MyNut extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        var cilindroExterior = new THREE.CylinderGeometry(1.5, 1.5, 2.0, 20.0);

        var cilindroInterior = new THREE.CylinderGeometry(3.0, 3.0, 2.0, 6.0);

        var esfera = new THREE.SphereGeometry (3.0, 32.0, 32.0);
        
        var borde = new THREE.TorusGeometry (1.5, 0.2, 3.0, 16.0);
        borde.rotateX(Math.PI/2);
        borde.translate(0.0, 0.8, 0.0);

        var material = new THREE.MeshNormalMaterial();



        var cilindroInteriorbsp = new ThreeBSP(cilindroInterior);
        var cilindroExteriorbsp = new ThreeBSP(cilindroExterior);
        var esferabsp = new ThreeBSP(esfera);
        var bordebsp = new ThreeBSP(borde);


        var nodo1 = cilindroExteriorbsp.intersect (esferabsp);
        var nodo2 = nodo1.subtract(cilindroInteriorbsp);
        var resultado = nodo2.subtract(bordebsp);

        var limite = 0.7;

        while(limite>=-0.8){
            borde.translate(0.0, -0.3, 0.0);
            bordebsp = new ThreeBSP (borde);
            resultado = resultado.subtract(bordebsp);
            limite -= 0.1;
        }

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
  
  

  