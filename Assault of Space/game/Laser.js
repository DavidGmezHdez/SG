class Laser extends THREE.Object3D {
    constructor(fuente) {
      super();
      
      var cylGeo = new THREE.CylinderGeometry(0.1,0.1,2,10);
      
      var cylMat
      
      if(fuente)
        cylMat = new THREE.MeshPhongMaterial({color: 0x088A29});
      else
        cylMat = new THREE.MeshPhongMaterial({color: 0xff0000});
      
      this.cyl = new THREE.Mesh (cylGeo, cylMat);

      var geoCollider = new THREE . BoxGeometry ( 0.25 , 2 , 0.25);

      this.fuente = fuente;

      var collider_material = Physijs.createMaterial(
          new THREE.MeshLambertMaterial({ color: 0xff4444, opacity: 0.9, transparent: true }),
          .9, 
          .9
      );
      this.collider = new Physijs.BoxMesh(geoCollider,collider_material,0);
      this.collider.add(this.cyl);
      this.collider.rotation.x = Math.PI/2;

      this.collider.addEventListener ('collision',function (o,v,r,n) {
        console.log("entra laser");
        alert("entra laser");
      });
      
      this.add(this.collider);


    }
    
    
    update () {
        if(this.fuente)
          this.position.z-=0.5;
        else
        this.position.z+=0.5;
    }
  
  }