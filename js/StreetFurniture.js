//This file contains the functions used to build the street furnitures like the signs

//Load the model of the traffic lights and put them at the correct position on the crossroad
function buildTraficLights(scene) {
    var zCrossRoad = -500;
    widthRoad = 60;


    var loader = new THREE.GLTFLoader();
    loader.load('models/TrafficLight/scene.gltf', function(gltf) {
        light = gltf.scene.children[0];
        light.scale.set(0.2, 0.1, 0.1);
        light.position.x = widthRoad/2;
        light.position.y = 25;
        light.position.z = zCrossRoad + widthRoad/2 + 10;
        //light.rotation.z -= Math.PI;
        scene.add(light);
    });

    /*loader.load('models/TrafficLight/scene.gltf', function(gltf) {
        light = gltf.scene.children[0];
        light.scale.set(0.2, 0.1, 0.1);
        light.position.x = widthRoad/2 + 10;
        light.position.y = 25;
        light.position.z = zCrossRoad - widthRoad;
        light.rotation.z += Math.PI/2;
        scene.add(light);
    });

    loader.load('models/TrafficLight/scene.gltf', function(gltf) {
        light = gltf.scene.children[0];
        light.scale.set(0.2, 0.1, 0.1);
        light.position.x = - widthRoad/2 - 10;
        light.position.y = 25;
        light.position.z = zCrossRoad + widthRoad/2;
        light.rotation.z -= Math.PI/2;
        scene.add(light);
    });

    loader.load('models/TrafficLight/scene.gltf', function(gltf) {
        light = gltf.scene.children[0];
        light.scale.set(0.2, 0.1, 0.1);
        light.position.x = - widthRoad;
        light.position.y = 25;
        light.position.z = zCrossRoad - widthRoad/2 - 10;
        light.rotation.z += Math.PI;
        scene.add(light);
    });*/
}

//Utility function to build a bikeSign at pos posX, posZ and rotate it
function buildBikeSign(scene, posX, posZ, rotation) {

    width = 0.5;
    height = 20;
    depth = 0.5;
    radius = 4;
    
    postGeometry = new THREE.PlaneGeometry(width, height - radius);
    postMaterial = new THREE.MeshPhongMaterial({color: 0xbfbfbf, shininess: 100});

    //post of the sign (metal like plane)
    post = new THREE.Mesh( postGeometry, postMaterial );
    post.position.x = posX;
    post.position.y = (height - radius)/2;
    post.position.z = posZ;
    post.rotation.y += rotation;
    post.material.side = THREE.DoubleSide;
    scene.add(post);

    //Textured circle with bike logo
    circleGeometry = new THREE.CircleGeometry( radius, 32 );
    textureSign = new THREE.TextureLoader().load( 'textures/bikeSign.png' );
    materialSign = new THREE.MeshPhongMaterial( { map: textureSign, shininess:10 } );
    sign = new THREE.Mesh( circleGeometry, materialSign );
    sign.position.x = posX;
    sign.position.y = height;
    sign.position.z = posZ;
    sign.rotation.y += rotation;
    sign.material.side = THREE.DoubleSide;
    scene.add(sign);
}

//Function used to build all the necessary bike signs at the appropriate positions
function buildBikeSigns(scene) {
    buildBikeSign(scene, -110, 0, 0);
    buildBikeSign(scene, -110, -400, 0);
    buildBikeSign(scene, -110, 400, 0);

    buildBikeSign(scene, 60, 0, 0);
    buildBikeSign(scene, 60, 400, 0);
    buildBikeSign(scene, 60, -400, 0);
}
