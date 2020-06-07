class Buff extends THREE.Object3D
{
    constructor(fuente) {
      super();

      var objectLoader = new THREE.OBJLoader();
      this.buff;
      var that = this;
      this.tipo;  
      var x = 0, y = 0;

      if(fuente){
        var shape = new THREE.Shape();

        shape.moveTo( x + 5, y + 5 );
        shape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
        shape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
        shape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
        shape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
        shape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
        shape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
        
        var extrudeSettings = { depth: 0.5, steps: 100, bevelSize: 1, bevelThickness: 0.5, bevelSegments: 100 };
  
        // Para crear la figura por revolución
        var geo = new THREE.ExtrudeBufferGeometry(shape,extrudeSettings);
        var material = new THREE.MeshPhongMaterial({color: 0xff0000})
        this.buff = new THREE.Mesh(geo,material);
        this.buff.scale.set(0.10,0.10,0.10);
        this.rotation.x = Math.PI /2 ;
        this.tipo = true;
        this.add(this.buff);

      }else{
          this.tipo = false;
        objectLoader.load('models/cañon/MountedGun.obj',function(object){
            that.buff = object;
            that.buff.scale.set(0.5,0.5,0.5);
            that.add(that.buff);
        },null,null);
      }

    }
    
    getTipo(){
        return this.tipo;
    }
    
    update(){
        this.position.z+=0.15;
        this.rotation.y+= 0.15;
    }
    
  }