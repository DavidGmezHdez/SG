 
class Enemy extends THREE.Object3D{
    /**
     * Constructor del objeto
    */
    constructor() {
        super();
        this.objectLoader = new THREE.OBJLoader();
        this.enemy;
        var that = this;
        this.vidasEnemigo;
    }

    /**
     * Devuelve el número de vidas del enemigo
     */
    getVidasEnemigo(){
        return this.vidasEnemigo;
    }

    /**
     * Le resta una vida al enemigo
     */
    eliminarVida(){
        this.vidasEnemigo = this.vidasEnemigo - 1;
    }

    /**
     * Comprueba si ha llegado a la posicion para que el jugador pierda
     */
    getPosicionVictoria(){
        return this.position.z > 0;
    }

    /**
     * Se encarga de realizar el movimiento.
     * Siempre se mueve en diagonal
     * Comprueba los topes de izquierda y derecha propios de su posición
     */
    movimiento(){
    
    }

  }
  
  

  