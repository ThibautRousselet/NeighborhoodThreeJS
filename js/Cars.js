//This file contain all the functions realated to the spawning and the animation of the cars

//Load the model of the car and make one spawn in each direction
function spawnCars(scene) {
    var cars = [];
    var car;
    var loader = new THREE.GLTFLoader();
    //Spawn the car going forward (positive z)
    loader.load('models/Car/scene.gltf', function(gltf) {
        car = gltf.scene.children[0];
        car.name = 'carF';
        car.scale.set(0.2, 0.2, 0.2);
        car.position.x = -70;
        car.position.y = 7;
        car.position.z = -250;
        scene.add(car);
    });

    //Spawn the car going backward (negative z)
    loader.load('models/Car/scene.gltf', function(gltf) {
        car = gltf.scene.children[0];
        car.name = 'carB';
        car.scale.set(0.2, 0.2, 0.2);
        car.position.x = 0;
        car.position.y = 7;
        car.position.z = 250;
        car.rotation.z -= Math.PI;
        scene.add(car);
    });
    
    
}

//Update the position of the cars at each frame
function updateCars(){
    limitPosition = 2000; //Limit coordinates of the car
    //Only solution we found to get a refernece to a car is to search its name but it is not very optimized as it is called at each frame
    var carf = scene.getObjectByName( 'carF', true );
    if (carf.position.z > limitPosition){
        carf.position.z = -limitPosition; //If the cars has reached the limit, bring it back to its spawn position
    } else {
        carf.position.z+=6;
    }

    var carb = scene.getObjectByName( 'carB', true );
    if (carb.position.z < -limitPosition){
        carb.position.z = limitPosition;
    } else {
        carb.position.z-=6;
    }
}