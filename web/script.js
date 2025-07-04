// Основной скрипт приложения (внешний файл #2)
document.addEventListener('DOMContentLoaded', () => {
    // --- Получение ссылок на DOM-элементы ---
    const screens = {
        main: document.getElementById('main-screen'),
        numbers: document.getElementById('number-generator-screen'),
        strings: document.getElementById('string-generator-screen'),
        settings: document.getElementById('settings-screen'),
        help: document.getElementById('help-screen')
    };

    let currentScreenId = 'main'; // Храним ID текущего активного экрана

    // --- Навигация ---
    function showScreen(screenIdToShow) {
        screens[currentScreenId].classList.remove('active'); // Скрываем текущий
        screens[screenIdToShow].classList.add('active');     // Показываем новый
        currentScreenId = screenIdToShow;                     // Обновляем ID текущего
        window.scrollTo(0, 0); // Прокрутка вверх при смене экрана
    }

    // Кнопки навигации на главном экране
    document.getElementById('btn-to-numbers').addEventListener('click', () => showScreen('numbers'));
    document.getElementById('btn-to-strings').addEventListener('click', () => showScreen('strings'));
    document.getElementById('btn-to-settings').addEventListener('click', () => showScreen('settings'));
    document.getElementById('btn-to-help').addEventListener('click', () => showScreen('help'));

    // Кнопки "На главный" на других экранах
    document.querySelectorAll('.btn-to-main').forEach(button => {
        button.addEventListener('click', () => showScreen('main'));
    });

    // --- Логика для "Генерация случайных чисел" ---
    const numberForm = document.getElementById('number-form');
    const numTypeSelect = document.getElementById('num-type');
    const floatPrecisionGroup = document.getElementById('float-precision-group');
    const numMinInput = document.getElementById('num-min');
    const numMaxInput = document.getElementById('num-max');
    const numCountInput = document.getElementById('num-count');
    const numPrecisionInput = document.getElementById('num-precision');
    const numberResultArea = document.getElementById('number-result-area');

    numTypeSelect.addEventListener('change', function() {
        floatPrecisionGroup.style.display = (this.value === 'float') ? 'block' : 'none';
    });

    numberForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы
        generateNumbers();
    });
    
    function generateNumbers() {
        const type = numTypeSelect.value;
        const minText = numMinInput.value;
        const maxText = numMaxInput.value;
        const count = parseInt(numCountInput.value);
        const precision = parseInt(numPrecisionInput.value);

        // Валидация (проверка корректности JavaScript)
        if (minText === '' || maxText === '') {
            alert('Ошибка: Пожалуйста, укажите минимальное и максимальное значения.');
            return;
        }
        const numMin = (type === 'integer') ? parseInt(minText) : parseFloat(minText);
        const numMax = (type === 'integer') ? parseInt(maxText) : parseFloat(maxText);

        if (isNaN(numMin) || isNaN(numMax)) {
            alert('Ошибка: Минимальное и максимальное значения должны быть числами.');
            return;
        }
        if (numMin >= numMax) {
            alert('Ошибка: Минимальное значение должно быть меньше максимального.');
            return;
        }
        if (isNaN(count) || count <= 0 || count > 10000) {
            alert('Ошибка: Количество чисел должно быть положительным числом (от 1 до 10000).');
            return;
        }
        if (type === 'float' && (isNaN(precision) || precision < 0 || precision > 10)) {
            alert('Ошибка: Точность для вещественных чисел должна быть от 0 до 10.');
            return;
        }

        let results = [];
        for (let i = 0; i < count; i++) {
            if (type === 'integer') {
                results.push(Utils.getRandomInt(numMin, numMax));
            } else {
                results.push(Utils.getRandomFloat(numMin, numMax, precision));
            }
        }
        // Динамическое наполнение страницы
        numberResultArea.textContent = results.join(results.length > 100 ? '\n' : ', ');
        alert('Числа успешно сгенерированы!'); // Система оповещений
    }

    // --- Логика для "Генерация случайных строк" ---
    const stringForm = document.getElementById('string-form');
    const strLengthInput = document.getElementById('str-length');
    const strCountInput = document.getElementById('str-count');
    const charUpperCheckbox = document.getElementById('char-upper');
    const charLowerCheckbox = document.getElementById('char-lower');
    const charDigitsCheckbox = document.getElementById('char-digits');
    const charSymbolsCheckbox = document.getElementById('char-symbols');
    const strExcludeInput = document.getElementById('str-exclude');
    const stringResultArea = document.getElementById('string-result-area');

    stringForm.addEventListener('submit', function(event) {
        event.preventDefault();
        generateStrings();
    });

    function generateStrings() {
        const length = parseInt(strLengthInput.value);
        const count = parseInt(strCountInput.value);
        const useUpper = charUpperCheckbox.checked;
        const useLower = charLowerCheckbox.checked;
        const useDigits = charDigitsCheckbox.checked;
        const useSymbols = charSymbolsCheckbox.checked;
        let excludeChars = strExcludeInput.value;

        // Валидация
        if (isNaN(length) || length <= 0 || length > 1000) {
            alert('Ошибка: Длина строки должна быть положительным числом (от 1 до 1000).');
            return;
        }
        if (isNaN(count) || count <= 0 || count > 1000) {
            alert('Ошибка: Количество строк должно быть положительным числом (от 1 до 1000).');
            return;
        }
        if (!useUpper && !useLower && !useDigits && !useSymbols) {
            alert('Ошибка: Выберите хотя бы один набор символов для генерации.');
            return;
        }

        let charSet = '';
        if (useUpper) charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (useLower) charSet += 'abcdefghijklmnopqrstuvwxyz';
        if (useDigits) charSet += '0123456789';
        if (useSymbols) charSet += '!@#$%^&*()_+-=[]{}|;:\'",./<>?';
        
        if (excludeChars.length > 0) {
            for (let char of excludeChars) {
                // Проверка, чтобы char не был специальным символом для RegExp без экранирования
                charSet = charSet.replace(new RegExp(Utils.escapeRegExp(char), 'g'), '');
            }
        }
        
        if (charSet.length === 0 && (useUpper || useLower || useDigits || useSymbols)) {
             alert('Ошибка: После исключения символов набор для генерации оказался пустым. Проверьте исключаемые символы.');
            return;
        }
         if (charSet.length === 0) { // Если изначально ничего не было выбрано и ничего не исключалось
             alert('Ошибка: Набор символов для генерации пуст.');
            return;
        }

        let results = [];
        for (let i = 0; i < count; i++) {
            results.push(Utils.generateRandomString(length, charSet));
        }
        stringResultArea.textContent = results.join('\n');
        alert('Строки успешно сгенерированы!');
    }

    // --- Логика для "Настройки" ---
    const settingsForm = document.getElementById('settings-form');
    const defaultNumMinInput = document.getElementById('default-num-min');
    const defaultNumMaxInput = document.getElementById('default-num-max');
    const defaultStrLengthInput = document.getElementById('default-str-length');
    const defaultStrCountInput = document.getElementById('default-str-count');

    // Загрузка настроек при старте
    function loadSettings() {
        // Получаем значения из localStorage, если их нет - используем значения по умолчанию из HTML
        const defaultMin = localStorage.getItem('defaultNumMin') || defaultNumMinInput.value;
        const defaultMax = localStorage.getItem('defaultNumMax') || defaultNumMaxInput.value;
        const defaultLength = localStorage.getItem('defaultStrLength') || defaultStrLengthInput.value;
        const defaultCount = localStorage.getItem('defaultStrCount') || defaultStrCountInput.value;

        // Устанавливаем значения в поля настроек
        if (defaultNumMinInput) defaultNumMinInput.value = defaultMin;
        if (defaultNumMaxInput) defaultNumMaxInput.value = defaultMax;
        if (defaultStrLengthInput) defaultStrLengthInput.value = defaultLength;
        if (defaultStrCountInput) defaultStrCountInput.value = defaultCount;

        // Применяем настройки к полям генерации (если пользователь ещё не менял их вручную)
        if (numMinInput && numMinInput.value === '1') numMinInput.value = defaultMin;
        if (numMaxInput && numMaxInput.value === '100') numMaxInput.value = defaultMax;
        if (strLengthInput && strLengthInput.value === '10') strLengthInput.value = defaultLength;
        if (strCountInput && strCountInput.value === '5') strCountInput.value = defaultCount;
    }

    // Сохранение настроек
    if (settingsForm) {
        settingsForm.addEventListener('submit', (event) => {
            event.preventDefault();
            localStorage.setItem('defaultNumMin', defaultNumMinInput.value);
            localStorage.setItem('defaultNumMax', defaultNumMaxInput.value);
            localStorage.setItem('defaultStrLength', defaultStrLengthInput.value);
            localStorage.setItem('defaultStrCount', defaultStrCountInput.value);
            alert('Настройки успешно сохранены!');
            loadSettings(); // Перезагружаем настройки, чтобы они сразу применились
            showScreen('main'); // Возвращаемся на главный экран
        });
    }

    // Вызываем загрузку настроек в конце DOMContentLoaded
    loadSettings();

    // --- Общие функции: Копирование и Сохранение ---
    function copyToClipboard(elementId) {
        const resultArea = document.getElementById(elementId);
        if (!resultArea || !resultArea.textContent) {
            alert('Нечего копировать. Сначала сгенерируйте данные.');
            return;
        }

        // Ветка подтверждения
        const confirmation = confirm('Вы уверены, что хотите скопировать результат в буфер обмена?');
        if (!confirmation) {
            alert('Копирование отменено.');
            return; // Прекращаем выполнение, если пользователь отменил
        }

        // Попытка копирования
        navigator.clipboard.writeText(resultArea.textContent)
            .then(() => {
                alert('Результат скопирован в буфер обмена!');
            })
            .catch(err => {
                console.error('Ошибка копирования: ', err);
                // Это сообщение увидите, если не в безопасном контексте или есть другие проблемы
                alert('Не удалось скопировать текст. Возможно, браузер запрещает доступ к буферу обмена или вы открыли файл напрямую (не через локальный сервер). Попробуйте вручную скопировать текст из области результатов.');
            });
    }

    function saveToFile(elementId, defaultFileName) {
        const resultArea = document.getElementById(elementId);
        if (!resultArea || !resultArea.textContent) {
            alert('Нечего сохранять. Сначала сгенерируйте данные.');
            return;
        }
        const textToSave = resultArea.textContent;
        const blob = new Blob([textToSave], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = defaultFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        alert('Файл ' + defaultFileName + ' начал скачиваться.');
    }

    // Привязка событий для кнопок копирования и сохранения
    document.getElementById('copy-numbers-btn').addEventListener('click', () => copyToClipboard('number-result-area'));
    document.getElementById('save-numbers-btn').addEventListener('click', () => saveToFile('number-result-area', 'random_numbers.txt'));
    
    document.getElementById('copy-strings-btn').addEventListener('click', () => copyToClipboard('string-result-area'));
    document.getElementById('save-strings-btn').addEventListener('click', () => saveToFile('string-result-area', 'random_strings.txt'));

    // Демонстрация события клавиатуры (необязательно, но для методички)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && currentScreenId !== 'main') {
            showScreen('main'); // Может конфликтовать с закрытием alert по Esc
            console.log("Escape pressed on screen: " + currentScreenId);
            }
        });
});