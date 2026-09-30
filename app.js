const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

let cart = JSON.parse(localStorage.getItem('tp_cart') || '[]');

const stages = [
  'Автопилот',
  'Толчок',
  'Пробуждение',
  'Творец'
];

const questions = [
  {
    t: 'Я понимаю, что прежний образ жизни больше меня не устраивает.',
    a: [
      'Это почти не про меня',
      'Иногда ловлю себя на этой мысли',
      'Это уже стало очевидно',
      'Я давно это чувствую',
      'Я полностью готов(а) к новому этапу'
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


/* =========================
   НАВИГАЦИЯ
========================= */

function showScreen(name) {
  document
    .querySelectorAll('.screen')
    .forEach(s => s.classList.remove('active'));

  const screen = document.getElementById('screen-' + name);

  if (screen) {
    screen.classList.add('active');
  }

  if (name === 'test') {
    renderTest();
  }

  if (name === 'cart') {
    renderCart();
  }

  window.scrollTo(0, 0);
}


/* =========================
   ТЕСТ
========================= */

function renderTest() {
  const w = document.getElementById('test-wrap');

  if (!w) return;

  if (answers.length === questions.length) {
    renderResult();
    return;
  }

  const i = answers.length;

  w.innerHTML = `
    <div class="progress">
      ВОПРОС ${i + 1} ИЗ ${questions.length}
    </div>

    <div class="question">
      <h3>${questions[i].t}</h3>

      <div class="answers">
        ${questions[i].a.map((x, j) => `
          <button
            class="answer"
            onclick="choose(${j})"
          >
            ${String.fromCharCode(65 + j)}. ${x}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function choose(j) {
  answers.push(j);
  renderTest();
}


/* =========================
   ОПРЕДЕЛЕНИЕ РЕЗУЛЬТАТА
========================= */

function getStage() {
  const counts = [0, 0, 0, 0, 0];

  answers.forEach(x => {
    if (x >= 0 && x <= 4) {
      counts[x]++;
    }
  });

  const max = Math.max(...counts);
  const idx = counts.indexOf(max);

  if (idx === 0) return 'Автопилот';
  if (idx === 1) return 'Толчок';
  if (idx === 2) return 'Пробуждение';

  return 'Творец';
}


/* =========================
   РЕЗУЛЬТАТ
========================= */

function renderResult() {
  const stage = getStage();
  const w = document.getElementById('test-wrap');

  if (!w) return;

  let title = '';
  let text = '';
  let button = '';

  if (stage === 'Автопилот') {

    title = 'ТВОЙ СЛЕДУЮЩИЙ ШАГ — ПРОБУЖДЕНИЕ';

    text = `
      <p>
        Ты уже чувствуешь, что прежняя жизнь
        больше тебя не устраивает.
      </p>

      <p>
        Но пока часть решений принимается
        автоматически — по привычке,
        страху или чужим ожиданиям.
      </p>

      <p>
        <strong>
          Тебе не нужно ждать нового кризиса,
          чтобы начать менять свою жизнь.
        </strong>
      </p>

      <p>
        Следующий переход — из
        <strong>Автопилота в Пробуждение.</strong>
      </p>

      <p>
        Ты начнёшь видеть свои настоящие желания,
        понимать свои сценарии и делать первые
        осознанные шаги.
      </p>
    `;

    button = `
      <button
        class="primary"
        onclick="openTransition('Автопилот')"
      >
        ХОЧУ ПЕРЕЙТИ В ПРОБУЖДЕНИЕ
      </button>
    `;
  }


  if (stage === 'Толчок') {

    title = 'ТЫ УЖЕ В ТОЧКЕ ПЕРЕМЕН';

    text = `
      <p>
        В твоей жизни уже произошёл
        внутренний или внешний толчок.
      </p>

      <p>
        Старое начинает разрушаться,
        но новое ещё не сформировалось.
      </p>

      <p>
        <strong>
          Именно здесь важно не вернуться
          обратно в привычный сценарий.
        </strong>
      </p>

      <p>
        Твой следующий переход —
        <strong>из Толчка в Пробуждение.</strong>
      </p>

      <p>
        Ты начнёшь понимать, что происходит,
        перестанешь просто реагировать
        на события и начнёшь осознанно
        менять свою жизнь.
      </p>
    `;

    button = `
      <button
        class="primary"
        onclick="openTransition('Толчок')"
      >
        ХОЧУ ПРОЙТИ ПЕРЕХОД В ПРОБУЖДЕНИЕ
      </button>
    `;
  }


  if (stage === 'Пробуждение') {

    title = 'ТЫ ГОТОВА СОЗДАВАТЬ';

    text = `
      <p>
        Ты уже начала видеть себя,
        свои желания и свои сценарии.
      </p>

      <p>
        Старое перестало быть единственным
        вариантом жизни.
      </p>

      <p>
        Теперь следующий шаг —
        <strong>Пробуждение → Творец.</strong>
      </p>

      <p>
        Здесь ты переходишь от понимания
        к созданию новой реальности.
      </p>

      <p>
        Практические задания, мои голосовые
        сообщения и 7 последовательных
        медитаций помогут тебе пройти
        этот этап в своём темпе.
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


  if (stage === 'Творец') {

    title = 'ТЫ — ТВОРЕЦ';

    text = `
      <p>
        Ты уже находишься на последнем
        уровне этой системы перехода.
      </p>

      <p>
        Здесь задача не искать следующий
        уровень, а создавать свою жизнь
        из осознанного выбора.
      </p>

      <p>
        Ты уже не ждёшь,
        когда жизнь изменится.
        Ты сама становишься причиной изменений.
      </p>
    `;

    button = `
      <button
        class="primary"
        onclick="showScreen('courses')"
      >
        ПОСМОТРЕТЬ ДАЛЬНЕЙШИЙ ПУТЬ
      </button>
    `;
  }


  w.innerHTML = `
    <div class="result">

      <div class="tag">
        ТВОЙ РЕЗУЛЬТАТ
      </div>

      <h2>${stage}</h2>

      ${text}

      ${button}

    </div>

    <button
      class="back"
      style="margin-top:18px"
      onclick="answers=[];renderTest()"
    >
      Пройти заново
    </button>
  `;
}


/* =========================
   ПЕРЕХОД К СЛЕДУЮЩЕМУ УРОВНЮ
========================= */

function openTransition(stage) {
  const w = document.getElementById('test-wrap');

  if (!w) return;

  window.scrollTo(0, 0);


  /* АВТОПИЛОТ → ПРОБУЖДЕНИЕ */

  if (stage === 'Автопилот') {

    w.innerHTML = `
      <div class="result">

        <div class="tag">
          ТВОЙ ПЕРЕХОД
        </div>

        <h2>АВТОПИЛОТ → ПРОБУЖДЕНИЕ</h2>

        <p>
          Сейчас твоя задача не разрушить
          всю жизнь и начать всё с нуля.
        </p>

        <p>
          Твоя задача —
          <strong>начать видеть.</strong>
        </p>

        <p>
          Где ты живёшь по привычке?
          Где выбираешь из страха?
          Где делаешь то, чего от тебя ждут,
          вместо того чтобы выбирать себя?
        </p>

        <p>
          В переходе ты начнёшь разбирать
          эти сценарии и делать первые
          реальные шаги к Пробуждению.
        </p>

        <p>
          Внутри:
          <strong>
            практические задания + мои
            голосовые сообщения.
          </strong>
        </p>

        <div class="price">
          990 ₽
        </div>

        <button
          class="primary"
          onclick="buyMini()"
        >
          🔥 ХОЧУ НАЧАТЬ ПЕРЕХОД
        </button>

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


  /* ТОЛЧОК → ПРОБУЖДЕНИЕ */

  if (stage === 'Толчок') {

    w.innerHTML = `
      <div class="result">

        <div class="tag">
          ТВОЙ ПЕРЕХОД
        </div>

        <h2>ТОЛЧОК → ПРОБУЖДЕНИЕ</h2>

        <p>
          Ты уже получила тот самый толчок,
          который заставляет человека
          остановиться и посмотреть
          на свою жизнь иначе.
        </p>

        <p>
          Старое больше не работает.
          Но если ничего не менять,
          человек очень легко возвращается
          в прежний сценарий.
        </p>

        <p>
          <strong>
            Твоя задача сейчас —
          не переждать этот период,
          а использовать его как точку перехода.
          </strong>
        </p>

        <p>
          Внутри перехода ты будешь
          разбирать происходящее через
          практические задания и мои
          голосовые сообщения.
        </p>

        <p>
          Шаг за шагом ты начнёшь
          двигаться из Толчка в Пробуждение.
        </p>

        <div class="price">
          990 ₽
        </div>

        <button
          class="primary"
          onclick="buyMini()"
        >
          🔥 ХОЧУ ПРОЙТИ ПЕРЕХОД
        </button>

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


  /* ПРОБУЖДЕНИЕ → ТВОРЕЦ */

  if (stage === 'Пробуждение') {

    w.innerHTML = `
      <div class="result">

        <div class="tag">
          ТВОЙ СЛЕДУЮЩИЙ УРОВЕНЬ
        </div>

        <h2>ПРОБУЖДЕНИЕ → ТВОРЕЦ</h2>

        <p>
          Ты уже многое увидела.
          Ты понимаешь свои сценарии
          и начинаешь выбирать иначе.
        </p>

        <p>
          Но увидеть новую жизнь —
          ещё не значит её создать.
        </p>

        <p>
          Следующий переход —
          <strong>в Творца.</strong>
        </p>

        <p>
          Здесь ты переходишь от понимания
          к созданию.
        </p>

        <p>
          Внутри:
          <strong>
            практические задания,
            мои голосовые сообщения
            и 7 последовательных медитаций.
          </strong>
        </p>

        <p>
          Ты проходишь этот путь
          в своём темпе — без жёстких
          календарных рамок.
        </p>

        <button
          class="primary"
          onclick="buyProgram()"
        >
          🔥 ХОЧУ В ТВОРЦА
        </button>

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
}


/* =========================
   TRIBUTE
========================= */

function openTribute(url) {
  if (window.Telegram?.WebApp?.openLink) {
    window.Telegram.WebApp.openLink(url);
  } else {
    window.open(url, '_blank');
  }
}


/* Автопилот / Толчок → Пробуждение */

function buyMini() {
  openTribute('https://web.tribute.tg/p/EBu');
}


/* Пробуждение → Творец */

function buyProgram() {
  openTribute('https://web.tribute.tg/p/EBv');
}


/* =========================
   КОРЗИНА
========================= */

function addToCart(id, name, price) {

  if (!cart.find(x => x.id === id)) {
    cart.push({
      id: id,
      name: name,
      price: price
    });
  }

  localStorage.setItem(
    'tp_cart',
    JSON.stringify(cart)
  );

  updateCartCount();
  showScreen('cart');
}


function removeFromCart(id) {

  cart = cart.filter(x => x.id !== id);

  localStorage.setItem(
    'tp_cart',
    JSON.stringify(cart)
  );

  renderCart();
  updateCartCount();
}


function renderCart() {

  const el = document.getElementById('cart');

  if (!el) return;

  if (!cart.length) {

    el.innerHTML = `
      <div class="empty">
        Корзина пока пуста.
      </div>
    `;

    return;
  }

  el.innerHTML =
    cart.map(x => `
      <div class="cart-item">

        <span>${x.name}</span>

        <button
          class="back"
          onclick="removeFromCart('${x.id}')"
        >
          Удалить
        </button>

      </div>
    `).join('')

    +

    `
      <div style="margin-top:20px">

        <button
          class="primary"
          onclick="alert('Оплата подключается следующим этапом.')"
        >
          Перейти к оформлению
        </button>

      </div>
    `;
}


function updateCartCount() {

  const count =
    document.getElementById('cart-count');

  if (count) {
    count.textContent = cart.length;
  }
}


updateCartCount();
