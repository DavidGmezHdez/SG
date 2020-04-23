 
class MyShip extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        this.createGUI(gui, titleGui);
        
        //Creamos la nave, en nuestro caso un cono
        var geo = new THREE.ConeGeometry(0.5,1.0,3.0);
        var mat = new THREE.MeshNormalMaterial();
        this.ship = new THREE.Mesh(geo,mat);
        this.ship.rotation.x = Math.PI/2 ;


        //Creamos la linea que actuará como camino

        this.linea = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0.0, 5.0, 0.0), 
            new THREE.Vector3(8.0, 3.0, 0.0),
            new THREE.Vector3(5.0, 5.0, 5.0), 
            new THREE.Vector3(3.0, 5.0, 7.0),
            new THREE.Vector3(0.0, 7.0, -3.0), 
            new THREE.Vector3(-5.0, 7.0, -5.0),
            new THREE.Vector3(-8.0, 5.0, 7.0), 
            new THREE.Vector3(0.0, 5.0, 0.0)
        ]);

        var geoLinea = new THREE.Geometry();
        geoLinea.vertices = this.linea.getPoints(100);

        var matLinea = new THREE.LineBasicMaterial({color: 0xff0000});
        this.visualLinea = new THREE.Line(geoLinea,matLinea);

        var that = this;

        //Hacemos las animaciones con TWEEN

        var inicio1 =  {x: 0.0};
        var final1 = {x: 0.5};

        var movimiento1 = new TWEEN.Tween(inicio1).to(final1,4000)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(function(){
            var pos =  that.linea.getPointAt(inicio1.x);
            that.ship.position.copy(pos);
            var tang  = that.linea.getTangentAt(inicio1.x);
            pos.add(tang);
            that.ship.lookAt(pos);
        });

        var inicio2 =  {x: 0.5};
        var final2 = {x: 1.0};

        var movimiento2 = new TWEEN.Tween(inicio2).to(final2,8000)
        .easing(TWEEN.Easing.Cubic.InOut)
        .onUpdate(function(){
            var pos =  that.linea.getPointAt(inicio2.x);
            that.ship.position.copy(pos);
            var tang  = that.linea.getTangentAt(inicio2.x);
            pos.add(tang);
            that.ship.lookAt(pos);
        });

        movimiento1.chain(movimiento2);
        movimiento2.chain(movimiento1);
        movimiento1.start();




        this.add(this.ship);
        this.add(this.visualLinea);

    }
        
    createGUI (gui,titleGui) {
        
    }
        
    update () {
        TWEEN.update();
    }
  }
  
  

  