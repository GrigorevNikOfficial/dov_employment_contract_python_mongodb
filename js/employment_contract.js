// Author: Nikita Grigorev
// Checked

//----------------------------------------------------------------------------------------------------------------------
// Переменные

// Окно создания, изменения документа
let frame_employment_contact = document.getElementById("frame_employment_contact");
// Кнопка выйти на форме
let frame_emp_exit= document.querySelector('.frame_emp_exit');
// Кнопка добавить в форме Документы
let frame_emp_confirm_but = document.querySelector('.frame_employment_contact_cont .confirm_but');

// Переменная длы выбора: изменение, создание
let frame_emp_k;
// Кнопка добавить в секцию Документы
let section_emp_addBut = document.querySelector('.section.employment_contact .section_table_add');
// Переменная справочника "Физические лица"
let list_data_individuals;
// Переменная справочника "Организации"
let list_data_organizations;
// Переменная текущего документа
let num_emp_text;
let emp_emp_text;
let fio_emp_text;
let position_emp_text;
let salary_emp_text;

//----------------------------------------------------------------------------------------------------------------------
// Загрузка данных

// Загрузка коллекции Трудовые договоры
async function collection_employment_contract_load_records() {
    // Индекс для перебора
    let index = 0;
    // 1. Вызываем функцию загрузки всех записей в асинхронном режиме
    // 2. Преобразуем их в строку JSON
    // 3. Преобразуем строку обратно в JavaScript объект
    let record = JSON.parse(JSON.stringify(await eel.collection_employment_contract_load_records()()));
    // Перебираем все записи
    while (record[index]) {
        // Получаем элемент таблицы Трудовые договоры HTML
        let table = document.querySelector('.section.employment_contact .section_table');
        // Создаём HTML код для вставки на основную страницу как отдельного Документа Коллекции
        let newElement =    `<div class="table_row">
                                        <div>${index+1}</div>
                                        <div>${record[index].num_dover}</div>
                                        <div>${record[index].employer_name}</div>
                                        <div>${record[index].employee[0].fio}</div>
                                        <div>${record[index].employee[0].position}</div>
                                        <div>${record[index].salary}</div>
                                        <div>
                                            <div class="table_row_print"></div>
                                            <div class="table_row_change"></div>
                                            <div class="table_row_delete"></div>
                                        </div>
                                    </div>`;
        // Вставляем в конец таблицы элемент
        table.insertAdjacentHTML('beforeend', newElement);
        // Обновляем индекс
        index++;
    }
}
// Вызов функции загрузки данных раздела Организации и обработка ошибки
await collection_employment_contract_load_records();

