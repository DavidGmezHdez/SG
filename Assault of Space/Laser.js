class Laser extends THREE.Object3D
{
  /**
  * Constructor del objeto
  */
    constructor() {
      super();
      this.geo = new THREE.BoxGeometry ( 0.25 , 2 , 0.25);
      this.material;
      this.laser;

    }
    
  /**
  * Actualiza la posición del laser 
  */
    update(){

    }
    
  }