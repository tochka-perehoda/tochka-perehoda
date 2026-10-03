const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
}

const SUPABASE_URL =
  'https://vxhoavgkiratylcfeqnz.supabase.co';

const SUPABASE_KEY =
  'sb_publishable_s_PuUbLuT_aerFgVmywXDw_fVcZWjNv';

const db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


async function testConnection() {

  const user =
    tg?.initDataUnsafe?.user;

  const telegramId =
    user?.id
      ? String(user.id)
      : null;


  let result = `
    <div style="
      padding:20px;
      color:white;
      font-family:Arial;
      line-height:1.7;
    ">

      <h2>ПРОВЕРКА</h2>

      <p>
        Telegram:
        <strong>
          ${tg ? 'ДА' : 'НЕТ'}
        </strong>
      </p>

      <p>
        Telegram ID:
        <strong>
          ${telegramId || 'НЕ НАЙДЕН'}
        </strong>
      </p>

  `;


  if (!telegramId) {

    result += `
      <p style="color:#ff7777">
        ❌ Telegram ID не найден.
      </p>
    `;

    document.body.insertAdjacentHTML(
      'beforeend',
      result + '</div>'
    );

    return;
  }


  const { data, error } =
    await db
      .from('users')
      .upsert(
        {
          telegram_id: telegramId,
          stage: 'Проверка',
          progress: 0
        },
        {
          onConflict: 'telegram_id'
        }
      )
      .select();


  if (error) {

    result += `
      <p style="color:#ff7777">
        ❌ ОШИБКА SUPABASE
      </p>

      <p>
        ${error.message}
      </p>
    `;

  } else {

    result += `
      <p style="color:#77ff99">
        ✅ SUPABASE РАБОТАЕТ
      </p>

      <p>
        Пользователь записан.
      </p>
    `;

  }


  result += `
    </div>
  `;


  document.body.insertAdjacentHTML(
    'beforeend',
    result
  );

}


testConnection();
