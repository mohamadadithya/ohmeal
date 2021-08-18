/* Copyright 2021 by Mohamad Adithya */
const randomMealButton = document.getElementById('random-meal-btn')
const mealSection = document.querySelector('.meal')
const mealContainer = mealSection.querySelector('.container')
const backButton1 = document.querySelector('.btn-back.btn-1')
const backButton2 = document.querySelector('.btn-back.btn-2')

const mealsSection = document.querySelector('.meals')
const mealCards = document.querySelector('.meal-cards')
const searchButton = document.getElementById('search-meal-btn')
const searchForm = mealsSection.querySelector('.search-form')

const loader = document.querySelector('.loader')

const showLoading = () => {
  loader.classList.add('show')
  setTimeout(() => {
    loader.classList.remove('show')
  }, 5000);
}

const hideLoading = () => {
  loader.classList.remove('show')
}

randomMealButton.onclick = () => {
  showLoading()
  mealSection.classList.add('active')

  // Fetch API
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
      getMeal(res.meals[0])
      hideLoading()
    })
}

const getMeal = (meal) => {
  const ingredients = []
  // Get ingredients
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
    } else {
      // Stop if no more ingredients
      break
    }
  }

  const mealName = mealSection.querySelector('.meal__name')
  const mealArea = mealSection.querySelector('.meal__area')
  const mealImg = mealSection.querySelector('.meal__img')
  const mealIngredients = mealSection.querySelector('.meal__ingredients')
  const mealInstructions = mealSection.querySelector('.meal__instructions')
  const mealVideo = mealContainer.querySelector('.meal__video')
  const mealVideoContainer = mealContainer.querySelector('.video-container')

  mealName.innerText = meal.strMeal
  mealArea.innerText = meal.strArea
  mealImg.src = meal.strMealThumb
  mealImg.alt = meal.strMeal
  let ingredientLists = ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')
  mealIngredients.innerHTML = ingredientLists
  mealInstructions.innerText = meal.strInstructions
  if (meal.strYoutube) {
    mealVideoContainer.style.display = 'block'
    mealVideo.src = `https://youtube.com/embed/${meal.strYoutube.slice(-11)}`
  } else {
    mealVideoContainer.style.display = 'none'
  }
}

searchForm.onsubmit = (e) => {
  e.preventDefault()
  showLoading()
  const searchInput = searchForm.querySelector('.search-input')
  let keyword = searchInput.value

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
    .then(res => res.json())
    .then(res => {
      searchMeals(res.meals)
      hideLoading()
    })
}

const searchMeals = (meals) => {
  mealCards.innerHTML = ''
  meals.forEach((meal) => {
    mealCards.innerHTML += `<div class="flex meal-card" id="meal-card" data-id="${meal.idMeal}" onclick="getMealById(this)">
    <img src="${meal.strMealThumb}" alt="Meal" class="image mr-1">
    <div class="flex column">
      <h3 class="name">${meal.strMeal}</h3>
      <p class="area text-gray">${meal.strArea}</p>
    </div>
  </div>`
  })
}

const getMealById = (el) => {
  showLoading()
  mealSection.classList.add('active')
  let mealId = el.getAttribute('data-id')

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(res => {
      getMeal(res.meals[0])
      hideLoading()
    })
}

searchButton.onclick = () => {
  showLoading()
  mealsSection.classList.add('active')
  searchForm.reset()

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    .then(res => res.json())
    .then(res => {
      searchMeals(res.meals)
      hideLoading()
    })
}

backButton1.onclick = () => {
  mealSection.classList.remove('active')
}

backButton2.onclick = () => {
  mealsSection.classList.remove('active')
}
/* Copyright 2021 by Mohamad Adithya */