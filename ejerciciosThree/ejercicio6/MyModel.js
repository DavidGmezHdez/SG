 
class MyModel extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        var objectLoader = new THREE.OBJLoader();
        var materialLoader = new THREE.MTLLoader();
        var that = this;

        materialLoader.load('porsche911/911.mtl',function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('porsche911/Porsche_911_GT2.obj',function(object){
                var model = object;
                model.scale.set(2.5,2.5,2.5);
                that.add(model);
            },null,null);
        });
    }
        
    createGUI (gui,titleGui) {
    }
        
    update () {
        this.rotation.y += 0.05;
    }
  }
  
  

  