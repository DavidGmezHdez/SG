 
class Minion extends Enemy{
    /**
     * Constructor del objeto
    */
    constructor(x,z) {
        super();

        this.vidasEnemigo = 3;
        this.derecha = true;
        var that = this;
        this.objectLoader.load('models/enemigo/SmallSpaceFighter.obj',function(object){
            that.enemy = object;
            that.enemy.scale.set(0.9,0.9,0.9);
            that.enemy.rotation.y = Math.PI;
            that.add(that.enemy);
        },null,null);
        this.topeDerecha = x + 5;
        this.topeIzquierda = x - 5;
    }

    /**
     * Se encarga de realizar el movimiento.
     * Siempre se mueve en diagonal
     * Comprueba los topes de izquierda y derecha propios de su posición
     */
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
  }
  
  

  