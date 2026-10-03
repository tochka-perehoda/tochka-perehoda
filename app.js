/* =====================================================
   TELEGRAM
===================================================== */

const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}


/* =====================================================
   TRIBUTE
===================================================== */

const LINKS = {

  transitionAwakening:
    'https://web.tribute.tg/p/EBu',

  transitionCreator:
    'https://web.tribute.tg/p/FKI',

  consultation:
    'https://web.tribute.tg/p/tiX',

  accompaniment:
    'https://web.tribute.tg/p/EBv'

};


/* =====================================================
   SUPABASE
===================================================== */

const db = window.supabase
  ? window.supabase.createClient(
      'https://vxhoavgkiratylcfeqnz.supabase.co',
      'sb_publishable_s_PuUbLuT_aerFgVmywXDw_fVcZWjNv'
    )
  : null;


/* =====================================================
   TELEGRAM USER
===================================================== */

function getTelegramUser() {

  if (
    tg &&
    tg.initDataUnsafe &&
    tg.initDataUnsafe.user
  ) {
    return tg.initDataUnsafe.user;
  }

  return null;

}


function getTelegramId() {

  const user = getTelegramUser();

  if (!user) {
    return null;
  }

  return String(user.id);

}


/* =====================================================
   ВОПРОСЫ ТЕСТА
===================================================== */

