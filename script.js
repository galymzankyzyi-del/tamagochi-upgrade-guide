const STEPS = [
  {
    title: 'Разложи комплект', short: 'Подготовить детали', type: 'ПОДГОТОВКА', focus: ['holder','module','node'], wires: [],
    lead: 'Начинаем без напряжения. Аккумулятор пока лежит отдельно — в держатель его не вставляй.',
    desc: `<p>Разложи на столе <strong>MINI PowerBANK (2236)</strong>, одноместный держатель 18650, один аккумулятор DMEGC, NodeMCU и USB-кабель.</p><p>Вторую батарею оставь запасной, защищая её контакты от соприкосновения с металлом.</p>`,
    checks: ['Держатель пустой, аккумулятор не установлен','Оба USB-кабеля отключены','Подготовлены паяльник, припой и изоляция'],
    tipTitle: 'Самое важное правило', tip: 'Никакой пайки при установленном аккумуляторе. Не припаивай провода непосредственно к цилиндрической батарее.',
    diagram: 'Пока ничего не соединяем. Это весь комплект.'
  },
  {
    title: 'Найди правильные контакты', short: 'Определить BAT', type: 'ОРИЕНТАЦИЯ', focus: ['module'], wires: [],
    lead: 'На плате есть разные группы контактов. Для аккумулятора нужны только BAT+ и BAT−.',
    desc: `<p>Возьми MINI PowerBANK и найди подписи <code>BAT+</code> и <code>BAT−</code> на реальной плате. <code>+5V</code> и <code>−5V</code> — это выход питания, <strong>не контакты аккумулятора</strong>.</p><p>На иллюстрации площадки расположены <strong>условно</strong>. Не определяй расположение только по картинке — ищи маркировку на модуле.</p>`,
    checks: ['Увижу / прочитаю BAT+ на плате','Увижу / прочитаю BAT− на плате','Не путаю BAT-контакты с выходом +5V / −5V'],
    tipTitle: 'Если надписи не читаются', tip: 'Остановись и сфотографируй обе стороны модуля. Нельзя угадывать расположение контактов по цвету или внешнему виду.',
    diagram: 'Сейчас выделен модуль. BAT+ и BAT− — для держателя.'
  },
  {
    title: 'Подтверди безопасность', short: 'Проверить защиту', type: 'ОБЯЗАТЕЛЬНАЯ ПРОВЕРКА', focus: ['module','holder'], wires: [],
    lead: 'Перед подключением Li-ion нужно убедиться, что плата рассчитана на одну ячейку 4,2 В и имеет необходимую защиту.',
    desc: `<p>В <a href="https://arduparts.kz/p117536812-modul-mini-powerbank.html" target="_blank" rel="noopener noreferrer">описании ArduParts</a> указаны выход 5 В, зарядка до 4,2 В и зарядный ток до 2 А, но это <strong>не подтверждает все функции защиты</strong> конкретной платы.</p><p>Уточни у продавца: <strong>есть ли защита от переразряда, перезаряда и КЗ?</strong> Поддерживает ли именно этот модуль один Li-ion 18650? Не переключён ли он в режим зарядки 4,35 В?</p>`,
    checks: ['Продавец подтвердил заряд одной Li-ion ячейки до 4,2 В','Подтверждены защита от переразряда и короткого замыкания','Проверена совместимость зарядного тока с аккумулятором'],
    tipTitle: 'Без подтверждения — стоп', tip: 'Если защиты нет, нужна отдельная защитная плата 1S или защищённый элемент. Не устанавливай батарею на основании только этой схемы.',
    diagram: 'Никакой батареи до подтверждения защиты и режима заряда.'
  },
  {
    title: 'Подготовь провода', short: 'Подготовить пайку', type: 'ПАЙКА / БЕЗ ПИТАНИЯ', focus: ['holder'], wires: [],
    lead: 'Провода держателя можно залудить до соединения с модулем.',
    desc: `<p>Отключи все источники питания. Если у держателя есть провода, аккуратно зачисти 2–3 мм изоляции и залуди концы. Если у держателя только металлические контакты, понадобятся два коротких провода.</p><p>Проверь обозначения <code>+</code> и <code>−</code> на самом держателе. Красный и чёрный цвета — лишь подсказка, не доказательство правильной полярности.</p>`,
    checks: ['Держатель пустой, USB отключён','Плюс и минус держателя определены по маркировке','Концы проводов подготовлены и не касаются друг друга'],
    tipTitle: 'Не перегревай держатель', tip: 'Припаивайся к выводам держателя коротко и аккуратно. Литиевый элемент во время пайки вообще не должен находиться рядом с жалом.',
    diagram: 'Готовим провода только на пустом держателе.'
  },
  {
    title: 'Припаяй плюс к BAT+', short: 'Подключить плюс', type: 'КРАСНЫЙ ПРОВОД', focus: ['holder','module'], wires: ['positive'],
    lead: 'Первое соединение: плюсовой вывод держателя → BAT+ модуля.',
    desc: `<p>При <strong>вынутом аккумуляторе</strong> припаяй плюсовой провод держателя к площадке <code>BAT+</code> MINI PowerBANK. На схеме этот путь подсвечен <strong>красным</strong>.</p><p>После остывания убедись, что припой не перемкнул соседние площадки. Не подключай этот провод к <code>+5V</code>.</p>`,
    checks: ['Аккумулятор всё ещё вне держателя','Плюсовой вывод держателя соединён именно с BAT+','Между соседними площадками нет видимого мостика припоя'],
    tipTitle: 'BAT+ ≠ +5V', tip: 'BAT+ принимает напряжение одной Li-ion ячейки. На выходных площадках +5V другое назначение. Перепутать их опасно.',
    diagram: 'Красный маршрут: плюс держателя → BAT+.'
  },
  {
    title: 'Припаяй минус к BAT−', short: 'Подключить минус', type: 'МИНУСОВОЙ ПРОВОД', focus: ['holder','module'], wires: ['negative'],
    lead: 'Второе соединение: минусовой вывод держателя → BAT− модуля.',
    desc: `<p>При выключенном паяльнике после подготовки, затем на холодной сборке оцени: минус держателя должен быть припаян к <code>BAT−</code>.</p><p>На схеме путь подсвечен <strong>голубым</strong>. Не путай <code>BAT−</code> с <code>−5V</code> при подключении проводов аккумулятора.</p>`,
    checks: ['Аккумулятор не установлен','Минусовой вывод держателя соединён с BAT−','Оба припаянных контакта изолированы от случайного касания'],
    tipTitle: 'Без питания', tip: 'На всём этапе пайки держатель пустой, USB-C и USB-A никуда не подключены. Изоляция не должна закрывать контрольные надписи до проверки.',
    diagram: 'Голубой маршрут: минус держателя → BAT−.'
  },
  {
    title: 'Проверь пайку прибором', short: 'Контроль до батареи', type: 'КОНТРОЛЬНЫЙ ПУНКТ', focus: ['holder','module'], wires: ['positive','negative'],
    lead: 'Перед установкой Li-ion нужна проверка полярности и отсутствия короткого замыкания.',
    desc: `<p>У тебя нет мультиметра — это нормально для самого сайта, но <strong>не пропускай электрическую проверку</strong>. Попроси знакомого с мультиметром или мастерскую проверить полярность выводов держателя, куда они приходят на модуле, и отсутствие замыкания между BAT+ и BAT−.</p><p>Дополнительно ещё раз проверь подтверждение защиты из шага 3. До такой проверки <strong>не вставляй аккумулятор и не начинай зарядку</strong>.</p>`,
    checks: ['Кто-то с мультиметром проверил полярность проводки','Проверено отсутствие короткого замыкания между BAT+ и BAT−','Безопасность зарядного модуля подтверждена'],
    tipTitle: 'Здесь лучше остановиться', tip: 'Визуальный осмотр не заменяет измерение. Если проверять нечем, просто сохрани свой прогресс и вернись после проверки.',
    diagram: 'Красный и голубой провода должны быть проверены до установки батареи.'
  },
  {
    title: 'Установи один 18650', short: 'Вставить аккумулятор', type: 'ТОЛЬКО ПОСЛЕ ПРОВЕРКИ', focus: ['holder','module'], wires: ['positive','negative'],
    lead: 'После успешной проверки можно вставить один аккумулятор в держатель.',
    desc: `<p>Вставь <strong>один</strong> исправный DMEGC 18650 строго по обозначениям плюса и минуса на держателе. Не применяй силу. Проверь, что контакты не касаются корпуса и нет нагрева или запаха.</p><p>Вторая батарея остаётся отдельно, её контакты должны быть защищены от короткого замыкания.</p>`,
    checks: ['Электрическая проверка выполнена на предыдущем этапе','В держателе установлен только один 18650, + и − совпадают','Нет необычного нагрева, повреждений, запаха'],
    tipTitle: 'Если что-то не так', tip: 'Нагрев, запах, искра, повреждённая оболочка — повод прекратить использование. Не продолжай подключение NodeMCU и зарядку.',
    diagram: 'Один аккумулятор, правильная полярность, подтверждённая безопасность.'
  },
  {
    title: 'Подай питание на NodeMCU', short: 'Подключить USB-A', type: 'ЗАПУСК', focus: ['module','node','display','joystick'], wires: ['usb'],
    lead: 'Питание 5 В идёт через обычный USB-кабель, без подключения к пину 3V3.',
    desc: `<p>Вставь конец <strong>USB-A</strong> кабеля в выход модуля PowerBANK, а <strong>Micro-USB</strong> — в NodeMCU. OLED и джойстик остаются подключены к <code>3V3</code> и <code>GND</code> NodeMCU, как раньше.</p><p>Если у модуля USB-A разъём был в комплекте отдельно, его должен установить пайкой компетентный человек до использования. На некоторых версиях USB-A выход может автоматически выключаться при низкой нагрузке.</p>`,
    checks: ['USB-A подключён к 5V OUT модуля','Micro-USB подключён к разъёму NodeMCU','OLED показывает питомца либо NodeMCU запускается без перегрева'],
    tipTitle: 'Никаких 5 В на 3V3', tip: 'NodeMCU принимает питание 5 В через свой Micro-USB. Подача 5 В непосредственно на контакт 3V3 может повредить плату.',
    diagram: 'Фиолетовый маршрут: USB-A → кабель → Micro-USB NodeMCU.'
  },
  {
    title: 'Зарядка через USB-C', short: 'Зарядить аккумулятор', type: 'ЗАРЯДКА', focus: ['module','charger'], wires: ['charge'],
    lead: 'Для первого теста заряжай аккумулятор без одновременного питания Тамагочи.',
    desc: `<p><strong>Отключи NodeMCU от USB-A.</strong> Подключи обычное зарядное устройство <strong>5 В</strong> к USB-C входу PowerBANK. Следи за индикаторами и температурой, не оставляй первую зарядку без присмотра.</p><p>Не используй одновременную зарядку и работу, пока для этого модуля не подтверждена функция power-path. При заметном нагреве, запахе или повреждении прекращай зарядку.</p>`,
    checks: ['Кабель NodeMCU отсоединён от USB-A','К USB-C подключена обычная зарядка 5 В','Первая зарядка контролируется, аккумулятор не перегревается'],
    tipTitle: 'Не заряжай без присмотра', tip: 'Лучше заряжать на негорючей поверхности, вдали от вспененного ПВХ, ткани и бумаги. Только после подтверждения совместимости и защиты аккумулятора.',
    diagram: 'Бирюзовый маршрут: зарядка 5 В → USB-C модуля.'
  },
  {
    title: 'Уложи всё в корпус', short: 'Закрепить корпус', type: 'ФИНАЛЬНАЯ СБОРКА', focus: ['holder','module','node','display','joystick'], wires: ['positive','negative','usb'],
    lead: 'Остаётся разместить питание внутри корпуса так, чтобы порты и провода были доступны.',
    desc: `<p>Закрепи держатель, NodeMCU и модуль в корпусе, не допуская касания открытых контактов. Оставь доступ к USB-C зарядке и к кабелю питания NodeMCU. Провода не должны перетираться об острые края ПВХ.</p><p>Не прижимай зарядную плату к вспененному ПВХ без зазора. Перед закрытием крышки ещё раз проверь отсутствие натяжения проводов и возможность извлечь аккумулятор.</p>`,
    checks: ['Все платы закреплены, контакты изолированы','Есть доступ к USB-C, батарее и Micro-USB','Провода не пережимаются, возле зарядки есть пространство'],
    tipTitle: 'Готово!', tip: 'Твой скетч Тамагочи уже хранится на NodeMCU — перепрошивать для питания от аккумулятора не нужно. Прогресс игры зависит от сохранения в LittleFS.',
    diagram: 'Итоговая цепочка: аккумулятор → MINI PowerBANK → NodeMCU.'
  }
];

