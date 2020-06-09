class MyScene extends THREE.Scene {
  constructor (unRendered,oleada) {
    super();
    
    this.gui = this.createGUI ();

    this.createLights ();

    this.createCamera (unRendered);

    this.createEscenario ();

    this.nave = new MyShip();

    this.add (this.nave);
    

    this.laseresJugador = new Array();
    this.laseresEnemigos = new Array();
    this.enemigos = new Array();
    this.buffs = new Array();

    this.keys = { };

    this.enemigosCargados = false;

    this.oleada = oleada;

    this.juegoEmpezado = false;
    this.finJuego = false;
    this.resultado;
    this.mensaje = document.getElementById("mensaje");
  }
  

  createCamera (unRendered) {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (0, 100, 0);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
  }
  
  createEscenario () {

    var geometry = new THREE.BoxGeometry (200,-1,200);
    
    var texturaSpace = new THREE.TextureLoader().load('imgs/space.jpg');
    var materialSpace = new THREE.MeshPhongMaterial ({map: texturaSpace});
    
    // Ya se puede construir el Mesh

    var espacio = new THREE.Mesh (geometry, materialSpace);

    espacio.y = -0.1;
    
    this.add (espacio);

    this.borde1 = new Border();
    this.borde1.position.x = -30;
    this.add (this.borde1);
    

    this.borde2 = new Border();
    this.borde2.position.x = 30;
    this.add (this.borde2);
    
  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new dat.GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = new function() {
      // En el contexto de una función   this   alude a la función
      this.lightIntensity = 0.5;
      this.axisOnOff = true;
      this.animacion = false;
    }
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }

  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  

  /*
  * CONTROLADORES DE TECLAS Y VENTANA
  */

  /*
  * Función se comprueba cuando se rediemnsiona la ventana
  */
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }
  
  /*
  * Función se comprueba cuando se pulsa alguna tecla. Tiene que ver con el movimiento de la nave
  */
  onKeyDown (event){
    var tecla = event.which || event.keyCode;
    this.keys[tecla] = true;
  }

  /*
  * Función se comprueba cuando se deja de pulsar alguna tecla
  */
  onKeyUp (event){
    var tecla = event.which || event.keyCode;
    this.keys[tecla] = false;

  }

  /*
  * Función se comprueba cuando pulsa y deja de pulsar una tecla. Maneja la función de disparo, el botón de INICIO (INTRO) y el botón cuando se quiere recargar la partida.
  */
  onKeyPress (event){
    var tecla = event.which || event.keyCode;
    this.keys[tecla] = true;

    if(this.keys[32])
      this.disparar(true);
    
    if(this.keys[13] && !this.juegoEmpezado && this.enemigosCargados){
      this.juegoEmpezado = true;
    }

    if(this.keys[82] && this.finJuego)
      this.volverInicio();
  }

  /*
  * LASERES
  */

  /*
  * Función se se se encarga de crear un nuevo laser y añadirlo a la escena en la posición del sujeto que dispara
  * Se comprueba si el juego ha empezado y por parte del jugador si tiene disparo doble. Por parte del enemigo se comprueba que existe algun enemigo que puedas ser llamado
  * a disparar y que no ha acabado el juego.
  */
  disparar(fuente){
    if(this.juegoEmpezado){
      if(fuente){
        if(this.nave.getDisparoDoble()){
          var laser1 = new LaserJugador(fuente);
          var laser2 = new LaserJugador(fuente);
          laser1.position.set(this.nave.position.x + 3,this.nave.position.y,this.nave.position.z);
          laser2.position.set(this.nave.position.x - 3,this.nave.position.y,this.nave.position.z);
          this.laseresJugador.push(laser1);
          this.laseresJugador.push(laser2);
          this.add(laser1);
          
          var audio = new THREE.Audio('./sounds/disparoJugador.mp3');
          audio.play();
          this.add(laser2);
          audio.play();
        }
        else{
          var laser = new LaserJugador(fuente);
          laser.position.set(this.nave.position.x,this.nave.position.y,this.nave.position.z);
          this.laseresJugador.push(laser);
          this.add(laser);
        }

      }
  
      else{
        if(this.enemigos.length > 0 && this.juegoEmpezado && this.nave.getVidasJugador() > 0){
          var laser = new LaserEnemigo(fuente);
          var enemigo = this.enemigos[Math.floor(Math.random() * this.enemigos.length)];
          laser.position.set(enemigo.position.x,5,enemigo.position.z);
          this.laseresEnemigos.push(laser);
          this.add(laser);
        }
  
      }

    }
    
    

  }

  /*
  * Función se se se encarga de crear un nuevo laser y añadirlo a la posición del boss, con la característica de que crea dos láseres y no uno.
  * Tiene las mismas comprobaciones que la función anterior
  */
  disparoBoss(){
    var boss;
    if(this.enemigos.find(element => element.boss) && this.juegoEmpezado && this.nave.getVidasJugador() > 0){
      boss = this.enemigos.find(element => element.boss);
      var laser = new LaserEnemigo(false);
      var laser2 = new LaserEnemigo(false);
      
      laser.userData = 'enemigo';
      boss = this.enemigos.find(element => element.boss);
  
      laser.position.set(boss.position.x+4,5,boss.position.z);
      laser2.position.set(boss.position.x-4,5,boss.position.z);
  
      this.laseresEnemigos.push(laser);
      this.laseresEnemigos.push(laser2);
      
      this.add(laser)
      this.add(laser2);
    }
  }

  /*
  * FUNCIONES DE ELIMINACION
  */

  /*
  * Elimina un laser tanto del array(en función de quien haya disparado) como de la escena
  */
  eliminarLaser(laser,fuente){
    if(fuente){
      var index = this.laseresJugador.indexOf(laser)
      this.laseresJugador[index] = null;
      this.laseresJugador.splice(index,1);
    }else{
      var index = this.laseresEnemigos.indexOf(laser)
      this.laseresEnemigos[index] = null;
      this.laseresEnemigos.splice(index,1);
    }
    
    this.remove(laser);
  }

  /*
  * Elimina un enemigo tanto del array como de la escena
  */
  eliminarEnemigo(enemigo){
    if(!this.finJuego)
      this.spawnearBuff(enemigo);

    var index = this.enemigos.indexOf(enemigo);
    console.log(enemigo)
    console.log(this.enemigos[index])
    
    //this.enemigos[index]
    this.enemigos.splice(index,1);
    
    this.remove(enemigo);
    console.log(this.enemigos[index]);
  }

  /*
  * Elimina al jugador de la escena
  */
  eliminarJugador(){
    this.remove(this.nave);
  }

  /*
  * Elimina un buff tanto del array como de la escena
  */
  eliminarBuff(buff){
    var index = this.buffs.indexOf(buff);
    this.buffs[index] = null;
    this.buffs.splice(index,1);
    this.remove(buff);
  }

  /*
  * Se encarga de eliminar los restos (laseres y objetos) al final de cada ronda, de manera que este empiece limpia. Además, pone a la nave en posición de salida.
  */
  limpiarRestos(){
    if(this.laseresEnemigos.length >=0){
      for(let i=0;i<this.laseresEnemigos.length;i++){
        this.remove(this.laseresEnemigos[i]);
      }
      this.laseresEnemigos = [];
    }

    if(this.laseresJugador.length>=0){
      for(let i=0;i<this.laseresJugador.length;i++){
        this.remove(this.laseresJugador[i]);
      }
      this.laseresJugador = [];
    }

      
    if(this.buffs.length>=0){
      for(let i=0;i<this.buffs.length;i++){
        this.remove(this.buffs[i]);
      }
      this.buffs = [];
    }
      
    this.nave.ponerEnPosicion();
  }

  /*
  * FUNCIONES DE MOVIMIENTO
  */

  /*
  * Se encarga de moverse en función de la flecha que se esté presionando. Si no se presiona ninguna, pone recta la nave
  */
  ejecutarMovimiento(){
    if(this.keys[37])
      this.nave.mover(true);
    
    if(this.keys[39])
      this.nave.mover(false);
    
    if(!this.keys[37] && !this.keys[39])
      this.nave.ponerRecta();
  }

  /*
  * Se encarga de mover a los enemigos en la escena.
  */
  ejecutarMovimientoEnemigos(){
    for(let i=0;i<this.enemigos.length;i++){
      this.enemigos[i].movimiento();
    }
  }


  /*
  * FUNCIONES DE GENERACIÓN Y ACTUALIZACION
  */

  /*
  * Se encarga de generar las distintas oleadas. Primero limpia la escena y luego carga a los enemigos en función de la oleada. Además establece la secuencia de disparo de los enemigos
  */
  generarOleada(numeroOleada){

    this.limpiarRestos();

    switch(numeroOleada){
      case 1:
        for(let i=-20;i<=20;i+=8){
          for(let j = -35;j<=-15;j+=10){
            var enemy = new Minion(i,j);
            enemy.position.set(i,5,j);
            //this.add(enemy);
            this.enemigos.push(enemy)
          }
        }
        this.enemigosCargados = true;
        setInterval(()=>this.disparar(false),5000);
        break;
      case 2:
        for(let i=-20;i<=20;i+=8){
          for(let j= -35;j<=-5;j+=10){
            var enemy = new Minion(i,j);
            enemy.position.set(i,5,j);
            //this.add(enemy);
            this.enemigos.push(enemy)
          }
        }
        this.enemigosCargados = true;
        setInterval(()=>this.disparar(false),2000);
        break;

        case 3:

          for(let i=-20;i<=-10;i+=8){
            for(let j= -35;j<=-5;j+=10){
              var enemy = new Minion(i,j);
              enemy.position.set(i,5,j);
              //this.add(enemy);
              this.enemigos.push(enemy)
            }
          }
          var boss = new Boss(0,-20);
          boss.position.set(0,8,-20);
          this.add(boss);
          console.log(boss);
          this.enemigos.push(boss);

          for(let i=10;i<=20;i+=8){
            for(let j= -35;j<=-5;j+=10){
              var enemy = new Minion(i,j);
              enemy.position.set(i,5,j);
              //this.add(enemy);
              this.enemigos.push(enemy)
            }
          }
          
          setInterval(()=>this.disparar(false),1000);
          setInterval(()=>this.disparoBoss(false),2500);
          break;
    }
    for(var i=0;i<this.enemigos.length;i++){
      this.add(this.enemigos[i]);
    }
    this.enemigosCargados = true;


    
  }

  /*
  * Se encarga de actualizar la posición de los láseres y buffs a lo largo de la escena. Si estos superan un límite o chocan, se eliminan
  */
  actualizarObjetos(){
    if(this.laseresJugador.length > 0){
      for(let i=0;i<this.laseresJugador.length;i++){
        //this.laseresJugador[i].__dirtyPosition = true;
        //this.laseresJugador[i].position.z-=1.5;
        this.laseresJugador[i].update();
        this.comprobarEnemigos(this.laseresJugador[i]);
        if(this.laseresJugador[i].position.z < -70 && this.laseresJugador[i] != undefined)
          this.eliminarLaser(this.laseresJugador[i],true);
      }

    }

    if(this.laseresEnemigos.length > 0){
      for(let i=0;i<this.laseresEnemigos.length;i++){
        //this.laseresEnemigos[i].__dirtyPosition = true;
        //this.laseresEnemigos[i].position.z+=1.5;
        this.laseresEnemigos[i].update();
        this.comprobarVidas(this.laseresEnemigos[i]);
        if(this.laseresEnemigos[i].position.z > 40 && this.laseresEnemigos[i] != undefined)
          this.eliminarLaser(this.laseresEnemigos[i],false);
      }
    }

    if(this.buffs.length > 0){
      for(let i=0;i<this.buffs.length;i++){
        this.buffs[i].update();
        this.comprobarObjetos(this.buffs[i]);
        if(this.buffs[i].position.z > 40 && this.buffs[i] != undefined)
          this.eliminarBuff(this.buffs[i]);
      }
    }
  }



  /*
  * FUNCIONES DE COMPROBACIÓN DE COLISIONES
  */

  
  /*
  * Se encarga de comprobar si los láseres del jugador dan en un enemigo.
  * Se utiliza un raycaster para detectar la colisión
  * Si ocurre, al enemigo se le resta una vida. Si la vida de algun enemigo llega a 0, este se elimina
  */
  comprobarEnemigos(laser){
    if(laser != undefined){
      var casterJugador = new THREE.Raycaster();
		  casterJugador.set(laser.position, new THREE.Vector3(0, 0, -1));
		  casterJugador.far = 1;
      var objetos = casterJugador.intersectObjects(this.enemigos,true);
  
      if(objetos.length>0){
        var enemigo = objetos[0].object.parent.parent;
        this.eliminarLaser(laser,true);
      
        if(enemigo.getVidasEnemigo() > 0)
          enemigo.eliminarVida();
        else
          this.eliminarEnemigo(enemigo);
        
      }
    }
  }

  /*
  * Se encarga de comprobar si los láseres del enemigo dan en el jugador.
  * Se utiliza un raycaster para detectar la colisión
  * Si ocurre, al jugador se le resta una vida. Si llega a 0, el jugador pierde.
  * Las vidas se les van borrando ocultandose en el propio HTML.
  */
  comprobarVidas(laser){
    if(laser != undefined){
      var casterEnemigo = new THREE.Raycaster();
      casterEnemigo.set(laser.position, new THREE.Vector3(0, 0, 1));
		  casterEnemigo.far = 1;
      var objeto = casterEnemigo.intersectObject(this.nave,true);
      if(objeto.length > 0){
        this.eliminarLaser(laser,false);
        if(this.nave.getVidasJugador() > 0){
          this.nave.eliminarVida();
          document.getElementById(`vida${this.nave.getVidasJugador()}`).style.visibility = 'hidden';
        }
      }
    }
  }

  /*
  * Se encarga de comprobar si los objetos que sueltan los enemigos dan en el jugador
  * Se utiliza un raycaster para detectar la colisión
  * Si esto ocurre, en función del objeto el jugador gana una vida o consigue el cañón doble
  */
  comprobarObjetos(obj){
    if(obj != undefined){
      var casterObjeto = new THREE.Raycaster();
      casterObjeto.set(obj.position, new THREE.Vector3(0, 0, 1));
      casterObjeto.far = 1;
      var objeto = casterObjeto.intersectObject(this.nave,true);
      if(objeto.length > 0){
        if(obj.aplicarBuff(this.nave))
          this.eliminarBuff(obj);     
      }
    }
  }

  /*
  * Se encarga de comprobar si el juego ha terminado
  * El juego puede acabar de 3 maneras: 
  *   El jugador acabando la oleada (si se pasa las 3 ha ganado definitivamente)
  *   El jugador ha sufrido ataques de los enemigos y ha perdido todas las vidas (pierde definitivamente)
  *   Los enemigos se han acercado mucho al jugador (pierde definitivamente)
  */
  comprobarFinJuego(){
    //console.log(this.enemigos[10].position);
    if(this.enemigos.length == 0 && this.nave.getVidasJugador()>0){
      this.finJuego = true;
      this.resultado = "Victoria";
    }

    else if(this.enemigos.length > 0 && this.nave.getVidasJugador()==0){
      this.finJuego = true;
      this.resultado = "Derrota";
      this.eliminarJugador()
    }
    
    if(this.enemigos.length > 0){
      for(var i=0;i<this.enemigos.length;i++){
        if(this.enemigos[i].position.z > 25){
          this.finJuego = true;
          this.resultado = "Derrota";
          this.eliminarJugador()
        }
      }
    }
  }

  /*
  * FUNCIONES AUXILIARES
  */

  /*
  * Se encarga de mostrar las vidas al inicio de la partida, es decir, rellena el HTML de las vidas
  */
  mostrarVidas(){
    if(this.oleada == 1){
      var vidas = document.getElementById("vidas");
      vidas.innerHTML = `<img id="vida${0}"src="imgs/vida.png"> <br><img id="vida${1}"src="imgs/vida.png"> <br><img id="vida${2}"src="imgs/vida.png"> <br><img id="vida${3}"src="imgs/vida.png"> <br><img id="vida${4}"src="imgs/vida.png"> <br>`;
    }
  }

  /*
  * Se encarga suministrar al jugador con un buff cuando acabe con un enemigo. No ocurre siempre
  * Es completamente aleatorio: Tienes un 15% de probabilidades que te toque una vida y un 5% que te toque el cañón doble.
  */
  spawnearBuff(enemigo){
    var numero = Math.floor(Math.random() * 101);
    if(numero < 15 ){
      var buff = new Vida();
      buff.position.set(enemigo.position.x,5,enemigo.position.z);
      this.buffs.push(buff);
      this.add(buff);
    }

    if(numero >= 95 && !this.nave.getDisparoDoble()){
      var buff = new CanonDoble();
      buff.position.set(enemigo.position.x,5,enemigo.position.z);
      this.buffs.push(buff);
      this.add(buff);
    }
  }

  /*
  * Se encarga de volver todo al estado inicial por si el jugador quiere jugar otra partida si ha perdido o ganado.
  */
  volverInicio(){
    this.limpiarRestos();
    this.add(this.nave);
    this.nave.setVidas(5);
    this.nave.setDisparoDoble(false);

    console.log(this.enemigos);
    for(let i=0;i<this.enemigos.length;i++){
      this.remove(this.enemigos[i]);
    }

    this.enemigos=[];
    this.enemigosCargados = false;
    this.oleada = 1;
    this.juegoEmpezado = false;
    this.finJuego = false;
  }


  /*
  * FUNCION PRINCIPAL
  * Se encarga de llevar a cabo la base del juego
  */
  jugar(){
    //Se comprueba que si el juego no ha empezado (bien porque es el principio o porque ha acabdo una ronda) y no hay ningún enemigo cargado
    // Si es así, se crea la oleada de los enemigos y se muestran las vidas y una serie de mensajes en función de la oleada
    if(!this.juegoEmpezado && !this.enemigosCargados){
      this.generarOleada(this.oleada);
      this.mostrarVidas();

      if(this.oleada == 1){
        this.mensaje.innerHTML = '<h2>Bienvenido a Assault of Space</h2><h2>OLEADA 1</h2> <p>Derrota a todos los enemigos de las distintas oleadas y evita que te disparen o se te acerquen. Cuidado porque los enemigos tienen vidas.</p><p>Muevete con las flechas y dispara con el espacio</p><p>Recoge al abatir un enemigo las vidas o el poderoso cañón doble</p><p>Pulsa INTRO para empezar</p>';
      }
      else if(this.oleada == 2){
        this.mensaje.innerHTML = '<h2 style="padding-top:60%">OLEADA 2</h2><p>Pulsa INTRO para empezar</p>'
      }
      else if(this.oleada == 3){
        this.mensaje.innerHTML = '<h2 style="padding-top:40%">OLEADA 3</h2><p>Pulsa INTRO para empezar</p>'
      }
    }

    // Si por el contrario el juego si ha empezado (es decir, los enemigos se han cargado) y no hemos llegado a una etapa de fin de juego, se realizan todos los updates
    // de los objetos en la escena (movimiento de la nave, enemigos, disparos, etc).
    // Además comprobamos en todo momento si hemos llegado a un estado de fin de juego.
    else if(this.juegoEmpezado && !this.finJuego){
      
      if(this.mensaje.innerHTML!=""){
        this.mensaje.innerHTML = "";
      }
      this.nave.update();
      
      this.actualizarObjetos();
  
      this.ejecutarMovimiento();
      
      this.ejecutarMovimientoEnemigos();
      
      //Comprobamos el estado del juego
      this.comprobarFinJuego();

    }

    // Si hemos llegadoal estado de fin de juego con el juego empezado, comprobamos la oleada
    // Si la oleada era inferior a 3, se carga la siguiente (siendo la ultima la 3)
    // Si se ha llegado a la 3, se señala que se ha completado el juego
    else if(this.finJuego){
      if(this.resultado == "Victoria"){
        if(this.oleada < 3){
          this.oleada++;
          this.enemigosCargados = false;
          this.juegoEmpezado = false;
          this.finJuego = false;
        }
        else if(this.oleada >= 3){
          if(this.mensaje.innerHTML==""){
            this.mensaje.innerHTML = '<h2 style="padding-top:40%">¡Enhorabuena, has compleado el juego! Pulsa R si quieres jugar de nuevo</h2>'
          }
          this.limpiarRestos();
        }
        
      }
      // Si por el contrario el jugador ha perdido, se le notifica y se le avisa que puede reintentarlo con la tecla R
      // Además, se eliminan los restos de la escena
      else if(this.resultado == "Derrota"){
        if(this.mensaje.innerHTML==""){
          this.mensaje.innerHTML = '<h2 style="padding-top:40%">Has perdido. Pulsa R si quieres volverlo a intentar</h2>'
        }
        this.limpiarRestos();
      }
    }
  }


  // Llamamos al metodo jugar 
  update () {
    this.spotLight.intensity = this.guiControls.lightIntensity;
    
    this.jugar()
  }
}
