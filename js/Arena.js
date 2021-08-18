Arena = function (game) {
  // Appel des variables nécéssaires
  this.game = game;
  var scene = game.scene;

  // Création de notre lumière principale
  var light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  //parameter(nom, largeur, profondeur, détails, scene)
  var ground = BABYLON.Mesh.CreateGround("ground1", 20, 20, 2, scene);
  ground.scaling = new BABYLON.Vector3(2, 1, 3);
  ground.scaling.z = 2;

  //parameter(nom, taille, scene)
  // SUR TOUS LES AXES Y -> On monte les meshes de la moitié de la hauteur du mesh en question.
  var mainBox = BABYLON.Mesh.CreateBox("box1", 3, scene);
  mainBox.scaling.y = 1;
  mainBox.position = new BABYLON.Vector3(5, (3 / 2) * mainBox.scaling.y, 5);
  mainBox.rotation.y = (Math.PI * 45) / 180;

  var mainBox2 = mainBox.clone("box2");
  mainBox2.scaling.y = 2;
  mainBox2.position = new BABYLON.Vector3(5, (3 / 2) * mainBox2.scaling.y, -5);

  var mainBox3 = mainBox.clone("box3");
  mainBox3.scaling.y = 3;
  mainBox3.position = new BABYLON.Vector3(-5, (3 / 2) * mainBox3.scaling.y, -5);

  var mainBox4 = mainBox.clone("box4");
  mainBox4.scaling.y = 4;
  mainBox4.position = new BABYLON.Vector3(-5, (3 / 2) * mainBox4.scaling.y, 5);

  //parameter(nom, heigt, diamtop, diambottom, tesselation, subdivision(details)s, scene)
  var cylinder = BABYLON.Mesh.CreateCylinder("cyl1", 20, 5, 5, 20, 4, scene);
  cylinder.position.y = 20 / 2;
};
