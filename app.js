/* =====================================================
   ТОЧКА ПЕРЕХОДА
   APP.JS

   ТЕСТ:
   Автопилот / Толчок / Пробуждение / Творец

   ЛИЧНЫЙ ПУТЬ:
   7 этапов

   ДОСТУП:
   access_awakening
   access_creator

   ВАЖНО:
   Результат теста НЕ сбрасывает покупку.
   Покупка и прогресс хранятся отдельно.
===================================================== */


/* =====================================================
   TELEGRAM
===================================================== */

const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}


/* =====================================================
   SUPABASE
===================================================== */

const SUPABASE_URL =
  'https://vxhoavgkiratylcfeqnz.supabase.co';

const SUPABASE_KEY =
  'sb_publishable_s_PuUbLuT_aerFgVmywXDw_fVcZWjNv';

const db =
  window.supabase?.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


/* =====================================================
   TRIBUTE
===================================================== */

const LINKS = {

  awakening:
    'https://web.tribute.tg/p/EBu',

  creator:
    'https://web.tribute.tg/p/FKI',

  consultation:
    'https://web.tribute.tg/p/tiX',

  accompaniment:
    'https://web.tribute.tg/p/EBv'

};


/* =====================================================
   7 ЭТАПОВ
===================================================== */

const stages = [

  {
    number: 1,
    title: 'Кто я?',
    text:
      'Посмотри на себя честно: кто ты сейчас, что в тебе настоящее, а что живёт по привычке?',
    practice:
      'Запиши три ответа на вопрос: «Кто я, если убрать мои роли, обязанности и ожидания других?»'
  },

  {
    number: 2,
    title: 'Чистка поля',
    text:
      'Увидь всё, что больше не должно занимать место в твоей жизни: старые правила, страхи и чужие сценарии.',
    practice:
      'Запиши всё, что ты больше не хочешь нести дальше.'
  },

  {
    number: 3,
    title: 'Я выбираю себя',
    text:
      'Переход начинается там, где ты начинаешь слышать собственный выбор.',
    practice:
      'Ответь: «Чего хочу именно я?» — без «надо» и «так принято».'
  },

  {
    number: 4,
    title: 'Моё «нет»',
    text:
      'Новому невозможно появиться, если всё пространство занято старым.',
    practice:
      'Назови три вещи, которым ты больше не готова говорить «да».'
  },

  {
    number: 5,
    title: 'Наблюдатель',
    text:
      'Учись замечать мысли, реакции и сценарии, не становясь ими автоматически.',
    practice:
      'Замечая реакцию, спроси себя: «Это мой выбор или привычный сценарий?»'
  },

  {
    number: 6,
    title: 'Моя жизнь',
    text:
      'Теперь важно собрать жизнь вокруг того, что действительно твоё.',
    practice:
      'Выбери одну сферу жизни и один конкретный шаг, который изменит её.'
  },

  {
    number: 7,
    title: 'Мой новый фундамент',
    text:
      'Новые опоры создаются решениями, действиями и ответственностью.',
    practice:
      'Запиши пять принципов, на которых ты хочешь строить следующий этап жизни.'
  }

];


/* =====================================================
   ВОПРОСЫ ТЕСТА
===================================================== */

