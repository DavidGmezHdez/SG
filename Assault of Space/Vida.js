class Vida extends Buff
{    
  /**
  * Constructor del objeto
  */
    constructor() {
        super();

        var x = 0, y = 0;

        var shape = new THREE.Shape();
        var that = this;

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
        this.add(this.buff);

    }


    /**
     * Aplica el buff al jugador
     */
    aplicarBuff(nave){
        var resultado = false;
        if(nave.getVidasJugador() < 5){
            nave.sumarVida();
            document.getElementById(`vida${nave.getVidasJugador() - 1}`).style.visibility = 'visible';
            resultado = true;
        }
        return resultado;
    }

    
  }