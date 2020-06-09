class Buff extends THREE.Object3D
{    
  /**
  * Constructor del objeto
  */
    constructor() {
      super();

      this.objectLoader = new THREE.OBJLoader();
      this.buff;
      var that = this;
    }

    /**
     * Aplica el buff al jugador
     */
    aplicarBuff(nave){

    }
    
    /**
     * Actualiza la posición del buff para que se acerque al jugador
    */
    update(){
        this.position.z+=0.15;
        this.rotation.y+= 0.15;
    }
    
  }