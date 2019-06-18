window.onload = function () { 
    console.log('page loaded');
    $(".logo").fadeOut(1000);  
}




var canvasHeight = window.innerHeight;

if (jQuery.browser.mobile == false) {
    console.log('mobile it isnt');

    var cameraPos = 6;
    var canvasWidth = window.innerWidth / 2;
    
} else if (jQuery.browser.mobile == true) {
    console.log('mobile it is');

    var cameraPos = 8;
    var canvasWidth = window.innerWidth;
    
}


var cd_scene = new THREE.Scene();
var cd_camera = new THREE.PerspectiveCamera( 75, canvasWidth/canvasHeight, 0.1, 1000 );
var cd_canvas = document.getElementById("cd");


var cd_renderer = new THREE.WebGLRenderer({ alpha: true, canvas: cd_canvas });
cd_renderer.setSize( canvasWidth, canvasHeight );

var cd_textureLoader = new THREE.TextureLoader();                             
var cd_texture0 = cd_textureLoader.load( 'side_3.png' );  // side opening   
var cd_texture1 = cd_textureLoader.load( 'side_2.png' );  // side spine                   
var cd_texture2 = cd_textureLoader.load( 'side_0.png' );  // back                   
var cd_texture3 = cd_textureLoader.load( 'side_1.png' );  // front               
var cd_texture4 = cd_textureLoader.load( 'side_3.png' );  // bottom                      
var cd_texture5 = cd_textureLoader.load( 'side_3.png' );  // side opening 

var cd_materials = [                                                      
    new THREE.MeshBasicMaterial( { map: cd_texture0 } ),                      
    new THREE.MeshBasicMaterial( { map: cd_texture1 } ),                      
    new THREE.MeshBasicMaterial( { map: cd_texture2 } ),                      
    new THREE.MeshBasicMaterial( { map: cd_texture3 } ),                      
    new THREE.MeshBasicMaterial( { map: cd_texture4 } ),                      
    new THREE.MeshBasicMaterial( { map: cd_texture5 } )                       
];

var cd_geometry = new THREE.CubeGeometry(4.7,0.2,4);                          
let cd = new THREE.Mesh(cd_geometry, cd_materials);                   


cd_scene.add( cd );
cd.rotation.x -= 4.7;
cd_camera.position.z = cameraPos;



// VINYL


var vi_scene = new THREE.Scene();
var vi_camera = new THREE.PerspectiveCamera( 75, canvasWidth/canvasHeight, 0.1, 1000 );
var vi_canvas = document.getElementById("vi");

var vi_renderer = new THREE.WebGLRenderer({ alpha: true, canvas: vi_canvas });
vi_renderer.setSize( canvasWidth, canvasHeight );

var vi_textureLoader = new THREE.TextureLoader();                             
var vi_texture0 = vi_textureLoader.load( 'side_0.png' );  // side opening                    
var vi_texture1 = vi_textureLoader.load( 'vi_3.png' );  // side spine                        
var vi_texture2 = vi_textureLoader.load( 'vi_1.png' );  // back                       
var vi_texture3 = vi_textureLoader.load( 'vi_0.png' );  // front                       
var vi_texture4 = vi_textureLoader.load( 'vi_3.png' );  // bottom                       
var vi_texture5 = vi_textureLoader.load( 'vi_3.png' );  // side opening 

var vi_materials = [                                                      
    new THREE.MeshBasicMaterial( { map: vi_texture0 } ),                      
    new THREE.MeshBasicMaterial( { map: vi_texture1 } ),                      
    new THREE.MeshBasicMaterial( { map: vi_texture2 } ),                      
    new THREE.MeshBasicMaterial( { map: vi_texture3 } ),                      
    new THREE.MeshBasicMaterial( { map: vi_texture4 } ),                      
    new THREE.MeshBasicMaterial( { map: vi_texture5 } )                       
];

var vi_geometry = new THREE.CubeGeometry(5,0.075,5);                          
let vi = new THREE.Mesh(vi_geometry, vi_materials);                   


vi_scene.add( vi );
vi.rotation.x += 4.7;
vi_camera.position.z = cameraPos;



// DRAG


var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};

$(cd_renderer.domElement).on('mousedown', function(e) {
    isDragging = true;
}).on('mousemove', function(e) {
    //console.log(e);
    var deltaMove = {
        x: e.offsetX-previousMousePosition.x,
        y: e.offsetY-previousMousePosition.y
    };

    if(isDragging) {
            
        var deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));
        
        cd.quaternion.multiplyQuaternions(deltaRotationQuaternion, cd.quaternion);
    }
    
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});


$(vi_renderer.domElement).on('mousedown', function(e) {
    isDragging = true;
}).on('mousemove', function(e) {
    //console.log(e);
    var deltaMove = {
        x: e.offsetX-previousMousePosition.x,
        y: e.offsetY-previousMousePosition.y
    };

    if(isDragging) {
            
        var deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));
        
        vi.quaternion.multiplyQuaternions(deltaRotationQuaternion, vi.quaternion);
    }
    
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
});

$(document).on('mouseup', function(e) {
    isDragging = false;
});



// ANIM




var animate = function () {
	requestAnimationFrame( animate );


        cd.rotation.x += 0.005;
        cd.rotation.y += 0.005;
        
        vi.rotation.x += 0.005;
        vi.rotation.y += 0.005;
        
	cd_renderer.render( cd_scene, cd_camera );
	vi_renderer.render( vi_scene, vi_camera );
	
};



animate();







function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function toDegrees(angle) {
	return angle * (180 / Math.PI);
}





