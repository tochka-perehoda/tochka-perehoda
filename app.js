/* =====================================================
   ТОЧКА ПЕРЕХОДА
   APP.JS

   ТЕСТ:
   Автопилот / Толчок / Пробуждение / Творец

   ПРОДУКТ:
   7 этапов

   ДОСТУП:
   access_awakening
   access_creator

   ВАЖНО:
   - результат теста НЕ является покупкой
   - повторный тест НЕ сбрасывает прогресс
   - покупка НЕ зависит от результата теста
   - 7 этапов открываются только при наличии доступа
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
   PRODUCT IDS TRIBUTE
===================================================== */

const PRODUCT_IDS = {

  awakening: '156084',

  /*
    ID второго продукта пока неизвестен.
    Когда получим его из Tribute,
    просто вставим сюда.
  */

  creator: null

};


/* =====================================================
   7 ЭТАПОВ
===================================================== */

const stages = [

  {
    number: 1,

    title: 'Кто я?',

    text: `
      <p>
        Любой настоящий переход начинается
        с вопроса: <strong>кто я сейчас?</strong>
      </p>

      <p>
        Не та, кем меня привыкли видеть.
        Не та, которой нужно быть для семьи,
        работы, отношений или окружающих.
      </p>

      <p>
        Не должность. Не статус.
        Не набор ролей и достижений.
      </p>

      <p>
        Иногда человек прекрасно умеет
        соответствовать чужим ожиданиям,
        но почти перестаёт слышать себя.
      </p>

      <p>
        Здесь тебе не нужно сразу находить
        правильный ответ.
        Сначала нужно увидеть,
        где заканчивается привычная роль
        и начинаешься ты.
      </p>
    `,

    practice: `
      <p>
        <strong>ПРАКТИКА «КТО Я БЕЗ РОЛЕЙ»</strong>
      </p>

      <p>
        Ответь письменно:
      </p>

      <p>
        <strong>
          «Кто я, если убрать мои роли,
          обязанности и ожидания других?»
        </strong>
      </p>

      <p>
        Напиши минимум 10 ответов.
        Не анализируй их.
        Пиши первое, что приходит.
      </p>
    `

  },


  {
    number: 2,

    title: 'Чистка поля',

    text: `
      <p>
        Когда ты начинаешь видеть себя,
        становится заметно,
        сколько всего лишнего ты несёшь.
      </p>

      <p>
        Старые правила.
        Страхи.
        Чужие ожидания.
        Незавершённые истории.
        Сценарии, которые давно перестали
        быть твоими.
      </p>

      <p>
        Невозможно войти в новое,
        продолжая всеми силами держаться
        за старое.
      </p>

      <p>
        Поэтому сейчас мы не создаём новое.
        Сначала освобождаем пространство.
      </p>
    `,

    practice: `
      <p>
        <strong>
          ПРАКТИКА «ЧТО Я БОЛЬШЕ НЕ НЕСУ»
        </strong>
      </p>

      <p>
        Создай три списка:
      </p>

      <p>
        <strong>
          Я больше не хочу...
        </strong>
      </p>

      <p>
        <strong>
          Это вообще не моё...
        </strong>
      </p>

      <p>
        <strong>
          Я готова отпустить...
        </strong>
      </p>

      <p>
        Выбери минимум три пункта,
        которые больше не должны переходить
        вместе с тобой дальше.
      </p>
    `

  },


  {
    number: 3,

    title: 'Я выбираю себя',

    text: `
      <p>
        После того как ты увидела старое,
        возникает следующий вопрос:
      </p>

      <p>
        <strong>
          «А чего хочу именно я?»
        </strong>
      </p>

      <p>
        Не что правильно.
        Не что удобно.
        Не что ждут другие.
      </p>

      <p>
        А чего хочешь ты.
      </p>

      <p>
        Выбор себя начинается
        с честности с собой.
      </p>
    `,

    practice: `
      <p>
        <strong>
          ПРАКТИКА «ЧЕГО ХОЧУ Я?»
        </strong>
      </p>

      <p>
        Закончи фразы:
      </p>

      <p>
        <strong>Я хочу...</strong>
      </p>

      <p>
        <strong>Я больше не хочу...</strong>
      </p>

      <p>
        <strong>Мне действительно важно...</strong>
      </p>

      <p>
        <strong>
          Если бы мне не нужно было
          никому ничего доказывать, я бы...
        </strong>
      </p>

      <p>
        <strong>
          Если бы я не боялась осуждения, я бы...
        </strong>
      </p>
    `

  },


  {
    number: 4,

    title: 'Моё «нет»',

    text: `
      <p>
        Невозможно создать новое,
        продолжая соглашаться со всем старым.
      </p>

      <p>
        Иногда человек говорит «да»,
        хотя внутри всё говорит «нет».
      </p>

      <p>
        Потому что страшно обидеть.
        Страшно потерять.
        Страшно показаться плохой.
      </p>

      <p>
        Но твоё «нет» — это не агрессия.
        Это граница.
        Это право сказать:
        <strong>«Я тоже имею значение».</strong>
      </p>
    `,

    practice: `
      <p>
        <strong>
          ПРАКТИКА «МОЁ НЕТ»
        </strong>
      </p>

      <p>
        Запиши:
      </p>

      <p>
        <strong>Я больше не согласна...</strong>
      </p>

      <p>
        <strong>Я больше не позволяю...</strong>
      </p>

      <p>
        <strong>Я больше не обязана...</strong>
      </p>

      <p>
        Затем выбери одну реальную ситуацию,
        где ты обычно говоришь «да»,
        хотя хочешь сказать «нет».
      </p>
    `

  },


  {
    number: 5,

    title: 'Наблюдатель',

    text: `
      <p>
        Здесь появляется один
        из самых важных навыков.
      </p>

      <p>
        <strong>
          Ты — не твои мысли.
        </strong>
      </p>

      <p>
        Мысль может появиться автоматически.
        Страх может возникнуть мгновенно.
        Реакция может включиться раньше,
        чем ты успеешь её осознать.
      </p>

      <p>
        Но между событием и твоим действием
        есть пространство.
      </p>

      <p>
        Именно там находится выбор.
      </p>
    `,

    practice: `
      <p>
        <strong>
          ПРАКТИКА «ПАУЗА»
        </strong>
      </p>

      <p>
        Поймай в течение дня
        три ситуации с сильной реакцией.
      </p>

      <p>
        Запиши:
      </p>

      <p>
        Что произошло?<br>
        Что я подумала?<br>
        Что почувствовала?<br>
        Что захотела сделать автоматически?<br>
        Что я выбрала сделать?
      </p>

      <p>
        Не исправляй себя.
        Просто наблюдай.
      </p>
    `

  },


  {
    number: 6,

    title: 'Моя жизнь',

    text: `
      <p>
        Осознание ничего не меняет,
        если оно не становится частью жизни.
      </p>

      <p>
        Теперь посмотрим на внешний мир:
        отношения, деньги, работа,
        тело, окружение, дом,
        образ жизни.
      </p>

      <p>
        Не спрашивай:
        «Как сделать идеальную жизнь?»
      </p>

      <p>
        Спроси:
        <strong>
          «Как выглядит жизнь,
          которая действительно моя?»
        </strong>
      </p>
    `,

    practice: `
      <p>
        <strong>
          ПРАКТИКА «ОДИН РЕАЛЬНЫЙ ШАГ»
        </strong>
      </p>

      <p>
        Выбери одну сферу жизни.
      </p>

      <p>
        Ответь:
      </p>

      <p>
        Что меня здесь больше не устраивает?<br>
        Чего я хочу вместо этого?<br>
        Что зависит от меня?<br>
        Что я могу сделать в ближайшие 24 часа?
      </p>

      <p>
        И обязательно сделай этот шаг.
      </p>
    `

  },


  {
    number: 7,

    title: 'Мой новый фундамент',

    text: `
      <p>
        Ты дошла до последнего этапа.
      </p>

      <p>
        Но это не конец пути.
      </p>

      <p>
        Теперь нужно собрать то,
        что ты увидела о себе,
        в новый способ жить.
      </p>

      <p>
        Новый фундамент строится
        не из обещаний.
        Он строится из решений,
        действий, границ
        и ответственности за свой выбор.
      </p>

      <p>
        Посмотри назад:
        что изменилось?
        Что ты теперь видишь иначе?
        К чему больше не готова возвращаться?
      </p>

      <p>
        И главное:
        <strong>
          на что ты теперь хочешь опираться?
        </strong>
      </p>
    `,

    practice: `
      <p>
        <strong>
          ФИНАЛЬНАЯ ПРАКТИКА
          «МОЙ НОВЫЙ ФУНДАМЕНТ»
        </strong>
      </p>

      <p>
        Закончи:
      </p>

      <p>
        <strong>Я больше не...</strong><br><br>
        <strong>Я выбираю...</strong><br><br>
        <strong>Я разрешаю себе...</strong><br><br>
        <strong>Я больше не позволяю...</strong><br><br>
        <strong>Для меня важно...</strong><br><br>
        <strong>Когда мне страшно, я...</strong><br><br>
        <strong>
          Когда я не знаю, что делать, я...
        </strong><br><br>
        <strong>Мой следующий шаг...</strong>
      </p>

      <p>
        Сохрани эти ответы.
        Это твоя точка опоры
        после прохождения пути.
      </p>
    `

  }

];


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
   LOCAL STORAGE
