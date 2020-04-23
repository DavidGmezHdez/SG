 
class MyPlanets extends THREE.Object3D {
    constructor(gui,titleGui) {
        super();

        this.createGUI(gui, titleGui);
        
        var geo = new THREE.SphereGeometry(2.5,30.0,30.0);

        var text1 = new THREE.TextureLoader().load('../imgs/tierra.jpg');
        var text2 = new THREE.TextureLoader().load('../imgs/cara.jpg');

        var matTierra = new THREE.MeshPhongMaterial({map: text1});
        var matCara = new THREE.MeshPhongMaterial({map: text2});

        //Creamos la tierra con su nodo de giro
        var tierra = new THREE.Mesh(geo,matTierra);
        this.nodoTierra = new THREE.Object3D();
        this.nodoTierra.add(tierra);

        //Creamos el primer satelite
        var satelite1 = new THREE.Mesh(geo,matCara);
        satelite1.rotation.y = Math.PI;
        satelite1.position.x = 8.0;
        

        this.nodoSat1 = new THREE.Object3D();
        this.nodoSat1.add(satelite1);
        this.nodoSat1.add(this.nodoTierra);

        //Creamos el segundo satelite
        this.satelite2 = new THREE.Mesh(geo,matCara);
        this.satelite2.lookAt(-30,0,0);
        this.satelite2.position.x = 16.0;

        this.nodoSat2 = new THREE.Object3D();
        this.nodoSat2.add(this.satelite2);
        this.nodoSat2.add(this.nodoSat1);

        //Tercer satelite
        this.satelite3 = new THREE.Mesh(geo,matCara);
        this.satelite3.rotation.y = Math.PI;
        this.satelite3.position.x = 24.0;

        //Final
        this.final = new THREE.Object3D();
        this.final.add(this.nodoSat2);
        this.final.add(this.satelite3);
        
        this.add(this.final);

    }
        
    createGUI (gui,titleGui) {
       
    }
        
    update () {
       this.final.rotation.y += 0.01;
       this.satelite3.rotation.y += 0.05;
       this.satelite2.rotation.y -= 0.01;

    }
  }
  
  

  