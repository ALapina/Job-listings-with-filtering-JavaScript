const selected = { roles: [], levels: [], languages: [], tools: [] };
const main = document.querySelector("#main");

const renderOffer = (element) => {
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
    const template = `<li><button class="font-bold bg-neutral-200 rounded-md hover:bg-primary hover:text-white mr-4 mb-4 p-2 text-primary">${language}</button></li>`;
    return template;
  });

  const toolsTemplate = tools.map((tool) => {
    const template = `<li><button class="font-bold bg-neutral-200 rounded-md hover:bg-primary hover:text-white mr-4 mb-4 p-2 text-primary">${tool}</button></li>`;
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
            <button
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
};

// const allRoles = Array.from(document.querySelectorAll("#role"));

// console.log(allRoles);

//step 1. Fetch data and Draw initial data
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

//Step2. Render list of companys
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

  //EventListeners on buttons
  const roleButton = section.querySelector("#role");
  roleButton.addEventListener("click", function (event) {
    console.log(event);
  });

  const levelButton = section.querySelector("#level");
  levelButton.addEventListener("click", function (event) {
    console.log(event);
  });

  const languageButton = Array.from(section.querySelectorAll("#language"));
  languageButton.forEach((button) =>
    button.addEventListener("click", function (event) {
      console.log(event);
    })
  );

  const toolButton = Array.from(section.querySelectorAll("#tool"));
  toolButton.forEach((button) =>
    button.addEventListener("click", function (event) {
      console.log(event);
    })
  );
};