===================================================== */

function getTelegramId() {

  const user =
    tg?.initDataUnsafe?.user;

  return user?.id
    ? String(user.id)
    : null;

}


function getLocalKey() {

  const id =
    getTelegramId();

  return id
    ? 'tp_user_' + id
    : 'tp_guest';

}


function readLocal() {

  try {

    const raw =
      localStorage.getItem(
        getLocalKey()
      );

    return raw
      ? JSON.parse(raw)
      : {};

  } catch {

    return {};

  }

}


function writeLocal(data) {

  try {

    const current =
      readLocal();

    localStorage.setItem(
      getLocalKey(),
      JSON.stringify({
        ...current,
        ...data
      })
    );

  } catch (error) {

    console.error(
      'Local storage error:',
      error
    );

  }

}


/* =====================================================
   ПОЛЬЗОВАТЕЛЬ
===================================================== */

async function loadUser() {

  const telegramId =
    getTelegramId();


  if (!telegramId) {

    return null;

  }


  const local =
    readLocal();


  if (!db) {

    return {

      telegram_id:
        telegramId,

      progress:
        Number(
          local.progress || 0
        ),

      current_lesson:
        Number(
          local.current_lesson || 0
        ),

      access_awakening:
        Boolean(
          local.access_awakening
        ),

      access_creator:
        Boolean(
          local.access_creator
        )

    };

  }


  /*
    ВАЖНО:
    НЕ выбираем stage,
    потому что такой колонки
    в твоей таблице нет.
  */

  const {
    data,
    error
  } = await db
    .from('users')
    .select(`
      telegram_id,
      progress,
      current_lesson,
      access_awakening,
      access_creator
    `)
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


    return {

      telegram_id:
        telegramId,

      progress:
        Number(
          local.progress || 0
        ),

      current_lesson:
        Number(
          local.current_lesson || 0
        ),

      access_awakening:
        Boolean(
          local.access_awakening
        ),

      access_creator:
        Boolean(
          local.access_creator
        )

    };

  }


  if (!data) {

    return null;

  }


  /*
    Обновляем локальную копию,
    но не теряем результаты
    тестов.
  */

  writeLocal({

    progress:
      Number(
        data.progress || 0
      ),

    current_lesson:
      Number(
        data.current_lesson || 0
      ),

    access_awakening:
      Boolean(
        data.access_awakening
      ),

    access_creator:
      Boolean(
        data.access_creator
      )

  });


  return data;

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


  const existing =
    await loadUser();


  if (existing) {

    return existing;

  }


  const local =
    readLocal();


  const newUser = {

    telegram_id:
      telegramId,

    progress:
      Number(
        local.progress || 0
      ),

    current_lesson:
      Number(
        local.current_lesson || 0
      ),

    access_awakening:
      Boolean(
        local.access_awakening
      ),

    access_creator:
      Boolean(
        local.access_creator
      )

  };


  if (!db) {

    writeLocal(
      newUser
    );

    return newUser;

  }


  const {
    data,
    error
  } = await db
    .from('users')
    .insert(
      newUser
    )
    .select(`
      telegram_id,
      progress,
      current_lesson,
      access_awakening,
      access_creator
    `)
    .single();


  if (error) {

    console.error(
      'Ошибка создания пользователя:',
      error
    );


    writeLocal(
      newUser
    );

    return newUser;

  }


  writeLocal(
    data
  );


  return data;

}


