 
class MyBall extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        this.createGUI(gui, titleGui);
        
        //Creamos el cilindro que hace el contorno
        var geoCil = new THREE.CylinderGeometry(this.guiControls.radio, this.guiControls.radio, 6.0, 32.0);
        var matCil = new THREE.MeshNormalMaterial({opacity:0.35, transparent:true});
        this.contorno = new THREE.Mesh(geoCil, matCil);
        this.contorno.position.set(0.0, 3.0, 0.0);

        //Creamos la bola
        var geoBall = new THREE.SphereGeometry(0.4, 30.0, 30.0);
        var matBall = new THREE.MeshNormalMaterial();
        this.ball = new THREE.Mesh(geoBall,matBall);
        this.ball.position.set(this.guiControls.radio+0.4,0.4,0.0);

        this.nodo2 = new THREE.Object3D();
        this.nodo2.add(this.ball);

        //Creamos el nodo final que tendrá el cilindro que hace de controno y el nodo con la bola
        this.nodoF = new THREE.Object3D();
        this.nodoF.add(this.contorno);
        this.nodoF.add(this.nodo2);

        //Usamos TWEEN para la animación
        this.inicio = {rotation: 0, x: 0.0, y: 0.0, z: 0.0};
        this.final = {rotation: 2*Math.PI, x: 0.0, y: 5.0, z: 0.0};

        var that = this;
        
        
        var movimiento1 = new TWEEN.Tween(this.inicio).to(this.final,4000);

        movimiento1.onUpdate(function(){
            that.nodo2.rotation.y = that.inicio.rotation;
            that.nodo2.position.set(that.inicio.x,that.inicio.y,that.inicio.z);
        });

        //Usamos TWEEN para la animación
        this.inicio2 = {rotation: 0, x: 0.0, y: 0.0, z: 0.0};
        this.final2 = {rotation: 2*Math.PI, x: 0.0, y: 5.0, z: 0.0};

        var movimiento2 = new TWEEN.Tween(this.inicio2).to(this.final2, 4000);

        movimiento2.onUpdate(function(){
            that.nodo2.rotation.y = that.inicio2.rotation;
            that.nodo2.position.set(that.inicio2.x,that.inicio2.y,that.inicio2.z);
        });

        movimiento1.chain(movimiento2);
        movimiento2.chain(movimiento1);

        movimiento1.start();

        this.add(this.nodoF);
    }
        
    createGUI (gui,titleGui) {
        this.guiControls = new function() {
            this.radio = 2.0;
        }

        var that = this;

        var folder = gui.addFolder (titleGui);
        folder.add (this.guiControls, 'radio', 2.0, 30.0, 1.0).name ('Radio: ').listen()
        .onChange(function(rad){
            var geo =  new THREE.CylinderGeometry(rad, rad, 6.0, 32.0);
            that.contorno.geometry = geo;
            that.ball.position.set(rad+0.4,0.0,0.0);
        });
    }
        
    update () {
       TWEEN.update();
    }
  }
  
  

  