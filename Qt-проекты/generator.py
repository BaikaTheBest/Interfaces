import sys
from PyQt6.QtWidgets import (
    QApplication,
    QMainWindow,
    QTableWidgetItem,
    QAbstractItemView
)
from PyQt6 import uic
import random


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        # Загружаем UI файл, созданный в Qt Designer
        uic.loadUi('generater.ui', self)
        # Замените 'your_form.ui' на имя вашего файла

        # Предполагаем, что у вас есть кнопка с именем "generateButton"
        # и таблица "tableWidget"

        # Эти имена должны соответствовать именам объектов в Qt Designer
        self.gener.clicked.connect(self.generate_sequence)

        # Настраиваем политику автоматического изменения размеров
        self.tableWidget.setSizeAdjustPolicy(QAbstractItemView.SizeAdjustPolicy.AdjustToContents)

    def generate_sequence(self):
        # Очистка предыдущего содержимого таблицы
        self.tableWidget.clear()

        # Установка количества строк и столбцов
        rows = 10  # Можно изменить количество строк
        columns = 3  # Можно изменить количество столбцов
        self.tableWidget.setRowCount(rows)
        self.tableWidget.setColumnCount(columns)

        # Генерация и заполнение таблицы случайными числами
        for i in range(rows):
            for j in range(columns):
                # Генерируем случайное число (можно изменить диапазон)
                random_value = random.randint(1, 100)
                # Создаем элемент таблицы и устанавливаем значение
                item = QTableWidgetItem(str(random_value))
                self.tableWidget.setItem(i, j, item)

        # Автоматическая подстройка размера колонок под содержимое
        # self.tableWidget.resizeColumnsToContents()


if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec())