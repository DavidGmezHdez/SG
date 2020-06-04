 
class MyShip extends THREE.Object3D{
    constructor() {
        super();
        
        var geoCollider = new THREE.BoxGeometry ( 7 , 5 , 5);

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
                //that.collider.addEventListener ('collision',that.manejarColisiones());
                that.add(that.collider);
            },null,null);
        });
        this.rectitud = true;
        this.girada = false;
        
    }

    getNave(){
        return this.collider;
    }

    mover(direccion){
        if(direccion){
            if(this.collider.position.x > this.topeIzquierda){
                this.collider.position.x-=0.5;
            }
            this.giroNave(direccion);
        }
        else{
            if(this.collider.position.x < this.topeDerecha){
                this.collider.position.x +=0.5;
            }
            this.giroNave(direccion);
        }
    }

    giroNave(direccion){
        if(!direccion){
            if(this.collider.rotation.z > -1){
                this.collider.rotation.z -=0.25;
            }
        }
        else{
            if(this.collider.rotation.z < 1){
                this.collider.rotation.z +=0.25;
            }
        }
        this.girada = true;
        this.rectitud = false;
        
    }

    ponerRecta(){
        this.rectitud = true;
    }

    rectificar(){
        if(this.collider.rotation.z>0)
            this.collider.rotation.z -=0.25;
        else if(this.collider.rotation.z < 0)
            this.collider.rotation.z +=0.25;
        else if(this.collider.rotation.z == 0)
            this.girada = false;
    }
        
    update () {
        if(this.rectitud && this.girada){
            this.rectificar();
        }

        //this.addEventListener('collision',this.manejarColisiones());
    }
  }
  
  

  