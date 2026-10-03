/* =====================================================
   ТОЧКА ПЕРЕХОДА
   APP.JS

   4 уровня:
   1. Автопилот
   2. Толчок
   3. Пробуждение
   4. Творец

   Telegram ID + Supabase + личный прогресс
===================================================== */


/* =====================================================
   TELEGRAM
===================================================== */

const tg = window.Telegram?.WebApp || null;

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


let db = null;

if (window.supabase) {

  db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

} else {

  console.error(
    'Supabase SDK не подключён.'
  );

}


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
   TELEGRAM USER
===================================================== */

function getTelegramUser() {

  return (
    tg?.initDataUnsafe?.user ||
    null
  );

}


function getTelegramId() {

  const user =
    getTelegramUser();

  return user?.id
    ? String(user.id)
    : null;

}


/* =====================================================
   ПОЛЬЗОВАТЕЛЬ
===================================================== */

async function ensureUser() {

  if (!db) {
    return null;
  }


  const telegramId =
    getTelegramId();


  if (!telegramId) {

    console.warn(
      'Telegram ID не найден.'
    );

    return null;

  }


  const {
    data: existing,
    error: findError
  } = await db
    .from('users')
    .select('*')
    .eq(
      'telegram_id',
      telegramId
    )
    .maybeSingle();


  if (findError) {

    console.error(
      'Ошибка поиска пользователя:',
      findError
    );

    return null;

  }


  if (existing) {

    return existing;

  }


  const {
    data: created,
    error: createError
  } = await db
    .from('users')
    .insert({

      telegram_id:
        telegramId,

      stage:
        'Не определён',

      progress:
        0,

      current_lesson:
        0

    })
    .select()
    .single();


  if (createError) {

    console.error(
      'Ошибка создания пользователя:',
      createError
    );

    return null;

  }


  return created;

}


/* =====================================================
   ЗАГРУЗКА ПОЛЬЗОВАТЕЛЯ
===================================================== */

async function loadUser() {

  if (!db) {
    return null;
  }


  const telegramId =
    getTelegramId();


  if (!telegramId) {
    return null;
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

    return null;

  }


  return data;

}


/* =====================================================
   СОХРАНЕНИЕ ПРОГРЕССА
===================================================== */

async function saveProgress(
  progress,
  currentLesson = null,
  stage = null
) {

  if (!db) {
    return false;
  }


  const telegramId =
    getTelegramId();


  if (!telegramId) {

    console.warn(
      'Нет Telegram ID — прогресс не сохранён.'
    );

    return false;

  }


  const update = {

    progress:
      Number(progress),

    updated_at:
      new Date().toISOString()

  };


  if (
    currentLesson !== null
  ) {

    update.current_lesson =
      Number(currentLesson);

  }


  if (
    stage !== null
  ) {

    update.stage =
      stage;

  }


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
      'Ошибка сохранения прогресса:',
      error
    );

    return false;

  }


  return true;

}


/* =====================================================
   СОХРАНЕНИЕ РЕЗУЛЬТАТА ТЕСТА
===================================================== */

async function saveStage(stage) {

  return await saveProgress(
    0,
    0,
    stage
  );

}


/* =====================================================
   НАВИГАЦИЯ
===================================================== */

function showScreen(name) {

  document
    .querySelectorAll('.screen')
    .forEach(
      screen => {

        screen.classList.remove(
          'active'
        );

      }
    );


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


  if (
    name === 'test'
  ) {

    renderTest();

  }


  if (
    name === 'cabinet'
  ) {

    openCabinet();

  }

}


/* =====================================================
   TRIBUTE
===================================================== */

