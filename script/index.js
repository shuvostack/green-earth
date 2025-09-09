const loadCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLoadCategories(json.categories));
};

// {
//     "id": 4,
//     "category_name": "Medicinal Tree",
//     "small_description": "Trees valued for their healing and herbal properties."
// }

const removeActive = () => {
    const activeButtons = document.querySelectorAll('.active-btn');

    activeButtons.forEach(btn => btn.classList.remove('active'));
}


const loadCategory = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
        removeActive(); // remove active class
        const clickBtn = document.getElementById(`category-btn-${id}`) ;
        clickBtn.classList.add('active'); // add active class

        displayLoadTreeCards(json.plants)
    });
};


const loadCardDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}` ;
    const res = await fetch(url);
    const details = await res.json();
    displayCardDetail(details.plants);
}


// {
//     "id": 1,
//     "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//     "name": "Mango Tree",
//     "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//     "category": "Fruit Tree",
//     "price": 500
// }

const displayCardDetail = (card) => {
    console.log(card);
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
     <h1 class="font-bold text-xl">${card.name}</h1>
          <img
            src="${card.image}"
            class="w-full h-65 object-fill"
            alt=""
          />
          <p>
            <span class="font-bold">Category :</span> <span>${card.category}</span>
          </p>
          <p>
            <span class="font-bold">Price :</span> <span>৳</span>
            <span>${card.price}</span>
          </p>
          <p>
            <span class="font-bold">Description :</span>
            <span
              >${card.description}</span
            >
          </p>
    `;
    document.getElementById('card_modal').showModal()
}

const displayLoadTreeCards = (cards) => {
  // get the container and empty
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = "";

  // get into every cards
  cards.forEach((card) => {
    console.log(card);
    // create element
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
        <div class="card bg-base-100 w-70 h-full shadow-sm">
              <!-- cart image -->
              <figure class="px-4 pt-4 h-48">
                <img
                  src="${card.image}"
                  class="rounded-lg h-full w-full object-cover"
                  alt=""
                />
              </figure>
              <!-- cart text -->
              <div class="card-body flex flex-col">
                <h2 onclick="loadCardDetail(${card.id})" class="card-title">${card.name}</h2>
                <p class="text-sm">
                  ${card.description}
                </p>
                <div class="card-actions justify-between">
                  <div
                    class="badge badge-outline border-none bg-[#DCFCE7] text-[#15803D]"
                  >
                    ${card.category}
                  </div>
                  <div class="font-bold text-lg">৳ <span>${card.price}</span></div>
                </div>
                <!-- cart button -->
                <button class="w-full btn bg-[#15803D] text-white rounded-3xl">
                  Add to Cart
                </button>
              </div>
            </div>
        `;

    cardsContainer.append(cardDiv);
  });
};

const displayLoadCategories = (categories) => {
  // get the container and empty
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";

  // get into every category
  categories.forEach((category) => {
    console.log(category);
    // create element
    const btnUl = document.createElement("ul");
    btnUl.innerHTML = `
        <ul class="flex flex-col gap-2">
                <li
                  class="btn btn-outline btn-primary border-none text-[#1F2937] hover:bg-[#15803D] hover:text-white w-[170px] h-[30px]"
                >
                  <a id="category-btn-${category.id}" onclick="loadCategory(${category.id})" class="w-full text-left active-btn">${category.category_name}</a>
                </li>
              </ul>
        `;

    categoriesContainer.append(btnUl);
  });
};

const loadTreeCards = () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLoadTreeCards(json.plants));
};

// {
//     "id": 30,
//     "image": "https://i.ibb.co.com/0jLycYdv/Water-Hyacinth-min.jpg",
//     "name": "Water Hyacinth",
//     "description": "A floating plant with violet flowers that provide shade to aquatic creatures. Known for rapid growth in ponds.",
//     "category": "Aquatic Plant",
//     "price": 250
// }

// all tree btn functionality
const allTreesButton = () => {
  const url = `https://openapi.programming-hero.com/api/plants`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLoadTreeCards(json.plants));
};

loadCategories();
loadTreeCards();