/* =====================================================
   СОХРАНЕНИЕ ПРОГРЕССА
===================================================== */

async function saveProgress(
  progress,
  currentLesson
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
    currentLesson !== undefined &&
    currentLesson !== null

      ? Number(
          currentLesson
        )

      : Number(
          current?.current_lesson ||
          0
        );


  /*
    Сначала сохраняем локально.
  */

  writeLocal({

    progress:
      finalProgress,

    current_lesson:
      finalLesson

  });


  if (!db) {

    return true;

  }


  const {
    error
  } = await db
    .from('users')
    .update({

      progress:
        finalProgress,

      current_lesson:
        finalLesson,

      updated_at:
        new Date().toISOString()

    })
    .eq(
      'telegram_id',
      telegramId
    );


  if (error) {

    console.error(
      'Ошибка сохранения прогресса:',
      error
    );

  }


  return true;

}


/* =====================================================
   СОХРАНЕНИЕ РЕЗУЛЬТАТА ТЕСТА
===================================================== */

function getTestHistory() {

  const local =
    readLocal();


  return {

    initialStage:
      local.initial_stage ||
      null,

    finalStage:
      local.final_stage ||
      null,

    testCount:
      Number(
        local.test_count || 0
      )

  };

}


async function saveInitialTestResult(
  stage
) {

  const history =
    getTestHistory();


  /*
    Первый тест сохраняется
    только один раз.

    Повторные тесты не заменяют
    исходную точку.
  */

  if (
    !history.initialStage
  ) {

    writeLocal({

      initial_stage:
        stage,

      test_count:
        1

    });

  } else {

    writeLocal({

      test_count:
        history.testCount + 1

    });

  }


  /*
    Последний результат тоже сохраняем.
  */

  writeLocal({

    current_test_stage:
      stage

  });

}


