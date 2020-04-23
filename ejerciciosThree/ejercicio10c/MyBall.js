 
class MyBall extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        this.createGUI(gui, titleGui);
        
        //Creamos el cilindro que hace el contorno
        var geoCil = new THREE.CylinderGeometry(2.0, 2.0, 4.0, 32.0);
        var matCil = new THREE.MeshNormalMaterial({opacity:0.35, transparent:true});
        this.contorno = new THREE.Mesh(geoCil, matCil);
        this.contorno.position.set(0.0, 2.0, 0.0);

        this.nodo1 = new THREE.Object3D();
        this.nodo1.add(this.contorno);

        //Creamos la bola
        var geoBall = new THREE.SphereGeometry(0.4, 30.0, 30.0);
        var matBall = new THREE.MeshNormalMaterial();
        this.ball = new THREE.Mesh(geoBall,matBall);
        this.ball.position.set(2.5,0.75,0.0);

        this.nodo2 = new THREE.Object3D();
        this.nodo2.add(this.ball);

        this.nodoAux = new THREE.Object3D();
        this.nodoAux.add(this.nodo2);
        this.nodoAux.position.x = 3.5;

        //Creamos el nodo final que tendrá el cilindro que hace de controno y el nodo con la bola
        this.nodoF = new THREE.Object3D();
        this.nodoF.add(this.nodo1);
        this.nodoF.add(this.nodoAux);

        //Usamos TWEEN para la animación
        this.inicio = {rotation: 0};
        this.final = {rotation: 2*Math.PI};

        var that = this;
        
        var movimiento1 = new TWEEN.Tween(this.inicio).to(this.final,4000)
        .repeat(Infinity)
        .onUpdate(function(){
            that.nodo2.rotation.y = that.inicio.rotation;
        });

        //Usamos TWEEN para la animación
        this.inicio2 = {x: 1.0};
        this.final2 = {x: -1.0};

        var movimiento2 = new TWEEN.Tween(this.inicio2).to(this.final2,2000)
        .repeat(Infinity)
        .yoyo(true)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function(){
            that.nodoAux.position.x = that.inicio2.x * that.guiControls.extension;
        });

        movimiento1.start();
        movimiento2.start();

        this.add(this.nodoF);
    }
        
    createGUI (gui,titleGui) {
        this.guiControls = new function() {
            this.radio1 = 2.0;
            this.radio2 = 2.0;
            this.extension = 0.0;
        }

        var that = this;

        var folder = gui.addFolder (titleGui);
        folder.add (this.guiControls, 'extension', 0.0, 8.0, 0.1).name ('Extension: ').listen()
        .onChange(function(ext){
            that.guiControls.extension = ext;
            that.guiControls.radio1 = that.guiControls.radio2 + ext;
            that.nodo1.scale.x = that.guiControls.radio1 / that.guiControls.radio2;
        });
    }
        
    update () {
       TWEEN.update();
    }
  }
  
  

  