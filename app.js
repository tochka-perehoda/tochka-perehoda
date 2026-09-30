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
        ${questions[i].a
          .map(
            (x, j) => `
              <button
                class="answer"
                onclick="choose(${j})"
              >
                ${String.fromCharCode(65 + j)}. ${x}
              </button>
            `
          )
          .join('')}
      </div>
    </div>
  `;
}


function choose(j) {
  answers.push(j);
  renderTest();
}


/* =========================
   РЕЗУЛЬТАТ
========================= */

function renderResult() {
  const counts = [0, 0, 0, 0, 0];

  answers.forEach(x => {
    if (x >= 0 && x <= 4) {
      counts[x]++;
    }
  });

  const max = Math.max(...counts);
  const idx = counts.indexOf(max);

  let stage;

  if (idx === 0) {
    stage = 'Автопилот';
  } else if (idx === 1) {
    stage = 'Толчок';
  } else if (idx === 2) {
    stage = 'Пробуждение';
  } else {
    stage = 'Творец';
  }

  const w = document.getElementById('test-wrap');

  if (!w) return;

  let buttonText = 'Посмотреть следующий шаг';

  if (stage === 'Автопилот' || stage === 'Толчок') {
    buttonText = 'ПЕРЕЙТИ В ПРОБУЖДЕНИЕ';
  }

  if (stage === 'Пробуждение') {
    buttonText = 'ПЕРЕЙТИ В ТВОРЦА';
  }

  if (stage === 'Творец') {
    buttonText = 'ПОСМОТРЕТЬ СВОЙ РЕЗУЛЬТАТ';
  }

  w.innerHTML = `
    <div class="result">

      <div class="tag">
        ТВОЙ РЕЗУЛЬТАТ
      </div>

      <h2>${stage}</h2>

      <p>
        Ты находишься на этапе «${stage}».
        Этот результат показывает твою текущую точку перехода
        и направление дальнейшей работы.
      </p>

      <p>
        Следующий шаг — перейти на новый уровень
        и начать движение дальше.
      </p>

      <button
        class="primary"
        onclick="showNextStep('${stage}')"
      >
        ${buttonText}
      </button>

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
   СЛЕДУЮЩИЙ УРОВЕНЬ
========================= */

