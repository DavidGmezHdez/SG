 
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

        this.nave;
        var objectLoader = new THREE.OBJLoader();
        var materialLoader = new THREE.MTLLoader();

        this.vidasJugador = 5;

        var that = this;

        


        materialLoader.load('models/arc/ARC170.mtl',function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/arc/ARC170.obj',function(object){
                that.nave = object;
                that.nave.scale.set(0.005,0.005,0.005);
                that.nave.material = materials;
                that.collider.add(that.nave);
                that.add(that.collider);
            },null,null);
        });
        this.rectitud = true;
        this.girada = false;
        this.disparoDoble = false;
        
    }


    getNave(){
        return this.collider;
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

    getVidasJugador(){
        return this.vidasJugador;
    }

    eliminarVida(){
        this.vidasJugador = this.vidasJugador - 1;
    }

    sumarVida(){
        if(this.vidasJugador < 5){
            this.vidasJugador++;
        }
    }

    setDisparoDoble(disparo){
        this.disparoDoble = disparo;
    }

    getDisparoDoble(){
        return this.disparoDoble;
    }
        
    update () {
        if(this.rectitud && this.girada){
            this.rectificar();
        }

        //this.addEventListener('collision',this.manejarColisiones());
    }
  }
  
  

  