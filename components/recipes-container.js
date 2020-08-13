class RecipesHandler {
  constructor(recipesContainer, favoritedRecipesContainer) {
    this.recipesContainer = recipesContainer;
    this.favoritedRecipesContainer = favoritedRecipesContainer;
  }

    clickGetFavoritedRecipes(getFavoritedRecipes) {
    this.getFavoritedRecipes = getFavoritedRecipes;
  }

  handleFavoriteClick(id) {
    if (!(favoritedArray.includes(id))) {
      favoritedArray.push(id);
      document.getElementById(`heart_icon_${id}`).className = "fas fa-heart text-danger heart-icon fa-lg";
    } else {
      favoritedArray.splice(favoritedArray.indexOf(id), 1);
      document.getElementById(`heart_icon_${id}`).className = "far fa-heart text-danger heart-icon fa-lg";
    }
    localStorage.setItem('favoritedArray', JSON.stringify(favoritedArray));
    this.getFavoritedRecipes();
  }

  handleDeleteClick(id) {
    favoritedArray.splice(favoritedArray.indexOf(id), 1);
    document.getElementById(`${id}`).remove();
    localStorage.setItem('favoritedArray', JSON.stringify(favoritedArray));
    if (localStorage.getItem('favoritedArray') === "[]") {
      document.getElementById("empty_favorite_text").className = "col-xs-12 col-sm-10 offset-sm-1 d-flex justify-content-center";
    }
  }

  handleExternalClick(URL) {
    document.getElementById("modal_container").className="";
    document.querySelector("body").className = "bg-light freeze";
    document.getElementById("external_link_button").addEventListener("click", () => {
      window.open(URL, "_blank"),
      document.getElementById("modal_container").className="d-none",
      document.querySelector("body").className = "bg-light"
    });
    document.getElementById("go_back_button").addEventListener("click", () => {
      document.getElementById("modal_container").className = "d-none";
      document.querySelector("body").className = "bg-light";
    });
  }

  displaySearchedRecipes(recipes) {
    console.log(recipes);
    if (!(recipes.results[0])) {
      document.getElementById("recipe_download_text").className = "text-center d-none";
      document.getElementById("no_recipes_text").className = "text-center";
      return;
    }
    for (let i = 0; i < recipes.results.length; i++) {
      const imageURL = `${recipes.results[i].image.substring(0, recipes.results[i].image.length - 11)}636x393.jpg`;
      const title = recipes.results[i].title;
      const readyInMinutes = recipes.results[i].readyInMinutes;
      const servings = recipes.results[i].servings;
      const recipeURL = recipes.results[i].sourceUrl;
      const healthScore = recipes.results[i].healthScore;
      const caloriesAmount = Math.round(recipes.results[i].nutrition.nutrients[0].amount);
      const proteinAmount = Math.round(recipes.results[i].nutrition.nutrients[8].amount);
      const fatAmount = Math.round(recipes.results[i].nutrition.nutrients[1].amount);
      const carbsAmount = Math.round(recipes.results[i].nutrition.nutrients[3].amount);
      const sodiumAmount = Math.round(recipes.results[i].nutrition.nutrients[7].amount);
      const id = recipes.results[i].id;
      const recipeCard = document.createElement("div");
      recipeCard.className = "recipe-card card mx-3 my-3 px-0 col-xs-12 col-sm-5 col-md-5 col-lg-3 col-xl-2 h-100";
      recipeCard.id = "recipe";
      const imageContainer = document.createElement("div");
      const titleAnchorTag = document.createElement("a");
      titleAnchorTag.addEventListener("click", this.handleExternalClick.bind(this, recipeURL));
      imageContainer.className = "d-flex justify-content-center"
      const img = document.createElement("img");
      imageContainer.className = "card-image-top d-flex justify-content-center my-3";
      img.src = imageURL;
      img.alt = "Recipe Image";
      img.className = "m-0 p-0";
      const heartIconContainer = document.createElement("span");
      heartIconContainer.id = "heart_container";
      heartIconContainer.className = "badge badge-light m-1 p-1 border border-danger rounded";
      const heartIcon = document.createElement("i");
      heartIcon.id = `heart_icon_${id}`;
      if (favoritedArray.includes(id)) {
        heartIcon.className = "fas fa-heart text-danger heart-icon fa-lg";
      } else {
        heartIcon.className = "far fa-heart text-danger heart-icon fa-lg";
      }
      heartIconContainer.append(heartIcon);
      imageContainer.append(heartIconContainer);
      heartIconContainer.addEventListener("click", this.handleFavoriteClick.bind(this, id));
      const cardBody = document.createElement("div");
      cardBody.className = "card-body pt-0";
      const cardTitle = document.createElement("div");
      cardTitle.className = "card-title";
      const recipeTitle = document.createElement("h3");
      recipeTitle.textContent = title;
      const cardText1 = document.createElement("div");
      cardText1.className = "card-text";
      const minutesSpan = document.createElement("span");
      minutesSpan.className = "badge badge-dark mr-1 mb-1";
      minutesSpan.textContent = `${readyInMinutes} Minutes`;
      const servingsSpan = document.createElement("span");
      servingsSpan.className = "badge badge-dark mb-1";
      servingsSpan.textContent = `${servings} Servings`;
      cardText1.append(minutesSpan);
      cardText1.append(servingsSpan);
      const cardText2 = document.createElement("div");
      cardText2.className = "card-text d-flex flex-wrap";
      const calorieSpan = document.createElement("span");
      calorieSpan.className = "badge badge-secondary mb-1 mr-1"
      calorieSpan.textContent = `${caloriesAmount} Calories`
      const carbsSpan = document.createElement("span");
      carbsSpan.className = "badge badge-secondary mb-1 mr-1"
      carbsSpan.textContent = `${carbsAmount}g Carbs`
      const fatSpan = document.createElement("span");
      fatSpan.className = "badge badge-secondary mb-1 mr-1"
      fatSpan.textContent = `${fatAmount}g Total Fat`
      const proteinSpan = document.createElement("span");
      proteinSpan.className = "badge badge-secondary mb-1 mr-1";
      proteinSpan.textContent = `${proteinAmount}g Protein`
      const sodiumSpan = document.createElement("span");
      sodiumSpan.className = "badge badge-secondary mb-1 mr-1";
      sodiumSpan.textContent = `${sodiumAmount}mg Sodium`;
      const cardText3 = document.createElement("div");
      cardText3.className = "card-text d-flex flex-wrap";
      if (recipes.results[i].diets) {
        for (var j = 0; j < recipes.results[i].diets.length; j++) {
          const dietSpan = document.createElement("span");
          dietSpan.className = "badge badge-light mb-1 mr-1";
          dietSpan.textContent = recipes.results[i].diets[j];
          cardText3.append(dietSpan);
        }
      }
      cardText2.append(calorieSpan);
      cardText2.append(carbsSpan);
      cardText2.append(fatSpan);
      cardText2.append(proteinSpan);
      cardText2.append(sodiumSpan);
      titleAnchorTag.append(recipeTitle);
      cardTitle.append(titleAnchorTag);
      cardTitle.append(cardText1);
      cardTitle.append(cardText3);
      cardTitle.append(cardText2);
      cardBody.append(cardTitle);
      imageContainer.append(img);
      recipeCard.append(imageContainer);
      recipeCard.append(cardBody);
      this.recipesContainer.append(recipeCard);
    }
    document.getElementById("recipe_download_text").className = "text-center d-none";
  }

  displayFavoritedRecipes(recipes) {
    while (document.getElementById("favorited_recipes_container").firstChild) {
      document.getElementById("favorited_recipes_container").removeChild(document.getElementById("favorited_recipes_container").firstChild);
    }
    for (let i = 0; i < recipes.length; i++) {
      const imageURL = `${recipes[i].image.substring(0, recipes[i].image.length-11)}636x393.jpg`;
      const title = recipes[i].title;
      const readyInMinutes = recipes[i].readyInMinutes;
      const servings = recipes[i].servings;
      const recipeURL = recipes[i].sourceUrl;
      const healthScore = recipes[i].healthScore;
      const caloriesAmount = Math.round(recipes[i].nutrition.nutrients[0].amount);
      const proteinAmount = Math.round(recipes[i].nutrition.nutrients[8].amount);
      const fatAmount = Math.round(recipes[i].nutrition.nutrients[1].amount);
      const carbsAmount = Math.round(recipes[i].nutrition.nutrients[3].amount);
      const sodiumAmount = Math.round(recipes[i].nutrition.nutrients[7].amount);
      const id = recipes[i].id;
      const recipeCard = document.createElement("div");
      recipeCard.className = "favorited-recipe-card card my-3 mx-3 pt-3 col-11";
      recipeCard.id = id;
      const imageContainer = document.createElement("div");
      const titleAnchorTag = document.createElement("a");
      // titleAnchorTag.href = recipeURL;
      titleAnchorTag.addEventListener("click", this.handleExternalClick.bind(this, recipeURL));
      imageContainer.className = "d-flex justify-content-center"
      const img = document.createElement("img");
      imageContainer.className = "card-image-top d-flex justify-content-center";
      img.src = imageURL;
      img.alt = "Recipe Image"
      img.className = "p-1";
      const deleteIconContainer = document.createElement("span");
      deleteIconContainer.id = "delete_container";
      deleteIconContainer.className = "badge badge-light m-1 p-1 border border-danger rounded";
      const deleteIcon = document.createElement("i");
      deleteIcon.className = "far fa-trash-alt text-danger delete-icon fa-lg";
      deleteIconContainer.append(deleteIcon);
      imageContainer.append(deleteIconContainer);
      deleteIconContainer.addEventListener("click", this.handleDeleteClick.bind(this, id));
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      const cardTitle = document.createElement("div");
      cardTitle.className = "card-title";
      const recipeTitle = document.createElement("h3");
      recipeTitle.textContent = title;
      const cardText1 = document.createElement("div");
      cardText1.className = "card-text";
      const minutesSpan = document.createElement("span");
      minutesSpan.className = "badge badge-dark mr-1 mb-1";
      minutesSpan.textContent = `${readyInMinutes} Minutes`;
      const servingsSpan = document.createElement("span");
      servingsSpan.className = "badge badge-dark mb-1";
      servingsSpan.textContent = `${servings} Servings`;
      cardText1.append(minutesSpan);
      cardText1.append(servingsSpan);
      const cardText2 = document.createElement("div");
      cardText2.className = "card-text d-flex flex-wrap";
      const calorieSpan = document.createElement("span");
      calorieSpan.className = "badge badge-secondary mb-1 mr-1"
      calorieSpan.textContent = `${caloriesAmount} Calories`
      const carbsSpan = document.createElement("span");
      carbsSpan.className = "badge badge-secondary mb-1 mr-1"
      carbsSpan.textContent = `${carbsAmount}g Carbs`
      const fatSpan = document.createElement("span");
      fatSpan.className = "badge badge-secondary mb-1 mr-1"
      fatSpan.textContent = `${fatAmount}g Total Fat`
      const proteinSpan = document.createElement("span");
      proteinSpan.className = "badge badge-secondary mb-1 mr-1";
      proteinSpan.textContent = `${proteinAmount}g Protein`
      const sodiumSpan = document.createElement("span");
      sodiumSpan.className = "badge badge-secondary mb-1 mr-1";
      sodiumSpan.textContent = `${sodiumAmount}mg Sodium`;
      const cardText3 = document.createElement("div");
      cardText3.className = "card=text d-flex flex-wrap";
      if (recipes[i].diets) {
        for (var j = 0; j < recipes[i].diets.length; j++) {
          const dietSpan = document.createElement("span");
          dietSpan.className = "badge badge-light mb-1 mr-1";
          dietSpan.textContent = recipes[i].diets[j];
          cardText3.append(dietSpan);
        }
      }
      cardText2.append(calorieSpan);
      cardText2.append(carbsSpan);
      cardText2.append(fatSpan);
      cardText2.append(proteinSpan);
      cardText2.append(sodiumSpan);
      titleAnchorTag.append(recipeTitle);
      cardTitle.append(titleAnchorTag);
      // cardTitle.append(recipeTitle);
      cardTitle.append(cardText1);
      cardTitle.append(cardText3);
      cardTitle.append(cardText2);
      cardBody.append(cardTitle);
      imageContainer.append(img);
      recipeCard.append(imageContainer);
      recipeCard.append(cardBody);
      this.favoritedRecipesContainer.append(recipeCard);
    }
    document.getElementById("favorite_recipe_download_text").className = "text-center d-none";
  }
}
