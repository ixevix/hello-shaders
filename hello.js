var scene, camera, renderer, geometry, material, mesh;

function init(){
    function loadShaders(url, name){
        return new Promise(function(resolve, reject){
            function callback(shader, name){
                document.getElementById(name).innerText = shader;
            }
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function() {
                if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ) {
                    callback(xmlHttp.responseText, name);
                    return resolve(true);
                }
            }
            xmlHttp.open('GET', url, true)
            xmlHttp.send(null);
        });
    }

    Promise.all([loadShaders('hello.vert', 'vert'), loadShaders('hello.frag', 'frag')]).then(function(result){
        /*var uniforms = THREE.UniformsUtils.merge([
            THREE.UniformsLib['lights']
        ]);*/
        scene = new THREE.Scene();

        scene.add( new THREE.AmbientLight( 0xffffff, 0.3 ) );
        var light = new THREE.DirectionalLight( 0xffffff, 0.35 );
        light.position.set( 1, 1, 1 ).normalize();
        scene.add( light );

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

        geometry = new THREE.BoxGeometry( 200, 200, 200 );
        material = new THREE.ShaderMaterial({ vertexShader: document.getElementById('vert').textContent, fragmentShader: document.getElementById('frag').textContent });
        //material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        document.getElementById('root').appendChild( renderer.domElement );
        animate();
    });
}

function animate(){
    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render( scene, camera );
}

function loadShader(filename, name){

}

document.addEventListener('DOMContentLoaded', init, false);