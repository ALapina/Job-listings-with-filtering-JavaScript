const selected = { roles: [], levels: [], languages: [], tools: [] };
const main = document.querySelector("#main");
const filterPanel = document.querySelector("#filter-panel");

// ------------------------------------ STEP 1. Fetch data and Draw initial data ------------------------------------
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    data.forEach((element) => {
      // console.log(element);
      //draw initial data
      createOffer(element);
    });
  });

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

  redrawSelected(group);
};

// ------------------------------------ STEP 5. Draw and redraw selected filter panel ------------------------------------
const redrawSelected = (group) => {
  // console.log(filterPanel);
  // console.log(group);
  // console.log(selected[group]);

  //Cleanup Нужен что бы не добавлять один и тот же элемент несколько раз например фронтенд
  filterPanel.innerHTML = "";

  for (const [key, value] of Object.entries(selected)) {
    console.log(`${key}: ${value}`);

    const filter = document.createElement("div");

    const filterTemplate2 = `<p>${value}</p>`;

    const filterTemplate = `<div
  class="flex justify-between bg-white rounded-md m-auto -mt-10"
  style="
    max-width: 1440px;
    width: 90%;
    box-shadow: 0px 15px 20px -5px rgba(13, 113, 130, 0.15);
  "
>
  <ul class="flex flex-wrap pt-6 pr-6 pl-6">

    <li class="bg-neutral-200 rounded-md mr-4 mb-4">
      <span class="p-2 text-primary sm:p-3">${
        value.length !== 0 ? value : ""
      }</span
      ><button
        aria-label="delete frontend filter"
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
    </li>
  </ul>
  <button
    class="font-bold text-neutral-300 pr-5 hover:text-primary hover:underline"
  >
    Clear
  </button>
</div>`;

    filter.innerHTML = filterTemplate;

    filterPanel.appendChild(filter);
  }

  const filterTemplate3 = `<div
  class="flex justify-between bg-white rounded-md m-auto -mt-10"
  style="
    max-width: 1440px;
    width: 90%;
    box-shadow: 0px 15px 20px -5px rgba(13, 113, 130, 0.15);
  "
>
  <ul class="flex flex-wrap pt-6 pr-6 pl-6">

    <li class="bg-neutral-200 rounded-md mr-4 mb-4">
      <span class="p-2 text-primary sm:p-3">${value}</span
      ><button
        aria-label="delete frontend filter"
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
    </li>
  </ul>
  <button
    class="font-bold text-neutral-300 pr-5 hover:text-primary hover:underline"
  >
    Clear
  </button>
</div>`;

  // const rolesSelected = selected["roles"].map(
  //   (el) => `<span class="p-2 text-primary sm:p-3">${el}</span
  // >`
  // );

  // const isThereRole = () => {
  //   if(selected["roles"].length===0)
  // };
};

// console.log(selected);

// let offers = [];

// fetch("./data.json")
//   .then((response) => response.json())
//   .then((data) => {
//     offers = data;
//   });

// console.log(offers);
