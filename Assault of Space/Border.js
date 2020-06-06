class Border extends THREE.Object3D {
    constructor() {
      super();
      
      var cylGeo = new THREE.CylinderGeometry(1,1,100,10);
      var cylMat = new THREE.MeshPhongMaterial({color: 0xffffff});
      this.cyl = new THREE.Mesh (cylGeo, cylMat);
      
      this.add (this.cyl);

      this.cyl.rotation.x = Math.PI/2;
    }
    
    update () {
    }
  
  }