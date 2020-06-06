class Laser extends THREE.Object3D
{
    constructor(fuente) {
      super();

      var geoCollider = new THREE.BoxGeometry ( 0.25 , 2 , 0.25);

      var collider_material;

      if(fuente)
        collider_material = new THREE.MeshLambertMaterial({ color: 0x088A29, opacity: 1.0, transparent: false });
      else
        collider_material = new THREE.MeshLambertMaterial({ color: 0xff0000, opacity: 1.0, transparent: false });

  
      var laser = new THREE.Mesh(geoCollider,collider_material,0);
      laser.rotation.x = Math.PI/2;
      laser.colisionable = true;

      this.fuente = fuente;
      this.add(laser);

    }
    
    
    update(){
        if(this.fuente)
          this.position.z-=1.5;
        else
          this.position.z+=1.5;
    }
    
  }