function openTribute(url) {

  if (!url) {
    return;
  }


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
   ТЕСТ
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
   ОТРИСОВКА ТЕСТА
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
   ОПРЕДЕЛЕНИЕ ЭТАПА
===================================================== */

function calculateStage() {

  const scores = [
    0,
    0,
    0,
    0,
    0
  ];


  answers.forEach(
    answer => {

      if (
        answer >= 0 &&
        answer <= 4
      ) {

        scores[answer]++;

      }

    }
  );


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
   ОПИСАНИЕ ЭТАПОВ
===================================================== */

const STAGES = {

  'Автопилот': {

    title:
      'ТЫ ЖИВЁШЬ НА АВТОПИЛОТЕ',

    text: `

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

    `,

    button:
      'НАЧАТЬ ПЕРЕХОД',

    product:
      'awakening'

  },


  'Толчок': {

    title:
      'ТЫ В ТОЧКЕ ТОЛЧКА',

    text: `

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

    `,

    button:
      'ПЕРЕЙТИ В ПРОБУЖДЕНИЕ',

    product:
      'awakening'

  },


  'Пробуждение': {

    title:
      'ТЫ В ПРОБУЖДЕНИИ',

    text: `

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

    `,

    button:
      'ПЕРЕЙТИ В ТВОРЦА',

    product:
      'creator'

  },


  'Творец': {

    title:
      'ТЫ — ТВОРЕЦ',

    text: `

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

    `,

    button:
      null,

    product:
      null

  }

};


/* =====================================================
   РЕЗУЛЬТАТ
===================================================== */

async function renderResult() {

  const stage =
    calculateStage();


  await saveStage(
    stage
  );


  const wrap =
    document.getElementById(
      'test-wrap'
    );


  if (!wrap) {
    return;
  }


  const data =
    STAGES[stage];


  let action = '';


  if (
    data.button &&
    data.product
  ) {

    action = `

      <button
        class="primary"
        onclick="openProduct('${data.product}')"
      >

        ${data.button}

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
        ${data.title}
      </h3>

      ${data.text}

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
   ПРОДУКТ
===================================================== */

function openProduct(type) {

  if (
    type === 'awakening'
  ) {

    openTribute(
      LINKS.awakening
    );

    return;

  }


  if (
    type === 'creator'
  ) {

    openTribute(
      LINKS.creator
    );

    return;

  }

}


/* =====================================================
   ЛИЧНЫЙ КАБИНЕТ
===================================================== */

async function openCabinet() {

  /*
    Здесь не вызываем showScreen('cabinet'),
    чтобы избежать повторного вызова openCabinet.
  */

  document
    .querySelectorAll('.screen')
    .forEach(
      screen => {

        screen.classList.remove(
          'active'
        );

      }
    );


  const screen =
    document.getElementById(
      'screen-cabinet'
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


  message.innerHTML =
    '';


  const user =
    await ensureUser();


  if (!user) {

    stageElement.textContent =
      'Не определён';


    progressText.textContent =
      'Открой приложение через Telegram';


    message.innerHTML = `

      <p>
        Чтобы сохранить твой личный прогресс,
        приложение должно получить Telegram ID.
      </p>

    `;

    return;

  }


  const stage =
    user.stage ||
    'Не определён';


  const progress =
    Number(
      user.progress || 0
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


  highlightCurrentStage(
    stage
  );


  renderCabinetMessage(
    stage,
    progress
  );

}


/* =====================================================
   ПОДСВЕТКА ТЕКУЩЕГО ЭТАПА
===================================================== */

function highlightCurrentStage(stage) {

  const ids = {

    'Автопилот':
      'stage-autopilot',

    'Толчок':
      'stage-push',

    'Пробуждение':
      'stage-awakening',

    'Творец':
      'stage-creator'

  };


  document
    .querySelectorAll('.stage-card')
    .forEach(
      card => {

        card.classList.remove(
          'active'
        );

        card.classList.remove(
          'completed'
        );

      }
    );


  const currentId =
    ids[stage];


  if (!currentId) {
    return;
  }


  const current =
    document.getElementById(
      currentId
    );


  if (current) {

    current.classList.add(
      'active'
    );

  }


  const order = [
    'Автопилот',
    'Толчок',
    'Пробуждение',
    'Творец'
  ];


  const currentIndex =
    order.indexOf(stage);


  order.forEach(
    (name, index) => {

      if (
        index < currentIndex
      ) {

        const id =
          ids[name];


        const element =
          document.getElementById(
            id
          );


        if (element) {

          element.classList.add(
            'completed'
          );

        }

      }

    }
  );

}


/* =====================================================
   СООБЩЕНИЕ В ЛИЧНОМ КАБИНЕТЕ
===================================================== */

function renderCabinetMessage(
  stage,
  progress
) {

  const message =
    document.getElementById(
      'cabinet-message'
    );


  if (!message) {
    return;
  }


  if (
    stage === 'Не определён'
  ) {

    message.innerHTML = `

      <h3>
        НАЧНИ С ТЕСТА
      </h3>

      <p>
        Пройди тест — и приложение
        автоматически определит твой текущий этап
        и сохранит его за твоим Telegram ID.
      </p>

      <button
        class="primary"
        onclick="showScreen('test')"
      >
        ПРОЙТИ ТЕСТ
      </button>

    `;

    return;

  }


  if (
    stage === 'Автопилот'
  ) {

    message.innerHTML = `

      <h3>
        ТВОЙ СЛЕДУЮЩИЙ ПЕРЕХОД
      </h3>

      <p>
        Из Автопилота — в Пробуждение.
        Начни с первой ветки продукта.
      </p>

      <button
        class="primary"
        onclick="openProduct('awakening')"
      >
        НАЧАТЬ ПЕРЕХОД
      </button>

    `;

    return;

  }


  if (
    stage === 'Толчок'
  ) {

    message.innerHTML = `

      <h3>
        ТВОЙ СЛЕДУЮЩИЙ ПЕРЕХОД
      </h3>

      <p>
        Ты уже в точке Толчка.
        Следующий переход — в Пробуждение.
      </p>

      <button
        class="primary"
        onclick="openProduct('awakening')"
      >
        ПЕРЕЙТИ В ПРОБУЖДЕНИЕ
      </button>

    `;

    return;

  }


  if (
    stage === 'Пробуждение'
  ) {

    message.innerHTML = `

      <h3>
        ТВОЙ СЛЕДУЮЩИЙ ПЕРЕХОД
      </h3>

      <p>
        Следующая ветка — Пробуждение → Творец.
        Именно здесь появятся медитации.
      </p>

      <button
        class="primary"
        onclick="openProduct('creator')"
      >
        ПЕРЕЙТИ В ТВОРЦА
      </button>

    `;

    return;

  }


  if (
    stage === 'Творец'
  ) {

    message.innerHTML = `

      <h3>
        ТЫ В ТОЧКЕ ТВОРЦА
      </h3>

      <p>
        Твой текущий этап сохранён.
        Продолжай создавать и реализовывать
        то, что выбрала для себя.
      </p>

    `;

  }

}


/* =====================================================
   СБРОС ТЕСТА
===================================================== */

function resetTest() {

  answers = [];

  renderTest();

}


/* =====================================================
   СТАРТ
===================================================== */

document.addEventListener(
  'DOMContentLoaded',
  async () => {

    console.log(
      'Точка перехода запущена'
    );


    console.log(
      'Telegram ID:',
      getTelegramId()
    );


    await ensureUser();

  }
);
