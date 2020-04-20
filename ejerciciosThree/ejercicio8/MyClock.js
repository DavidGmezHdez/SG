 
class MyClock extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        this.createGUI(gui, titleGui);
        
        var materialAguja =  new THREE.MeshPhongMaterial({color: 0xff0000});
        var materialHoras = new THREE.MeshPhongMaterial({color: 0x088A29});
        var esferaBase =  new THREE.SphereGeometry(1,30,30);

        //Creamos la aguja del reloj
        this.aguja = new THREE.Mesh(esferaBase,materialAguja);
        this.aguja.position.set(-8,0,0);
        this.nodo = new THREE.Object3D();
        this.nodo.add(this.aguja);
        this.add(this.nodo);

        //Creamos el resto de las esferas
        
        this.esfera12 = new THREE.Mesh(esferaBase,materialHoras);
        this.esfera12.position.set(-10,0,0);
        this.add(this.esfera12);

        this.esfera1 = new THREE.Mesh(esferaBase,materialHoras);
        this.esfera1.position.set(-8,0,-4);
        this.add(this.esfera1);

        this.esfera2 = new THREE.Mesh(esferaBase,materialHoras);
        this.esfera2.position.set(-4,0,-8);
        this.add(this.esfera2);

        this.esfera3 = new THREE.Mesh(esferaBase,materialHoras);
        this.esfera3.position.set(0,0,-10);
        this.add(this.esfera3);

        this.esfera4 = new THREE.Mesh(esferaBase,materialHoras);
        this.esfera4.position.set(4,0,-8);
        this.add(this.esfera4);

        this.esfera5 = new THREE.Mesh(esferaBase,materialHoras);
        this.esfera5.position.set(8,0,-4);
        this.add(this.esfera5);

        this.esfera6 = new THREE.Mesh(esferaBase,materialHoras);
        this.esfera6.position.set(10,0,0);
        this.add(this.esfera6);

        this.esfera7 = new THREE.Mesh(esferaBase,materialHoras);
        this.esfera7.position.set(8,0,4);
        this.add(this.esfera7);

        this.esfera8 = new THREE.Mesh(esferaBase,materialHoras);
        this.esfera8.position.set(4,0,8);
        this.add(this.esfera8);

        this.esfera9 = new THREE.Mesh(esferaBase,materialHoras);
        this.esfera9.position.set(0,0,10);
        this.add(this.esfera9);

        this.esfera10 = new THREE.Mesh(esferaBase,materialHoras);
        this.esfera10.position.set(-4,0,8);
        this.add(this.esfera10);

        this.esfera11 = new THREE.Mesh(esferaBase,materialHoras);
        this.esfera11.position.set(-8,0,4);
        this.add(this.esfera11);



    }
        
    createGUI (gui,titleGui) {
        this.guiControls = new function () {
            this.velocidad = 0;
        }
        
        var that = this;
        var folder = gui.addFolder(titleGui);

        folder.add(this.guiControls, 'velocidad', -0.5, 0.5, 0.01).name ('Velocidad: ').listen()
        .onChange(function(velocidad){
            that.guiControls.velocidad = velocidad;
        });
    }
        
    update () {
        this.nodo.rotation.y += this.guiControls.velocidad;
        this.aguja.rotation.y += this.guiControls.velocidad;
    }
  }
  
  

  