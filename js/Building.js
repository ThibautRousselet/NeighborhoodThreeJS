//This file contain the functions used to build the two buildings

// Function that creates all the elements of the  big building
function buildBuilding(scene) {
    /* Dimensions of the building : 
        -8 columns of size 30, 8*30 = 240
        -12 floors of size 30, 12*30 = 480 
        -depth of 200
        -total : 200*480*240
    */

    var nbFloor = 12;
    var heightFloor = 30;
    var totalHeight = nbFloor*heightFloor

    var nbCol = 8;
    var widthCol = 30;
    var totalWidth = nbCol*widthCol;

    var depth = 200;

    var centerX = 250; //X coordinates of center

    var textureBricks = new THREE.TextureLoader().load( 'textures/bricks.jpg' );
    var materialBricks = new THREE.MeshPhongMaterial( { map: textureBricks, shininess:10 } );

    var textureWindows = [];
    var i;
    for (i = 0; i < 8; i++) {
        textureWindows.push(new THREE.MeshBasicMaterial( { map :new THREE.TextureLoader().load( 'textures/Windows/window'+(i+1)+'.jpg' ) } ));
    }

    var reflectionCube = new THREE.CubeTextureLoader().load( directions );
    reflectionCube.encoding = THREE.sRGBEncoding;

    var j;
    var block;

    //It would be more optimized to add every elements in the same loop but we create one for each one to keep the code clear and understandable
    //-----WALLS-----
    //Walls are made of textured cubes piled up
    for (i = 0; i < nbFloor; i++) {
        for (j = 0; j < nbCol; j++) {
            
            var blockGeometry = new THREE.BoxGeometry(depth, heightFloor, widthCol);

            //We put brick textures on the first and the last block and windows in the middle
            if (j==0 || j==nbCol-1){
                block = new THREE.Mesh( blockGeometry, materialBricks );
            } else {
                //Get a random window texture to create a more natural aspect
                block = new THREE.Mesh( blockGeometry, textureWindows[Math.floor(Math.random() * 8)] ); 
            }
            //We pile up the blocks to build the structure
            block.position.y = i*heightFloor + (heightFloor/2);
            block.position.x = centerX;
            block.position.z =- (totalWidth/2) + (j+0.5)*widthCol;

            scene.add(block);
        }
    }

    //-----ROOF-----
    //We put a last smaller layer of cube on the roof
    for (j = 0; j < nbCol; j++) {
            
        var blockGeometry = new THREE.BoxGeometry(depth, heightFloor/2, widthCol);
        //We put brick textures on the first and the last block and windows in the middle
        block = new THREE.Mesh( blockGeometry, materialBricks );
        //We pile up the blocks to build the structure
        block.position.y = nbFloor*heightFloor + (heightFloor/4);
        block.position.x = centerX;
        block.position.z =- (totalWidth/2) + (j+0.5)*widthCol;

        scene.add(block);
    }
    //-----BALCONIES-----
    var depthBalcon = 10;
    var balconWidth = (nbCol-2)*widthCol;
    //Metal like material
    var metalMaterial = new THREE.MeshStandardMaterial({color: 0xbfbfbf, roughness:0.4, metalness: 1, envMap:reflectionCube});

    for (i = 1; i < nbFloor; i++) {
        //FLOOR
        //Floor is a simple box
        frontFloor = new THREE.Mesh(
            new THREE.BoxGeometry(depthBalcon, 2, balconWidth),
            metalMaterial
        );
        frontFloor.position.x = centerX - depth/2 - depthBalcon/2;
        frontFloor.position.y = i*heightFloor;
        scene.add(frontFloor);

        backFloor = new THREE.Mesh(
            new THREE.BoxGeometry(depthBalcon, 2, balconWidth),
            metalMaterial
        );
        backFloor.position.x = centerX + depth/2 + depthBalcon/2;
        backFloor.position.y = i*heightFloor;
        scene.add(backFloor);

        //Metal bars
        //We add cylinder along the floor to build the metal bars
        var barHeight = 12;
        var barSpacing = 4;
        var barRadius = 0.5;
        var barGeometry = new THREE.CylinderGeometry( barRadius, barRadius, barHeight);
        //Lateral bars
        for (j = 2; j < depthBalcon; j+=barSpacing){
            barLeft = new THREE.Mesh(
                barGeometry,
                metalMaterial
            );
            barLeft.position.x = centerX - depth/2 - j;
            barLeft.position.y = i*heightFloor + barHeight/2;
            barLeft.position.z = -balconWidth/2;
            scene.add(barLeft);

            barRight = new THREE.Mesh(
                barGeometry,
                metalMaterial
            );
            barRight.position.x = centerX - depth/2 - j;
            barRight.position.y = i*heightFloor + barHeight/2;
            barRight.position.z = balconWidth/2;
            scene.add(barRight);

            barLeftBack = new THREE.Mesh(
                barGeometry,
                metalMaterial
            );
            barLeftBack.position.x = centerX + depth/2 + j;
            barLeftBack.position.y = i*heightFloor + barHeight/2;
            barLeftBack.position.z = -balconWidth/2;
            scene.add(barLeftBack);

            barRightBack = new THREE.Mesh(
                barGeometry,
                metalMaterial
            );
            barRightBack.position.x = centerX + depth/2 + j;
            barRightBack.position.y = i*heightFloor + barHeight/2;
            barRightBack.position.z = balconWidth/2;
            scene.add(barRightBack);
        }


        //FrontBars
        for (j = -balconWidth/2; j < balconWidth/2; j+=barSpacing){
            bar = new THREE.Mesh(
                barGeometry,
                metalMaterial
            );
            bar.position.x = centerX - depth/2 - depthBalcon;
            bar.position.y = i*heightFloor + barHeight/2;
            bar.position.z = j;
            scene.add(bar);

            barBack = new THREE.Mesh(
                barGeometry,
                metalMaterial
            );
            barBack.position.x = centerX + depth/2 + depthBalcon;
            barBack.position.y = i*heightFloor + barHeight/2;
            barBack.position.z = j;
            scene.add(barBack);
        }

        //guardrail
        //We add a long box on top of the cylinders to create the rail
        var railHeight = 0.3;
        var railWidth = 2*barRadius;
        frontRail = new THREE.Mesh(
            new THREE.BoxGeometry(railWidth, railHeight, balconWidth),
            metalMaterial
        );
        frontRail.position.x = centerX - depth/2 - depthBalcon;
        frontRail.position.y = i*heightFloor + barHeight + railHeight/2;
        scene.add(frontRail);

        leftRail = new THREE.Mesh(
            new THREE.BoxGeometry(depthBalcon, railHeight, railWidth),
            metalMaterial
        );
        leftRail.position.x = centerX - depth/2 - depthBalcon/2;
        leftRail.position.y = i*heightFloor + barHeight + railHeight/2;
        leftRail.position.z = -balconWidth/2;
        scene.add(leftRail);

        rightRail = new THREE.Mesh(
            new THREE.BoxGeometry(depthBalcon, railHeight, railWidth),
            metalMaterial
        );
        rightRail.position.x = centerX - depth/2 - depthBalcon/2;
        rightRail.position.y = i*heightFloor + barHeight + railHeight/2;
        rightRail.position.z = balconWidth/2;
        scene.add(rightRail);

        frontRailBack = new THREE.Mesh(
            new THREE.BoxGeometry(railWidth, railHeight, balconWidth),
            metalMaterial
        );
        frontRailBack.position.x = centerX + depth/2 + depthBalcon;
        frontRailBack.position.y = i*heightFloor + barHeight + railHeight/2;
        scene.add(frontRailBack);

        leftRailBack = new THREE.Mesh(
            new THREE.BoxGeometry(depthBalcon, railHeight, railWidth),
            metalMaterial
        );
        leftRailBack.position.x = centerX + depth/2 + depthBalcon/2;
        leftRailBack.position.y = i*heightFloor + barHeight + railHeight/2;
        leftRailBack.position.z = -balconWidth/2;
        scene.add(leftRailBack);

        rightRailBack = new THREE.Mesh(
            new THREE.BoxGeometry(depthBalcon, railHeight, railWidth),
            metalMaterial
        );
        rightRailBack.position.x = centerX + depth/2 + depthBalcon/2;
        rightRailBack.position.y = i*heightFloor + barHeight + railHeight/2;
        rightRailBack.position.z = balconWidth/2;
        scene.add(rightRailBack);

        //Yellow Plates on balcony
        //Very thin box are used for the yellow plates on the balconies
        var plateGeometry = new THREE.BoxGeometry(barRadius, barHeight, widthCol);
        var plateMaterial = new THREE.MeshPhongMaterial({color: 0xe6ac00, shininess: 5});
        leftPlate = new THREE.Mesh(
            plateGeometry,
            plateMaterial
        );
        leftPlate.position.x = centerX - depth/2 - depthBalcon - 3*barRadius;
        leftPlate.position.y = i*heightFloor + barHeight/2;
        leftPlate.position.z = -widthCol*1.5;
        scene.add(leftPlate);

        rightPlate = new THREE.Mesh(
            plateGeometry,
            plateMaterial
        );
        rightPlate.position.x = centerX - depth/2 - depthBalcon - 3*barRadius;
        rightPlate.position.y = i*heightFloor + barHeight/2;
        rightPlate.position.z = widthCol*1.5;
        scene.add(rightPlate);

        leftPlateBack = new THREE.Mesh(
            plateGeometry,
            plateMaterial
        );
        leftPlateBack.position.x = centerX + depth/2 + depthBalcon + 3*barRadius;
        leftPlateBack.position.y = i*heightFloor + barHeight/2;
        leftPlateBack.position.z = -widthCol*1.5;
        scene.add(leftPlateBack);

        rightPlateBack = new THREE.Mesh(
            plateGeometry,
            plateMaterial
        );
        rightPlateBack.position.x = centerX + depth/2 + depthBalcon + 3*barRadius;
        rightPlateBack.position.y = i*heightFloor + barHeight/2;
        rightPlateBack.position.z = widthCol*1.5;
        scene.add(rightPlateBack);
    }

}

