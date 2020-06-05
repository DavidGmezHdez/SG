 
class Enemy extends THREE.Object3D{
    constructor(x,z) {
        super();
        
        this.x = x, this.z = z;
        var objectLoader = new THREE.OBJLoader();
        this.enemy;
        var that = this;
        this.derecha = true;

        this.vidasEnemigo = 5;

        
        objectLoader.load('enemigo/SmallSpaceFighter.obj',function(object){
            that.enemy = object;
            that.enemy.scale.set(0.9,0.9,0.9);
            that.enemy.rotation.y = Math.PI;
            that.add(that.enemy);
        },null,null);
        this.topeDerecha = x + 5;
        this.topeIzquierda = x - 5;
    }

    getEmemigo(){
        return this.collider;
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

    eliminarVida(){
        this.vidasEnemigo = this.vidasEnemigo - 1;
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
  
  

  