//----------------------------------------------------------------------------------------------------------------------
// Функция очистки выпадающего списка
function clean_options(element) {
    // Получаем все опции
    const options = element.querySelectorAll("option");
    // Удаляем все опции, кроме первой
    for (let i = options.length - 1; i > 0; i--) {
        options[i].remove();
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Добавление в выпадающие списки организаций данных из коллекции "Организации" или "Товары"
function add_select(element, list_data) {
    // Индекс перебора
    let index = 0;
    clean_options(element);
    // Перебор элементов справочника
    while (list_data[index]){
        // Создание HTML-элемента option
        let opt = document.createElement('option');
        // Добавляем элементу индекс
        opt.value = index.toString();
        // Добавляем элементу название
        opt.textContent = list_data[index].name;
        // Добавление в список HTML-элемента select
        element.appendChild(opt);
        // Изменяем индекс
        index++;
    }
    // Выбираем элемент по умолчанию
    element.selectedIndex = 0;
}

// Добавление в выпадающие списки организаций данных из коллекции "Физические лица"
function add_select2(element, list_data) {
    // Индекс перебора
    let index = 0;
    clean_options(element);
    // Перебор элементов справочника
    while (list_data[index]) {
        // Создание HTML-элемента option
        let opt = document.createElement('option');
        // Добавляем элементу индекс
        opt.value = index.toString();
        // Добавляем элементу название
        opt.textContent = `${list_data[index].surname} ${list_data[index].name} ${list_data[index].patronymic}`;
        // Добавление в список HTML-элемента select
        element.appendChild(opt);
        // Изменяем индекс
        index++;
    }
    // Выбираем элемент по умолчанию
    element.selectedIndex = 0;
}

//----------------------------------------------------------------------------------------------------------------------
// Функция загрузки всех выпадающих списков
async function select_loader() {
    // Присвоение всех записей из коллекции "Физические лица"
    list_data_individuals = JSON.parse(JSON.stringify(await eel.collection_individuals_load_records()()));
    // Присвоение всех записей из коллекции "Организации"
    list_data_organizations = JSON.parse(JSON.stringify(await eel.collection_organizations_load_records()()));
    // Добавление в выпадающий список "Организации"
    add_select(document.getElementById("emp_employer_name"), list_data_organizations);
    // Добавление в выпадающий список "Наименование потребителя"
    add_select2(document.getElementById("emp_employer_fio"), list_data_individuals);
    // Добавление в выпадающий список "Наименование плательщика"
    add_select2(document.getElementById("emp_employee_fio"), list_data_individuals);
    // Добавление в выпадающий список "Наименование получателя"
    add_select2(document.getElementById("emp_supervisor_fio"), list_data_individuals);
}

//----------------------------------------------------------------------------------------------------------------------
// Добавление элемента

// Форма ввода для Физического лица
async function collection_employment_contract_add() {
    let emp_num_dover = document.getElementById("emp_num_dover").value;
    let emp_city = document.getElementById("emp_city").value;
    let emp_date_day = document.getElementById("emp_date_day").value;
    let emp_date_month = document.getElementById("emp_date_month").value;
    let emp_date_year = document.getElementById("emp_date_year").value;
    let emp_employer_name = document.getElementById("emp_employer_name").options[document.getElementById("emp_employer_name").selectedIndex].textContent;
    let emp_employer_fio = document.getElementById("emp_employer_fio").options[document.getElementById("emp_employer_fio").selectedIndex].textContent;
    let emp_employer_position = document.getElementById("emp_employer_position").value;
    let emp_charter = document.getElementById("emp_charter").value;
    let emp_employee_fio = document.getElementById("emp_employee_fio").options[document.getElementById("emp_employee_fio").selectedIndex].textContent;
    let emp_employee_position = document.getElementById("emp_employee_position").value;
    let emp_work_place = document.getElementById("emp_work_place").value;
    let emp_work_address = document.getElementById("emp_work_address").value;
    let emp_supervisor_fio = document.getElementById("emp_supervisor_fio").options[document.getElementById("emp_supervisor_fio").selectedIndex].textContent;
    let emp_class = document.getElementById("emp_class").value;
    let emp_start_day = document.getElementById("emp_start_day").value;
    let emp_start_month = document.getElementById("emp_start_month").value;
    let emp_start_year = document.getElementById("emp_start_year").value;
    let emp_duration = document.getElementById("emp_duration").value;
    let emp_salary = document.getElementById("emp_salary").value;
    let emp_holiday_duration = document.getElementById("emp_holiday_duration").value;
    let emp_day_start_time = document.getElementById("emp_day_start_time").value;
    let emp_day_end_time = document.getElementById("emp_day_end_time").value;
    let emp_day_rest_start_time = document.getElementById("emp_day_rest_start_time").value;
    let emp_day_rest_end_time = document.getElementById("emp_day_rest_end_time").value;
    let emp_company_address = document.getElementById("emp_company_address").value;
    let emp_inn = document.getElementById("emp_inn").value;
    let emp_kpp = document.getElementById("emp_kpp").value;
    let emp_account = document.getElementById("emp_account").value;
    let emp_bik = document.getElementById("emp_bik").value;
    let emp_pass_seria = document.getElementById("emp_pass_seria").value;
    let emp_pass_number = document.getElementById("emp_pass_number").value;
    let emp_pass_issued = document.getElementById("emp_pass_issued").value;
    let emp_pass_issue_for_day = document.getElementById("emp_pass_issue_for_day").value;
    let emp_pass_issue_for_month = document.getElementById("emp_pass_issue_for_month").value;
    let emp_pass_issue_for_year = document.getElementById("emp_pass_issue_for_year").value;
    let emp_pass_kod = document.getElementById("emp_pass_kod").value;
    let emp_pass_address = document.getElementById("emp_pass_address").value;
    let emp_inspection_date_day = document.getElementById("emp_inspection_date_day").value;
    let emp_inspection_date_month = document.getElementById("emp_inspection_date_month").value;
    let emp_inspection_date_year = document.getElementById("emp_inspection_date_year").value;
    let emp_receipt_date_day = document.getElementById("emp_receipt_date_day").value;
    let emp_receipt_date_month = document.getElementById("emp_receipt_date_month").value;
    let emp_receipt_date_year = document.getElementById("emp_receipt_date_year").value;

    // Получаем количество элементов таблицы (включая заголовок) Физические лица HTML, который далее будет индексом
    let select_emp_row = document.querySelectorAll(".section.employment_contact .table_row").length;

    // Добавление записи с условием проверки на наличие уже существующей записи
    if (await eel.collection_employment_contract_add(
        emp_num_dover,
        emp_city,
        emp_date_day,
        emp_date_month,
        emp_date_year,
        emp_employer_name,
        emp_employer_fio,
        emp_employer_position,
        emp_charter,
        emp_employee_fio,
        emp_employee_position,
        emp_work_place,
        emp_work_address,
        emp_supervisor_fio,
        emp_class,
        emp_start_day,
        emp_start_month,
        emp_start_year,
        emp_duration,
        emp_salary,
        emp_holiday_duration,
        emp_day_start_time,
        emp_day_end_time,
        emp_day_rest_start_time,
        emp_day_rest_end_time,
        emp_company_address,
        emp_inn,
        emp_kpp,
        emp_account,
        emp_bik,
        emp_pass_seria,
        emp_pass_number,
        emp_pass_issued,
        emp_pass_issue_for_day,
        emp_pass_issue_for_month,
        emp_pass_issue_for_year,
        emp_pass_kod,
        emp_pass_address,
        emp_inspection_date_day,
        emp_inspection_date_month,
        emp_inspection_date_year,
        emp_receipt_date_day,
        emp_receipt_date_month,
        emp_receipt_date_year
    )()) {
        // Получаем элемент таблицы
        let table = document.querySelector('.section.employment_contact .section_table');
        // Создаём новый элемент
        let newElement = `<div class="table_row">
                                        <div>${select_emp_row}</div>
                                        <div>${emp_num_dover}</div>
                                        <div>${emp_employer_name}</div>
                                        <div>${emp_employee_fio}</div>
                                        <div>${emp_employee_position}</div>
                                        <div>${emp_salary}</div>
                                        <div>
                                            <div class="table_row_print"></div>
                                            <div class="table_row_change"></div>
                                            <div class="table_row_delete"></div>
                                        </div>
                                    </div>`;
        // Добавляем новый элемент в конец таблицы
        table.insertAdjacentHTML('beforeend', newElement);
    } else {
        // Оповещение о существующей записи
        alert('Запись уже существует');
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Функция настроек формы по умолчанию
async function form_settings() {
    await select_loader();
    document.querySelectorAll('#frame_employment_contact select').forEach(element => {
            element.selectedIndex = 0;
    });
    document.querySelectorAll('#frame_employment_contact input').forEach(element => {
            element.value = null;
    });
}

//----------------------------------------------------------------------------------------------------------------------
// Удаление элемента

// Обработка по нажатию на кнопку "удалить" в "Организации"
document.addEventListener('click', async function(event) {
    // Ищем конкретное место клика - иконка удалить с классом "table_row_delete", вложенная в "employment_contract"
    if (event.target.classList.contains("table_row_delete") &&
        event.target.closest(".employment_contact")) {
        // Получаем название организации через значение HTML элемента
        // 1. Находим ближайший элемент с классом "table_row"
        // 2. Находим второе дитя - название организации
        const num_emp = event.target.closest(".table_row")
            .querySelector("div:nth-child(2)").textContent;
        // Удаляем элемент из таблицы визуально
        event.target.closest('.table_row').remove();
        // Удаляем документ из базы данных
        await eel.collection_employment_contract_delete(num_emp)();


        // Обновление нумерации в таблице
        // Получаю все строки таблицы
        let number_row = document.querySelectorAll(".section.employment_contact .table_row");
        // Переменная счётчика строк
        let i = 1;
        // Перебираю все элементы таблицы
        for (let num of number_row){
            // Если это не первая строка, то заменяю число элемента
            if (num.firstElementChild.textContent !== "№") {
                // Изменение номера элемента
                num.firstElementChild.textContent = i.toString();
                // Изменение индекса
                i++;
            }
        }
    }
});

// Отображение, если форма используется для добавления нового документа
section_emp_addBut.addEventListener('click', async function(){
    document.querySelector(".frame_employment_contact_cont .frame_title").textContent = "Форма добавления данных";
    document.querySelector(".frame_employment_contact_cont .confirm_but").textContent = "Добавить";
    frame_employment_contact.style.display = "flex";
    await form_settings();
    frame_emp_k = 0;
});

// Отображение, если Форма используется для обновления существующего документа
function frame_emp_update_show(){
    document.querySelector(".frame_employment_contact_cont .frame_title").textContent = "Форма обновления данных";
    document.querySelector(".frame_employment_contact_cont .confirm_but").textContent = "Обновить";
    frame_employment_contact.style.display = "flex";
    frame_emp_k = 1;
}

// Выход из формы
frame_emp_exit.addEventListener('click', () => {
    frame_employment_contact.style.display = "none";
});

//----------------------------------------------------------------------------------------------------------------------
// Изменение записи

// Обработка по нажатию на кнопку "Изменить" в "Трудовые договоры"
document.addEventListener('click', async function(event) {
    // Ищем конкретное место клика - иконка удалить с классом "table_row_change", вложенная в "employment_contact"
    if (event.target.classList.contains("table_row_change") &&
        event.target.closest(".employment_contact")) {
        // Обновляем элемент трудового договора через значение HTML элемента
        // 1. Находим ближайший элемент с классом "table_row"
        // 2. Находим второе дитя - номер документа
        num_emp_text = event.target.closest('.table_row')
            .querySelector('div:nth-child(2)');
        emp_emp_text = event.target.closest('.table_row')
            .querySelector('div:nth-child(3)');
        fio_emp_text = event.target.closest('.table_row')
            .querySelector('div:nth-child(4)');
        position_emp_text = event.target.closest('.table_row')
            .querySelector('div:nth-child(5)');
        salary_emp_text = event.target.closest('.table_row')
            .querySelector('div:nth-child(6)');

        let objs = JSON.parse(JSON.stringify(await eel.collection_employment_contract_load_records()()));

        await select_loader();

        for (let obj of objs) {
            if (obj.num_dover === num_emp_text.textContent) {
                document.getElementById('emp_num_dover').value = obj.num_dover;
                document.getElementById('emp_city').value = obj.city;
                document.getElementById('emp_date_day').value = obj.date[0].day;
                document.getElementById('emp_date_month').value = obj.date[0].month;
                document.getElementById('emp_date_year').value = obj.date[0].year;
                document.getElementById('emp_employer_position').value = obj.employer[0].position;
                document.getElementById('emp_charter').value = obj.charter;
                document.getElementById('emp_employee_position').value = obj.employee[0].position;
                document.getElementById('emp_work_place').value = obj.work_place;
                document.getElementById('emp_work_address').value = obj.work_address;
                document.getElementById('emp_class').value = obj.class;
                document.getElementById('emp_start_day').value = obj.date_start[0].day;
                document.getElementById('emp_start_month').value = obj.date_start[0].month;
                document.getElementById('emp_start_year').value = obj.date_start[0].year;
                document.getElementById('emp_duration').value = obj.duration;
                document.getElementById('emp_salary').value = obj.salary;
                document.getElementById('emp_holiday_duration').value = obj.holiday_duration;
                document.getElementById('emp_day_start_time').value = obj.day_schedule[0].start_time;
                document.getElementById('emp_day_end_time').value = obj.day_schedule[0].end_time;
                document.getElementById('emp_day_rest_start_time').value = obj.day_schedule[0].rest_start_time;
                document.getElementById('emp_day_rest_end_time').value = obj.day_schedule[0].rest_end_time;
                document.getElementById('emp_company_address').value = obj.company_address;
                document.getElementById('emp_inn').value = obj.inn;
                document.getElementById('emp_kpp').value = obj.kpp;
                document.getElementById('emp_account').value = obj.account;
                document.getElementById('emp_bik').value = obj.bik;
                document.getElementById('emp_pass_seria').value = obj.employee[0].pass_seria;
                document.getElementById('emp_pass_number').value = obj.employee[0].pass_number;
                document.getElementById('emp_pass_issued').value = obj.employee[0].pass_issued;
                document.getElementById('emp_pass_issue_for_day').value = obj.employee[0].pass_issue_for[0].day;
                document.getElementById('emp_pass_issue_for_month').value = obj.employee[0].pass_issue_for[0].month;
                document.getElementById('emp_pass_issue_for_year').value = obj.employee[0].pass_issue_for[0].year;
                document.getElementById('emp_pass_kod').value = obj.employee[0].pass_kod;
                document.getElementById('emp_pass_address').value = obj.employee[0].pass_address;
                document.getElementById('emp_inspection_date_day').value = obj.inspection_date[0].day;
                document.getElementById('emp_inspection_date_month').value = obj.inspection_date[0].month;
                document.getElementById('emp_inspection_date_year').value = obj.inspection_date[0].year;
                document.getElementById('emp_receipt_date_day').value = obj.receipt_date[0].day;
                document.getElementById('emp_receipt_date_month').value = obj.receipt_date[0].month;
                document.getElementById('emp_receipt_date_year').value = obj.receipt_date[0].year;

                select_definer(document.getElementById('emp_employer_name'), obj.employer_name);
                select_definer(document.getElementById('emp_employer_fio'), obj.employer[0].fio);
                select_definer(document.getElementById('emp_employee_fio'), obj.employee[0].fio);
                select_definer(document.getElementById('emp_supervisor_fio'), obj.supervisor_fio);
            }
        }
        await selector_individuals();
        await selector_organizations();
        frame_emp_update_show();
    }
});

// Функция выбора в Select
function select_definer(element, obj) {
    // Переменная индекса
    let index = 0;
    // Переменная для остановки
    let stopper = 1;
    // Перебор записей
    while(element.options[index] && stopper){
        if (element.options[index].textContent === obj){
            element.selectedIndex = index;
            stopper = 0;
            return index;
        }
        index++;
    }
}

//----------------------------------------------------------------------------------------------------------------------
// Добавление или изменение данных по нажатии кнопки "Добавить" в форме
frame_emp_confirm_but.addEventListener('click', async function() {
    if (frame_emp_k === 0) {
        try {
            await collection_employment_contract_add();
        } catch (error) {
            console.error("Error adding employment contract:", error);
            alert("Произошла ошибка при добавлении трудового договора");
        }
    }
    else {
        try {
            let emp_num_dover_current = num_emp_text.textContent;
            let emp_num_dover = document.getElementById("emp_num_dover").value;
            let emp_city = document.getElementById("emp_city").value;
            let emp_date_day = document.getElementById("emp_date_day").value;
            let emp_date_month = document.getElementById("emp_date_month").value;
            let emp_date_year = document.getElementById("emp_date_year").value;
            let emp_employer_name = document.getElementById("emp_employer_name").options[document.getElementById("emp_employer_name").selectedIndex].textContent;
            let emp_employer_fio = document.getElementById("emp_employer_fio").options[document.getElementById("emp_employer_fio").selectedIndex].textContent;
            let emp_employer_position = document.getElementById("emp_employer_position").value;
            let emp_charter = document.getElementById("emp_charter").value;
            let emp_employee_fio = document.getElementById("emp_employee_fio").options[document.getElementById("emp_employee_fio").selectedIndex].textContent;
            let emp_employee_position = document.getElementById("emp_employee_position").value;
            let emp_work_place = document.getElementById("emp_work_place").value;
            let emp_work_address = document.getElementById("emp_work_address").value;
            let emp_supervisor_fio = document.getElementById("emp_supervisor_fio").options[document.getElementById("emp_supervisor_fio").selectedIndex].textContent;
            let emp_class = document.getElementById("emp_class").value;
            let emp_start_day = document.getElementById("emp_start_day").value;
            let emp_start_month = document.getElementById("emp_start_month").value;
            let emp_start_year = document.getElementById("emp_start_year").value;
            let emp_duration = document.getElementById("emp_duration").value;
            let emp_salary = document.getElementById("emp_salary").value;
            let emp_holiday_duration = document.getElementById("emp_holiday_duration").value;
            let emp_day_start_time = document.getElementById("emp_day_start_time").value;
            let emp_day_end_time = document.getElementById("emp_day_end_time").value;
            let emp_day_rest_start_time = document.getElementById("emp_day_rest_start_time").value;
            let emp_day_rest_end_time = document.getElementById("emp_day_rest_end_time").value;
            let emp_company_address = document.getElementById("emp_company_address").value;
            let emp_inn = document.getElementById("emp_inn").value;
            let emp_kpp = document.getElementById("emp_kpp").value;
            let emp_account = document.getElementById("emp_account").value;
            let emp_bik = document.getElementById("emp_bik").value;
            let emp_pass_seria = document.getElementById("emp_pass_seria").value;
            let emp_pass_number = document.getElementById("emp_pass_number").value;
            let emp_pass_issued = document.getElementById("emp_pass_issued").value;
            let emp_pass_issue_for_day = document.getElementById("emp_pass_issue_for_day").value;
            let emp_pass_issue_for_month = document.getElementById("emp_pass_issue_for_month").value;
            let emp_pass_issue_for_year = document.getElementById("emp_pass_issue_for_year").value;
            let emp_pass_kod = document.getElementById("emp_pass_kod").value;
            let emp_pass_address = document.getElementById("emp_pass_address").value;
            let emp_inspection_date_day = document.getElementById("emp_inspection_date_day").value;
            let emp_inspection_date_month = document.getElementById("emp_inspection_date_month").value;
            let emp_inspection_date_year = document.getElementById("emp_inspection_date_year").value;
            let emp_receipt_date_day = document.getElementById("emp_receipt_date_day").value;
            let emp_receipt_date_month = document.getElementById("emp_receipt_date_month").value;
            let emp_receipt_date_year = document.getElementById("emp_receipt_date_year").value;

            await eel.collection_employment_contract_update(
                emp_num_dover_current,
                emp_num_dover,
                emp_city,
                emp_date_day,
                emp_date_month,
                emp_date_year,
                emp_employer_name,
                emp_employer_fio,
                emp_employer_position,
                emp_charter,
                emp_employee_fio,
                emp_employee_position,
                emp_work_place,
                emp_work_address,
                emp_supervisor_fio,
                emp_class,
                emp_start_day,
                emp_start_month,
                emp_start_year,
                emp_duration,
                emp_salary,
                emp_holiday_duration,
                emp_day_start_time,
                emp_day_end_time,
                emp_day_rest_start_time,
                emp_day_rest_end_time,
                emp_company_address,
                emp_inn,
                emp_kpp,
                emp_account,
                emp_bik,
                emp_pass_seria,
                emp_pass_number,
                emp_pass_issued,
                emp_pass_issue_for_day,
                emp_pass_issue_for_month,
                emp_pass_issue_for_year,
                emp_pass_kod,
                emp_pass_address,
                emp_inspection_date_day,
                emp_inspection_date_month,
                emp_inspection_date_year,
                emp_receipt_date_day,
                emp_receipt_date_month,
                emp_receipt_date_year
            )();

            num_emp_text.textContent = emp_num_dover;
            emp_emp_text.textContent = emp_employer_name;
            fio_emp_text.textContent = emp_employee_fio;
            position_emp_text.textContent = emp_employee_position;
            salary_emp_text.textContent = emp_salary;

        } catch (error) {
            console.error("Error updating employment contract:", error);
            alert("Произошла ошибка при обновлении трудового договора");
        }

    }
    // Hide the form after operation completes (whether successful or not)
    frame_employment_contact.style.display = "none";
})

//----------------------------------------------------------------------------------------------------------------------
// Функция добавления данных в поля паспорта при выборе ФИО сотрудника в форме
async function selector_individuals() {
    // Индекс для перебора
    let index = 0;
    // Индекс остановки
    let stopper = 1;
    // Перебор Пустого значения
    if (document.getElementById("emp_employee_fio").selectedIndex === 0) {
        // Заполняем поле "Серия паспорта"
        document.getElementById("emp_pass_seria").value = "";
        // Заполняем поле "Номер паспорта"
        document.getElementById("emp_pass_number").value = "";
        // Заполняем поле "Выдан"
        document.getElementById("emp_pass_issued").value = "";
        document.getElementById("emp_pass_address").value = "";
        document.getElementById("emp_pass_issue_for_day").value = "";
        document.getElementById("emp_pass_issue_for_month").value = "";
        document.getElementById("emp_pass_issue_for_year").value = "";
        document.getElementById("emp_pass_kod").value = "";
        // Остановка перебора
        stopper = 0;
    }
    // Перебор значений
    while (list_data_individuals[index] && stopper){
        // Получаем выбранный текст
        const selectedText = document.getElementById("emp_employee_fio")
            .options[document.getElementById("emp_employee_fio").selectedIndex].textContent;
        // Полное имя
        const fullName = `${list_data_individuals[index].surname} ${list_data_individuals[index].name} ${list_data_individuals[index].patronymic}`;
        // Проверяем на выбранный элемент
        if (selectedText === fullName) {
            // Заполняем поле "Серия паспорта"
            document.getElementById("emp_pass_seria").value = list_data_individuals[index].serial_passport;
            // Заполняем поле "Номер паспорта"
            document.getElementById("emp_pass_number").value = list_data_individuals[index].num_passport;
            // Заполняем поле "Выдан"
            document.getElementById("emp_pass_issued").value = list_data_individuals[index].issued;
            // Остановка перебора
            document.getElementById("emp_pass_address").value = list_data_individuals[index].address;
            document.getElementById("emp_pass_issue_for_day").value = list_data_individuals[index].issued_for[0].day
            document.getElementById("emp_pass_issue_for_month").value = list_data_individuals[index].issued_for[0].month;
            document.getElementById("emp_pass_issue_for_year").value = list_data_individuals[index].issued_for[0].year;
            document.getElementById("emp_pass_kod").value = list_data_individuals[index].kod;
            stopper = 0;
        }
        // Изменение индекса
        index++;
    }
}

async function selector_organizations() {
    // Индекс для перебора
    let index = 0;
    // Индекс остановки
    let stopper = 1;
    // Перебор Пустого значения
    if (document.getElementById("emp_employer_name").selectedIndex === 0) {
        // Заполняем поле "Адрес"
        document.getElementById("emp_company_address").value = "";
        // Остановка перебора
        stopper = 0;
    }
    // Перебор значений
    while (list_data_organizations[index] && stopper){
        // Получаем выбранный текст
        const selectedText = document.getElementById("emp_employer_name")
            .options[document.getElementById("emp_employer_name").selectedIndex].textContent;
        // Полное имя
        const name = list_data_organizations[index].name;
        // Проверяем на выбранный элемент
        if (selectedText === name) {
            // Заполняем поле "Адрес"
            document.getElementById("emp_company_address").value = list_data_organizations[index].address;
            stopper = 0;
        }
        // Изменение индекса
        index++;
    }
}

// Обработчик изменений поля ФИО
document.getElementById("emp_employee_fio").addEventListener('change', async function() {
    // Функция добавления данных в поля при выборе ФИО сотрудника в форме
    await selector_individuals();
})

// Обработчик изменений поля Организации
document.getElementById("emp_employer_name").addEventListener('change', async function() {
    // Функция добавления данных в поля при выборе Организации в форме
    await selector_organizations();
})
