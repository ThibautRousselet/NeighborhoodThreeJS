//Load the model of the tree and make one spawn
function spawnRoads(scene) {

    // Road textures
    //Car roads loading textures
    var textureAsphalt1= new THREE.TextureLoader().load( 'textures/Roads/asphalt1.jpg' );
    var materialAsphalt1 = new THREE.MeshBasicMaterial( { map: textureAsphalt1, shininess:0 } );
    var textureAsphalt2= new THREE.TextureLoader().load( 'textures/Roads/asphalt2.jpg' );
    var materialAsphalt2 = new THREE.MeshBasicMaterial( { map: textureAsphalt2, shininess:0 } );
    //Bike roads loading textures
    var textureBike1= new THREE.TextureLoader().load( 'textures/Roads/bikeroad1.jpg' );
    var materialBike1 = new THREE.MeshBasicMaterial( { map: textureBike1, shininess:0 } );
    var textureBike2= new THREE.TextureLoader().load( 'textures/Roads/bikeroad2.jpg' );
    var materialBike2 = new THREE.MeshBasicMaterial( { map: textureBike2, shininess:0 } );

    var widthRoad = 60;
    var widthRoad2 = 100;
    var widthBikeRoad = 30;

    //Creating main road
    meshMainRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(widthRoad,4000),
    materialAsphalt1);
    meshMainRoad.rotation.x -= Math.PI/2;
    meshMainRoad.position.y = 2.0;
    scene.add(meshMainRoad);

    meshMainRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(widthRoad,4000),
    materialAsphalt1);
    meshMainRoad.rotation.x -= Math.PI/2;
    meshMainRoad.position.x -= 70;
    meshMainRoad.position.y = 2.0;
    scene.add(meshMainRoad);




    //Creating secondary road
    meshSecondaryRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(4000,widthRoad2),
    materialAsphalt2);
    meshSecondaryRoad.rotation.x -= Math.PI/2;
    meshSecondaryRoad.position.z = -570;
    meshSecondaryRoad.position.y = 1.7;
    scene.add(meshSecondaryRoad);

    //Creating third road
    meshMainRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(40,3000),
    materialAsphalt1);
    meshMainRoad.rotation.x -= Math.PI/2;
    meshMainRoad.position.x += 160;
    meshMainRoad.position.x -= 70;
    meshMainRoad.position.y = 1.5;
    meshMainRoad.position.z += 900;
    scene.add(meshMainRoad);

    //Creating back road
    meshSecondaryRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(350,40),
    materialAsphalt2);
    meshSecondaryRoad.rotation.x -= Math.PI/2;
    meshSecondaryRoad.position.x += 250;
    meshSecondaryRoad.position.z = 300;
    meshSecondaryRoad.position.y = 1.1;
    scene.add(meshSecondaryRoad);

    meshMainRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(40,500),
    materialAsphalt1);
    meshMainRoad.rotation.x -= Math.PI/2;
    meshMainRoad.position.x += 755;
    meshMainRoad.position.y = 1.1;
    meshMainRoad.position.z -= 280;
    scene.add(meshMainRoad);

    meshSecondaryRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(500,40),
    materialAsphalt2);
    meshSecondaryRoad.rotation.x -= Math.PI/2;
    meshSecondaryRoad.rotation.z += Math.PI/4;
    meshSecondaryRoad.position.x += 585;
    meshSecondaryRoad.position.z = 130;
    meshSecondaryRoad.position.y = 1.1;
    scene.add(meshSecondaryRoad);






    //Creating bike roads
    // Main bike road
    meshBikeRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(widthBikeRoad,4000),
    materialBike1);
    meshBikeRoad.rotation.x -= Math.PI/2;
    meshBikeRoad.position.x -= 130;
    meshBikeRoad.position.y = 1.5;
    scene.add(meshBikeRoad);

    //First perpendicular bike road
    meshBikeRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(4000,widthBikeRoad),
    materialBike2);
    meshBikeRoad.rotation.x -= Math.PI/2;
    meshBikeRoad.position.z = -500;
    meshBikeRoad.position.y = 1.2;
    scene.add(meshBikeRoad);

    //Second perpendicular bike road
    meshBikeRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(4000,widthBikeRoad),
    materialBike2);
    meshBikeRoad.rotation.x -= Math.PI/2;
    meshBikeRoad.position.z = -640;
    meshBikeRoad.position.y = 1.2;
    scene.add(meshBikeRoad);
}
