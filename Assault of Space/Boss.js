 
class Boss extends Enemy{
    /**
     * Constructor del objeto
    */
    constructor(x,z) {
        super();
        this.vidasEnemigo = 10;
        this.es_boss = true;
        var that = this;
        this.objectLoader.load('models/boss/gundamvar.obj',function(object){
            that.enemy = object;
            that.enemy.scale.set(0.005,0.005,0.005);
            that.enemy.rotation.y = Math.PI;
            that.add(that.enemy);
        },null,null);
    }

    /**
     * Comprueba si es el boss
     */
    getBoss(){
        return this.es_boss;
    }
    movimiento(){
        this.position.z += 0.02;
    }
  }
  
  

  