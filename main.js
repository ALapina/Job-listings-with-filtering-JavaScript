let selected = { roles: [], levels: [], languages: [], tools: [] };
let offers = [];
const main = document.querySelector("#main");
const filterPanel = document.querySelector("#filter-panel");

// ------------------------------------ Fetch data and Draw initial data ------------------------------------
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    offers = data;
    offers.forEach((offer) => {
      //Render list of companies
      createOffer(offer);
    });
  });

// ------------------------------------ Draw and redraw list of companies ------------------------------------
const createOffer = (offer) => {
  const company = offer.company;
  const logo = offer.logo;
  const isItNew = offer.new;
  const isItFeatured = offer.featured;
  const position = offer.position;
  const role = offer.role;
  const level = offer.level;
  const postedAt = offer.postedAt;
  const contract = offer.contract;
  const location = offer.location;
  const languages = offer.languages; //array
  const tools = offer.tools; //array

  const section = document.createElement("div");

  const languagesTemplate = languages.map((language) => {
    return `<li>
    <button data-js="language" class="font-bold bg-neutral-200 rounded-md hover:bg-primary hover:text-white mr-4 mb-4 p-2 text-primary">${language}</button>
    </li>`;
  });

  const toolsTemplate = tools.map((tool) => {
    return `<li>
    <button data-js="tool" class="font-bold bg-neutral-200 rounded-md hover:bg-primary hover:text-white mr-4 mb-4 p-2 text-primary">${tool}</button>
    </li>`;
  });

  const sectionTemplate = `<section 
  class="bg-white max-w-8xl w-11/12 shadow-block mb-14 sm:mb-10 mx-auto rounded-md flex flex-wrap md:flex-nowrap justify-between items-center border-l-8 ${isItFeatured ? "border-primary" : "border-white"}">
      <div class="flex flex-col sm:flex-row my-6">
        <div class="ml-6 flex-shrink-0 w-16 sm:w-auto -mt-14 mb-4 sm:mb-0 sm:mt-0">
          <img src="${logo}" alt="${company} logo" />
        </div>

        <div class="ml-6">
          <div class="flex flex-wrap items-center">
            <p class="text-primary mr-3">${company}</p>
            <ul class="flex text-white text-xs">
              <li class="bg-primary rounded-2xl ${isItNew ? "py-1" : "py-0"} ${isItNew ? "px-2" : "px-0"}">${isItNew ? "NEW!" : ""}</li>
              <li class="bg-neutral-400 rounded-2xl ${isItFeatured ? "py-1" : "py-0"} ${isItFeatured ? "px-2" : "px-0"} ml-3">${isItFeatured ? "FEATURED" : ""}</li>
            </ul>
          </div>
          <h2 class="text-lg my-2">
            <a class="hover:text-primary" href="#">${position}</a>
          </h2>
          <div>
            <ul class="flex flex-wrap items-center text-neutral-300 font-medium">
              <li>${postedAt}</li>
              <span class="h-1 w-1 rounded-full bg-neutral-300 mx-2"></span>
              <li>${contract}</li>
              <span class="h-1 w-1 rounded-full bg-neutral-300 mx-2"></span>
              <li>${location}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mx-6 md:mx-0md:mb-0 h-0.5 md:h-0 w-full md:w-0 bg-neutral-300 rounded-full"></div>

      <div class="mt-6 ml-6">
        <ul class="flex flex-wrap">
          <li>
            <button data-js="role" class="font-bold bg-neutral-200 rounded-md hover:bg-primary hover:text-white mr-4 mb-4 p-2 text-primary">
              ${role}
            </button>
          </li>
          <li>
            <button data-js="level" class="font-bold bg-neutral-200 rounded-md hover:bg-primary hover:text-white mr-4 mb-4 p-2 text-primary">
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

  // ------------------------------------ EventListeners on buttons ------------------------------------
  const roleButton = section.querySelector("[data-js=role]");
  roleButton.addEventListener("click", function () {
    addToSelected("roles", role);
  });

  const levelButton = section.querySelector("[data-js=level]");
  levelButton.addEventListener("click", function () {
    addToSelected("levels", level);
  });

  const languageButtons = Array.from(
    section.querySelectorAll("[data-js=language]")
  );
  languageButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      addToSelected("languages", event.target.innerHTML);
    });
  });

  const toolButtons = Array.from(section.querySelectorAll("[data-js=tool]"));
  toolButtons.forEach((button) =>
    button.addEventListener("click", function (event) {
      addToSelected("tools", event.target.innerHTML);
    })
  );
};

// ------------------------------------ Add role, level, language or tool to selected ------------------------------------
const addToSelected = (group, value) => {
  if (!selected[group].includes(value)) {
    selected[group].push(value);
  }

  redrawSelected();
  redrawOffers();
};

// ------------------------------------ Draw and redraw selected filter panel ------------------------------------
const redrawSelected = () => {
  //Cleanup - delete all elements from a page and redraw again
  filterPanel.innerHTML = "";

  const filter = document.createElement("div");
  const createFilterElements = () => {
    let element = "";
    for (const [key, value] of Object.entries(selected)) {
      value.map((el) => {
        element += `
        <li class="bg-neutral-200 rounded-md mr-4 mb-4">
          <span class="p-2 text-primary sm:p-3">${el}</span>
          <button data-js="delete-filter" aria-label="delete ${el} filter" data-filter-name="${el}" data-filter-group="${key}" class="p-3 bg-primary text-white rounded-r-md hover:bg-neutral-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
              <path
                fill="#FFF"
                fill-rule="evenodd"
                d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"
              />
            </svg>
          </button/>
        </li>`;
        return element;
      });
    }
    return element;
  };

  const filterTemplate = `<div class="flex justify-between bg-white rounded-md m-auto -mt-10 max-w-8xl w-11/12 shadow-block">
  <ul class="flex flex-wrap pt-6 pr-6 pl-6">${createFilterElements()}</ul>
  <button id="delete-all-filters" class="self-center font-bold text-neutral-300 mr-5 hover:text-primary hover:underline">
  Clear</button>
  </div>`;

  filter.innerHTML = filterTemplate;
  filterPanel.appendChild(filter);

  // ------------------------------------ Event listener on delete filter buttons ------------------------------------

  const deleteFilterButtons = Array.from(
    filter.querySelectorAll("[data-js=delete-filter]")
  );
  deleteFilterButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      // https://www.sitepoint.com/event-bubbling-javascript/
      const group = event.currentTarget.dataset.filterGroup;
      const value = event.currentTarget.dataset.filterName;
      removeFromSelected(group, value);
    });
  });

  // ------------------------------------ Clear all filters and remove filter panel ------------------------------------
  const deleteAllFiltersButton = filter.querySelector("#delete-all-filters");
  deleteAllFiltersButton.addEventListener("click", () => {
    selected = { roles: [], levels: [], languages: [], tools: [] };
    filterPanel.innerHTML = "";
    redrawOffers();
  });
};

// ------------------------------------ Remove element From Selected ------------------------------------
const removeFromSelected = (group, valueToDelete) => {
  if (selected[group].includes(valueToDelete)) {
    selected[group] = selected[group].filter(
      (element) => element !== valueToDelete
    );
    redrawSelected();
    redrawOffers();
  }

  // ------------------------------------ If selected is empty - delete filter panel ------------------------------------
  const allValues = Object.values(selected);
  if (allValues.every((currentValue) => currentValue.length === 0)) {
    //delete filter panel
    filterPanel.innerHTML = "";
  }
};

// ------------------------------------ Draw and redraw selected offers ------------------------------------
const redrawOffers = () => {
  //cleanup
  main.innerHTML = "";

  offers
    .filter((offer) => {
      const rolesNotEmpty = selected.roles.length !== 0;
      const itemRolesIsInSelected = selected.roles.includes(offer.role);

      const levelsNotEmpty = selected.levels.length !== 0;
      const offerLevelsIsInSelected = selected.levels.includes(offer.level);

      const languagesNotEmpty = selected.languages.length !== 0;
      const offerLanguagesIsInSelected = selected.languages.every(
        (currentValue) => offer.languages.includes(currentValue)
      );

      const toolsNotEmpty = selected.tools.length !== 0;
      const offerToolsIsInSelected = selected.tools.every((currentValue) =>
        offer.tools.includes(currentValue)
      );

      //return false if offer musn't be drawn
      if (rolesNotEmpty === true && itemRolesIsInSelected === false) {
        return false;
      }
      if (levelsNotEmpty === true && offerLevelsIsInSelected === false) {
        return false;
      }
      if (languagesNotEmpty === true && offerLanguagesIsInSelected === false) {
        return false;
      }
      if (toolsNotEmpty === true && offerToolsIsInSelected === false) {
        return false;
      }

      return true;
    })
    .forEach((offer) => {
      createOffer(offer);
    });
};
