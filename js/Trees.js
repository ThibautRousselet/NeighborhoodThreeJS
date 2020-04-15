//Load the model of the tree and make one spawn
function spawnTrees(scene) {
    
        for(i=0;i<15;i++) spawnTree(-108,-450 + 100*i);
        for(i=0;i<9;i++) spawnTree(-108,-1500 + 100*i);
        
        for(i=0;i<10;i++) spawnTree(130,150 + 100*i);
        for(i=0;i<9;i++) spawnTree(50,-1500 + 100*i);
        
        for(i=0;i<10;i++){
            spawnTree(Math.random()*1000-1200,Math.random()*500-1200);  
		}
        
        for(i=0;i<50;i++){
            spawnTree(Math.random()*1000-1200,Math.random()*1500 - 500);  
		}

        for(i=0;i<10;i++){
            spawnTree(Math.random()*1000 + 30,Math.random()*500-1200);  
		}

         for(i=0;i<50;i++){
            spawnTree(Math.random()*1000 + 150,Math.random()*1500 - 500);  
		}

}

function spawnTree(x,z){
        //var tree;
        var loader = new THREE.GLTFLoader();
        loader.load('models/Tree/obj/birch_tree.glb', function(gltf) {
            tree = gltf.scene.children[0];
            size = 30 + Math.random()*10-10;
            tree.scale.set(size, size, size);
            tree.position.x = x;
            tree.position.y = 1;
            tree.position.z = z;
            scene.add(tree);
            });
}