const questions = [

  {
    text:
      'Я понимаю, что прежний образ жизни больше меня не устраивает.',
    answers: [
      'Это почти не про меня',
      'Иногда ловлю себя на этой мысли',
      'Это уже стало очевидно',
      'Я давно это чувствую',
      'Я полностью готова к новому этапу'
    ]
  },

  {
    text:
      'Когда жизнь резко меняется, я обычно…',
    answers: [
      'Продолжаю жить как раньше',
      'Чувствую внутреннее сопротивление',
      'Начинаю искать ответы',
      'Беру ответственность за выбор',
      'Создаю новый сценарий'
    ]
  },

  {
    text:
      'Что сейчас происходит с моими привычными целями?',
    answers: [
      'Меня всё устраивает',
      'Некоторые цели перестали радовать',
      'Я пересматриваю приоритеты',
      'Я выбираю свои цели осознанно',
      'Я создаю цели из нового состояния'
    ]
  },

  {
    text:
      'Насколько я слышу собственные желания?',
    answers: [
      'Почти не слышу',
      'Иногда слышу, но сомневаюсь',
      'Начинаю различать своё и чужое',
      'Доверяю себе больше',
      'Опираюсь на себя в решениях'
    ]
  },

  {
    text:
      'Если старый сценарий больше не работает, я…',
    answers: [
      'Держусь за него',
      'Не знаю, что делать',
      'Начинаю отпускать',
      'Создаю новые правила',
      'Осознанно создаю новую реальность'
    ]
  },

  {
    text:
      'Мои кризисы чаще всего…',
    answers: [
      'Кажутся случайными',
      'Вынуждают меня остановиться',
      'Показывают, что пора меняться',
      'Становятся точками роста',
      'Становятся материалом для нового выбора'
    ]
  },

  {
    text:
      'Я отношусь к неизвестности как к…',
    answers: [
      'Угрозе',
      'Сильному дискомфорту',
      'Пространству поиска',
      'Возможности',
      'Пространству создания'
    ]
  },

  {
    text:
      'Что важнее всего в моих решениях?',
    answers: [
      'Стабильность',
      'Не разочаровать других',
      'Понять, чего хочу я',
      'Взять ответственность за себя',
      'Создать жизнь, которая соответствует мне'
    ]
  },

  {
    text:
      'Я чувствую, что стою перед новым этапом жизни.',
    answers: [
      'Нет',
      'Скорее нет',
      'Да, но не понимаю каким он будет',
      'Да, я уже меняю многое',
      'Да, я сознательно создаю следующий этап'
    ]
  },

  {
    text:
      'Что мне сейчас нужнее всего?',
    answers: [
      'Остановиться и выжить',
      'Понять, что происходит',
      'Увидеть себя честно',
      'Перестать жить по старым правилам',
      'Сделать первый шаг в новую жизнь'
    ]
  }

];


let answers = [];


/* =====================================================
   TELEGRAM ID
===================================================== */

function getTelegramId() {

  const user =
    tg?.initDataUnsafe?.user;

  if (!user?.id) {
    return null;
  }

  return String(user.id);

}


/* =====================================================
   LOCAL STORAGE
===================================================== */

function localKey() {

  const id =
    getTelegramId();

  return id
    ? 'tochka_perehoda_' + id
    : 'tochka_perehoda_guest';

}


function saveLocalUser(user) {

  try {

    localStorage.setItem(
      localKey(),
      JSON.stringify({

        telegram_id:
          user?.telegram_id || getTelegramId(),

        stage:
          user?.stage || 'Не определён',

        progress:
          Number(user?.progress || 0),

        current_lesson:
          Number(user?.current_lesson || 0),

        access_awakening:
          Boolean(user?.access_awakening),

        access_creator:
          Boolean(user?.access_creator)

      })
    );

  } catch (error) {

    console.error(
      'Ошибка localStorage:',
      error
    );

  }

}


function loadLocalUser() {

  try {

    const raw =
      localStorage.getItem(
        localKey()
      );

    if (!raw) {
      return null;
    }

    return JSON.parse(raw);

  } catch {

    return null;

  }

}


/* =====================================================
   СОЗДАНИЕ ПОЛЬЗОВАТЕЛЯ
===================================================== */

