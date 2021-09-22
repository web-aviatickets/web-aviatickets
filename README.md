# web-aviatickets
# Техзавдання #
- [Мета сайту](#мета-сайту)  
- [Вимоги до дизайну](#вимоги-до-дизайну)
- [Вимоги до функціоналу](#вимоги-до-функціоналу)
  - [Стек технологій](#стек-технологій)
  - [Функціонал сайту](#функціонал-сайту)
- [Вимоги до хостингу](#вимоги-до-хостингу)
- [Вимоги до seo оптимізації](#вимоги-до-seo-оптимізації)

## Мета сайту ##
Мета сайту *web-aviatickets* полегшення продажу авіквитків та просування послуг авіакомпаній в мережі Інтернет. 
Наша головна мета - зручність.
## Вимоги до дизайну ##
#### Перша сторінка: ####
Фон сторінки - фотографія літака або градієнт кольорів (версія сайту для телефона). Згори знаходиться назва сайту, посередині - три поля для вводу інформації, нижче - кнопка для пошуку. Перше поле - input, куди вводиться місце вильоту, по літерам, що вводяться сортується випадаючий список можливих аеропортів. Друге поле - такий самий input, але для місця призначення. Третє поле - календар, в якому можна обрати дату відправлення.  
#### Друга сторінка: #### 
Білий фон, на ньому варіанти можливих рейсів (рейсу) у вигляді карток. Картка - сірий фон, на ній назва авіакомпанії, стрілкою показані місце вильоту і місце призначення, дата, час, час польоту, ціна квитку та інша необхідна інформація. Також на картці в правому нижньому куті має бути кнопка "Купити".  
#### Третя сторінка: ####
Фон - сірий, на ньому план літака з місцями, забарвленими в різні кольори в залежності від того чи куплене це місце чи ні. При натисканні на місце під планом з'являється div з додатковою інформацією про нього, маленьким хрестиком праворуч, а також кнопкою "Придбати" під ним.  
Для створення дизайну сайту був використаний ресурс figma.com.
#### Кінцевий дизайн сайту: ####
![буде тут](web-aviatickets-design.jpg)  
## Вимоги до функціоналу ##
### Стек технологій ###
- JavaScript
- Node.js
- MySQL  
- HTML  
- CSS
### Функціонал сайту ###
Відвідувачі нашого сайти можуть:  
- обирати місце відправлення за допомогою вводу літер і випадаючого списку в рядку;
- обирати місце призначення за допомогою вводу літер і випадаючого списку в рядку;
- обирати бажану дату за допомогою випадаючого календаря;
- обирати бажане місце;
- обирати кілька квитків;
- відміняти купівлю будь-якого з квитків;
- купити квиток або кілька квитків одразу.   
 
Ми надаємо нашим користувачам можливості:
- переходу на початкову сторінку;
- 15 хвилин резерву бажаного місця;
- відміни оплати.
## Вимоги до хостингу ##
- підтримка nodejs;
- підтримка mysql бази даних;
- високий рівень безпеки (безпечне збереження особистих даних);
- підтримка високого трафіку;
- на початку роботи необхідний безкоштовний хостинг;    

Враховуючи написане вище вважаємо найкращим варіантом віртуальний хостинг. Отже, хостинг сайту проводиться на [heroku.com](https://www.heroku.com/).  
## Вимоги до seo оптимізації ##
Опис сайту має бути коротким, змістовним, а також містити ключові слова:
- 'авіаквитки',  
- 'квитки',  
- 'авіарейс',  
- 'купити',  
- 'дешево'.
