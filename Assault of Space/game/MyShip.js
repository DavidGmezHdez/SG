 
class MyShip extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();
        
        var geoCollider = new THREE . BoxGeometry ( 7 , 5 , 5);

        var collider_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ color: 0xff4444, opacity: 0.0, transparent: true }),
            .9, // alta friccion
            .0 // alto rebote
        );

        this.collider = new Physijs.BoxMesh(geoCollider,collider_material,0);

        this.topeIzquierda = -25;

        this.topeDerecha = 25;

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
                that.collider.colisionable = true;
                that.collider.add(that.nave);
                that.add(that.collider);
            },null,null);
        });

        this.rectitud = true;
        this.girada = false;
        
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
  
  

  