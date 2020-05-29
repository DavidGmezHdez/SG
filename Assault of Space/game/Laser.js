class Laser extends THREE.Object3D {
    constructor() {
      super();
      
      var cylGeo = new THREE.CylinderGeometry(0.1,0.1,2,10);
      var cylMat = new THREE.MeshPhongMaterial({color: 0x0208ca});
      this.cyl = new THREE.Mesh (cylGeo, cylMat);
      
      this.add (this.cyl);

      this.cyl.rotation.x = Math.PI/2;
    }
    
    disparar(){
        while(this.position.z < 100){
            
        }
    }
    
    update () {
        this.position.z-=0.5;
    }
  
  }