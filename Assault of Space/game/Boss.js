 
class Boss extends THREE.Object3D{
    constructor(x,z) {
        super();
        
        this.x = x, this.z = z;
        var objectLoader = new THREE.OBJLoader();
        var materialLoader = new THREE.MTLLoader();
        this.boss;
        var that = this;
        this.derecha = true;
        

        this.vidasEnemigo = 5;
        this.es_boss = true;
        

        objectLoader.load('boss/gundamvar.obj',function(object){
            that.boss = object;
            that.boss.scale.set(0.005,0.005,0.005);
            that.boss.rotation.y = Math.PI;
            that.add(that.boss);
        },null,null);

        
        this.topeDerecha = x + 5;
        this.topeIzquierda = x - 5;
        this.topeDerecha = x + 5;
        this.topeIzquierda = x - 5;
    }

    getX(){
        return this.enemy.position.x;
    }

    getZ(){
        return this.enemy.position.z;
    }

    getVidasEnemigo(){
        return this.vidasEnemigo;
    }

    getBoss(){
        return this.es_boss;
    }

    eliminarVida(){
        this.vidasEnemigo = this.vidasEnemigo - 1;
    }

    movimiento(){
        this.position.z += 0.02;

    }


        
    update () {


    }
  }
  
  

  