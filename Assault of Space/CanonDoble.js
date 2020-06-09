class CanonDoble extends Buff
{    
  /**
  * Constructor del objeto
  */
    constructor() {
        super();
        var that = this;
        this.objectLoader.load('models/cañon/MountedGun.obj',function(object){
            that.buff = object;
            that.buff.scale.set(0.5,0.5,0.5);
            that.add(that.buff);
        },null,null);
    }


    /**
     * Aplica el buff al jugador
     */
    aplicarBuff(nave){
        var resultado = false;
        if(!nave.getDisparoDoble()){
            nave.setDisparoDoble(true);
            resultado = true;
        }
        return resultado;
    }

}