/* =====================================================
   ТОЧКА ПЕРЕХОДА
   APP.JS

   ТЕСТ:
   Автопилот / Толчок / Пробуждение / Творец

   ПРОДУКТ:
   2 ветки × 7 этапов

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

/*
   SUPABASE JS

   В index.html библиотека Supabase не подключена.
   Поэтому приложение раньше не могло прочитать access_awakening
   из базы и всегда работало через localStorage.

   Здесь библиотека подключается автоматически.
*/
let db = null;
let supabaseReadyPromise = null;

function ensureSupabaseClient() {

  if (db) return Promise.resolve(db);

  if (window.supabase?.createClient) {
    db = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );
    return Promise.resolve(db);
  }

  if (!supabaseReadyPromise) {
    supabaseReadyPromise = new Promise((resolve, reject) => {

      const existing = document.querySelector(
        'script[data-supabase-client="true"]'
      );

      if (existing) {
        existing.addEventListener('load', () => {
          try {
            if (!window.supabase?.createClient) {
              reject(new Error('Supabase JS не загрузился'));
              return;
            }

            db = window.supabase.createClient(
              SUPABASE_URL,
              SUPABASE_KEY
            );

            resolve(db);
          } catch (error) {
            reject(error);
          }
        }, { once: true });

        existing.addEventListener('error', reject, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src =
        'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.async = true;
      script.dataset.supabaseClient = 'true';

      script.onload = () => {
        try {
          if (!window.supabase?.createClient) {
            reject(new Error('Supabase JS не загрузился'));
            return;
          }

          db = window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
          );

          resolve(db);
        } catch (error) {
          reject(error);
        }
      };

      script.onerror = () => {
        reject(new Error('Не удалось загрузить Supabase JS'));
      };

      document.head.appendChild(script);
    });
  }

  return supabaseReadyPromise;
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

const awakeningStages = [
  {
    number: 1,
    title: 'Кто я?',
    text: `
      <p>Любой настоящий переход начинается с вопроса: <strong>кто я сейчас?</strong></p>
      <p>Не та, кем меня привыкли видеть. Не та, которой нужно быть для семьи, работы, отношений или окружающих.</p>
      <p>Не должность. Не статус. Не набор ролей и достижений.</p>
      <p>Иногда человек прекрасно умеет соответствовать чужим ожиданиям, но почти перестаёт слышать себя.</p>
      <p>Здесь тебе не нужно сразу находить правильный ответ. Сначала нужно увидеть, где заканчивается привычная роль и начинаешься ты.</p>
    `,
    practice: `
      <p><strong>ПРАКТИКА «КТО Я БЕЗ РОЛЕЙ»</strong></p>
      <p>Ответь письменно:</p>
      <p><strong>«Кто я, если убрать мои роли, обязанности и ожидания других?»</strong></p>
      <p>Напиши минимум 10 ответов. Не анализируй их. Пиши первое, что приходит.</p>
    `,
    voiceUrl: ''
  },
  {
    number: 2,
    title: 'Чистка поля',
    text: `
      <p>Когда ты начинаешь видеть себя, становится заметно, сколько всего лишнего ты несёшь.</p>
      <p>Старые правила. Страхи. Чужие ожидания. Незавершённые истории. Сценарии, которые давно перестали быть твоими.</p>
      <p>Невозможно войти в новое, продолжая всеми силами держаться за старое.</p>
      <p>Поэтому сейчас мы не создаём новое. Сначала освобождаем пространство.</p>
    `,
    practice: `
      <p><strong>ПРАКТИКА «ЧТО Я БОЛЬШЕ НЕ НЕСУ»</strong></p>
      <p>Создай три списка:</p>
      <p><strong>Я больше не хочу...</strong></p>
      <p><strong>Это вообще не моё...</strong></p>
      <p><strong>Я готова отпустить...</strong></p>
      <p>Выбери минимум три пункта, которые больше не должны переходить вместе с тобой дальше.</p>
    `,
    voiceUrl: ''
  },
  {
    number: 3,
    title: 'Я выбираю себя',
    text: `
      <p>После того как ты увидела старое, возникает следующий вопрос:</p>
      <p><strong>«А чего хочу именно я?»</strong></p>
      <p>Не что правильно. Не что удобно. Не что ждут другие. А чего хочешь ты.</p>
      <p>Выбор себя начинается с честности с собой.</p>
    `,
    practice: `
      <p><strong>ПРАКТИКА «ЧЕГО ХОЧУ Я?»</strong></p>
      <p>Закончи фразы:</p>
      <p><strong>Я хочу...</strong></p>
      <p><strong>Я больше не хочу...</strong></p>
      <p><strong>Мне действительно важно...</strong></p>
      <p><strong>Если бы мне не нужно было никому ничего доказывать, я бы...</strong></p>
      <p><strong>Если бы я не боялась осуждения, я бы...</strong></p>
    `,
    voiceUrl: ''
  },
  {
    number: 4,
    title: 'Моё «нет»',
    text: `
      <p>Невозможно создать новое, продолжая соглашаться со всем старым.</p>
      <p>Иногда человек говорит «да», хотя внутри всё говорит «нет».</p>
      <p>Потому что страшно обидеть. Страшно потерять. Страшно показаться плохой.</p>
      <p>Но твоё «нет» — это не агрессия. Это граница. Это право сказать: <strong>«Я тоже имею значение».</strong></p>
    `,
    practice: `
      <p><strong>ПРАКТИКА «МОЁ НЕТ»</strong></p>
      <p>Запиши:</p>
      <p><strong>Я больше не согласна...</strong></p>
      <p><strong>Я больше не позволяю...</strong></p>
      <p><strong>Я больше не обязана...</strong></p>
      <p>Затем выбери одну реальную ситуацию, где ты обычно говоришь «да», хотя хочешь сказать «нет».</p>
    `,
    voiceUrl: ''
  },
  {
    number: 5,
    title: 'Наблюдатель',
    text: `
      <p>Здесь появляется один из самых важных навыков.</p>
      <p><strong>Ты — не твои мысли.</strong></p>
      <p>Мысль может появиться автоматически. Страх может возникнуть мгновенно. Реакция может включиться раньше, чем ты успеешь её осознать.</p>
      <p>Но между событием и твоим действием есть пространство. Именно там находится выбор.</p>
    `,
    practice: `
      <p><strong>ПРАКТИКА «ПАУЗА»</strong></p>
      <p>Поймай в течение дня три ситуации с сильной реакцией.</p>
      <p>Запиши: что произошло? Что я подумала? Что почувствовала? Что захотела сделать автоматически? Что я выбрала сделать?</p>
      <p>Не исправляй себя. Просто наблюдай.</p>
    `,
    voiceUrl: ''
  },
  {
    number: 6,
    title: 'Моя жизнь',
    text: `
      <p>Осознание ничего не меняет, если оно не становится частью жизни.</p>
      <p>Теперь посмотрим на внешний мир: отношения, деньги, работа, тело, окружение, дом, образ жизни.</p>
      <p>Не спрашивай: «Как сделать идеальную жизнь?»</p>
      <p>Спроси: <strong>«Как выглядит жизнь, которая действительно моя?»</strong></p>
    `,
    practice: `
      <p><strong>ПРАКТИКА «ОДИН РЕАЛЬНЫЙ ШАГ»</strong></p>
      <p>Выбери одну сферу жизни.</p>
      <p>Что меня здесь больше не устраивает?<br>Чего я хочу вместо этого?<br>Что зависит от меня?<br>Что я могу сделать в ближайшие 24 часа?</p>
      <p>И обязательно сделай этот шаг.</p>
    `,
    voiceUrl: ''
  },
  {
    number: 7,
    title: 'Мой новый фундамент',
    text: `
      <p>Ты дошла до последнего этапа.</p>
      <p>Но это не конец пути.</p>
      <p>Теперь нужно собрать то, что ты увидела о себе, в новый способ жить.</p>
      <p>Новый фундамент строится не из обещаний. Он строится из решений, действий, границ и ответственности за свой выбор.</p>
      <p>И главное: <strong>на что ты теперь хочешь опираться?</strong></p>
    `,
    practice: `
      <p><strong>ФИНАЛЬНАЯ ПРАКТИКА «МОЙ НОВЫЙ ФУНДАМЕНТ»</strong></p>
      <p>Закончи:</p>
      <p><strong>Я больше не...</strong></p>
      <p><strong>Я выбираю...</strong></p>
      <p><strong>Я разрешаю себе...</strong></p>
      <p><strong>Я больше не позволяю...</strong></p>
      <p><strong>Для меня важно...</strong></p>
      <p><strong>Когда мне страшно, я...</strong></p>
      <p><strong>Когда я не знаю, что делать, я...</strong></p>
      <p><strong>Мой следующий шаг...</strong></p>
      <p>Сохрани эти ответы. Это твоя точка опоры после прохождения пути.</p>
    `,
    voiceUrl: ''
  }
];

const creatorStages = [
  {
    number: 1,
    title: 'Я выбираю свою реальность',
    text: `
      <p>Ты уже увидела, что прежняя жизнь не обязана оставаться твоей навсегда.</p>
      <p>Теперь начинается следующий уровень: не только понимать, а <strong>создавать</strong>.</p>
      <p>Первый вопрос Творца: какую реальность я действительно выбираю?</p>
    `,
    practice: `
      <p><strong>ПРАКТИКА «МОЯ РЕАЛЬНОСТЬ»</strong></p>
      <p>Опиши свою жизнь через год так, как будто тебе не нужно соответствовать чужим ожиданиям.</p>
      <p>Что есть в твоей жизни? Как ты живёшь? С кем? Чем занимаешься? Что чувствуешь?</p>
      <p>Не пиши «идеальную жизнь». Пиши <strong>свою</strong>.</p>
    `,
    voiceUrl: '',
    meditationUrl: ''
  },
  {
    number: 2,
    title: 'Моё желание',
    text: `
      <p>Не каждое желание действительно твоё.</p>
      <p>Иногда мы хотим то, что красиво выглядит, что принято хотеть или что должно доказать нашу ценность.</p>
      <p>Творец начинает с честного контакта со своим желанием.</p>
    `,
    practice: `
      <p><strong>ПРАКТИКА «Я ХОЧУ»</strong></p>
      <p>Выбери одно желание и ответь:</p>
      <p>Чего я хочу? Зачем мне это? Что я хочу почувствовать, когда это получу? Это действительно моё или я пытаюсь кому-то что-то доказать?</p>
    `,
    voiceUrl: '',
    meditationUrl: ''
  },
  {
    number: 3,
    title: 'Мой выбор',
    text: `
      <p>Пробуждение без действий остаётся только осознанием.</p>
      <p>На этом этапе ты переходишь от «я понимаю» к <strong>«я выбираю»</strong>.</p>
      <p>Выбор — это ответственность за направление своей жизни.</p>
    `,
    practice: `
      <p><strong>ПРАКТИКА «ОДНО РЕШЕНИЕ»</strong></p>
      <p>Выбери одно решение, которое ты давно откладываешь.</p>
      <p>Не составляй идеальный план. Сделай <strong>первый конкретный шаг сегодня</strong>.</p>
      <p>Запиши: что я решила? Что я сделаю? Когда именно?</p>
    `,
    voiceUrl: '',
    meditationUrl: ''
  },
  {
    number: 4,
    title: 'Моя энергия',
    text: `
      <p>Творец не может создавать, если вся его энергия уходит на прошлое, страх, контроль и попытки удержать то, что уже закончилось.</p>
      <p>Сейчас мы смотрим, куда ты отдаёшь свою силу.</p>
    `,
    practice: `
      <p><strong>ПРАКТИКА «КУДА УХОДИТ МОЯ СИЛА»</strong></p>
      <p>Запиши три главных источника утечки энергии.</p>
      <p>Рядом напиши: что я могу перестать делать, изменить или ограничить?</p>
      <p>Выбери одну утечку и начни возвращать себе энергию уже сегодня.</p>
    `,
    voiceUrl: '',
    meditationUrl: ''
  },
  {
    number: 5,
    title: 'Я действую',
    text: `
      <p><strong>Творец — это не тот, кто много осознал. Творец — тот, кто создаёт.</strong></p>
      <p>Теперь действие становится частью твоего нового состояния.</p>
    `,
    practice: `
      <p><strong>ПРАКТИКА «СОЗДАЙ ДВИЖЕНИЕ»</strong></p>
      <p>Выбери одну сферу жизни, которую хочешь изменить.</p>
      <p>Сделай сегодня одно действие, после которого реальность действительно станет другой.</p>
      <p>Не планируй действие. <strong>Сделай его.</strong></p>
    `,
    voiceUrl: '',
    meditationUrl: ''
  },
  {
    number: 6,
    title: 'Моя новая реальность',
    text: `
      <p>Посмотри, что уже изменилось.</p>
      <p>Не обесценивай маленькие изменения. Именно из них складывается новая реальность.</p>
      <p>Теперь важно не вернуться автоматически в старую версию себя.</p>
    `,
    practice: `
      <p><strong>ПРАКТИКА «БЫЛО → ЕСТЬ → БУДЕТ»</strong></p>
      <p>Сравни три точки:</p>
      <p><strong>Как было.</strong><br><strong>Как есть сейчас.</strong><br><strong>Что я выбираю создавать дальше.</strong></p>
      <p>Запиши минимум по три пункта.</p>
    `,
    voiceUrl: '',
    meditationUrl: ''
  },
  {
    number: 7,
    title: 'Я — Творец',
    text: `
      <p>Финал этой ветки — не обещание, что жизнь станет идеальной.</p>
      <p>Это понимание: <strong>я могу влиять на свою жизнь через свои выборы и действия.</strong></p>
      <p>Теперь твоя задача — продолжать создавать, а не ждать разрешения на свою жизнь.</p>
    `,
    practice: `
      <p><strong>ФИНАЛЬНАЯ ПРАКТИКА «Я СОЗДАЮ СВОЮ ЖИЗНЬ»</strong></p>
      <p>Создай свой личный манифест:</p>
      <p><strong>Кто я?</strong><br><strong>Чего я хочу?</strong><br><strong>Что я выбираю?</strong><br><strong>Что я больше не принимаю?</strong><br><strong>Во что я верю?</strong><br><strong>Какие действия я совершаю?</strong><br><strong>Какую жизнь я создаю?</strong></p>
      <p>Сохрани этот текст как свою новую точку опоры.</p>
    `,
    voiceUrl: '',
    meditationUrl: ''
  }
];

function getPathKey(stage, product = null) {
  if (stage === 'Автопилот' || stage === 'Толчок') return 'awakening';
  if (stage === 'Пробуждение' || stage === 'Творец') return 'creator';

  const normalized = String(product || '').toLowerCase();
  if (normalized.includes('пробуждение')) return 'awakening';
  if (normalized.includes('творец')) return 'creator';

  return null;
}

function getStagesForPath(path) {
  return path === 'creator' ? creatorStages : awakeningStages;
}

function getActivePath() {
  const local = readLocal();
  return getPathKey(
    local.current_test_stage || local.final_stage || local.initial_stage,
    local.product
  );
}

function getPathState(path) {
  const local = readLocal();
  const state = local.path_progress?.[path] || {};
  return {
    progress: Number(state.progress || 0),
    currentLesson: Number(state.currentLesson || 0)
  };
}

function savePathState(path, progress, currentLesson) {
  const local = readLocal();
  const paths = local.path_progress || {};
  paths[path] = {
    progress: Number(progress || 0),
    currentLesson: Number(currentLesson || 0)
  };
  writeLocal({ path_progress: paths });
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

  const telegramId = getTelegramId();
  if (!telegramId) return null;

  const local = readLocal();

  const localFallback = () => {
    const activePath = getPathKey(
      local.current_test_stage || local.final_stage || local.initial_stage,
      local.product
    );
    const pathState = activePath ? getPathState(activePath) : {};

    return {
      telegram_id: telegramId,
      product: local.product || null,
      current_stage: local.current_stage ?? null,
      progress: Number(pathState.progress ?? local.progress ?? 0),
      current_lesson: Number(pathState.currentLesson ?? local.current_lesson ?? 0),
      access_awakening: Boolean(local.access_awakening),
      access_creator: Boolean(local.access_creator)
    };
  };

  /*
     КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ:
     доступ читаем напрямую из Supabase REST.
     Это не зависит от загрузки supabase-js через CDN.
  */
  try {
    const url =
      SUPABASE_URL +
      '/rest/v1/users?select=telegram_id,product,current_stage,progress,current_lesson,access_awakening,access_creator' +
      '&telegram_id=eq.' + encodeURIComponent(telegramId) +
      '&limit=1';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error('Supabase REST ' + response.status + ': ' + errorText);
    }

    const rows = await response.json();
    const data = Array.isArray(rows) ? rows[0] : null;

    if (!data) {
      return null;
    }

    const activePath = getPathKey(
      local.current_test_stage || local.final_stage || local.initial_stage,
      data.product || local.product
    );
    const pathState = activePath ? getPathState(activePath) : {};

    const result = {
      ...data,
      progress: activePath
        ? Number(pathState.progress ?? data.progress ?? 0)
        : Number(data.progress || 0),
      current_lesson: activePath
        ? Number(pathState.currentLesson ?? data.current_lesson ?? 0)
        : Number(data.current_lesson || 0),
      access_awakening: Boolean(data.access_awakening),
      access_creator: Boolean(data.access_creator)
    };

    writeLocal({
      product: data.product || null,
      current_stage: data.current_stage ?? null,
      progress: Number(data.progress || 0),
      current_lesson: Number(data.current_lesson || 0),
      access_awakening: Boolean(data.access_awakening),
      access_creator: Boolean(data.access_creator)
    });

    return result;

  } catch (restError) {
    console.error('Ошибка чтения Supabase REST:', restError);
  }

  /* Запасной вариант — старый Supabase JS */
  try {
    await ensureSupabaseClient();
  } catch (error) {
    console.error('Supabase JS error:', error);
    return localFallback();
  }

  if (!db) return localFallback();

  const { data, error } = await db
    .from('users')
    .select(`
      telegram_id,
      product,
      current_stage,
      progress,
      current_lesson,
      access_awakening,
      access_creator
    `)
    .eq('telegram_id', telegramId)
    .maybeSingle();

  if (error) {
    console.error('Ошибка загрузки пользователя:', error);
    return localFallback();
  }

  if (!data) return null;

  const activePath = getPathKey(
    local.current_test_stage || local.final_stage || local.initial_stage,
    data.product || local.product
  );
  const pathState = activePath ? getPathState(activePath) : {};

  const result = {
    ...data,
    progress: activePath
      ? Number(pathState.progress ?? data.progress ?? 0)
      : Number(data.progress || 0),
    current_lesson: activePath
      ? Number(pathState.currentLesson ?? data.current_lesson ?? 0)
      : Number(data.current_lesson || 0),
    access_awakening: Boolean(data.access_awakening),
    access_creator: Boolean(data.access_creator)
  };

  writeLocal({
    product: data.product || null,
    current_stage: data.current_stage ?? null,
    progress: Number(data.progress || 0),
    current_lesson: Number(data.current_lesson || 0),
    access_awakening: Boolean(data.access_awakening),
    access_creator: Boolean(data.access_creator)
  });

  return result;
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
      product,
      current_stage,
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

async function saveProgress(progress, currentLesson) {
  const telegramId = getTelegramId();
  if (!telegramId) return false;

  const local = readLocal();
  const activePath = getPathKey(
    local.current_test_stage || local.final_stage || local.initial_stage,
    local.product
  );

  const current = await loadUser();
  const finalProgress = Number(
    progress ?? current?.progress ?? 0
  );
  const finalLesson = currentLesson !== undefined && currentLesson !== null
    ? Number(currentLesson)
    : Number(current?.current_lesson || 0);

  writeLocal({
    progress: finalProgress,
    current_lesson: finalLesson
  });

  if (activePath) {
    savePathState(activePath, finalProgress, finalLesson);
  }

  if (!db) return true;

  const { error } = await db
    .from('users')
    .update({
      progress: finalProgress,
      current_lesson: finalLesson,
      updated_at: new Date().toISOString()
    })
    .eq('telegram_id', telegramId);

  if (error) {
    console.error('Ошибка сохранения прогресса:', error);
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

function openTribute(url, pendingPath = null) {
  if (!url) return;

  if (pendingPath) {
    writeLocal({
      pending_payment_path: pendingPath,
      pending_payment_started_at: Date.now()
    });
  }

  if (tg && typeof tg.openLink === 'function') {
    tg.openLink(url);
  } else {
    window.open(url, '_blank');
  }
}

async function waitForPaymentAccess(path) {
  if (!path) return;

  for (let i = 0; i < 20; i++) {
    const user = await loadUser();
    const hasAccess = path === 'awakening'
      ? Boolean(user?.access_awakening)
      : Boolean(user?.access_creator);

    if (hasAccess) {
      writeLocal({
        pending_payment_path: null,
        pending_payment_started_at: null
      });
      await openCabinet();
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1500));
  }
}

function resumeAfterPayment() {
  const local = readLocal();
  const path = local.pending_payment_path;
  if (path) waitForPaymentAccess(path);
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') resumeAfterPayment();
});
window.addEventListener('focus', resumeAfterPayment);


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
      LINKS.awakening,
      'awakening'
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
      LINKS.creator,
      'creator'
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
  showScreen('cabinet');

  const stageElement = document.getElementById('cabinet-stage');
  const progressElement = document.getElementById('cabinet-progress');
  const progressText = document.getElementById('cabinet-progress-text');
  const message = document.getElementById('cabinet-message');

  if (!stageElement) return;

  stageElement.textContent = 'Загрузка...';
  progressElement.style.width = '0%';
  progressText.textContent = 'Загрузка...';

  const user = await loadUser();

  if (!user) {
    stageElement.textContent = 'Личный путь';
    progressText.textContent = 'Открой приложение через Telegram';
    message.innerHTML = `
      <h3>TELEGRAM ID НЕ НАЙДЕН</h3>
      <p>Открой Mini App через Telegram.</p>
    `;
    renderStageList(0, false, null);
    return;
  }

  const local = readLocal();
  const currentStage = local.current_test_stage || local.final_stage || user.current_stage || 'Не определён';
  const activePath = getPathKey(currentStage, user.product || local.product);
  const progress = activePath ? getPathState(activePath).progress : 100;
  const accessAwakening = Boolean(
    user.access_awakening || local.access_awakening
  );
  const accessCreator = Boolean(
    user.access_creator || local.access_creator
  );
  const hasAccess = activePath === 'awakening'
    ? accessAwakening
    : activePath === 'creator'
      ? accessCreator
      : false;

  stageElement.textContent = currentStage;
  progressElement.style.width = Math.max(0, Math.min(100, progress)) + '%';
  progressText.textContent = activePath ? `${progress}% пройдено` : 'Переход завершён';

  if (!activePath) {
    message.innerHTML = `
      <h3>ТЫ — ТВОРЕЦ</h3>
      <p>По результату теста ты уже находишься на уровне Творца.</p>
      <p>Твой следующий шаг — продолжать создавать и реализовывать свою новую реальность.</p>
    `;
    renderStageList(100, false, null);
    return;
  }

  if (!hasAccess) {
    const productName = activePath === 'awakening'
      ? 'Переход в Пробуждение'
      : 'Переход в Творца';

    message.innerHTML = `
      <h3>ТВОЙ ПУТЬ ОПРЕДЕЛЁН</h3>
      <p>По результату теста тебе подходит программа <strong>${productName}</strong>.</p>
      <p>Тест бесплатный. Доступ к этапам открывается после покупки соответствующей программы.</p>
      <button class="primary" onclick="openProduct('${activePath}')">
        ${activePath === 'awakening' ? 'НАЧАТЬ ПЕРЕХОД' : 'ПЕРЕЙТИ В ТВОРЦА'}
      </button>
    `;
    renderStageList(0, false, activePath);
    return;
  }

  message.innerHTML = `
    <h3>ТВОЙ ПУТЬ ОТКРЫТ</h3>
    <p>Твой результат теста: <strong>${currentStage}</strong></p>
    <p>Это ветка: <strong>${activePath === 'awakening' ? 'Пробуждение' : 'Творец'}</strong>.</p>
    <p>Прогресс сохраняется автоматически.</p>
  `;

  renderStageList(progress, true, activePath);
}