async function ensureUser() {

  const telegramId =
    getTelegramId();

  if (!telegramId) {
    return null;
  }


  const local =
    loadLocalUser();


  if (!db) {

    return local;

  }


  const {
    data,
    error
  } = await db
    .from('users')
    .select('*')
    .eq(
      'telegram_id',
      telegramId
    )
    .maybeSingle();


  if (error) {

    console.error(
      'Ошибка загрузки пользователя:',
      error
    );

    return local;

  }


  if (data) {

    saveLocalUser(data);

    return data;

  }


  const newUser = {

    telegram_id:
      telegramId,

    stage:
      local?.stage ||
      'Не определён',

    progress:
      Number(
        local?.progress || 0
      ),

    current_lesson:
      Number(
        local?.current_lesson || 0
      ),

    access_awakening:
      Boolean(
        local?.access_awakening
      ),

    access_creator:
      Boolean(
        local?.access_creator
      )

  };


  const {
    data: created,
    error: createError
  } = await db
    .from('users')
    .insert(newUser)
    .select()
    .single();


  if (createError) {

    console.error(
      'Ошибка создания пользователя:',
      createError
    );

    saveLocalUser(newUser);

    return newUser;

  }


  saveLocalUser(created);

  return created;

}


/* =====================================================
   ЗАГРУЗКА ПОЛЬЗОВАТЕЛЯ
===================================================== */

async function loadUser() {

  const telegramId =
    getTelegramId();

  if (!telegramId) {
    return null;
  }


  if (!db) {

    return loadLocalUser();

  }


  const {
    data,
    error
  } = await db
    .from('users')
    .select('*')
    .eq(
      'telegram_id',
      telegramId
    )
    .maybeSingle();


  if (error) {

    console.error(
      'Ошибка загрузки пользователя:',
      error
    );

    return loadLocalUser();

  }


  if (data) {

    saveLocalUser(data);

    return data;

  }


  return loadLocalUser();

}


/* =====================================================
   СОХРАНЕНИЕ ПРОГРЕССА
===================================================== */

async function saveProgress(
  progress,
  currentLesson = null,
  stage = null
) {

  const telegramId =
    getTelegramId();

  if (!telegramId) {
    return false;
  }


  const current =
    await loadUser();


  const finalProgress =
    Number(
      progress ??
      current?.progress ??
      0
    );


  const finalLesson =
    currentLesson !== null
      ? Number(currentLesson)
      : Number(
          current?.current_lesson || 0
        );


  const finalStage =
    stage !== null
      ? stage
      : (
          current?.stage ||
          'Не определён'
        );


  /*
    ВАЖНО:
    Сохраняем доступы из текущего пользователя.
    Они никогда не сбрасываются сохранением прогресса.
  */

  const localUser = {

    ...(current || {}),

    telegram_id:
      telegramId,

    progress:
      finalProgress,

    current_lesson:
      finalLesson,

    stage:
      finalStage

  };


  saveLocalUser(localUser);


  if (!db) {
    return true;
  }


  const update = {

    progress:
      finalProgress,

    current_lesson:
      finalLesson,

    stage:
      finalStage,

    updated_at:
      new Date().toISOString()

  };


  const {
    error
  } = await db
    .from('users')
    .update(update)
    .eq(
      'telegram_id',
      telegramId
    );


  if (error) {

    console.error(
      'Ошибка сохранения:',
      error
    );

  }


  return true;

}


/* =====================================================
   СОХРАНЕНИЕ РЕЗУЛЬТАТА ТЕСТА

   ВАЖНО:
   Эта функция меняет ТОЛЬКО stage.
   Она НЕ меняет:
   access_awakening
   access_creator
   progress
   current_lesson
===================================================== */

async function saveTestResult(stage) {

  const telegramId =
    getTelegramId();

  if (!telegramId) {
    return false;
  }


  const current =
    await loadUser();


  if (!current) {
    return false;
  }


  saveLocalUser({

    ...current,

    stage

  });


  if (!db) {
    return true;
  }


  const {
    error
  } = await db
    .from('users')
    .update({

      stage,

      updated_at:
        new Date().toISOString()

    })
    .eq(
      'telegram_id',
      telegramId
    );


  if (error) {

    console.error(
      'Ошибка сохранения результата теста:',
      error
    );

  }


  return true;

}


/* =====================================================
   НАВИГАЦИЯ
===================================================== */

