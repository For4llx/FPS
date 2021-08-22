Arena = function (game) {
  // Appel des variables nécéssaires
  this.game = game;
  var scene = game.scene;

  // Création de notre lumière principale
  var light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 10, 0),
    scene
  );
  var light2 = new BABYLON.HemisphericLight(
    "light2",
    new BABYLON.Vector3(0, -1, 0),
    scene
  );
  light2.intensity = 0.8;

  // Material pour le sol
  var materialGround = new BABYLON.StandardMaterial("wallTexture", scene);
  materialGround.diffuseTexture = new BABYLON.Texture(
    "https://raw.githubusercontent.com/oc-courses/initiation-babylon/part2-1/assets/images/tile.jpg",
    scene
  );
  materialGround.diffuseTexture.uScale = 8.0;
  materialGround.diffuseTexture.vScale = 8.0;

  // Material pour les objets
  var materialWall = new BABYLON.StandardMaterial("groundTexture", scene);
  materialWall.diffuseTexture = new BABYLON.Texture(
    "https://raw.githubusercontent.com/oc-courses/initiation-babylon/part2-1/assets/images/tile.jpg",
    scene
  );

  var boxArena = BABYLON.Mesh.CreateBox(
    "box1",
    100,
    scene,
    false,
    BABYLON.Mesh.BACKSIDE
  );
  boxArena.material = materialGround;
  boxArena.position.y = 50 * 0.3;
  boxArena.scaling.y = 0.3;
  boxArena.scaling.z = 0.8;
  boxArena.scaling.x = 3.5;

  var columns = [];
  var numberColumn = 6;
  var sizeArena = 100 * boxArena.scaling.x - 50;
  var ratio = (100 / numberColumn / 100) * sizeArena;
  for (var i = 0; i <= 1; i++) {
    if (numberColumn > 0) {
      columns[i] = [];
      let mainCylinder = BABYLON.Mesh.CreateCylinder(
        "cyl0-" + i,
        30,
        5,
        5,
        20,
        4,
        scene
      );
      mainCylinder.position = new BABYLON.Vector3(
        -sizeArena / 2,
        30 / 2,
        -20 + 40 * i
      );
      mainCylinder.material = materialWall;
      columns[i].push(mainCylinder);

      if (numberColumn > 1) {
        for (let y = 1; y <= numberColumn - 1; y++) {
          let newCylinder = columns[i][0].clone("cyl" + y + "-" + i);
          newCylinder.position = new BABYLON.Vector3(
            -(sizeArena / 2) + ratio * y,
            30 / 2,
            columns[i][0].position.z
          );
          columns[i].push(newCylinder);
        }
      }
    }
  }
  //Les textes à afficher
  let textArray = [
    `Oh Bonjour, je ne m'attendais pas à voir quelqu'un ici !`,
    `Je me présente moi c'est Roméo et je suis développeur web junior !`,
    `Je maitrise aussi bien le backend avec Node.js et SQL que le frontend avec HTML, CSS, SASS et Vuejs.`,
    `Et... comme vous pouvez le voir... en ce moment j'apprends aussi à faire de la 3D pour le web.`,
    `Et cet endroit vous dites ? C'est un projet que j'aimerais terminer ! si j'ai le temps.`,
    `Qu'est ce que je fais en ce moment ? Je suis en pleine recherche d'emploi ! À Paris et sa périphérie.`,
    `Un poste de frontend serait l'idéal car c'est ma vocation, mais je suis aussi ouvert à faire du backend.`,
    `Alors si vous êtes un recruteur qui passerait par là... n'hésitez pas à me faire signe ! :)`,
    `En attendant vous êtes libres de vous déplacer ici autant que vous le voulez !`,
    `Enfin... éviter les murs, il n'y a pas encore de moteur physique...`,
    `Oops ! Si vous voyez ce message, c'est que vous avez traversé un mur.`,
  ];
  //Le font des textes
  var font_type = "Arial";

  //Dimensions du plan
  var planeWidth = 10;
  var planeHeight = 3;

  //Calculate ratio of text width to size of font used
  var ratio = textWidth / size;

  //set font to be actually used to write text on dynamic texture
  var font_size = Math.floor(DTWidth / (ratio * 1)); //size of multiplier (1) can be adjusted, increase for smaller text
  var font = font_size + "px " + font_type;

  //Set width and height for dynamic texture using same multiplier
  var DTWidth = planeWidth * 60;
  var DTHeight = planeHeight * 60;

  let dynamicTextureArray = [];
  let matArray = [];
  let planeArray = [];

  for (let i = 0; i < textArray.length; i++) {
    //Create dynamic texture
    dynamicTextureArray[i] = new BABYLON.DynamicTexture(
      "DynamicTexture",
      { width: DTWidth, height: DTHeight },
      scene
    );
    //Check width of text for given font type at any size of font
    var ctx = dynamicTextureArray[i].getContext();
    var size = 12; //any value will work
    var font = size + "px " + font_type;
    var textWidth = ctx.measureText(textArray[i]).width;

    //Draw text
    dynamicTextureArray[i].drawText(
      textArray[i],
      null,
      null,
      font,
      "#000000",
      "#ffffff",
      true
    );
    //On créer autant de plan que de text à afficher
    planeArray[i] = BABYLON.MeshBuilder.CreatePlane(
      "plane",
      { width: planeWidth, height: planeHeight },
      scene
    );
    // On alterne l'emplacement des planes
    if (i % 2 === 0) {
      planeArray[i].position.x = i * 18;
      planeArray[i].position.y = 5;
      planeArray[i].position.z = 10;
      planeArray[i].rotation.y = degToRad(45);
    } else {
      //On choisi l'emplacement en x et y et l'orientation en y des plans à afficher
      planeArray[i].position.x = i * 18;
      planeArray[i].position.y = 5;
      planeArray[i].position.z = -10;
      planeArray[i].rotation.y = degToRad(135);
    }
    // le dernière des planes est plus loin et centré
    if (textArray.length - 1 === i) {
      planeArray[i].position.x = i * 18 + 10;
      planeArray[i].position.z = 0;
      planeArray[i].rotation.y = degToRad(90);
    }

    //create material
    matArray[i] = new BABYLON.StandardMaterial("mat", scene);
    matArray[i].diffuseTexture = dynamicTextureArray[i];

    //apply material
    planeArray[i].material = matArray[i];
  }
};