/* =====================================================
   7 ЭТАПОВ
===================================================== */

function renderStageList(progress, hasAccess, path = null) {
  const element = document.getElementById('stage-list');
  if (!element) return;

  if (!path) {
    element.innerHTML = '';
    return;
  }

  const stages = getStagesForPath(path);

  element.innerHTML = stages.map(stage => {
    const required = Math.round(((stage.number - 1) / stages.length) * 100);
    const complete = Math.round((stage.number / stages.length) * 100);
    const isDone = hasAccess && progress >= complete;
    const isOpen = hasAccess && progress >= required;

    let state = 'Заблокировано';
    if (isDone) state = 'Пройдено';
    else if (isOpen) state = 'Открыто';

    return `
      <button
        class="stage-button ${isDone ? 'done' : ''} ${isOpen ? 'current' : 'locked'}"
        ${isOpen ? `onclick="openLesson(${stage.number}, '${path}')"` : 'disabled'}
      >
        <span class="stage-number">${stage.number}</span>
        <span class="stage-name">${stage.title}</span>
        <span class="stage-state">${state}</span>
      </button>
    `;
  }).join('');

  if (hasAccess && progress >= 100) {
    element.innerHTML += `
      <div class="final-path" style="margin-top:25px">
        <div class="tag">ПУТЬ ПРОЙДЕН</div>
        <h3>100% ЗАВЕРШЕНО</h3>
        <p>${path === 'awakening'
          ? 'Ты прошла путь к Пробуждению. Теперь можешь перейти к следующей ветке — Творцу.'
          : 'Ты прошла путь к Творцу. Теперь важно продолжать создавать свою реальность.'}</p>
        <button class="primary" onclick="startFinalRetest()">ПРОЙТИ ТЕСТ ПОВТОРНО</button>
      </div>
    `;
  }
}


