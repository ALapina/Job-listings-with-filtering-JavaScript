let selected = { roles: [], levels: [], languages: [], tools: [] };
//дату сохраняем в офферс что бы можно было использовать в redrawOffers
let offers = [];
const main = document.querySelector("#main");
const filterPanel = document.querySelector("#filter-panel");

// ------------------------------------ STEP 1. Fetch data and Draw initial data ------------------------------------
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    offers = data;
    offers.forEach((element) => {
      // console.log(element);
      //draw initial data
      createOffer(element);
    });
  });

//TODO!!!! Везде поменять id на data-js!!

// ------------------------------------ STEP 2. Render list of companys ------------------------------------
const createOffer = (element) => {
  // renderOffer(element);
  // console.log(element);
  const company = element.company;
  const logo = element.logo;
  const isItNew = element.new;
  const isItFeatured = element.featured;
  const position = element.position;
  const role = element.role;
  const level = element.level;
  const postedAt = element.postedAt;
  const contract = element.contract;
  const location = element.location;
  const languages = element.languages; //array
  const tools = element.tools; //array

  // Пришлось создавать дополнительный див и в него добавлять секцию
  const section = document.createElement("div");

  const languagesTemplate = languages.map((language) => {
    const template = `<li><button id="language" class="font-bold bg-neutral-200 rounded-md hover:bg-primary hover:text-white mr-4 mb-4 p-2 text-primary">${language}</button></li>`;
    return template;
  });

  const toolsTemplate = tools.map((tool) => {
    const template = `<li><button id="tool" class="font-bold bg-neutral-200 rounded-md hover:bg-primary hover:text-white mr-4 mb-4 p-2 text-primary">${tool}</button></li>`;
    return template;
  });
  //Рендерим
  //toolsTemplate.join("") - что бы убрать запятые между элементами в массиве
  const sectionTemplate = `<section
      class="bg-white mb-14 sm:mb-10 mx-auto rounded-md flex flex-wrap md:flex-nowrap justify-between items-center border-l-8 border-${
        isItFeatured ? "primary" : "white"
      }"
      style="
        max-width: 1440px;
        width: 90%;
        box-shadow: 0px 15px 20px -5px rgba(13, 113, 130, 0.15);
      "
    >
      <div class="flex flex-col sm:flex-row my-6">
        <div
          class="ml-6 flex-shrink-0 w-16 sm:w-auto -mt-14 mb-4 sm:mb-0 sm:mt-0"
        >
          <img src="${logo}" alt="${company} logo" />
        </div>

        <div class="ml-6">
          <div class="flex flex-wrap items-center">
            <p class="text-primary mr-3">${company}</p>
            <ul class="flex text-white text-xs">
              <li class="bg-primary rounded-2xl py-${isItNew ? "1" : "0"} px-${
    isItNew ? "2" : "0"
  }">${isItNew ? "NEW!" : ""}</li>
              <li class="bg-neutral-400 rounded-2xl py-${
                isItFeatured ? "1" : "0"
              } px-${isItFeatured ? "2" : "0"} ml-3">${
    isItFeatured ? "FEATURED" : ""
  }</li>
            </ul>
          </div>
          <h2 class="text-lg my-2">
            <a class="hover:text-primary" href="#"
              >${position}</a
            >
          </h2>
          <div>
            <ul
              class="flex flex-wrap items-center text-neutral-300 font-medium"
            >
              <li>${postedAt}</li>
              <span
                class="rounded-full bg-neutral-300 mx-2"
                style="width: 5px; height: 5px"
              ></span>
              <li>${contract}</li>
              <span class="h-1 w-1 rounded-full bg-neutral-300 mx-2"></span>
              <li>${location}</li>
            </ul>
          </div>
        </div>
      </div>

      <div
        class="mx-6 md:mx-0md:mb-0 h-0.5 md:h-0 w-full md:w-0 bg-neutral-300 rounded-full"
      ></div>

      <div class="mt-6 ml-6">
        <ul class="flex flex-wrap">
          <li>
            <button id="role"
              class="font-bold bg-neutral-200 rounded-md hover:bg-primary hover:text-white mr-4 mb-4 p-2 text-primary"
            >
              ${role}
            </button>
          </li>
          <li>
            <button id="level"
              class="font-bold bg-neutral-200 rounded-md hover:bg-primary hover:text-white mr-4 mb-4 p-2 text-primary"
            >
              ${level}
            </button>
          </li>
          
          ${languagesTemplate.join("")}

          ${toolsTemplate.join("")}

        </ul>
      </div>
    </section>`;
  section.innerHTML = sectionTemplate;
  main.appendChild(section);

  // ------------------------------------ STEP 3. EventListeners on buttons ------------------------------------
  const roleButton = section.querySelector("#role");
  roleButton.addEventListener("click", function () {
    addToSelected("roles", role);
    console.log(selected);
  });

  const levelButton = section.querySelector("#level");
  levelButton.addEventListener("click", function () {
    addToSelected("levels", level);
    console.log(selected);
  });

  const languageButton = Array.from(section.querySelectorAll("#language"));
  languageButton.forEach((button) => {
    button.addEventListener("click", function (event) {
      // console.log(event);
      // console.log(event.target.innerHTML); //Достаем текст
      addToSelected("languages", event.target.innerHTML);
      console.log(selected);
    });
  });

  const toolButton = Array.from(section.querySelectorAll("#tool"));
  toolButton.forEach((button) =>
    button.addEventListener("click", function (event) {
      // console.log(event);
      addToSelected("tools", event.target.innerHTML);
      console.log(selected);
    })
  );
};