function showNextStep(stage) {
  const w = document.getElementById('test-wrap');

  if (!w) return;

  window.scrollTo(0, 0);


  /* АВТОПИЛОТ → ПРОБУЖДЕНИЕ */

  if (stage === 'Автопилот') {
    w.innerHTML = `
      <div class="result">

        <div class="tag">
          СЛЕДУЮЩИЙ ШАГ
        </div>

        <h2>АВТОПИЛОТ → ПРОБУЖДЕНИЕ</h2>

        <p>
          Ты уже видишь, что прежняя жизнь больше не работает.
          Но пока ещё живёшь по старым сценариям.
        </p>

        <p>
          Следующий этап — <strong>Пробуждение</strong>.
          Здесь ты начинаешь видеть себя честно,
          распознавать свои настоящие желания
          и выходить из жизни на автомате.
        </p>

        <p>
          Я проведу тебя через этот переход
          шаг за шагом: через практические задания
          и мои голосовые сообщения.
        </p>

        <button
          class="primary"
          onclick="buyMini()"
        >
          ХОЧУ ПЕРЕЙТИ В ПРОБУЖДЕНИЕ
        </button>

      </div>

      <button
        class="back"
        style="margin-top:18px"
        onclick="renderResult()"
      >
        ← Назад к результату
      </button>
    `;

    return;
  }


  /* ТОЛЧОК → ПРОБУЖДЕНИЕ */

  if (stage === 'Толчок') {
    w.innerHTML = `
      <div class="result">

        <div class="tag">
          СЛЕДУЮЩИЙ ШАГ
        </div>

        <h2>ТОЛЧОК → ПРОБУЖДЕНИЕ</h2>

        <p>
          Жизнь уже начала менять твой сценарий.
          Возможно, через кризис, потерю,
          разрушение привычного или сильное внутреннее напряжение.
        </p>

        <p>
          Ты находишься в точке,
          где старое уже не работает,
          а новое ещё не стало твоей реальностью.
        </p>

        <p>
          Следующий этап — <strong>Пробуждение</strong>.
          Здесь ты начинаешь осознанно понимать,
          что с тобой происходит, и делать первые шаги
          из старого сценария.
        </p>

        <p>
          Практические задания + мои голосовые сообщения
          помогут тебе пройти этот переход.
        </p>

        <button
          class="primary"
          onclick="buyMini()"
        >
          ХОЧУ ПЕРЕЙТИ В ПРОБУЖДЕНИЕ
        </button>

      </div>

      <button
        class="back"
        style="margin-top:18px"
        onclick="renderResult()"
      >
        ← Назад к результату
      </button>
    `;

    return;
  }


  /* ПРОБУЖДЕНИЕ → ТВОРЕЦ */

  if (stage === 'Пробуждение') {
    w.innerHTML = `
      <div class="result">

        <div class="tag">
          СЛЕДУЮЩИЙ ШАГ
        </div>

        <h2>ПРОБУЖДЕНИЕ → ТВОРЕЦ</h2>

        <p>
          Ты уже видишь себя и свою жизнь гораздо яснее.
          Старые правила больше не определяют твои решения.
        </p>

        <p>
          Следующий уровень — <strong>Творец</strong>.
        </p>

        <p>
          Здесь задача уже не просто понять,
          что с тобой происходит,
          а начать создавать новую реальность
          из нового внутреннего состояния.
        </p>

        <p>
          Тебя ждут практические задания,
          мои голосовые сообщения и
          <strong>7 последовательных медитаций</strong>,
          которые ты проходишь в своём темпе.
        </p>

        <button
          class="primary"
          onclick="buyProgram()"
        >
          ХОЧУ ПЕРЕЙТИ В ТВОРЦА
        </button>

      </div>

      <button
        class="back"
        style="margin-top:18px"
        onclick="renderResult()"
      >
        ← Назад к результату
      </button>
    `;

    return;
  }


  /* ТВОРЕЦ */

  if (stage === 'Творец') {
    w.innerHTML = `
      <div class="result">

        <div class="tag">
          ТВОЙ УРОВЕНЬ
        </div>

        <h2>ТЫ — ТВОРЕЦ</h2>

        <p>
          Ты уже находишься на последнем уровне
          этой системы перехода.
        </p>

        <p>
          Здесь задача не перейти на следующий уровень,
          а продолжать создавать свою жизнь
          из осознанного выбора.
        </p>

        <p>
          Твой дальнейший путь будет связан
          не с переходом на новый этап,
          а с углублением и реализацией
          того состояния, в котором ты уже находишься.
        </p>

      </div>

      <button
        class="back"
        style="margin-top:18px"
        onclick="renderResult()"
      >
        ← Назад к результату
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


/* Первый продукт:
   Автопилот / Толчок → Пробуждение
*/

function buyMini() {
  openTribute('https://web.tribute.tg/p/EBu');
}


/* Второй продукт:
   Пробуждение → Творец
*/

function buyProgram() {
  openTribute('https://web.tribute.tg/p/EBv');
}


/* =========================
   КОРЗИНА
========================= */

function addToCart(id, name, price) {
  if (!cart.find(x => x.id === id)) {
    cart.push({
      id,
      name,
      price
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
    cart
      .map(
        x => `
          <div class="cart-item">
            <span>${x.name}</span>

            <button
              class="back"
              onclick="removeFromCart('${x.id}')"
            >
              Удалить
            </button>
          </div>
        `
      )
      .join('') +

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
  const count = document.getElementById('cart-count');

  if (count) {
    count.textContent = cart.length;
  }
}


updateCartCount();