/* =====================================================
   ОТКРЫТИЕ ЭТАПА
===================================================== */

async function openLesson(lessonNumber, path = null) {
  const user = await loadUser();
  if (!user) return;

  const local = readLocal();
  const activePath = path || getPathKey(
    local.current_test_stage || local.final_stage || local.initial_stage,
    user.product || local.product
  );

  if (!activePath) return;

  const hasAccess = activePath === 'awakening'
    ? Boolean(user.access_awakening)
    : Boolean(user.access_creator);

  if (!hasAccess) return;

  const stages = getStagesForPath(activePath);
  const state = getPathState(activePath);
  const progress = Number(state.progress || 0);
  const required = Math.round(((lessonNumber - 1) / stages.length) * 100);

  if (progress < required) return;

  const stage = stages[lessonNumber - 1];
  if (!stage) return;

  showScreen('lesson');

  const wrap = document.getElementById('lesson-wrap');
  if (!wrap) return;

  const voice = stage.voiceUrl
    ? `<div class="lesson-audio"><p><strong>🎙 Голосовое Елены</strong></p><audio controls preload="none" src="${stage.voiceUrl}"></audio></div>`
    : '';

  const meditation = stage.meditationUrl
    ? `<div class="lesson-audio"><p><strong>🧘 Медитация</strong></p><audio controls preload="none" src="${stage.meditationUrl}"></audio></div>`
    : '';

  wrap.innerHTML = `
    <div class="lesson">
      <div class="tag">ЭТАП ${lessonNumber} ИЗ 7</div>
      <h2>${stage.title}</h2>
      ${stage.text}
      ${voice}
      <div class="lesson-practice">${stage.practice}</div>
      ${meditation}
      <div class="lesson-complete">
        <button class="primary" onclick="completeLesson(${lessonNumber}, '${activePath}')">
          Я ПРОШЛА ЭТОТ ЭТАП
        </button>
      </div>
    </div>
  `;
}


/* =====================================================
   ЗАВЕРШЕНИЕ ЭТАПА
===================================================== */

async function completeLesson(lessonNumber, path = null) {
  const user = await loadUser();
  if (!user) return;

  const local = readLocal();
  const activePath = path || getPathKey(
    local.current_test_stage || local.final_stage || local.initial_stage,
    user.product || local.product
  );
  if (!activePath) return;

  const hasAccess = activePath === 'awakening'
    ? Boolean(user.access_awakening)
    : Boolean(user.access_creator);
  if (!hasAccess) return;

  const stages = getStagesForPath(activePath);
  if (lessonNumber < 1 || lessonNumber > stages.length) return;

  const currentState = getPathState(activePath);
  const currentProgress = Number(currentState.progress || 0);
  const newProgress = Math.max(
    currentProgress,
    Math.round((lessonNumber / stages.length) * 100)
  );

  await saveProgress(newProgress, lessonNumber);
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
    resumeAfterPayment();

  }
);
