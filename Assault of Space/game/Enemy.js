 
class Enemy extends THREE.Object3D {
    constructor(x,z) {
        super();
        
        var geoCollider = new THREE . BoxGeometry ( 6.5 , 5 , 8 );

        var collider_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({ color: 0xff4444, opacity: 0.9, transparent: true }),
            .9, // alta friccion
            .0 // alto rebote
        );

        this.collider = new Physijs.BoxMesh(geoCollider,collider_material,0);
        this.x = x, this.z = z;
        var objectLoader = new THREE.OBJLoader();
        this.enemy;
        var that = this;
        this.derecha = true;

        
        objectLoader.load('enemigo/SmallSpaceFighter.obj',function(object){
            that.enemy = object;
            that.enemy.scale.set(0.9,0.9,0.9);
            that.enemy.rotation.y = Math.PI;
            //that.collider.colisionable = true;
            that.collider.add(that.enemy);

            that.collider.addEventListener ('collision',function (o,v,r,n) {
                console.log("entra enemigo");
                alert("entra enemigo");
              });
            that.add(that.collider);
        },null,null);
        this.topeDerecha = x + 5;
        this.topeIzquierda = x - 5;
    }


    getX(){
        return this.position.x;
    }

    getZ(){
        return this.position.z;
    }

    movimiento(){
        this.position.z += 0.02;
        
        if(this.derecha){
            if(this.position.x < this.topeDerecha)
                this.position.x += 0.1;
            else if(this.position.x >= this.topeDerecha)
                this.derecha = false;
        }
        else{
            if(this.position.x > this.topeIzquierda)
                this.position.x -= 0.1;
                else if(this.position.x <= this.topeIzquierda)
                this.derecha = true;
        }


    }


        
    update () {
        
    }
  }
  
  

  