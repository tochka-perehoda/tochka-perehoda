const tg=window.Telegram?.WebApp; if(tg){tg.ready();tg.expand();}
let cart=JSON.parse(localStorage.getItem('tp_cart')||'[]');
const stages=['Автопилот','Толчок','Пробуждение','Маг','Творец'];
const questions=[
 {t:'Я понимаю, что прежний образ жизни больше меня не устраивает.',a:['Это почти не про меня','Иногда ловлю себя на этой мысли','Это уже стало очевидно','Я давно это чувствую','Я полностью готов(а) к новому этапу']},
 {t:'Когда жизнь резко меняется, я обычно…',a:['Продолжаю жить как раньше','Чувствую внутреннее сопротивление','Начинаю искать ответы','Беру ответственность за выбор','Создаю новый сценарий']},
 {t:'Что сейчас происходит с моими привычными целями?',a:['Меня всё устраивает','Некоторые цели перестали радовать','Я пересматриваю приоритеты','Я выбираю свои цели осознанно','Я создаю цели из нового состояния']},
 {t:'Насколько я слышу собственные желания?',a:['Почти не слышу','Иногда слышу, но сомневаюсь','Начинаю различать своё и чужое','Доверяю себе больше','Опираюсь на себя в решениях']},
 {t:'Если старый сценарий больше не работает, я…',a:['Держусь за него','Не знаю, что делать','Начинаю отпускать','Создаю новые правила','Осознанно создаю новую реальность']},
 {t:'Мои кризисы чаще всего…',a:['Кажутся случайными','Вынуждают меня остановиться','Показывают, что пора меняться','Становятся точками роста','Становятся материалом для нового выбора']},
 {t:'Я отношусь к неизвестности как к…',a:['Угрозе','Сильному дискомфорту','Пространству поиска','Возможности','Пространству создания']},
 {t:'Что важнее всего в моих решениях?',a:['Стабильность','Не разочаровать других','Понять, чего хочу я','Взять ответственность за себя','Создать жизнь, которая соответствует мне']},
 {t:'Я чувствую, что стою перед новым этапом жизни.',a:['Нет','Скорее нет','Да, но не понимаю каким он будет','Да, я уже меняю многое','Да, я сознательно создаю следующий этап']},
 {t:'Что мне сейчас нужнее всего?',a:['Остановиться и выжить','Понять, что происходит','Увидеть себя честно','Перестать жить по старым правилам','Сделать первый шаг в новую жизнь']}
];
let answers=[];
function showScreen(name){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById('screen-'+name).classList.add('active');if(name==='test')renderTest();if(name==='cart')renderCart();window.scrollTo(0,0)}
function renderTest(){const w=document.getElementById('test-wrap');if(answers.length===questions.length){renderResult();return}let i=answers.length;w.innerHTML=`<div class="progress">ВОПРОС ${i+1} ИЗ ${questions.length}</div><div class="question"><h3>${questions[i].t}</h3><div class="answers">${questions[i].a.map((x,j)=>`<button class="answer" onclick="choose(${j})">${String.fromCharCode(65+j)}. ${x}</button>`).join('')}</div></div>`}
function choose(j){answers.push(j);renderTest()}
function renderResult(){let counts=[0,0,0,0,0];answers.forEach(x=>counts[x]++);let max=Math.max(...counts),idx=counts.indexOf(max);let stage=stages[idx];document.getElementById('test-wrap').innerHTML=`<div class="result"><div class="tag">ТВОЙ РЕЗУЛЬТАТ</div><h2>${stage}</h2><p>Ты находишься на этапе «${stage}». Этот результат показывает твою текущую точку перехода и направление дальнейшей работы.</p><p>Следующий шаг — посмотреть, что именно требует внимания сейчас.</p><button class="primary" onclick="showScreen('products')">Посмотреть следующий шаг</button></div><button class="back" style="margin-top:18px" onclick="answers=[];renderTest()">Пройти заново</button>`}
function addToCart(id,name,price){if(!cart.find(x=>x.id===id))cart.push({id,name,price});localStorage.setItem('tp_cart',JSON.stringify(cart));updateCartCount();showScreen('cart')}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);localStorage.setItem('tp_cart',JSON.stringify(cart));renderCart();updateCartCount()}
function renderCart(){const el=document.getElementById('cart');if(!cart.length){el.innerHTML='<div class="empty">Корзина пока пуста.</div>';return}el.innerHTML=cart.map(x=>`<div class="cart-item"><span>${x.name}</span><button class="back" onclick="removeFromCart('${x.id}')">Удалить</button></div>`).join('')+'<div style="margin-top:20px"><button class="primary" onclick="alert(\'Оплата подключается следующим этапом.\')">Перейти к оформлению</button></div>'}
function updateCartCount(){document.getElementById('cart-count').textContent=cart.length}
updateCartCount();