async function saveFinalTestResult(
  stage
) {

  writeLocal({

    final_stage:
      stage,

    current_test_stage:
      stage

  });


  /*
    Здесь намеренно НЕ меняем
    progress / current_lesson.
  */

}


/* =====================================================
   НАВИГАЦИЯ
===================================================== */

function showScreen(
  name
) {

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

}


/* =====================================================
   TRIBUTE
===================================================== */

function openTribute(
  url
) {

  if (!url) {
    return;
  }


  if (
    tg &&
    typeof tg.openLink === 'function'
  ) {

    tg.openLink(
      url
    );

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
   ДОСТУП
===================================================== */

async function getAccess() {

  const user =
    await loadUser();


  return {

    awakening:
      Boolean(
        user?.access_awakening
      ),

    creator:
      Boolean(
        user?.access_creator
      )

  };

}


/* =====================================================
   ОТКРЫТИЕ ПРОДУКТА
===================================================== */

async function openProduct(
  type
) {

  const access =
    await getAccess();


  if (
    type === 'awakening'
  ) {

    if (
      access.awakening
    ) {

      await openCabinet();

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

    if (
      access.creator
    ) {

      await openCabinet();

      return;

    }


    /*
      Второй продукт покупается
      отдельно.
    */

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
    questions[
      number
    ];


  wrap.innerHTML = `

    <div class="progress">
      ВОПРОС
      ${number + 1}
      ИЗ
      ${questions.length}
    </div>

    <div class="question">

      <h3>
        ${question.text}
      </h3>

      <div class="answers">

        ${question.answers
          .map(
            (
              answer,
              index
            ) => `

              <button
                class="answer"
                onclick="
                  chooseAnswer(${index})
                "
              >

                ${String.fromCharCode(
                  65 + index
                )}.
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

function chooseAnswer(
  index
) {

  answers.push(
    index
  );

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


  answers.forEach(
    answer => {

      if (
        answer >= 0 &&
        answer <= 4
      ) {

        scores[
          answer
        ]++;

      }

    }
  );


  const max =
    Math.max(
      ...scores
    );


  const index =
    scores.indexOf(
      max
    );


  if (
    index === 0
  ) {

    return 'Автопилот';

  }


  if (
    index === 1
  ) {

    return 'Толчок';

  }


  if (
    index === 2
  ) {

    return 'Пробуждение';

  }


  return 'Творец';

}


/* =====================================================
   ОПРЕДЕЛЕНИЕ:
   ПЕРВЫЙ ЭТО ТЕСТ ИЛИ ПОВТОРНЫЙ
===================================================== */

function isFinalRetest() {

  const local =
    readLocal();


  return Boolean(
    local.final_retest_mode
  );

}


/* =====================================================
   РЕЗУЛЬТАТ ТЕСТА
===================================================== */

async function renderResult() {

  const stage =
    calculateStage();


  const user =
    await loadUser();


  const access =
    await getAccess();


  const finalRetest =
    isFinalRetest();


  if (
    finalRetest
  ) {

    await saveFinalTestResult(
      stage
    );

  } else {

    await saveInitialTestResult(
      stage
    );

  }


  const wrap =
    document.getElementById(
      'test-wrap'
    );


  if (!wrap) {
    return;
  }


  /*
    ПОВТОРНЫЙ ТЕСТ
  */

  if (
    finalRetest
  ) {

    const history =
      getTestHistory();


    wrap.innerHTML = `

      <div class="result">

        <div class="tag">
          РЕЗУЛЬТАТ ПОВТОРНОГО ТЕСТА
        </div>

        <h2>
          ${stage}
        </h2>

        ${
          history.initialStage
            ? `
              <p>
                <strong>
                  В начале пути:
                </strong>
                ${history.initialStage}
              </p>
            `
            : ''
        }

        <p>
          <strong>
            Сейчас:
          </strong>
          ${stage}
        </p>

        <h3>
          Сравни свою точку старта
          с тем, где ты находишься сейчас.
        </h3>

        <button
          class="primary"
          onclick="openCabinet()"
        >
          ВЕРНУТЬСЯ В МОЙ ПУТЬ
        </button>

      </div>

    `;


    return;

  }


  /*
    ПЕРВЫЙ ТЕСТ
  */

  let title = '';

  let text = '';

  let action = '';


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
            onclick="
              openProduct('awakening')
            "
          >
            НАЧАТЬ ПЕРЕХОД
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
            ПРОДОЛЖИТЬ МОЙ ПУТЬ
          </button>
        `

        : `
          <button
            class="primary"
            onclick="
              openProduct('awakening')
            "
          >
            ПЕРЕЙТИ В ПРОБУЖДЕНИЕ
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


    action =
      access.creator

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
            onclick="
              openProduct('creator')
            "
          >
            ПЕРЕЙТИ В ТВОРЦА
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


    action =
      access.creator

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
            onclick="
              openProduct('creator')
            "
          >
            ПЕРЕЙТИ В ТВОРЦА
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
        Открой Mini App через Telegram.
      </p>

    `;


    renderStageList(
      0,
      false
    );


    return;

  }


  const local =
    readLocal();


  const currentStage =
    local.current_test_stage ||
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
    currentStage;


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


  /*
    НЕТ ПОКУПКИ
  */

  if (
    !accessAwakening &&
    !accessCreator
  ) {

    message.innerHTML = `

      <h3>
        ДОСТУП ЕЩЁ НЕ ОТКРЫТ
      </h3>

      <p>
        Тест бесплатный.
        После него ты можешь приобрести
        подходящую программу.
      </p>

      <button
        class="primary"
        onclick="
          showScreen('test')
        "
      >
        ОТКРЫТЬ РЕЗУЛЬТАТ ТЕСТА
      </button>

    `;


    renderStageList(
      0,
      false
    );


    return;

  }


  /*
    ЕСТЬ ОПЛАЧЕННЫЙ ДОСТУП
  */

  message.innerHTML = `

    <h3>
      ТВОЙ ПУТЬ ОТКРЫТ
    </h3>

    <p>
      Твой результат теста:
      <strong>
        ${currentStage}
      </strong>
    </p>

    <p>
      Прогресс сохраняется автоматически.
    </p>

  `;


  renderStageList(
    progress,
    true
  );

}


/* =====================================================
   7 ЭТАПОВ
===================================================== */

function renderStageList(
  progress,
  hasAccess
) {

  const element =
    document.getElementById(
      'stage-list'
    );


  if (!element) {
    return;
  }


  element.innerHTML =
    stages
      .map(
        stage => {

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
            hasAccess &&
            progress >= complete;


          const isOpen =
            hasAccess &&
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

              <span
                class="stage-number"
              >
                ${stage.number}
              </span>


              <span
                class="stage-name"
              >
                ${stage.title}
              </span>


              <span
                class="stage-state"
              >
                ${state}
              </span>

            </button>

          `;

        }
      )
      .join('');


  /*
    Финальная кнопка технически появляется
    только после 100%.
  */

  if (
    hasAccess &&
    progress >= 100
  ) {

    element.innerHTML += `

      <div
        class="final-path"
        style="margin-top:25px"
      >

        <div class="tag">
          ПУТЬ ПРОЙДЕН
        </div>

        <h3>
          100% ЗАВЕРШЕНО
        </h3>

        <p>
          Теперь ты можешь пройти тест повторно
          и сравнить свою точку старта
          с текущим состоянием.
        </p>

        <button
          class="primary"
          onclick="
            startFinalRetest()
          "
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
    !user.access_awakening &&
    !user.access_creator
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
        ЭТАП
        ${lessonNumber}
        ИЗ 7
      </div>

      <h2>
        ${stage.title}
      </h2>

      ${stage.text}

      <div class="lesson-practice">

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

  const user =
    await loadUser();


  if (
    !user
  ) {

    return;

  }


  if (
    !user.access_awakening &&
    !user.access_creator
  ) {

    return;

  }


  if (
    lessonNumber < 1 ||
    lessonNumber > 7
  ) {

    return;

  }


  const newProgress =
    Math.round(
      (
        lessonNumber
        /
        stages.length
      ) * 100
    );


  await saveProgress(
    newProgress,
    lessonNumber
  );


  await openCabinet();

}


/* =====================================================
   ПОВТОРНЫЙ ТЕСТ
===================================================== */

async function startFinalRetest() {

  const user =
    await loadUser();


  if (!user) {
    return;
  }


  const progress =
    Number(
      user.progress || 0
    );


  if (
    progress < 100
  ) {

    return;

  }


  /*
    Включаем режим повторного теста.
  */

  writeLocal({

    final_retest_mode:
      true

  });


  answers = [];


  showScreen(
    'test'
  );

}


/* =====================================================
   СБРОС СОСТОЯНИЯ ТЕСТА
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


    await ensureUser();

  }
);
