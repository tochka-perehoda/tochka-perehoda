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

const supabaseClient =
  window.supabase?.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


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
   ПОЛЬЗОВАТЕЛЬ
===================================================== */

let currentUser = null;

let userProduct = null;

let currentStage = 0;


/* =====================================================
   ТЕСТ
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
   7 ЭТАПОВ
   АВТОПИЛОТ / ТОЛЧОК → ПРОБУЖДЕНИЕ
===================================================== */

const awakeningStages = [

  {
    title: 'ПРИЗНАТЬ, ЧТО СТАРОЕ БОЛЬШЕ НЕ РАБОТАЕТ',

    text: `
      <p>
        Иногда самый первый шаг — честно признать:
        <strong>«Я больше не хочу жить так, как жила раньше».</strong>
      </p>

      <p>
        Возможно, внешне всё выглядит нормально.
        Но внутри уже давно есть ощущение,
        что ты больше не на своём месте.
      </p>

      <p>
        Иногда проблема не в том,
        что жизнь стала плохой.
        Просто ты изменилась.
      </p>
    `,

    practice: `
      <h3>ТВОЯ ПРАКТИКА</h3>

      <p><strong>Я больше не хочу…</strong></p>

      <p><strong>Я устала от…</strong></p>

      <p><strong>Я продолжаю это только потому, что…</strong></p>

      <p><strong>Мне на самом деле хочется…</strong></p>

      <p>
        <strong>
          Если бы мне не нужно было никому ничего доказывать,
          я бы…
        </strong>
      </p>
    `
  },


  {
    title: 'УВИДЕТЬ, ЧТО ДЕРЖИТ ТЕБЯ В СТАРОМ',

    text: `
      <p>
        Если ты уже понимаешь, что больше так не хочешь,
        возникает следующий вопрос:
        <strong>«Почему я продолжаю?»</strong>
      </p>

      <p>
        Старое — это не только привычка.
        Это безопасность, предсказуемость,
        одобрение и страх перемен.
      </p>

      <p>
        Иногда человек знает правду,
        но боится последствий этой правды.
      </p>
    `,

    practice: `
      <h3>ТВОЯ ПРАКТИКА</h3>

      <p>
        Если я действительно изменю свою жизнь,
        я боюсь, что…
      </p>

      <p>
        Продолжи минимум 7 раз.
      </p>

      <p>
        Затем ответь:
      </p>

      <p>
        <strong>
          Если я ничего не изменю в ближайший год,
          я боюсь, что…
        </strong>
      </p>
    `
  },


  {
    title: 'УВИДЕТЬ СВОЙ СЦЕНАРИЙ',

    text: `
      <p>
        Иногда меняются декорации,
        но сценарий остаётся тем же.
      </p>

      <p>
        Ты снова выбираешь похожее.
        Снова терпишь.
        Снова пытаешься заслужить.
      </p>

      <p>
        И тогда возникает вопрос:
        <strong>«Почему со мной опять это происходит?»</strong>
      </p>
    `,

    practice: `
      <h3>ТВОЯ ПРАКТИКА</h3>

      <p>
        Какие ситуации в моей жизни повторяются?
      </p>

      <p>
        Каких людей я выбираю снова и снова?
      </p>

      <p>
        Что я постоянно терплю?
      </p>

      <p>
        В какой момент я предаю себя?
      </p>

      <p>
        <strong>
          Мой сценарий выглядит так: …
        </strong>
      </p>
    `
  },


  {
    title: 'ОТДЕЛИТЬ СВОЁ ОТ ЧУЖОГО',

    text: `
      <p>
        Очень легко перепутать своё желание
        с тем, чему тебя когда-то научили.
      </p>

      <p>
        Что правильно?
        Что скажут другие?
        Чего от тебя ждут?
      </p>

      <p>
        И постепенно становится трудно понять:
        <strong>«А чего хочу я?»</strong>
      </p>
    `,

    practice: `
      <h3>ТВОЯ ПРАКТИКА</h3>

      <p>
        Раздели лист на две колонки:
        <strong>МОЁ</strong> и <strong>ЧУЖОЕ</strong>.
      </p>

      <p>
        Запиши туда свои желания,
        цели, правила и страхи.
      </p>

      <p>
        Затем ответь:
      </p>

      <p>
        <strong>
          Если убрать мнение всех остальных —
          чего хочу я?
        </strong>
      </p>
    `
  },


  {
    title: 'ПЕРЕСТАТЬ ЖДАТЬ, ЧТО КТО-ТО РЕШИТ ЗА ТЕБЯ',

    text: `
      <p>
        Можно бесконечно анализировать,
        искать знаки и читать книги.
      </p>

      <p>
        Но знание само по себе
        ничего не меняет.
      </p>

      <p>
        <strong>Меняет выбор.</strong>
      </p>
    `,

    practice: `
      <h3>ТВОЯ ПРАКТИКА</h3>

      <p>
        Возьми одну ситуацию,
        которая сейчас тебя беспокоит.
      </p>

      <p>
        Что я не могу контролировать?
      </p>

      <p>
        Что я могу выбрать?
      </p>

      <p>
        <strong>
          Какое решение я откладываю,
          хотя уже знаю, что мне нужно сделать?
        </strong>
      </p>
    `
  },


  {
    title: 'ВЫБРАТЬ СЕБЯ',

    text: `
      <p>
        Выбрать себя — не значит бросить всё
        и не значит стать эгоисткой.
      </p>

      <p>
        Выбрать себя —
        значит перестать жить против себя.
      </p>

      <p>
        Перестать соглашаться там,
        где внутри звучит «нет».
      </p>
    `,

    practice: `
      <h3>ТВОЯ ПРАКТИКА</h3>

      <p>
        <strong>Я больше не буду…</strong>
      </p>

      <p>
        <strong>Я начинаю…</strong>
      </p>

      <p>
        <strong>Я разрешаю себе…</strong>
      </p>

      <p>
        <strong>
          Мой выбор сейчас:
        </strong>
      </p>
    `
  },


  {
    title: 'СДЕЛАТЬ ПЕРВЫЙ ШАГ',

    text: `
      <p>
        Ты уже увидела, что больше не работает.
      </p>

      <p>
        Теперь начинается самое важное:
        <strong>действие.</strong>
      </p>

      <p>
        Не глобальное.
        Не идеальное.
        Просто первый настоящий шаг.
      </p>
    `,

    practice: `
      <h3>ТВОЯ ПРАКТИКА</h3>

      <p>
        <strong>
          Что я сделаю в течение ближайших 72 часов?
        </strong>
      </p>

      <p>
        Запиши конкретное действие.
      </p>

      <p>
        <strong>МОЙ ПЕРВЫЙ ШАГ:</strong>
      </p>

      <p>
        ______________________________
      </p>

      <p>
        <strong>КОГДА Я ЕГО СДЕЛАЮ:</strong>
      </p>

      <p>
        ______________________________
      </p>
    `
  }

];


