 
class MyShip extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        this.topeIzquierda = -20;

        this.topeDerecha = 20;

        var objectLoader = new THREE.OBJLoader();
        var materialLoader = new THREE.MTLLoader();
        this.nave;
        var that = this;

        


        materialLoader.load('arc/ARC170.mtl',function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('arc/ARC170.obj',function(object){
                that.nave = object;
                that.nave.scale.set(0.005,0.005,0.005);
                that.nave.material = materials;
                that.add(that.nave);
            },null,null);
        });

        this.rectitud = true;
        this.girada = false;
        
    }
        
    createGUI (gui,titleGui) {
    }

    mover(direccion){
        if(direccion){
            if(this.position.x > this.topeIzquierda){
                this.position.x-=0.5;
            }
            this.giroNave(direccion);
        }
        else{
            if(this.position.x < this.topeDerecha){
                this.position.x +=0.5;
            }
            this.giroNave(direccion);
        }
    }

    giroNave(direccion){
        if(!direccion){
            if(this.rotation.z > -1){
                this.rotation.z -=0.25;
            }
        }
        else{
            if(this.rotation.z < 1){
                this.rotation.z +=0.25;
            }
        }
        this.girada = true;
        this.rectitud = false;
        
    }

    ponerRecta(){
        this.rectitud = true;
    }

    rectificar(){
        if(this.rotation.z>0)
            this.rotation.z -=0.25;
        else if(this.rotation.z < 0)
            this.rotation.z +=0.25;
        else if(this.rotation.z == 0)
            this.girada = false;
    }
        
    update () {
        if(this.rectitud && this.girada){
            this.rectificar();
        }
        
    }
  }
  
  

  