const questions = [

  {
    t: 'Я понимаю, что прежний образ жизни больше меня не устраивает.',
    a: [
      'Это почти не про меня',
      'Иногда ловлю себя на этой мысли',
      'Это уже стало очевидно',
      'Я давно это чувствую',
      'Я полностью готова к новому этапу'
    ]
  },

  {
    t: 'Когда жизнь резко меняется, я обычно…',
    a: [
      'Продолжаю жить как раньше',
      'Чувствую внутреннее сопротивление',
      'Начинаю искать ответы',
      'Беру ответственность за выбор',
      'Создаю новый сценарий'
    ]
  },

  {
    t: 'Что сейчас происходит с моими привычными целями?',
    a: [
      'Меня всё устраивает',
      'Некоторые цели перестали радовать',
      'Я пересматриваю приоритеты',
      'Я выбираю свои цели осознанно',
      'Я создаю цели из нового состояния'
    ]
  },

  {
    t: 'Насколько я слышу собственные желания?',
    a: [
      'Почти не слышу',
      'Иногда слышу, но сомневаюсь',
      'Начинаю различать своё и чужое',
      'Доверяю себе больше',
      'Опираюсь на себя в решениях'
    ]
  },

  {
    t: 'Если старый сценарий больше не работает, я…',
    a: [
      'Держусь за него',
      'Не знаю, что делать',
      'Начинаю отпускать',
      'Создаю новые правила',
      'Осознанно создаю новую реальность'
    ]
  },

  {
    t: 'Мои кризисы чаще всего…',
    a: [
      'Кажутся случайными',
      'Вынуждают меня остановиться',
      'Показывают, что пора меняться',
      'Становятся точками роста',
      'Становятся материалом для нового выбора'
    ]
  },

  {
    t: 'Я отношусь к неизвестности как к…',
    a: [
      'Угрозе',
      'Сильному дискомфорту',
      'Пространству поиска',
      'Возможности',
      'Пространству создания'
    ]
  },

  {
    t: 'Что важнее всего в моих решениях?',
    a: [
      'Стабильность',
      'Не разочаровать других',
      'Понять, чего хочу я',
      'Взять ответственность за себя',
      'Создать жизнь, которая соответствует мне'
    ]
  },

  {
    t: 'Я чувствую, что стою перед новым этапом жизни.',
    a: [
      'Нет',
      'Скорее нет',
      'Да, но не понимаю каким он будет',
      'Да, я уже меняю многое',
      'Да, я сознательно создаю следующий этап'
    ]
  },

  {
    t: 'Что мне сейчас нужнее всего?',
    a: [
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
   НАВИГАЦИЯ
===================================================== */

function showScreen(name) {

  document
    .querySelectorAll('.screen')
    .forEach(
      s => s.classList.remove('active')
    );


  const screen =
    document.getElementById(
      'screen-' + name
    );


  if (screen) {
    screen.classList.add('active');
  }


  if (name === 'test') {
    renderTest();
  }


  window.scrollTo(0, 0);

}


/* =====================================================
   TRIBUTE
===================================================== */

function openTribute(url) {

  if (tg && tg.openLink) {

    tg.openLink(url);

  } else {

    window.open(
      url,
      '_blank'
    );

  }

}


/* =====================================================
   КОНСУЛЬТАЦИЯ
===================================================== */

function openConsultation() {

  openTribute(
    LINKS.consultation
  );

}


/* =====================================================
   СОПРОВОЖДЕНИЕ
===================================================== */

function openAccompaniment() {

  openTribute(
    LINKS.accompaniment
  );

}


/* =====================================================
   ТЕСТ
===================================================== */

function renderTest() {

  const w =
    document.getElementById(
      'test-wrap'
    );


  if (!w) return;


  if (
    answers.length ===
    questions.length
  ) {

    renderResult();

    return;

  }


  const i =
    answers.length;


  w.innerHTML = `

    <div class="progress">
      ВОПРОС ${i + 1}
      ИЗ ${questions.length}
    </div>


    <div class="question">

      <h3>
        ${questions[i].t}
      </h3>


      <div class="answers">

        ${questions[i].a
          .map(
            (x, j) => `

              <button
                class="answer"
                onclick="choose(${j})"
              >
                ${String.fromCharCode(65 + j)}.
                ${x}
              </button>

            `
          )
          .join('')}

      </div>

    </div>

  `;

}


/* =====================================================
   ВЫБОР ОТВЕТА
===================================================== */

function choose(j) {

  answers.push(j);

  renderTest();

}


/* =====================================================
   ОПРЕДЕЛЕНИЕ ЭТАПА
===================================================== */

function getStage() {

  const counts =
    [0, 0, 0, 0, 0];


  answers.forEach(
    x => {

      if (
        x >= 0 &&
        x <= 4
      ) {

        counts[x]++;

      }

    }
  );


  const max =
    Math.max(...counts);


  const idx =
    counts.indexOf(max);


  if (idx === 0) {
    return 'Автопилот';
  }


  if (idx === 1) {
    return 'Толчок';
  }


  if (idx === 2) {
    return 'Пробуждение';
  }


  return 'Творец';

}


/* =====================================================
   СОХРАНЕНИЕ ПОЛЬЗОВАТЕЛЯ
===================================================== */

async function saveUser(stage) {

  if (!db) {

    console.log(
      'Supabase не подключён'
    );

    return;

  }


  const telegramId =
    getTelegramId();


  if (!telegramId) {

    console.log(
      'Telegram ID не найден'
    );

    return;

  }


  const { data, error } =
    await db
      .from('users')
      .upsert(
        {
          telegram_id:
            telegramId,

          stage:
            stage,

          progress:
            0
        },
        {
          onConflict:
            'telegram_id'
        }
      );


  if (error) {

    console.error(
      'Ошибка сохранения:',
      error
    );

    return;

  }


  console.log(
    'Пользователь сохранён',
    data
  );

}


/* =====================================================
   ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ
===================================================== */

async function getUserData() {

  if (!db) {
    return null;
  }


  const telegramId =
    getTelegramId();


  if (!telegramId) {
    return null;
  }


  const { data, error } =
    await db
      .from('users')
      .select(
        'id, telegram_id, stage, progress'
      )
      .eq(
        'telegram_id',
        telegramId
      )
      .maybeSingle();


  if (error) {

    console.error(
      'Ошибка получения пользователя:',
      error
    );

    return null;

  }


  return data;

}


/* =====================================================
   РЕЗУЛЬТАТ
===================================================== */

async function renderResult() {

  const stage =
    getStage();


  localStorage.setItem(
    'tp_stage',
    stage
  );


  await saveUser(
    stage
  );


  const w =
    document.getElementById(
      'test-wrap'
    );


  if (!w) return;


  let title = '';
  let text = '';
  let button = '';


  /* =========================================
     АВТОПИЛОТ
  ========================================= */

  if (
    stage === 'Автопилот'
  ) {

    title =
      'ТЫ ЖИВЁШЬ НА АВТОПИЛОТЕ';


    text = `

      <p>
        Внешне твоя жизнь может выглядеть
        совершенно нормально.
        Ты работаешь, решаешь вопросы,
        заботишься о других.
      </p>

      <p>
        Но внутри всё чаще появляется ощущение:
        <strong>
          «Я живу не свою жизнь».
        </strong>
      </p>

      <p>
        Автопилот — это состояние,
        в котором человек продолжает идти
        по знакомому маршруту,
        даже когда этот маршрут больше
        не делает его счастливым.
      </p>

      <p>
        И самое важное:
        <strong>
          тебе не обязательно ждать кризиса,
          чтобы начать менять свою жизнь.
        </strong>
      </p>

      <p>
        Ты можешь перейти из Автопилота
        сразу в <strong>Пробуждение</strong>.
      </p>

    `;


    button = `

      <button
        class="primary"
        onclick="openTransition('Автопилот')"
      >
        ХОЧУ ВЫЙТИ ИЗ АВТОПИЛОТА
      </button>

    `;

  }


  /* =========================================
     ТОЛЧОК
  ========================================= */

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
        Что-то разрушилось, изменилось
        или перестало работать так,
        как раньше.
      </p>

      <p>
        Толчок приходит тогда,
        когда по-старому уже невозможно,
        но по-новому ты ещё не умеешь.
      </p>

      <p>
        Самое сложное здесь —
        <strong>
          не попытаться вернуть прежнюю жизнь.
        </strong>
      </p>

      <p>
        Твой Толчок может стать не концом,
        а началом нового этапа —
        <strong>Пробуждения.</strong>
      </p>

    `;


    button = `

      <button
        class="primary"
        onclick="openTransition('Толчок')"
      >
        ХОЧУ ПРОЙТИ ТОЛЧОК В ПРОБУЖДЕНИЕ
      </button>

    `;

  }


  /* =========================================
     ПРОБУЖДЕНИЕ
  ========================================= */

  if (
    stage === 'Пробуждение'
  ) {

    title =
      'ТЫ В ПРОБУЖДЕНИИ';


    text = `

      <p>
        Ты уже не можешь делать вид,
        что ничего не происходит.
      </p>

      <p>
        Ты начинаешь задавать себе вопросы.
        Почему я живу именно так?
        Чего хочу я?
      </p>

      <p>
        Ты начинаешь видеть себя честно.
      </p>

      <p>
        Но здесь есть следующий шаг.
      </p>

      <p>
        <strong>
          Перестать бесконечно искать ответы
          и начать создавать.
        </strong>
      </p>

      <p>
        Именно поэтому следующий переход —
        <strong>из Пробуждения в Творца.</strong>
      </p>

    `;


    button = `

      <button
        class="primary"
        onclick="openTransition('Пробуждение')"
      >
        ХОЧУ ПЕРЕЙТИ В ТВОРЦА
      </button>

    `;

  }


  /* =========================================
     ТВОРЕЦ
  ========================================= */

  if (
    stage === 'Творец'
  ) {

    title =
      'ТЫ — ТВОРЕЦ';


    text = `

      <p>
        Ты уже умеешь видеть себя,
        свои желания и свои решения
        по-другому.
      </p>

      <p>
        Ты можешь выбирать.
        Действовать.
        Создавать.
      </p>

      <p>
        <strong>
          Творец — это состояние,
          в котором ты перестаёшь ждать
          подходящего момента.
        </strong>
      </p>

      <p>
        Твой путь теперь —
        в реализации того,
        что ты уже увидела в себе.
      </p>

    `;


    button = `

      <button
        class="primary"
        onclick="openTransition('Творец')"
      >
        ПЕРЕЙТИ К МОЕМУ ПУТЮ
      </button>

    `;

  }


  w.innerHTML = `

    <div class="result">

      <div class="tag">
        ТВОЙ РЕЗУЛЬТАТ
      </div>

      <h2>
        ${stage}
      </h2>

      <h3 style="margin-top:22px;">
        ${title}
      </h3>

      ${text}

      ${button}

    </div>


    <button
      class="back"
      style="margin-top:18px"
      onclick="resetTest()"
    >
      Пройти заново
    </button>

  `;

}


/* =====================================================
   ПЕРЕХОД
===================================================== */

function openTransition(stage) {

  const w =
    document.getElementById(
      'test-wrap'
    );


  if (!w) return;


  window.scrollTo(
    0,
    0
  );


  /* =========================================
     АВТОПИЛОТ → ПРОБУЖДЕНИЕ
  ========================================= */

  if (
    stage === 'Автопилот'
  ) {

    w.innerHTML = `

      <div class="result">

        <div class="tag">
          ПЕРЕХОД
        </div>

        <h2>
          АВТОПИЛОТ → ПРОБУЖДЕНИЕ
        </h2>

        <p>
          Ты уже заметила главное:
          <strong>
            прежняя жизнь больше не даёт
            тебе того ощущения, которого хочется.
          </strong>
        </p>

        <p>
          Но одного понимания недостаточно.
        </p>

        <p>
          Можно годами думать:
          «Когда-нибудь я начну жить для себя».
        </p>

        <p>
          Но тебе не обязательно ждать Толчка.
        </p>

        <p>
          <strong>
            Ты можешь начать переход уже сейчас.
          </strong>
        </p>

        <p>
          Переход из Автопилота в Пробуждение —
          это путь от
          <strong>«я живу так, как привыкла»</strong>
          к
          <strong>«я начинаю выбирать сама».</strong>
        </p>

        <p>
          Ты начнёшь видеть свои сценарии,
          автоматические решения,
          чужие ожидания и то,
          чего на самом деле хочешь именно ты.
        </p>

        <p>
          Это не теория.
          Внутри тебя ждут
          <strong>
            практические задания и мои голосовые сообщения,
          </strong>
          которые будут вести тебя через этот переход.
        </p>

        <p>
          Не нужно менять всю жизнь за один день.
          Нужно сделать первый настоящий шаг.
        </p>


        <div
          style="
            margin-top:26px;
            padding:20px;
            border:1px solid rgba(214,169,91,.4);
            border-radius:18px;
          "
        >

          <div class="tag">
            ТВОЙ СЛЕДУЮЩИЙ УРОВЕНЬ
          </div>

          <h3>
            ПРОБУЖДЕНИЕ
          </h3>

          <p>
            Из «живу не свою жизнь»
            в «начинаю выбирать».
          </p>

          <div
            style="
              font-size:30px;
              font-weight:700;
              margin:18px 0;
            "
          >
            990 ₽
          </div>

          <button
            class="primary"
            onclick="
              openTribute(
                LINKS.transitionAwakening
              )
            "
          >
            🔥 НАЧАТЬ СВОЙ ПЕРЕХОД
          </button>

        </div>

      </div>


      <button
        class="back"
        style="margin-top:18px"
        onclick="renderResult()"
      >
        ← Вернуться к результату
      </button>

    `;

    return;

  }


  /* =========================================
     ТОЛЧОК → ПРОБУЖДЕНИЕ
  ========================================= */

  if (
    stage === 'Толчок'
  ) {

    w.innerHTML = `

      <div class="result">

        <div class="tag">
          ПЕРЕХОД
        </div>

        <h2>
          ТОЛЧОК → ПРОБУЖДЕНИЕ
        </h2>

        <p>
          Ты уже получила то,
          чего человек на Автопилоте
          часто пытается избежать —
          <strong>Толчок.</strong>
        </p>

        <p>
          Жизнь показала тебе,
          что прежний сценарий больше
          не работает.
        </p>

        <p>
          И теперь у тебя есть выбор:
          пытаться вернуть то,
          что уже закончилось,
          или использовать этот момент
          как точку перехода.
        </p>

        <p>
          <strong>
            Толчок — это не конечная точка.
            Это дверь.
          </strong>
        </p>

        <p>
          Переход из Толчка в Пробуждение —
          это путь от
          <strong>«со мной это произошло»</strong>
          к
          <strong>
            «я начинаю понимать,
            что теперь выбираю сама».
          </strong>
        </p>

        <p>
          Ты перестаёшь жить прошлым
          и начинаешь смотреть
          на себя и свою жизнь по-новому.
        </p>

        <p>
          Внутри —
          <strong>
            практические задания и мои
            голосовые сообщения.
          </strong>
        </p>


        <div
          style="
            margin-top:26px;
            padding:20px;
            border:1px solid rgba(214,169,91,.4);
            border-radius:18px;
          "
        >

          <div class="tag">
            ТВОЙ СЛЕДУЮЩИЙ УРОВЕНЬ
          </div>

          <h3>
            ПРОБУЖДЕНИЕ
          </h3>

          <p>
            Из «со мной это произошло»
            в «я начинаю выбирать».
          </p>

          <div
            style="
              font-size:30px;
              font-weight:700;
              margin:18px 0;
            "
          >
            990 ₽
          </div>

          <button
            class="primary"
            onclick="
              openTribute(
                LINKS.transitionAwakening
              )
            "
          >
            🔥 ПРОЙТИ СВОЙ ПЕРЕХОД
          </button>

        </div>

      </div>


      <button
        class="back"
        style="margin-top:18px"
        onclick="renderResult()"
      >
        ← Вернуться к результату
      </button>

    `;

    return;

  }


  /* =========================================
     ПРОБУЖДЕНИЕ → ТВОРЕЦ
  ========================================= */

  if (
    stage === 'Пробуждение'
  ) {

    w.innerHTML = `

      <div class="result">

        <div class="tag">
          ПЕРЕХОД
        </div>

        <h2>
          ПРОБУЖДЕНИЕ → ТВОРЕЦ
        </h2>

        <p>
          Ты уже начала видеть.
        </p>

        <p>
          Ты задаёшь вопросы,
          на которые раньше могла
          даже не смотреть.
        </p>

        <p>
          Ты начинаешь слышать себя,
          различать своё и чужое,
          замечать старые сценарии
          и понимать, чего хочешь на самом деле.
        </p>

        <p>
          Но здесь легко застрять.
        </p>

        <p>
          Можно бесконечно искать ответы,
          читать, анализировать,
          разбирать себя и ждать,
          когда наконец станет понятно,
          что делать дальше.
        </p>

        <p>
          <strong>
            Но Пробуждение — не конечная точка.
          </strong>
        </p>

        <p>
          Следующий переход —
          от
          <strong>«я начинаю слышать себя»</strong>
          к
          <strong>«я создаю свою жизнь».</strong>
        </p>

        <p>
          Это переход в состояние
          <strong>Творца.</strong>
        </p>

        <p>
          Здесь ты перестаёшь только понимать
          и начинаешь действовать из нового
          состояния.
        </p>

        <p>
          Внутри тебя ждут
          <strong>
            практические задания,
            мои голосовые сообщения
            и 7 последовательных медитаций.
          </strong>
        </p>

        <p>
          Ты проходишь их в своём темпе.
          Это не программа,
          которую нужно закончить
          за семь календарных дней.
        </p>


        <div
          style="
            margin-top:26px;
            padding:20px;
            border:1px solid rgba(214,169,91,.4);
            border-radius:18px;
          "
        >

          <div class="tag">
            ТВОЙ СЛЕДУЮЩИЙ УРОВЕНЬ
          </div>

          <h3>
            ТВОРЕЦ
          </h3>

          <p>
            Из «я ищу ответы»
            в «я создаю свою жизнь».
          </p>

          <div
            style="
              font-size:30px;
              font-weight:700;
              margin:18px 0;
            "
          >
            990 ₽
          </div>

          <button
            class="primary"
            onclick="
              openTribute(
                LINKS.transitionCreator
              )
            "
          >
            🔥 ПЕРЕЙТИ В ТВОРЦА
          </button>

        </div>

      </div>


      <button
        class="back"
        style="margin-top:18px"
        onclick="renderResult()"
      >
        ← Вернуться к результату
      </button>

    `;

    return;

  }


  /* =========================================
     ТВОРЕЦ
  ========================================= */

  if (
    stage === 'Творец'
  ) {

    w.innerHTML = `

      <div class="result">

        <div class="tag">
          ТВОЙ УРОВЕНЬ
        </div>

        <h2>
          ТВОРЕЦ
        </h2>

        <p>
          Ты уже находишься на уровне,
          где следующий шаг —
          реализация и действие.
        </p>

        <div
          style="
            margin-top:26px;
            padding:20px;
            border:1px solid rgba(214,169,91,.4);
            border-radius:18px;
          "
        >

          <h3>
            ТВОЙ ПУТЬ
          </h3>

          <p>
            Продолжай применять
            то, что уже увидела в себе.
          </p>

        </div>

      </div>


      <button
        class="back"
        style="margin-top:18px"
        onclick="renderResult()"
      >
        ← Вернуться к результату
      </button>

    `;

  }

}


/* =====================================================
   ЛИЧНЫЙ КАБИНЕТ
===================================================== */

async function openCabinet() {

  showScreen('cabinet');


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


  stageElement.textContent =
    'Загрузка...';


  progressElement.style.width =
    '0%';


  progressText.textContent =
    'Загрузка...';


  const user =
    await getUserData();


  if (!user) {

    const savedStage =
      localStorage.getItem(
        'tp_stage'
      );


    if (savedStage) {

      stageElement.textContent =
        savedStage;

      progressText.textContent =
        'Пройди тест, чтобы сохранить свой путь';

    } else {

      stageElement.textContent =
        'Тест ещё не пройден';

      progressText.textContent =
        'Пройди тест, чтобы определить свой этап';

    }


    message.innerHTML = `

      <h3>
        ТВОЙ ПУТЬ
      </h3>

      <p>
        Сначала пройди тест.
        После этого твой этап будет
        сохранён здесь автоматически.
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


  const progress =
    Number(
      user.progress || 0
    );


  stageElement.textContent =
    user.stage ||
    'Не определён';


  progressElement.style.width =
    Math.min(
      100,
      Math.max(
        0,
        progress
      )
    ) + '%';


  progressText.textContent =
    progress + '% пройдено';


  message.innerHTML = `

    <h3>
      ТВОЙ ПУТЬ
    </h3>

    <p>
      Твой текущий этап:
      <strong>
        ${user.stage || '—'}
      </strong>
    </p>

    <p>
      Здесь будут открываться
      материалы твоего перехода
      по мере прохождения.
    </p>

  `;


  updateStageButtons(
    progress
  );

}


/* =====================================================
   ЭТАПЫ
===================================================== */

function updateStageButtons(
  progress
) {

  for (
    let i = 1;
    i <= 7;
    i++
  ) {

    const button =
      document.getElementById(
        'stage-' + i
      );


    if (!button) continue;


    const required =
      Math.round(
        ((i - 1) / 7) * 100
      );


    if (
      progress >= required
    ) {

      button.disabled =
        false;

    } else {

      button.disabled =
        true;

    }

  }

}


/* =====================================================
   СБРОС ТЕСТА
===================================================== */

function resetTest() {

  answers = [];


  localStorage.removeItem(
    'tp_stage'
  );


  renderTest();

}


/* =====================================================
   ЗАПУСК
===================================================== */

document.addEventListener(
  'DOMContentLoaded',
  () => {

    console.log(
      'Точка перехода запущена'
    );

    console.log(
      'Telegram ID:',
      getTelegramId()
    );

  }
);