/* =====================================================
   ЗАПУСК
===================================================== */

document.addEventListener(
  'DOMContentLoaded',
  async () => {

    await loadUser();

  }
);


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


/* =====================================================
   ЗАГРУЗКА ПОЛЬЗОВАТЕЛЯ
===================================================== */

async function loadUser() {

  const telegramUser =
    getTelegramUser();

  if (!telegramUser) {

    console.log(
      'Mini App открыт не внутри Telegram.'
    );

    return null;

  }

  currentUser =
    telegramUser;


  if (!supabaseClient) {

    console.log(
      'Supabase не подключён.'
    );

    return telegramUser;

  }


  try {

    const telegramId =
      String(telegramUser.id);


    const { data, error } =
      await supabaseClient
        .from('users')
        .select('*')
        .eq(
          'telegram_id',
          telegramId
        )
        .maybeSingle();


    if (error) {

      console.error(
        'Supabase:',
        error
      );

      return telegramUser;

    }


    if (data) {

      userProduct =
        data.product || null;

      currentStage =
        Number(
          data.current_stage || 0
        );

      return data;

    }


    const { data: newUser, error: insertError } =
      await supabaseClient
        .from('users')
        .insert({

          telegram_id:
            telegramId,

          product:
            null,

          current_stage:
            0

        })
        .select()
        .single();


    if (insertError) {

      console.error(
        'Создание пользователя:',
        insertError
      );

      return telegramUser;

    }


    currentStage = 0;

    userProduct = null;

    return newUser;

  } catch (error) {

    console.error(
      'loadUser:',
      error
    );

    return telegramUser;

  }

}


/* =====================================================
   НАВИГАЦИЯ
===================================================== */

