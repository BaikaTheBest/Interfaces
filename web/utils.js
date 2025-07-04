// Утилитарные функции (внешний файл #1)
const Utils = {
    getRandomInt: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomFloat: function(min, max, precision) {
        const val = Math.random() * (max - min) + min;
        return parseFloat(val.toFixed(precision));
    },
    generateRandomString: function(length, charSet) {
        let result = '';
        if (!charSet || charSet.length === 0) {
             console.warn('CharSet is empty or undefined in generateRandomString');
            return '';
        }
        for (let i = 0; i < length; i++) {
            result += charSet.charAt(Math.floor(Math.random() * charSet.length));
        }
        return result;
    },
    // Вспомогательная функция для экранирования символов в RegExp
    escapeRegExp: function(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
};