// Function that creates all the elements of the small building
function buildSmallBuilding(scene) {

    /* Dimensions of the building : 
        -15 columns of size 10, 15*10 = 200
        -4 floors of size 30, 4*30 = 120 
        -depth of 100
        -total : 200*480*240
    */
   var nbFloor = 4;
   var heightFloor = 30;
   var totalHeight = nbFloor*heightFloor

   var nbCol = 20;
   var widthCol = 10;
   var totalWidth = nbCol*widthCol;

   var depth = 75;

   var centerX = 250; //X coordinates of center
   var centerZ = -350; //Z coordinates of center

   var textureBricks = new THREE.TextureLoader().load( 'textures/bricks.jpg' );
   var materialBricks = new THREE.MeshPhongMaterial( { map: textureBricks, shininess:10 } );

   var textureWindows = [];
   var i;
   for (i = 0; i < 8; i++) {
       textureWindows.push(new THREE.MeshBasicMaterial( { map :new THREE.TextureLoader().load( 'textures/Windows/window'+(i+1)+'.jpg' ) } ));
   }


   var j;
   var block;
   //It would be more optimized to add every elements in the same loop but we create one for each one to keep the code clear and understandable
   //-----WALLS-----
   for (i = 0; i < nbFloor; i++) {
       for (j = 0; j < nbCol; j++) {
           
           var blockGeometry = new THREE.BoxGeometry(widthCol, heightFloor, depth);

           //We put brick textures on the first and the last block and windows in the middle
           if (j==0 || j==nbCol-1){
               block = new THREE.Mesh( blockGeometry, materialBricks );
           } else {
               block = new THREE.Mesh( blockGeometry, textureWindows[Math.floor(Math.random() * 8)] ); //Get a random window texture
           }
           //We pile up the blocks to build the structure
           block.position.y = i*heightFloor + (heightFloor/2);
           block.position.x = centerX - (totalWidth/2) + (j+0.5)*widthCol;
           block.position.z = centerZ;

           scene.add(block);
       }
   }

   //-----ROOF-----
   for (j = 0; j < nbCol; j++) {
           
       var blockGeometry = new THREE.BoxGeometry(widthCol, heightFloor/2, depth);
       //We put brick textures on the first and the last block and windows in the middle
       block = new THREE.Mesh( blockGeometry, materialBricks );
       //We pile up the blocks to build the structure
       block.position.y = nbFloor*heightFloor + (heightFloor/4);
       block.position.x = centerX - (totalWidth/2) + (j+0.5)*widthCol;
       block.position.z = centerZ;

       scene.add(block);
   }

}

