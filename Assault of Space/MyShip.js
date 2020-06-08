 
class MyShip extends THREE.Object3D{
    /**
     * Constructor del objeto
     */
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

    /**
     * Devuelve el collider de la nave para las colisiones
     */
    getNave(){
        return this.collider;
    }

    /**
     * @param {boolean} direccion 
     *  Se encarga de mover la nave en función de las teclas pulsadas 
     * (si direccion es true mueve a la izquierda y si es false a la derecha)
     */
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

    /**
     * @param {boolean} direccion 
     * Se encarga de girar la nave en función de la dirección
     * (si direccion es true gira a la izquierda y si es false a la derecha)
     */
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

    /**
     * Si es llamada, pone rectitud a true para que la nave se ponga recta en cuanto a rotación
     */
    ponerRecta(){
        this.rectitud = true;
    }

    /**
     * Se encarga de rectificar la posición de la nave, poniendola recta en función del giro
     * Se usa cuando no hay nadie pulsando las teclas de movimiento, poniendose recta sola
     */
    rectificar(){
        if(this.rotation.z>0)
            this.rotation.z -=0.25;
        else if(this.rotation.z < 0)
            this.rotation.z +=0.25;
        else if(this.rotation.z == 0)
            this.girada = false;
    }

    /**
     * Devuelve las vidas del jugador 
     */
    getVidasJugador(){
        return this.vidasJugador;
    }

    /**
     * Elimina una vida del jugador
     */
    eliminarVida(){
        this.vidasJugador = this.vidasJugador - 1;
    }

    /**
     * Suma una vida al jugador, si este tiene menos de 5 vidas
     */
    sumarVida(){
        if(this.vidasJugador < 5){
            this.vidasJugador++;
        }
    }

    /**
     * Setter de las vidas del jugador
     * @param {int} vidas 
     */
    setVidas(vidas){
        this.vidasJugador = vidas;
    }

    /**
     * Pone a la nave en posición de inicio
     */
    ponerEnPosicion(){
        this.rotation.z = 0;
        this.girada = false;
        this.position.set(0,5,30);
    }

    /**
     * Setter para el disparo doble
     * @param {boolean} disparo 
     */
    setDisparoDoble(disparo){
        this.disparoDoble = disparo;
    }

    /**
     * Devuelve el estado del disparo doble (true lo tienes activo, false no)
     */
    getDisparoDoble(){
        return this.disparoDoble;
    }
     
    /**
     * Actualiza el estado para que si nadie está moviendo la nave esta se ponga recta
     */
    update () {
        if(this.rectitud && this.girada){
            this.rectificar();
        }
    }
  }
  
  

  