function showScreen(name) {

  document
    .querySelectorAll('.screen')
    .forEach(screen => {

      screen.classList.remove(
        'active'
      );

    });


  const screen =
    document.getElementById(
      'screen-' + name
    );


  if (screen) {

    screen.classList.add(
      'active'
    );

  }


  window.scrollTo(
    0,
    0
  );


  if (name === 'test') {

    renderTest();

  }

}


/* =====================================================
   TRIBUTE
===================================================== */

function openTribute(url) {

  if (
    tg &&
    typeof tg.openLink === 'function'
  ) {

    tg.openLink(url);

  } else {

    window.open(
      url,
      '_blank'
    );

  }

}


function openConsultation() {

  openTribute(
    LINKS.consultation
  );

}


function openAccompaniment() {

  openTribute(
    LINKS.accompaniment
  );

}


/* =====================================================
   ОПРЕДЕЛЕНИЕ ДОСТУПА
===================================================== */

async function getUserAccess() {

  const user =
    await loadUser();

  if (!user) {

    return {

      awakening: false,
      creator: false

    };

  }


  return {

    awakening:
      Boolean(
        user.access_awakening
      ),

    creator:
      Boolean(
        user.access_creator
      )

  };

}


/* =====================================================
   ОТКРЫТИЕ ПРОДУКТА

   Если продукт уже куплен —
   НЕ отправляем снова на оплату.
===================================================== */

async function openProduct(type) {

  const access =
    await getUserAccess();


  if (
    type === 'awakening'
  ) {

    if (access.awakening) {

      openCabinet();

      return;

    }


    openTribute(
      LINKS.awakening
    );

    return;

  }


  if (
    type === 'creator'
  ) {

    if (access.creator) {

      openCabinet();

      return;

    }


    /*
      Творец можно купить только
      если у человека уже есть
      Пробуждение.
    */

    if (!access.awakening) {

      openTribute(
        LINKS.awakening
      );

      return;

    }


    openTribute(
      LINKS.creator
    );

  }

}


/* =====================================================
   ТЕСТ
===================================================== */

function renderTest() {

  const wrap =
    document.getElementById(
      'test-wrap'
    );

  if (!wrap) {
    return;
  }


  if (
    answers.length >=
    questions.length
  ) {

    renderResult();

    return;

  }


  const number =
    answers.length;

  const question =
    questions[number];


  wrap.innerHTML = `

    <div class="progress">
      ВОПРОС ${number + 1}
      ИЗ ${questions.length}
    </div>

    <div class="question">

      <h3>
        ${question.text}
      </h3>

      <div class="answers">

        ${question.answers
          .map(
            (answer, index) => `

              <button
                class="answer"
                onclick="chooseAnswer(${index})"
              >
                ${String.fromCharCode(65 + index)}.
                ${answer}
              </button>

            `
          )
          .join('')}

      </div>

    </div>

  `;

}


/* =====================================================
   ОТВЕТ
===================================================== */

function chooseAnswer(index) {

  answers.push(index);

  renderTest();

}


/* =====================================================
   РЕЗУЛЬТАТ
===================================================== */

function calculateStage() {

  const scores = [
    0,
    0,
    0,
    0,
    0
  ];


  answers.forEach(answer => {

    if (
      answer >= 0 &&
      answer <= 4
    ) {

      scores[answer]++;

    }

  });


  const max =
    Math.max(...scores);


  const index =
    scores.indexOf(max);


  if (index === 0) {
    return 'Автопилот';
  }


  if (index === 1) {
    return 'Толчок';
  }


  if (index === 2) {
    return 'Пробуждение';
  }


  return 'Творец';

}


/* =====================================================
   РЕЗУЛЬТАТ ТЕСТА
===================================================== */