const STORE_KEY='tamago-guide-build-v1';
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
let step=0;
let checked={};
try{const data=JSON.parse(localStorage.getItem(STORE_KEY)||'{}');step=Math.min(STEPS.length-1,Math.max(0,Number(data.step)||0));checked=data.checked||{};}catch(_){checked={}}
const elements={stepList:$('#step-list'),index:$('#step-index'),title:$('#step-title'),type:$('#step-type'),lead:$('#step-lead'),desc:$('#step-description'),checks:$('#step-checks'),tip:$('#step-tip'),tipTitle:$('#tip-title'),progress:$('#completion-value'),ring:$('#completion-ring'),message:$('#diagram-message'),panel:$('#diagram-panel'),pips:$('#step-pips'),number:$('#step-number-big'),count:$('#check-count'),saved:$('#step-saved'),prev:$('#prev-step'),next:$('#next-step')};
let toastTimer=null;
function toast(text){const el=$('#toast');el.textContent=text;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2700)}
function persist(){try{localStorage.setItem(STORE_KEY,JSON.stringify({step,checked}))}catch(_){}}
function completedFor(i){return (checked[i]||[]).filter(Boolean).length}
function renderSidebar(){elements.stepList.innerHTML='';STEPS.forEach((s,i)=>{const btn=document.createElement('button');btn.type='button';btn.className='step-link'+(step===i?' active':'')+(completedFor(i)===s.checks.length?' done':'');btn.setAttribute('aria-current',step===i?'step':'false');btn.innerHTML=`<span class="step-num">${completedFor(i)===s.checks.length?'✓':String(i+1).padStart(2,'0')}</span><span>${s.short}</span>`;btn.addEventListener('click',()=>goTo(i));elements.stepList.append(btn)});}
function renderDiagram(s){elements.panel.classList.add('focus-mode');elements.panel.dataset.focus=s.type;$$('.diagram-part').forEach(part=>part.classList.toggle('highlight',s.focus.includes(part.dataset.part)));$$('.wire-flow').forEach(path=>path.classList.toggle('energized',s.wires.some(w=>path.classList.contains(w))));elements.message.textContent=s.diagram;}
function renderChecks(s){elements.checks.innerHTML='';s.checks.forEach((label,i)=>{const holder=document.createElement('label');holder.className='check-item';const input=document.createElement('input');input.type='checkbox';input.checked=Boolean((checked[step]||[])[i]);input.setAttribute('aria-label',label);const text=document.createElement('span');text.textContent=label;input.addEventListener('change',()=>{if(!checked[step])checked[step]=[];checked[step][i]=input.checked;persist();updateCheckCount();updateProgress();renderSidebar();});holder.append(input,text);elements.checks.append(holder)});}
function updateCheckCount(){const n=completedFor(step);const total=STEPS[step].checks.length;elements.count.textContent=`${n} из ${total} отмечено`;elements.saved.textContent=n===total?'● шаг отмечен':'● прогресс сохранён';}
function updateProgress(){const all=STEPS.reduce((n,s,i)=>n+completedFor(i),0),total=STEPS.reduce((n,s)=>n+s.checks.length,0),pct=Math.round(all/total*100);elements.progress.textContent=`${pct}%`;elements.ring.style.borderTopColor='#64ceff';elements.ring.style.borderRightColor='#64ceff';elements.ring.style.background=`conic-gradient(#58bdff 0 ${pct}%,transparent ${pct}% 100%)`;elements.ring.style.boxShadow='inset 0 0 0 7px #0b1a35';}
function renderStep(){const s=STEPS[step];elements.index.textContent=`ЭТАП ${String(step+1).padStart(2,'0')} / ${STEPS.length}`;elements.number.textContent=String(step+1).padStart(2,'0');elements.title.textContent=s.title;elements.type.textContent=s.type;elements.lead.textContent=s.lead;elements.desc.innerHTML=s.desc;elements.tipTitle.textContent=s.tipTitle;elements.tip.textContent=s.tip;elements.prev.disabled=step===0;elements.next.innerHTML=step===STEPS.length-1?'К началу <span>↻</span>':'Далее <span>→</span>';elements.pips.innerHTML=STEPS.map((_,i)=>`<span class="${i===step?'active':i<step?'done':''}"></span>`).join('');renderChecks(s);updateCheckCount();updateProgress();renderDiagram(s);renderSidebar();persist();}
function goTo(i){step=Math.max(0,Math.min(STEPS.length-1,i));renderStep();const target=$('#builder');if(window.innerWidth<860){target.scrollIntoView({behavior:'smooth',block:'start'})}else{document.querySelector('.step-content').scrollIntoView({behavior:'smooth',block:'nearest'})}}
elements.prev.addEventListener('click',()=>goTo(step-1));elements.next.addEventListener('click',()=>goTo(step===STEPS.length-1?0:step+1));$('#reset-progress').addEventListener('click',()=>{if(!confirm('Сбросить отметки о выполненных шагах?'))return;checked={};step=0;renderStep();toast('Прогресс сброшен')});
$('#copy-scheme').addEventListener('click',async()=>{const text='Тамагочи ESP8266 — схема питания\nДержатель 18650 + → MINI PowerBANK BAT+\nДержатель 18650 − → MINI PowerBANK BAT−\nUSB-A выхода PowerBANK (5 В) → кабель USB-A/Micro-USB → NodeMCU Micro-USB\n5В USB-зарядка → вход PowerBANK USB-C\nOLED и джойстик остаются на NodeMCU 3V3/GND\nПеред установкой аккумулятора обязательна проверка мультиметром и подтверждение защиты аккумулятора.';try{await navigator.clipboard.writeText(text);toast('Схема скопирована')}catch(_){const t=document.createElement('textarea');t.value=text;document.body.append(t);t.select();try{document.execCommand('copy');toast('Схема скопирована')}catch(e){toast('Не удалось скопировать — проверь разрешения браузера')}t.remove()}});
renderStep();