function showScreen(name) {

  document
    .querySelectorAll('.screen')
    .forEach(
      screen =>
        screen.classList.remove(
          'active'
        )
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


  if (name === 'test') {

    renderTest();

  }


  if (name === 'cabinet') {

    renderCabinet();

  }


  window.scrollTo(
    0,
    0
  );

}


/* =====================================================
   TRIBUTE
===================================================== */

function openTribute(url) {

  if (
    tg &&
    tg.openLink
  ) {

    tg.openLink(url);

  } else {

    window.open(
      url,
      '_blank'
    );

  }

}


/* =====================================================
   ОТКРЫТИЕ ТЕСТА
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
      ВОПРОС ${i + 1} ИЗ ${questions.length}
    </div>

    <div class="question">

      <h3>
        ${questions[i].t}
      </h3>

      <div class="answers">

        ${questions[i].a
          .map(
            (answer, index) => `

              <button
                class="answer"
                onclick="choose(${index})"
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


function choose(index) {

  answers.push(
    index
  );

  renderTest();

}


/* =====================================================
   РЕЗУЛЬТАТ
===================================================== */

function getStage() {

  const counts =
    [0, 0, 0, 0, 0];


  answers.forEach(
    answer => {

      if (
        answer >= 0 &&
        answer <= 4
      ) {

        counts[answer]++;

      }

    }
  );


  const max =
    Math.max(
      ...counts
    );


  const index =
    counts.indexOf(
      max
    );


  if (index === 0)
    return 'Автопилот';

  if (index === 1)
    return 'Толчок';

  if (index === 2)
    return 'Пробуждение';

  return 'Творец';

}


function renderResult() {

  const stage =
    getStage();


  localStorage.setItem(
    'tp_stage',
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


  if (
    stage === 'Автопилот'
  ) {

    title =
      'ТЫ ЖИВЁШЬ НА АВТОПИЛОТЕ';

    text = `

      <p>
        Внешне твоя жизнь может выглядеть нормально.
        Но внутри всё чаще появляется ощущение:
        <strong>«Я живу не свою жизнь».</strong>
      </p>

      <p>
        Автопилот — это состояние,
        в котором человек продолжает идти
        по знакомому маршруту,
        даже когда этот маршрут
        больше ему не подходит.
      </p>

    `;

    button = `

      <button
        class="primary"
        onclick="
          openTransition('Автопилот')
        "
      >
        ХОЧУ ВЫЙТИ ИЗ АВТОПИЛОТА
      </button>

    `;

  }


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
        Что-то разрушилось,
        изменилось или перестало работать
        так, как раньше.
      </p>

      <p>
        Толчок может стать
        началом нового этапа —
        <strong>Пробуждения.</strong>
      </p>

    `;

    button = `

      <button
        class="primary"
        onclick="
          openTransition('Толчок')
        "
      >
        ХОЧУ ПРОЙТИ ТОЛЧОК В ПРОБУЖДЕНИЕ
      </button>

    `;

  }


  if (
    stage === 'Пробуждение'
  ) {

    title =
      'ТЫ В ПРОБУЖДЕНИИ';

    text = `

      <p>
        Ты уже начинаешь задавать себе вопросы:
        чего хочу я?
        Где моё, а где чужое?
      </p>

      <p>
        Но Пробуждение —
        не конечная точка.
      </p>

      <p>
        Следующий шаг —
        перестать только искать ответы
        и начать создавать.
      </p>

    `;

    button = `

      <button
        class="primary"
        onclick="
          openTransition('Пробуждение')
        "
      >
        ХОЧУ ПЕРЕЙТИ В ТВОРЦА
      </button>

    `;

  }


  if (
    stage === 'Творец'
  ) {

    title =
      'ТЫ — ТВОРЕЦ';

    text = `

      <p>
        Ты уже начинаешь понимать,
        что твоя жизнь —
        не просто то,
        что с тобой происходит.
      </p>

      <p>
        Ты можешь выбирать.
        Действовать.
        Создавать.
      </p>

    `;

    button = `

      <button
        class="primary"
        onclick="
          openTransition('Творец')
        "
      >
        ПЕРЕЙТИ К МОЕМУ ПУТИ
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


  if (
    stage === 'Автопилот' ||
    stage === 'Толчок'
  ) {

    w.innerHTML = `

      <div class="result">

        <div class="tag">
          ПЕРЕХОД
        </div>

        <h2>
          ${stage.toUpperCase()} → ПРОБУЖДЕНИЕ
        </h2>

        <p>
          Ты уже увидела главное:
          прежний сценарий больше
          не работает так, как раньше.
        </p>

        <p>
          Здесь тебя ждут 7 последовательных
          этапов с практическими заданиями.
        </p>

        <div class="product-box">

          <div class="tag">
            ТВОЙ СЛЕДУЮЩИЙ УРОВЕНЬ
          </div>

          <h3>
            ПРОБУЖДЕНИЕ
          </h3>

          <p>
            Из «живу по старому сценарию»
            в «начинаю выбирать сама».
          </p>

          <div class="price">
            990 ₽
          </div>

          <button
            class="primary"
            onclick="buyAwakening()"
          >
            🔥 НАЧАТЬ СВОЙ ПЕРЕХОД
          </button>

        </div>

      </div>


      <button
        class="back"
        onclick="renderResult()"
      >
        ← Вернуться к результату
      </button>

    `;

    return;

  }


  if (
    stage === 'Пробуждение' ||
    stage === 'Творец'
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
          Ты уже начала видеть себя
          и свою жизнь по-другому.
        </p>

        <p>
          Следующий шаг —
          от понимания к созданию.
        </p>

        <p>
          Внутри —
          практические задания
          и 7 последовательных медитаций.
        </p>

        <p>
          Ты проходишь их в своём темпе.
        </p>

        <div class="product-box">

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

          <div class="price">
            990 ₽
          </div>

          <button
            class="primary"
            onclick="buyCreator()"
          >
            🔥 ПЕРЕЙТИ В ТВОРЦА
          </button>

        </div>

      </div>


      <button
        class="back"
        onclick="renderResult()"
      >
        ← Вернуться к результату
      </button>

    `;

  }

}


/* =====================================================
   ПОКУПКА
===================================================== */

/*
  ВАЖНО:
  здесь НЕ выдаём доступ.
  Просто отправляем человека на Tribute.

  После подключения подтверждения оплаты
  здесь появится автоматическая активация продукта.
*/

function buyAwakening() {

  openTribute(
    LINKS.transitionAwakening
  );

}


function buyCreator() {

  openTribute(
    LINKS.transitionCreator
  );

}


/* =====================================================
   ЛИЧНЫЙ КАБИНЕТ
===================================================== */

async function renderCabinet() {

  const cabinet =
    document.getElementById(
      'cabinet-wrap'
    );

  if (!cabinet) return;


  cabinet.innerHTML = `

    <div class="result">

      <div class="tag">
        МОЙ ПУТЬ
      </div>

      <h2>
        ТОЧКА ПЕРЕХОДА
      </h2>

      <p>
        Загружаем твой путь...
      </p>

    </div>

  `;


  await loadUser();


  /*
    Если покупка ещё не подтверждена,
    показываем сообщение.
  */

  if (!userProduct) {

    cabinet.innerHTML = `

      <div class="result">

        <div class="tag">
          МОЙ ПУТЬ
        </div>

        <h2>
          ТВОЙ ПУТЬ ЕЩЁ НЕ ОТКРЫТ
        </h2>

        <p>
          Здесь появится приобретённый тобой
          продукт и весь твой прогресс.
        </p>

        <p>
          Сначала пройди тест,
          чтобы определить свой текущий уровень.
        </p>

        <button
          class="primary"
          onclick="
            showScreen('test')
          "
        >
          ПРОЙТИ ТЕСТ
        </button>

      </div>

    `;

    return;

  }


  /*
    Пока показываем первую ветку
    как основной кабинет.
  */

  const total =
    awakeningStages.length;


  const progress =
    Math.min(
      100,
      Math.round(
        (
          currentStage /
          total
        ) * 100
      )
    );


  cabinet.innerHTML = `

    <div class="result">

      <div class="tag">
        МОЙ ПУТЬ
      </div>

      <h2>
        ${getProductTitle()}
      </h2>

      <div class="progress-box">

        <div class="progress-line">

          <span>
            ПРОГРЕСС
          </span>

          <strong>
            ${currentStage} / ${total}
          </strong>

        </div>

        <div class="progress-track">

          <div
            class="progress-fill"
            style="width:${progress}%"
          ></div>

        </div>

      </div>


      <div class="stages">

        ${awakeningStages
          .map(
            (item, index) => {

              const number =
                index + 1;

              const unlocked =
                number <=
                currentStage + 1;

              const completed =
                number <=
                currentStage;


              return `

                <button
                  class="stage-card"
                  ${
                    unlocked
                      ? `onclick="openStage(${index})"`
                      : 'disabled'
                  }
                >

                  <span class="stage-number">

                    ${
                      completed
                        ? '✓'
                        : unlocked
                        ? number
                        : '🔒'
                    }

                  </span>

                  <span>
                    ${item.title}
                  </span>

                </button>

              `;

            }
          )
          .join('')}

      </div>

    </div>

  `;

}


/* =====================================================
   НАЗВАНИЕ ПРОДУКТА
===================================================== */

function getProductTitle() {

  if (
    userProduct ===
    'creator'
  ) {

    return `
      ПРОБУЖДЕНИЕ → ТВОРЕЦ
    `;

  }


  return `
    АВТОПИЛОТ / ТОЛЧОК → ПРОБУЖДЕНИЕ
  `;

}


/* =====================================================
   ОТКРЫТЬ ЭТАП
===================================================== */

function openStage(index) {

  const stage =
    awakeningStages[index];

  if (!stage) return;


  const number =
    index + 1;


  if (
    number >
    currentStage + 1
  ) {

    return;

  }


  const cabinet =
    document.getElementById(
      'cabinet-wrap'
    );

  if (!cabinet) return;


  cabinet.innerHTML = `

    <div class="result">

      <div class="tag">
        ЭТАП ${number} ИЗ 7
      </div>

      <h2>
        ${stage.title}
      </h2>

      ${stage.text}


      <div class="practice-box">

        ${stage.practice}

      </div>


      <button
        class="primary"
        onclick="
          completeStage(${number})
        "
      >
        ✓ Я ПРОШЛА ЭТАП
      </button>


      <button
        class="back"
        style="margin-top:18px"
        onclick="
          renderCabinet()
        "
      >
        ← МОЙ ПУТЬ
      </button>

    </div>

  `;

}


/* =====================================================
   СОХРАНИТЬ ПРОГРЕСС
===================================================== */

async function saveProgress(stage) {

  currentStage =
    stage;


  localStorage.setItem(
    'tp_current_stage',
    String(stage)
  );


  if (
    !currentUser ||
    !supabaseClient
  ) {

    return;

  }


  try {

    const { error } =
      await supabaseClient
        .from('users')
        .update({

          current_stage:
            stage

        })
        .eq(
          'telegram_id',
          String(
            currentUser.id
          )
        );


    if (error) {

      console.error(
        'Сохранение прогресса:',
        error
      );

    }

  } catch (error) {

    console.error(
      error
    );

  }

}


/* =====================================================
   ЗАВЕРШИТЬ ЭТАП
===================================================== */

async function completeStage(number) {

  if (
    number >
    currentStage + 1
  ) {

    return;

  }


  await saveProgress(
    number
  );


  if (
    number ===
    awakeningStages.length
  ) {

    renderFinished();

    return;

  }


  renderCabinet();

}


/* =====================================================
   ФИНИШ
===================================================== */

function renderFinished() {

  const cabinet =
    document.getElementById(
      'cabinet-wrap'
    );

  if (!cabinet) return;


  cabinet.innerHTML = `

    <div class="result">

      <div class="tag">
        ПЕРЕХОД ЗАВЕРШЁН
      </div>

      <h2>
        ТЫ ДОШЛА ДО ПРОБУЖДЕНИЯ
      </h2>

      <p>
        Ты увидела,
        что больше не работает.
      </p>

      <p>
        Увидела свои сценарии.
      </p>

      <p>
        Отделила своё от чужого.
      </p>

      <p>
        И сделала выбор.
      </p>

      <p>
        Теперь важно не возвращаться
        к прежнему сценарию автоматически,
        а продолжать выбирать себя.
      </p>

      <button
        class="primary"
        onclick="
          showScreen('home')
        "
      >
        НА ГЛАВНУЮ
      </button>

    </div>

  `;

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
   СБРОС ТЕСТА
===================================================== */

function resetTest() {

  answers = [];

  localStorage.removeItem(
    'tp_stage'
  );

  renderTest();

}