async function renderResult() {

  const stage =
    calculateStage();


  const user =
    await loadUser();


  /*
    Сохраняем только результат теста.
    Покупки и прогресс НЕ ТРОГАЕМ.
  */

  await saveTestResult(
    stage
  );


  const access =
    await getUserAccess();


  const wrap =
    document.getElementById(
      'test-wrap'
    );


  if (!wrap) {
    return;
  }


  let title = '';
  let text = '';
  let action = '';


  /* ---------------------------------
     АВТОПИЛОТ
  --------------------------------- */

  if (
    stage === 'Автопилот'
  ) {

    title =
      'ТЫ ЖИВЁШЬ НА АВТОПИЛОТЕ';


    text = `

      <p>
        Внешне всё может выглядеть нормально.
        Ты работаешь, решаешь вопросы,
        заботишься о других.
      </p>

      <p>
        Но внутри всё чаще появляется ощущение,
        что прежний сценарий больше не подходит.
      </p>

      <p>
        Это точка, в которой можно
        начать выбирать себя.
      </p>

    `;


    action =
      access.awakening
        ? `
          <button
            class="primary"
            onclick="openCabinet()"
          >
            ОТКРЫТЬ МОЙ ПУТЬ
          </button>
        `
        : `
          <button
            class="primary"
            onclick="openProduct('awakening')"
          >
            НАЧАТЬ ПЕРЕХОД
          </button>
        `;

  }


  /* ---------------------------------
     ТОЛЧОК
  --------------------------------- */

  if (
    stage === 'Толчок'
  ) {

    title =
      'ТЫ В ТОЧКЕ ТОЛЧКА';


    text = `

      <p>
        В твоей жизни уже произошло то,
        что заставило остановиться.
      </p>

      <p>
        Что-то изменилось,
        разрушилось или перестало работать
        так, как раньше.
      </p>

      <p>
        Теперь важно не вернуть прошлое,
        а увидеть, куда двигаться дальше.
      </p>

    `;


    action =
      access.awakening
        ? `
          <button
            class="primary"
            onclick="openCabinet()"
          >
            ОТКРЫТЬ МОЙ ПУТЬ
          </button>
        `
        : `
          <button
            class="primary"
            onclick="openProduct('awakening')"
          >
            ПЕРЕЙТИ В ПРОБУЖДЕНИЕ
          </button>
        `;

  }


  /* ---------------------------------
     ПРОБУЖДЕНИЕ
  --------------------------------- */

  if (
    stage === 'Пробуждение'
  ) {

    title =
      'ТЫ В ПРОБУЖДЕНИИ';


    text = `

      <p>
        Ты уже начинаешь видеть себя
        и свою жизнь по-другому.
      </p>

      <p>
        Появляются вопросы,
        на которые раньше ты могла
        даже не смотреть.
      </p>

      <p>
        Следующий шаг —
        перестать только искать ответы
        и начать создавать.
      </p>

    `;


    if (access.creator) {

      action = `

        <button
          class="primary"
          onclick="openCabinet()"
        >
          ОТКРЫТЬ МОЙ ПУТЬ
        </button>

      `;

    } else {

      action = `

        <button
          class="primary"
          onclick="openProduct('creator')"
        >
          ПЕРЕЙТИ В ТВОРЦА
        </button>

      `;

    }

  }


  /* ---------------------------------
     ТВОРЕЦ
  --------------------------------- */

  if (
    stage === 'Творец'
  ) {

    title =
      'ТЫ — ТВОРЕЦ';


    text = `

      <p>
        Ты уже находишься в состоянии,
        где можно не ждать,
        а создавать.
      </p>

      <p>
        Твоя задача —
        продолжать реализовывать
        то, что ты уже увидела в себе.
      </p>

    `;


    action = `

      <button
        class="primary"
        onclick="openCabinet()"
      >
        ОТКРЫТЬ МОЙ ПУТЬ
      </button>

    `;

  }


  wrap.innerHTML = `

    <div class="result">

      <div class="tag">
        ТВОЙ РЕЗУЛЬТАТ
      </div>

      <h2>
        ${stage}
      </h2>

      <h3>
        ${title}
      </h3>

      ${text}

      ${action}

    </div>

    <button
      class="back"
      style="margin-top:20px"
      onclick="resetTest()"
    >
      Пройти тест заново
    </button>

  `;

}


