window.addEventListener("load", function(){
  // make an array of kitties
  kitties = []

  // constructor for every kitty
  function Kitty(name, image) {
    this.name = name;
    this.image = image;
    this.clicks = 0;
    // add kitty to list of kitties
    (function(kittyCopy){
      kitties.push(kittyCopy);
    })(this);
  }

    // make the kitties!
    kitty1 = new Kitty (
      "kitty1",
      "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426")

    kitty2 = new Kitty (
      "kitty2", "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496")

      kitty3 = new Kitty (
        "two kitties", "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454")

  // find the list in the dom
  list = document.getElementById("catList");

  // loop through the kitties
  for (i = 0; i < kitties.length; i++){
    // create a button for each kitty
    catButton = document.createElement("button");
    catButton.setAttribute("id", i);
    text = document.createTextNode(kitties[i].name);
    catButton.appendChild(text);

    // add button to the list
    list.appendChild(catButton);

    // add click listener to the button
    catButton.addEventListener("click", function(){

      // display the kitty name, image, and clicks
      imgTag = document.images[0];
      nameTag = document.getElementById("catName");      clicksTag = document.getElementById("clickCounter");

      imgTag.setAttribute("src", kitties[this.id].image);
      imgTag.setAttribute("id", this.id);
      nameTag.innerHTML = kitties[this.id].name;
      clicksTag.innerHTML = kitties[this.id].clicks;
    });
  };

  // listen to clicks on the kitty's pic
  catPic = document.images[0]
  catPic.addEventListener("click", function(){
    // increment the click count by 1 and display new count
    kitties[this.id].clicks++ ;
    document.getElementById("clickCounter").innerHTML = kitties[this.id].clicks;
  });

});
