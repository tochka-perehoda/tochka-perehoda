/* =====================================================
   ТОЧКА ПЕРЕХОДА
   APP.JS

   4 РЕЗУЛЬТАТА ТЕСТА:
   Автопилот / Толчок / Пробуждение / Творец

   2 ВЕТКИ:
   Автопилот + Толчок -> ПРОБУЖДЕНИЕ
   Пробуждение + Творец -> ТВОРЕЦ

   ВСЕГО:
   14 этапов = 2 ветки × 7 этапов
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
   PRODUCT IDS
===================================================== */

const PRODUCT_IDS = {

  awakening: '156084',

  creator: null

};


/* =====================================================
   ВЕТКА 1
   АВТОПИЛОТ / ТОЛЧОК -> ПРОБУЖДЕНИЕ

   7 ЭТАПОВ
===================================================== */

const awakeningStages = [

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
    `,

    voiceUrl: '',

    meditationUrl: ''
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
        <strong>Я больше не хочу...</strong>
      </p>

      <p>
        <strong>Это вообще не моё...</strong>
      </p>

      <p>
        <strong>Я готова отпустить...</strong>
      </p>

      <p>
        Выбери минимум три пункта,
        которые больше не должны
        переходить вместе с тобой дальше.
      </p>
    `,

    voiceUrl: '',

    meditationUrl: ''
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
        <strong>«А чего хочу именно я?»</strong>
      </p>

      <p>
        Не что правильно.
        Не что удобно.
        Не что ждут другие.
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
          никому ничего доказывать,
          я бы...
        </strong>
      </p>

      <p>
        <strong>
          Если бы я не боялась осуждения,
          я бы...
        </strong>
      </p>
    `,

    voiceUrl: '',

    meditationUrl: ''
  },


  {
    number: 4,

    title: 'Моё «нет»',

    text: `
      <p>
        Невозможно создать новое,
        продолжая соглашаться
        со всем старым.
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
        <strong>ПРАКТИКА «МОЁ НЕТ»</strong>
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
    `,

    voiceUrl: '',

    meditationUrl: ''
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
        <strong>Ты — не твои мысли.</strong>
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
        Именно там находится выбор.
      </p>
    `,

    practice: `
      <p>
        <strong>ПРАКТИКА «ПАУЗА»</strong>
      </p>

      <p>
        Поймай в течение дня три ситуации
        с сильной реакцией.
      </p>

      <p>
        Запиши:
        что произошло?
        Что я подумала?
        Что почувствовала?
        Что захотела сделать автоматически?
        Что я выбрала сделать?
      </p>

      <p>
        Не исправляй себя.
        Просто наблюдай.
      </p>
    `,

    voiceUrl: '',

    meditationUrl: ''
  },


  {
    number: 6,

    title: 'Моя жизнь',

    text: `
      <p>
        Осознание ничего не меняет,
        если оно не становится
        частью жизни.
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
        Что меня здесь больше не устраивает?
        <br>
        Чего я хочу вместо этого?
        <br>
        Что зависит от меня?
        <br>
        Что я могу сделать
        в ближайшие 24 часа?
      </p>

      <p>
        И обязательно сделай этот шаг.
      </p>
    `,

    voiceUrl: '',

    meditationUrl: ''
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

      <p><strong>Я больше не...</strong></p>
      <p><strong>Я выбираю...</strong></p>
      <p><strong>Я разрешаю себе...</strong></p>
      <p><strong>Я больше не позволяю...</strong></p>
      <p><strong>Для меня важно...</strong></p>
      <p><strong>Когда мне страшно, я...</strong></p>
      <p><strong>Когда я не знаю, что делать, я...</strong></p>
      <p><strong>Мой следующий шаг...</strong></p>

      <p>
        Сохрани эти ответы.
        Это твоя точка опоры
        после прохождения пути.
      </p>
    `,

    voiceUrl: '',

    meditationUrl: ''
  }

];


/* =====================================================
   ВЕТКА 2
   ПРОБУЖДЕНИЕ / ТВОРЕЦ -> ТВОРЕЦ

   7 ЭТАПОВ

   ВАЖНО:
   здесь есть И ПРАКТИКА,
   И ГОЛОСОВАЯ МЕДИТАЦИЯ.
===================================================== */

const creatorStages = [

  {
    number: 1,

    title: 'Я выбираю свою реальность',

    text: `
      <p>
        Ты уже увидела, что прежняя жизнь
        не обязана оставаться твоей навсегда.
      </p>

      <p>
        Теперь начинается следующий уровень:
        не только понимать,
        а <strong>создавать</strong>.
      </p>

      <p>
        Первый вопрос Творца:
        какую реальность я действительно выбираю?
      </p>
    `,

    practice: `
      <p>
        <strong>
          ПРАКТИКА «МОЯ РЕАЛЬНОСТЬ»
        </strong>
      </p>

      <p>
        Опиши свою жизнь через год так,
        как будто тебе не нужно
        соответствовать чужим ожиданиям.
      </p>

      <p>
        Что есть в твоей жизни?
        <br>
        Как ты живёшь?
        <br>
        С кем?
        <br>
        Чем занимаешься?
        <br>
        Что чувствуешь?
      </p>

      <p>
        Не пиши «идеальную жизнь».
        Пиши <strong>свою</strong>.
      </p>
    `,

    voiceUrl: '',

    meditationUrl: ''
  },


  {
    number: 2,

    title: 'Моё желание',

    text: `
      <p>
        Не каждое желание действительно твоё.
      </p>

      <p>
        Иногда мы хотим то,
        что красиво выглядит,
        что принято хотеть
        или что должно доказать
        нашу ценность.
      </p>

      <p>
        Творец начинает
        с честного контакта
        со своим желанием.
      </p>
    `,

    practice: `
      <p>
        <strong>
          ПРАКТИКА «Я ХОЧУ»
        </strong>
      </p>

      <p>
        Выбери одно желание и ответь:
      </p>

      <p>
        Чего я хочу?
        <br>
        Зачем мне это?
        <br>
        Что я хочу почувствовать,
        когда это получу?
        <br>
        Это действительно моё
        или я пытаюсь кому-то
        что-то доказать?
      </p>
    `,

    voiceUrl: '',

    meditationUrl: ''
  },


  {
    number: 3,

    title: 'Мой выбор',

    text: `
      <p>
        Пробуждение без действий
        остаётся только осознанием.
      </p>

      <p>
        На этом этапе ты переходишь
        от «я понимаю»
        к <strong>«я выбираю»</strong>.
      </p>

      <p>
        Выбор — это ответственность
        за направление своей жизни.
      </p>
    `,

    practice: `
      <p>
        <strong>
          ПРАКТИКА «ОДНО РЕШЕНИЕ»
        </strong>
      </p>

      <p>
        Выбери одно решение,
        которое ты давно откладываешь.
      </p>

      <p>
        Не составляй идеальный план.
        Сделай
        <strong>
          первый конкретный шаг сегодня
        </strong>.
      </p>

      <p>
        Запиши:
        что я решила?
        Что я сделаю?
        Когда именно?
      </p>
    `,

    voiceUrl: '',

    meditationUrl: ''
  },


  {
    number: 4,

    title: 'Моя энергия',

    text: `
      <p>
        Творец не может создавать,
        если вся его энергия уходит
        на прошлое, страх, контроль
        и попытки удержать
        то, что уже закончилось.
      </p>

      <p>
        Сейчас мы смотрим,
        куда ты отдаёшь свою силу.
      </p>
    `,

    practice: `
      <p>
        <strong>
          ПРАКТИКА «КУДА УХОДИТ МОЯ СИЛА»
        </strong>
      </p>

      <p>
        Запиши три главных
        источника утечки энергии.
      </p>

      <p>
        Рядом напиши:
        что я могу перестать делать,
        изменить или ограничить?
      </p>

      <p>
        Выбери одну утечку
        и начни возвращать себе энергию
        уже сегодня.
      </p>
    `,

    voiceUrl: '',

    meditationUrl: ''
  },


  {
    number: 5,

    title: 'Я действую',

    text: `
      <p>
        <strong>
          Творец — это не тот,
          кто много осознал.
          Творец — тот, кто создаёт.
        </strong>
      </p>

      <p>
        Теперь действие становится
        частью твоего нового состояния.
      </p>
    `,

    practice: `
      <p>
        <strong>
          ПРАКТИКА «СОЗДАЙ ДВИЖЕНИЕ»
        </strong>
      </p>

      <p>
        Выбери одну сферу жизни,
        которую хочешь изменить.
      </p>

      <p>
        Сделай сегодня одно действие,
        после которого реальность
        действительно станет другой.
      </p>

      <p>
        Не планируй действие.
        <strong>Сделай его.</strong>
      </p>
    `,

    voiceUrl: '',

    meditationUrl: ''
  },


  {
    number: 6,

    title: 'Моя новая реальность',

    text: `
      <p>
        Посмотри, что уже изменилось.
      </p>

      <p>
        Не обесценивай маленькие изменения.
        Именно из них складывается
        новая реальность.
      </p>

      <p>
        Теперь важно не вернуться
        автоматически в старую версию себя.
      </p>
    `,

    practice: `
      <p>
        <strong>
          ПРАКТИКА «БЫЛО → ЕСТЬ → БУДЕТ»
        </strong>
      </p>

      <p>
        Сравни три точки:
      </p>

      <p>
        <strong>Как было.</strong>
        <br>
        <strong>Как есть сейчас.</strong>
        <br>
        <strong>
          Что я выбираю создавать дальше.
        </strong>
      </p>

      <p>
        Запиши минимум по три пункта.
      </p>
    `,

    voiceUrl: '',

    meditationUrl: ''
  },


  {
    number: 7,

    title: 'Я — Творец',

    text: `
      <p>
        Финал этой ветки —
        не обещание, что жизнь
        станет идеальной.
      </p>

      <p>
        Это понимание:
        <strong>
          я могу влиять на свою жизнь
          через свои выборы и действия.
        </strong>
      </p>

      <p>
        Теперь твоя задача —
        продолжать создавать,
        а не ждать разрешения
        на свою жизнь.
      </p>
    `,

    practice: `
      <p>
        <strong>
          ФИНАЛЬНАЯ ПРАКТИКА
          «Я СОЗДАЮ СВОЮ ЖИЗНЬ»
        </strong>
      </p>

      <p>
        Создай свой личный манифест:
      </p>

      <p>
        <strong>Кто я?</strong>
        <br>
        <strong>Чего я хочу?</strong>
        <br>
        <strong>Что я выбираю?</strong>
        <br>
        <strong>Что я больше не принимаю?</strong>
        <br>
        <strong>Во что я верю?</strong>
        <br>
        <strong>Какие действия я совершаю?</strong>
        <br>
        <strong>Какую жизнь я создаю?</strong>
      </p>

      <p>
        Сохрани этот текст как
        свою новую точку опоры.
      </p>
    `,

    voiceUrl: '',

    meditationUrl: ''
  }

];


/* =====================================================
   ГЛАВНАЯ ЛОГИКА ВЕТОК

   ЭТО ВАЖНО:
===================================================== */

function getPathKey(stage) {

  // Автопилот -> Пробуждение
  if (stage === 'Автопилот') {
    return 'awakening';
  }

  // Толчок -> Пробуждение
  if (stage === 'Толчок') {
    return 'awakening';
  }

  // Пробуждение -> Творец
  if (stage === 'Пробуждение') {
    return 'creator';
  }

  // Творец -> Творец
  if (stage === 'Творец') {
    return 'creator';
  }

  return null;
}


/* =====================================================
   ПОЛУЧИТЬ ЭТАПЫ НУЖНОЙ ВЕТКИ
===================================================== */

function getStagesForPath(path) {

  if (path === 'awakening') {
    return awakeningStages;
  }

  if (path === 'creator') {
    return creatorStages;
  }

  return [];
}


/* =====================================================
   АКТИВНАЯ ВЕТКА
===================================================== */

function getActivePath() {

  const local = readLocal();

  const stage =
    local.current_test_stage ||
    local.final_stage ||
    local.initial_stage;

  return getPathKey(stage);
}


/* =====================================================
   СОСТОЯНИЕ ВЕТКИ
===================================================== */

function getPathState(path) {

  const local = readLocal();

  const all =
    local.path_progress || {};

  const state =
    all[path] || {};

  return {

    progress:
      Number(state.progress || 0),

    currentLesson:
      Number(state.currentLesson || 0)

  };
}


/* =====================================================
   СОХРАНЕНИЕ СОСТОЯНИЯ ВЕТКИ
===================================================== */

function savePathState(
  path,
  progress,
  currentLesson
) {

  const local = readLocal();

  const all =
    local.path_progress || {};

  all[path] = {

    progress:
      Number(progress || 0),

    currentLesson:
      Number(currentLesson || 0)

  };

  writeLocal({

    path_progress: all

  });

}


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

  const activePath =
    getActivePath();

  const pathState =
    activePath
      ? getPathState(activePath)
      : {};

  const localFallback = () => {

    return {

      telegram_id:
        telegramId,

      progress:
        Number(
          pathState.progress ??
          local.progress ??
          0
        ),

      current_lesson:
        Number(
          pathState.currentLesson ??
          local.current_lesson ??
          0
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

  };


  if (!db) {

    return localFallback();

  }


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

    return localFallback();

  }


  if (!data) {

    return null;

  }


  writeLocal({

    access_awakening:
      Boolean(
        data.access_awakening
      ),

    access_creator:
      Boolean(
        data.access_creator
      )

  });


  return {

    ...data,

    progress:
      activePath
        ? Number(
            pathState.progress ??
            data.progress ??
            0
          )
        : Number(
            data.progress || 0
          ),

    current_lesson:
      activePath
        ? Number(
            pathState.currentLesson ??
            data.current_lesson ??
            0
          )
        : Number(
            data.current_lesson || 0
          )

  };

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


  const local =
    readLocal();

  const activePath =
    getActivePath();


  const finalProgress =
    Number(
      progress || 0
    );

  const finalLesson =
    Number(
      currentLesson || 0
    );


  writeLocal({

    progress:
      finalProgress,

    current_lesson:
      finalLesson

  });


  if (activePath) {

    savePathState(

      activePath,

      finalProgress,

      finalLesson

    );

  }


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


  if (!history.initialStage) {

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


  if (name === 'test') {

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
   ОТКРЫТЬ ПРОДУКТ
===================================================== */

async function openProduct(
  type
) {

  const access =
    await getAccess();


  if (type === 'awakening') {

    if (access.awakening) {

      await openCabinet();

      return;

    }


    openTribute(
      LINKS.awakening
    );

    return;

  }


  if (type === 'creator') {

    if (access.creator) {

      await openCabinet();

      return;

    }


    openTribute(
      LINKS.creator
    );

  }

}


/* =====================================================
   РЕНДЕР ТЕСТА
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
   ПОВТОРНЫЙ ТЕСТ
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


  const access =
    await getAccess();


  const finalRetest =
    isFinalRetest();


  if (finalRetest) {

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


  let title = '';
  let text = '';
  let action = '';


  /* =================================================
     АВТОПИЛОТ
  ================================================= */

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


  /* =================================================
     ТОЛЧОК
  ================================================= */

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


  /* =================================================
     ПРОБУЖДЕНИЕ
  ================================================= */

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


  /* =================================================
     ТВОРЕЦ
  ================================================= */

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
        Теперь твоя задача —
        не останавливаться,
        а продолжать реализовывать
        то, что ты выбираешь.
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

    renderStageList(
      0,
      false,
      null
    );

    return;

  }


  const local =
    readLocal();


  const currentStage =
    local.current_test_stage ||
    local.final_stage ||
    local.initial_stage ||
    'Не определён';


  /*
     ВАЖНО:
     здесь теперь Творец тоже
     определяет ветку creator.
  */

  const activePath =
    getPathKey(
      currentStage
    );


  const pathState =
    activePath
      ? getPathState(
          activePath
        )
      : {};


  const progress =
    Number(
      pathState.progress || 0
    );


  const accessAwakening =
    Boolean(
      user.access_awakening
    );


  const accessCreator =
    Boolean(
      user.access_creator
    );


  const hasAccess =
    activePath === 'awakening'

      ? accessAwakening

      : activePath === 'creator'

        ? accessCreator

        : false;


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
     Если результат Творец,
     теперь activePath = creator.
  */

  if (!activePath) {

    message.innerHTML = `

      <h3>
        ПРОЙДИ ТЕСТ
      </h3>

      <p>
        Сначала определи,
        в какой точке перехода
        ты находишься.
      </p>

    `;

    renderStageList(
      0,
      false,
      null
    );

    return;

  }


  if (!hasAccess) {

    const productName =
      activePath === 'awakening'

        ? 'Переход в Пробуждение'

        : 'Переход в Творца';


    message.innerHTML = `

      <h3>
        ТВОЙ ПУТЬ ОПРЕДЕЛЁН
      </h3>

      <p>
        По результату теста
        тебе подходит программа
        <strong>
          ${productName}
        </strong>.
      </p>

      <p>
        Тест бесплатный.
        Доступ к этапам открывается
        после покупки программы.
      </p>

      <button
        class="primary"
        onclick="
          openProduct('${activePath}')
        "
      >
        ${
          activePath === 'awakening'
            ? 'НАЧАТЬ ПЕРЕХОД'
            : 'ПЕРЕЙТИ В ТВОРЦА'
        }
      </button>

    `;


    renderStageList(
      0,
      false,
      activePath
    );

    return;

  }


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
      Это ветка:
      <strong>
        ${
          activePath === 'awakening'
            ? 'ПРОБУЖДЕНИЕ'
            : 'ТВОРЕЦ'
        }
      </strong>
    </p>

    <p>
      Прогресс сохраняется автоматически.
    </p>

  `;


  renderStageList(
    progress,
    true,
    activePath
  );

}