/* =====================================================
   МОЙ ПУТЬ
===================================================== */

async function openCabinet() {

  showScreen(
    'cabinet'
  );


  const stageElement =
    document.getElementById(
      'cabinet-stage'
    );


  const progressElement =
    document.getElementById(
      'cabinet-progress'
    );


  const progressText =
    document.getElementById(
      'cabinet-progress-text'
    );


  const message =
    document.getElementById(
      'cabinet-message'
    );


  if (!stageElement) {
    return;
  }


  stageElement.textContent =
    'Загрузка...';


  progressElement.style.width =
    '0%';


  progressText.textContent =
    'Загрузка...';


  const user =
    await loadUser();


  if (!user) {

    stageElement.textContent =
      'Личный путь';


    progressText.textContent =
      'Открой приложение через Telegram';


    message.innerHTML = `

      <h3>
        TELEGRAM ID НЕ НАЙДЕН
      </h3>

      <p>
        Открой приложение именно через Telegram.
      </p>

    `;


    renderStageList(
      0,
      false,
      false
    );


    return;

  }


  const stage =
    user.stage ||
    'Не определён';


  const progress =
    Number(
      user.progress || 0
    );


  const accessAwakening =
    Boolean(
      user.access_awakening
    );


  const accessCreator =
    Boolean(
      user.access_creator
    );


  stageElement.textContent =
    stage;


  progressElement.style.width =
    Math.max(
      0,
      Math.min(
        100,
        progress
      )
    ) + '%';


  progressText.textContent =
    `${progress}% пройдено`;


  /* ---------------------------------
     НЕТ ДОСТУПА
  --------------------------------- */

  if (
    !accessAwakening &&
    !accessCreator
  ) {

    message.innerHTML = `

      <h3>
        СНАЧАЛА ПРОЙДИ ТЕСТ
      </h3>

      <p>
        Пройди бесплатный тест,
        чтобы узнать свой текущий этап.
      </p>

      <button
        class="primary"
        onclick="showScreen('test')"
      >
        ПРОЙТИ ТЕСТ
      </button>

    `;


    renderStageList(
      0,
      false,
      false
    );


    return;

  }


  /* ---------------------------------
     ЕСТЬ ДОСТУП
  --------------------------------- */

  message.innerHTML = `

    <h3>
      ТВОЙ ПУТЬ ОТКРЫТ
    </h3>

    <p>
      Твой текущий результат:
      <strong>${stage}</strong>
    </p>

    <p>
      Проходи этапы последовательно.
      Прогресс сохраняется автоматически.
    </p>

  `;


  renderStageList(
    progress,
    accessAwakening,
    accessCreator
  );

}


/* =====================================================
   7 ЭТАПОВ

   Все 7 видны сразу.

   Но открываются последовательно.
===================================================== */

