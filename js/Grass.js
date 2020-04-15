function spawnGrass(scene){

    var textureGrass = new THREE.TextureLoader().load( 'textures/Grass/grass.png' );
    var materialGrass = new THREE.MeshPhongMaterial( { map: textureGrass, transparent:true, shininess:10 } );

    for(j=0;j<40;j++){
        spawn(Math.random()*1000-1200,Math.random()*500-1200, materialGrass);  
    }
    
    for(j=0;j<100;j++){
        spawn(Math.random()*1000-1200,Math.random()*1500 - 500, materialGrass);  
    }

    for(j=0;j<40;j++){
        spawn(Math.random()*1000 + 30,Math.random()*500-1200, materialGrass);  
    }

     for(j=0;j<80;j++){
        spawn(Math.random()*1000 + 150,Math.random()*1500 - 500, materialGrass);  
    }


}

function spawn(x,y, materialGrass){
    
    var geo1 = new THREE.PlaneGeometry(2, 2);
    var geo2 = new THREE.PlaneGeometry(4, 4);
    var geo3 = new THREE.PlaneGeometry(10, 10);

    rand = Math.floor(Math.random() * 3);
    xpos = x;//(Math.random() * 2000) - 1000;
    zpos = y;//(Math.random() * 2000) - 1000;
    randRotation = Math.random() * Math.PI/4;
    for( i = 0;i<4;i++){

        switch(rand){
            case 1: plane = new THREE.Mesh( geo1, materialGrass); break;
            case 2: plane = new THREE.Mesh( geo2, materialGrass); break;
            case 3: plane = new THREE.Mesh( geo3, materialGrass); break;
            default: plane = new THREE.Mesh( geo3, materialGrass); break;
        }

        //var plane = new THREE.Mesh( geo1, materialGrass);
        
        plane.position.y = 1;
        plane.position.x = xpos;
        plane.position.z = zpos;
        plane.rotation.y=Math.PI/2*i + randRotation; // ajouter random
        scene.add(plane);
    }
}