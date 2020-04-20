 
class MyPendulum extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        this.createGUI(gui, titleGui);
        
        var materialRojo = new THREE.MeshPhongMaterial({color: 0xff0000});
        var materialVerde = new THREE.MeshPhongMaterial({color: 0x088A29});
        var materialAzul = new THREE.MeshPhongMaterial({color: 0x0208ca});
        var materialGis = new THREE.MeshPhongMaterial({color: 0xCC8AF1});

        var geo = new THREE.BoxGeometry(2.0,1.0,1.0);

        geo.translate(0.0,-0.5,0);

        //Primer pendulo
        //Caja 1
        this.caja1 = new THREE.Mesh(geo,materialVerde);
        this.caja1.scale.set(1,4,1);
        var nodo1 = new THREE.Object3D();
        nodo1.add(this.caja1);
        
        //Caja 2
        this.caja2 = new THREE.Mesh(geo,materialRojo);
        var nodo2 = new THREE.Object3D();
        nodo2.add(this.caja2);
        nodo2.position.y = -4.0

        //Caja 3
        this.caja3 = new THREE.Mesh(geo,materialVerde);
        this.caja3.scale.set(1,4,1);
        var nodo3 = new THREE.Object3D();
        nodo3.add(this.caja3);

        //Eje 1
        var cilindrogeo1 = new THREE.CylinderGeometry(0.5, 0.5, 1.0);
        cilindrogeo1.rotateX(Math.PI/2);
        cilindrogeo1.translate(0.0,-2.0,1.0);
        this.cilindro1 = new THREE.Mesh(cilindrogeo1,materialGis);

        var nodo4 = new THREE.Object3D();
        nodo4.add(nodo1);
        nodo4.add(nodo2);
        nodo4.add(nodo3);
        nodo4.add(this.cilindro1);

        nodo4.position.y = 2.0;

        //SegundoPendulo
        var geo2 = new THREE.BoxGeometry(1.0,1.0,1.0);
        geo2.translate(0,-0.5,0.5);
        
        //Caja 4
        this.caja4 = new THREE.Mesh(geo2,materialAzul);
        this.caja4.scale.set(1,7,1);
        this.caja4.position.y = 0.5;

        this.nodo5 = new THREE.Object3D();
        this.nodo5.add(this.caja4);
        this.nodo5.position.y = -1.0;
        this.nodo5.position.z += 0.5; 

        //Eje 2
        var cilindrogeo2 = new THREE.CylinderGeometry(0.25, 0.25, 2.0);
        cilindrogeo2.rotateX(Math.PI/2);
        cilindrogeo2.translate(0.0,-1.0,1.0);
        this.cilindro2 = new THREE.Mesh(cilindrogeo2,materialGis);

        this.nodo6 = new THREE.Object3D();
        this.nodo6.add(this.nodo5);
        this.nodo6.add(this.cilindro2);
        this.nodo6.position.y = -2.5;

        //Nodo final
        var final = new THREE.Object3D();
        final.add(nodo4);
        final.add(this.nodo6);
        this.add(final);


        this.animarDerechaPendulo1 = false;
        this.animarDerechaPendulo2 = false;
    }
        
    createGUI (gui,titleGui) {
        this.guiControls = new function () {
            this.LongitudPendulo1 = 5.0;
            this.giroPendulo1 = 0.0;
            this.LongitudPendulo2 = 7.0;
            this.giroPendulo2 = 0.0;
            this.posicion = 7.0;

            this.velocidadPendulo1 = 0.0;
            this.velocidadPendulo2 = 0.0;
            this.animarPendulo1 = false;
            this.animarPendulo2 = false;
        }

        var folder = gui.addFolder ('Primer Péndulo');
        folder.add (this.guiControls, 'LongitudPendulo1', 5.0, 10.0, 0.1).name ('Longitud').listen();
        folder.add (this.guiControls, 'giroPendulo1', -0.5, 0.5, 0.1).name ('Giro').listen();

        var folder = gui.addFolder ('Segundo Péndulo');
        folder.add (this.guiControls, 'LongitudPendulo2', 5.0, 10.0, 0.1).name ('Longitud').listen();
        folder.add (this.guiControls, 'posicion', 7, 90, 1).name ('Posicion (%)').listen();
        folder.add (this.guiControls, 'giroPendulo2', -0.5, 0.5, 0.1).name ('Giro').listen();

        var folder = gui.addFolder ('Animacion');
        folder.add (this.guiControls, 'animarPendulo1').name ('Péndulo 1: ');
        folder.add (this.guiControls, 'velocidadPendulo1', 0.0, 2.0, 0.1).name ('Velocidad (rad/s): ');
        folder.add (this.guiControls, 'animarPendulo2').name ('Péndulo 2: ');
        folder.add (this.guiControls, 'velocidadPendulo2', 0.0, 2.0, 0.1).name ('Velocidad (rad/s): ');
    }
        
    update () {
        this.caja2.scale.y = this.guiControls.LongitudPendulo1;
        this.caja3.position.y = -4.0-this.guiControls.LongitudPendulo1;
        this.rotation.z = this.guiControls.giroPendulo1;
        this.caja4.scale.y = this.guiControls.LongitudPendulo2;
        this.nodo5.rotation.z = this.guiControls.giroPendulo2;
        this.nodo6.position.y = -(this.guiControls.LongitudPendulo1 * this.guiControls.posicion/100);


    if(this.guiControls.animarPendulo1){
        if(this.guiControls.giroPendulo1 >= 0.5){
            this.animarDerechaPendulo1 = false;
        }
        else if(this.guiControls.giroPendulo1 <= -0.5){
            this.animarDerechaPendulo1 = true;
        }
    }
    
    if(this.animarDerechaPendulo1)
        this.guiControls.giroPendulo1 += 0.1*(this.guiControls.velocidadPendulo1/10);    
    else
        this.guiControls.giroPendulo1 -= 0.1*(this.guiControls.velocidadPendulo1/10);

    if(this.guiControls.animarPendulo2){
        if(this.guiControls.giroPendulo2 >= 0.5){
            this.animarDerechaPendulo2 = false;
        }
        else if(this.guiControls.giroPendulo2 <= -0.5){
            this.animarDerechaPendulo2 = true;
        }
    }

    if(this.animarDerechaPendulo2)
        this.guiControls.giroPendulo2 += 0.1*(this.guiControls.velocidadPendulo2/10);    
    else
        this.guiControls.giroPendulo2 -= 0.1*(this.guiControls.velocidadPendulo2/10); 

    }
  }
  
  

  