/* =====================================================
   СПИСОК ЭТАПОВ
===================================================== */

function renderStageList(
  progress,
  hasAccess,
  path = null
) {

  const element =
    document.getElementById(
      'stage-list'
    );


  if (!element) {
    return;
  }


  if (!path) {

    element.innerHTML =
      '';

    return;

  }


  const stages =
    getStagesForPath(
      path
    );


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
                ${
                  isDone
                    ? 'done'
                    : ''
                }
                ${
                  isOpen
                    ? 'current'
                    : 'locked'
                }
              "

              ${
                isOpen

                  ? `
                    onclick="
                      openLesson(
                        ${stage.number},
                        '${path}'
                      )
                    "
                  `

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

          ${
            path === 'awakening'

              ? `
                Ты прошла путь
                к Пробуждению.

                Теперь следующий уровень —
                ветка Творца.
              `

              : `
                Ты прошла путь
                к Творцу.

                Теперь важно продолжать
                создавать свою реальность.
              `
          }

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
  lessonNumber,
  path = null
) {

  const user =
    await loadUser();


  if (!user) {
    return;
  }


  const local =
    readLocal();


  const activePath =
    path ||
    getPathKey(

      local.current_test_stage ||
      local.final_stage ||
      local.initial_stage

    );


  if (!activePath) {
    return;
  }


  const hasAccess =
    activePath === 'awakening'

      ? Boolean(
          user.access_awakening
        )

      : Boolean(
          user.access_creator
        );


  if (!hasAccess) {
    return;
  }


  const stages =
    getStagesForPath(
      activePath
    );


  const state =
    getPathState(
      activePath
    );


  const progress =
    Number(
      state.progress || 0
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
    progress < required
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


  /*
     Голосовое
  */

  const voice =
    stage.voiceUrl

      ? `

        <div
          class="lesson-audio"
        >

          <p>
            <strong>
              🎙 Голосовое Елены
            </strong>
          </p>

          <audio
            controls
            preload="none"
            src="${stage.voiceUrl}"
          ></audio>

        </div>

      `

      : '';


  /*
     Медитация
  */

  const meditation =
    stage.meditationUrl

      ? `

        <div
          class="lesson-audio"
        >

          <p>
            <strong>
              🧘 Голосовая медитация
            </strong>
          </p>

          <audio
            controls
            preload="none"
            src="${stage.meditationUrl}"
          ></audio>

        </div>

      `

      : '';


  wrap.innerHTML = `

    <div class="lesson">

      <div class="tag">

        ${
          activePath === 'awakening'
            ? 'ПРОБУЖДЕНИЕ'
            : 'ТВОРЕЦ'
        }

        ·

        ЭТАП
        ${lessonNumber}
        ИЗ 7

      </div>


      <h2>
        ${stage.title}
      </h2>


      ${stage.text}


      ${voice}


      <div
        class="lesson-practice"
      >

        ${stage.practice}

      </div>


      ${meditation}


      <div
        class="lesson-complete"
      >

        <button
          class="primary"
          onclick="
            completeLesson(
              ${lessonNumber},
              '${activePath}'
            )
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
  lessonNumber,
  path = null
) {

  const user =
    await loadUser();


  if (!user) {
    return;
  }


  const local =
    readLocal();


  const activePath =
    path ||
    getPathKey(

      local.current_test_stage ||
      local.final_stage ||
      local.initial_stage

    );


  if (!activePath) {
    return;
  }


  const hasAccess =
    activePath === 'awakening'

      ? Boolean(
          user.access_awakening
        )

      : Boolean(
          user.access_creator
        );


  if (!hasAccess) {
    return;
  }


  const stages =
    getStagesForPath(
      activePath
    );


  if (
    lessonNumber < 1 ||
    lessonNumber > stages.length
  ) {

    return;

  }


  const currentState =
    getPathState(
      activePath
    );


  const currentProgress =
    Number(
      currentState.progress || 0
    );


  const newProgress =
    Math.max(

      currentProgress,

      Math.round(
        (
          lessonNumber
          /
          stages.length
        ) * 100
      )

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


  const activePath =
    getActivePath();


  if (!activePath) {
    return;
  }


  const state =
    getPathState(
      activePath
    );


  if (
    Number(state.progress || 0)
    <
    100
  ) {

    return;

  }


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

    await ensureUser();

  }

);
