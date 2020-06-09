class LaserJugador extends Laser
{
  /**
  * Constructor del objeto
  */
    constructor() {
        super();

        this.material = new THREE.MeshLambertMaterial({ color: 0x088A29, opacity: 1.0, transparent: false });
        this.laser = new THREE.Mesh(this.geo,this.material,0);
        this.laser.rotation.x = Math.PI/2;
        this.add(this.laser);
    }
    
  /**
  * Actualiza la posición del laser (true es disparo del jugador, false del enemigo)
  */
    update(){
        this.position.z-=1.5;
    }
    
  }