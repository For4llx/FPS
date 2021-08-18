Game = function(canvasId) {
    // Canvas et engine défini ici
    var canvas = document.getElementById(canvasId); // On récupère l'élément html canva
    var engine = new BABYLON.Engine(canvas, true); // On créer un moteur graphique
    var _this = this;
    
    // On initie la scène avec une fonction associé à l'objet Game
    this.scene = this._initScene(engine);

    var _player = new Player(_this, canvas);
    var _arena = new Arena(_this);
    // Permet au jeu de tourner
    engine.runRenderLoop(function () { // Affiche dès qu'il le peut les images
        _this.scene.render();
    });

    // Ajuste la vue 3D si la fenetre est agrandi ou diminué
    window.addEventListener("resize", function () {
        if (engine) {
            engine.resize();
        }
    },false);
};

Game.prototype = {
    // Prototype d'initialisation de la scène
    _initScene : function(engine) {
        var scene = new BABYLON.Scene(engine);
        scene.clearColor=new BABYLON.Color3(0,0,0);
        return scene;
    }
};

// Page entièrement chargé, on lance le jeu
document.addEventListener("DOMContentLoaded", function () {
new Game('renderCanvas');
}, false);