function renderStageList(
  progress,
  accessAwakening,
  accessCreator
) {

  const element =
    document.getElementById(
      'stage-list'
    );


  if (!element) {
    return;
  }


  /*
    Если доступа нет —
    показываем 7 этапов,
    но они заблокированы.
  */

  element.innerHTML =
    stages
      .map(stage => {

        const required =
          Math.round(
            (
              (stage.number - 1)
              /
              stages.length
            ) * 100
          );


        const complete =
          Math.round(
            (
              stage.number
              /
              stages.length
            ) * 100
          );


        const isDone =
          accessAwakening &&
          progress >= complete;


        const isOpen =
          accessAwakening &&
          progress >= required;


        let state =
          'Заблокировано';


        if (isDone) {

          state =
            'Пройдено';

        } else if (isOpen) {

          state =
            'Открыто';

        }


        return `

          <button

            class="
              stage-button
              ${isDone ? 'done' : ''}
              ${isOpen ? 'current' : 'locked'}
            "

            ${
              isOpen
                ? `onclick="openLesson(${stage.number})"`
                : 'disabled'
            }

          >

            <span class="stage-number">
              ${stage.number}
            </span>

            <span class="stage-name">
              ${stage.title}
            </span>

            <span class="stage-state">
              ${state}
            </span>

          </button>

        `;

      })
      .join('');


  /*
    После 7-го этапа
    показываем повторный тест.
  */

  if (
    accessAwakening &&
    progress >= 100
  ) {

    element.innerHTML += `

      <div
        class="final-path"
        style="margin-top:25px"
      >

        <div class="tag">
          ЭТАПЫ ЗАВЕРШЕНЫ
        </div>

        <h3>
          ТЫ ПРОШЛА ПЕРВЫЙ ПУТЬ
        </h3>

        <p>
          Теперь можно пройти тест ещё раз
          и посмотреть, что изменилось
          в твоём состоянии.
        </p>

        <button
          class="primary"
          onclick="startFinalTest()"
        >
          ПРОЙТИ ТЕСТ ПОВТОРНО
        </button>

      </div>

    `;

  }

}


/* =====================================================
   ОТКРЫТИЕ ЭТАПА
===================================================== */

async function openLesson(
  lessonNumber
) {

  const user =
    await loadUser();


  if (!user) {
    return;
  }


  if (
    !user.access_awakening
  ) {

    return;

  }


  const progress =
    Number(
      user.progress || 0
    );


  const required =
    Math.round(
      (
        (lessonNumber - 1)
        /
        stages.length
      ) * 100
    );


  if (
    progress <
    required
  ) {

    return;

  }


  const stage =
    stages[
      lessonNumber - 1
    ];


  if (!stage) {
    return;
  }


  showScreen(
    'lesson'
  );


  const wrap =
    document.getElementById(
      'lesson-wrap'
    );


  if (!wrap) {
    return;
  }


  wrap.innerHTML = `

    <div class="lesson">

      <div class="tag">
        ЭТАП ${lessonNumber} ИЗ 7
      </div>

      <h2>
        ${stage.title}
      </h2>

      <p>
        ${stage.text}
      </p>

      <div class="lesson-practice">

        <strong>
          ПРАКТИКА
        </strong>

        <br><br>

        ${stage.practice}

      </div>

      <div class="lesson-complete">

        <button
          class="primary"
          onclick="
            completeLesson(${lessonNumber})
          "
        >
          Я ПРОШЛА ЭТОТ ЭТАП
        </button>

      </div>

    </div>

  `;

}


/* =====================================================
   ЗАВЕРШЕНИЕ ЭТАПА
===================================================== */

async function completeLesson(
  lessonNumber
) {

  if (
    lessonNumber < 1 ||
    lessonNumber > 7
  ) {

    return;

  }


  const user =
    await loadUser();


  if (
    !user ||
    !user.access_awakening
  ) {

    return;

  }


  const progress =
    Math.round(
      (
        lessonNumber
        /
        stages.length
      ) * 100
    );


  const currentStage =
    user.stage ||
    'Не определён';


  await saveProgress(
    progress,
    lessonNumber,
    currentStage
  );


  await openCabinet();

}


/* =====================================================
   ПОВТОРНЫЙ ТЕСТ
===================================================== */

function startFinalTest() {

  answers = [];

  showScreen(
    'test'
  );

}


/* =====================================================
   СБРОС ТЕСТА
===================================================== */

function resetTest() {

  answers = [];

  renderTest();

}


/* =====================================================
   ЗАПУСК
===================================================== */

document.addEventListener(
  'DOMContentLoaded',
  async () => {

    console.log(
      'ТОЧКА ПЕРЕХОДА запущена'
    );


    console.log(
      'Telegram ID:',
      getTelegramId()
    );


    const user =
      await ensureUser();


    console.log(
      'Пользователь:',
      user
    );

  }
);