// ------------------------------------ STEP 4. Add role, level, language or tool to selected ------------------------------------
const addToSelected = (group, value) => {
  if (!selected[group].includes(value)) {
    selected[group].push(value);
  }

  redrawSelected();
  // redrawOffers();
};

// ------------------------------------ STEP 5. Draw and redraw selected filter panel ------------------------------------
const redrawSelected = () => {
  //Cleanup Нужен что бы не добавлять один и тот же элемент несколько раз например фронтенд
  filterPanel.innerHTML = "";

  const filter = document.createElement("div");
  const createFilterElements = () => {
    let element = "";
    for (const [key, value] of Object.entries(selected)) {
      // console.log(selected);
      // console.log(`${key}: ${value}`);
      value.map((el) => {
        // console.log(el);
        element += `<li class="bg-neutral-200 rounded-md mr-4 mb-4">
      <span class="p-2 text-primary sm:p-3">${el}</span
      ><button data-js="delete-filter"
        aria-label="delete ${el} filter" data-filter-name="${el}" data-filter-group="${key}"
        class="p-3 bg-primary text-white rounded-r-md hover:bg-neutral-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
          <path
            fill="#FFF"
            fill-rule="evenodd"
            d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"
          />
        </svg>
      </button>
    </li>`;
        return element;
      });
    }
    return element;
  };

  const filterTemplate = `<div
class="flex justify-between bg-white rounded-md m-auto -mt-10"
style="
  max-width: 1440px;
  width: 90%;
  box-shadow: 0px 15px 20px -5px rgba(13, 113, 130, 0.15);
"
>
<ul class="flex flex-wrap pt-6 pr-6 pl-6">${createFilterElements()}</ul>
<button id="delete-all-filters"
  class="self-center font-bold text-neutral-300 mr-5 hover:text-primary hover:underline"
>
  Clear
</button>
</div>`;

  filter.innerHTML = filterTemplate;
  filterPanel.appendChild(filter);

  // ------------------------------------ STEP 6. Event listener on delete filter buttons

  const deleteFilterButtons = Array.from(
    filter.querySelectorAll("[data-js=delete-filter]")
  );
  // console.log(deleteFilterButtons);
  deleteFilterButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      // console.log(event.target.dataset.filterName);
      //ОБЯЗАТЕЛЬНО! используем currentTarget! Из за event propagation!
      //У нас внутри кнопки находится ещё один элемент - svg. И если использовать target то эвент листенер будет действовать только на button и не будет действовать на svg!
      // А currentTarget распространяет действие эвентлистенера и на элементы внутри кнопки то есть на svg!
      //Ещё можно использовать e.stopPropagation();
      // https://www.sitepoint.com/event-bubbling-javascript/
      // console.log(event.currentTarget);
      removeFromSelected(
        event.currentTarget.dataset.filterGroup,
        event.currentTarget.dataset.filterName
      );
    });
  });

  // ------------------------------------ STEP 7. Clear all filters ------------------------------------
  const deleteAllFiltersButton = filter.querySelector("#delete-all-filters");
  // console.log(deleteAllFiltersButton);
  deleteAllFiltersButton.addEventListener("click", () => {
    selected = { roles: [], levels: [], languages: [], tools: [] };
    filterPanel.innerHTML = "";

    console.log(selected);
  });
};

// ------------------------------------ STEP 8.remove element From Selected ------------------------------------
const removeFromSelected = (group, valueToDelete) => {
  // console.log(group);
  // console.log(valueToDelete);

  //по кнопке делет удаляем данный элемент из селектед
  if (selected[group].includes(valueToDelete)) {
    selected[group] = selected[group].filter(
      (element) => element !== valueToDelete
    );
    redrawSelected();
  }
  // ------------------------------------ STEP 9. If selected is empty - delete filter panel ------------------------------------
  //Если селект пуст - удаляем всю панель фильтр
  const allValues = Object.values(selected);
  if (allValues.every((currentValue) => currentValue.length === 0)) {
    //delete filter panel
    filterPanel.innerHTML = "";
  }

  console.log(selected);
};

//

// ------------------------------------ STEP . Check if offer need to be drawn ------------------------------------
//определяем должен ли офер рендерится
const isOfferSelected = (offer) => {
  // console.log(offer.role);
  //object.entries может быть и в переменной group and value

  //есть ли в селектед элемент из офера например фронтенд и возвращаем тру
  // а ещё нужно возвращать тру когда в селектед длина равна 0 что бы перерисовывать когда селектед пустой
  //selected["roles"].length === 0
  if (selected["roles"].includes(offer.role)) {
    return true;
  }
  if (selected["levels"].includes(offer.level)) {
    return true;
  }

  //БАГ!!! ПВыбираем серьор и фронтенд - отображаются все фронтенды фильтр серьор не берется в значение
  //МБ ФИЛЬТР ЗДЕСЬ???
};

// ------------------------------------ STEP . Draw and redraw selected offers ------------------------------------
const redrawOffers = () => {
  //cleanup
  main.innerHTML = "";
  offers.forEach((offer) => {
    //получается проходим по каждому оферу, и если этот офер в isOfferSelected возвращает true тогда перерисовывем оффер
    if (isOfferSelected(offer)) {
      createOffer(offer);
    }
  });
};
