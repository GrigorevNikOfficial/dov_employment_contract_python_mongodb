# Author: Nikita Grigorev
# Checked

#-----------------------------------------------------------------------------------------------------------------------

import eel
import pymongo

db_client = pymongo.MongoClient("mongodb://localhost:27017/")
current_db = db_client["CMSAdmin"]

collection_documents = current_db["documents"]
collection_individuals = current_db["individuals"]
collection_items = current_db["items"]
collection_organizations = current_db["organizations"]
collection_employment_contract = current_db["employment_contract"]


# Функции получения всех значений
@eel.expose
def collection_documents_load_records():
    list_return = []
    for item in collection_documents.find():
        list_return.append(item)
    return list_return

@eel.expose
def collection_individuals_load_records():
    list_return = []
    for item in collection_individuals.find():
        list_return.append(item)
    return list_return

@eel.expose
def collection_items_load_records():
    list_return = []
    for item in collection_items.find():
        list_return.append(item)
    return list_return

@eel.expose
def collection_organizations_load_records():
    list_return = []
    for item in collection_organizations.find():
        list_return.append(item)
    return list_return

@eel.expose
def collection_employment_contract_load_records():
    list_return = []
    for item in collection_employment_contract.find():
        list_return.append(item)
    return list_return

# Функции добавления элемента
@eel.expose
def collection_documents_add(doc_num_dover,
                             doc_home_org,
                             doc_issue_with_day,
                             doc_issue_with_month,
                             doc_issue_with_year,
                             doc_issue_for_day,
                             doc_issue_for_month,
                             doc_issue_for_year,
                             doc_consumer_org,
                             doc_payer_org,
                             doc_issue_from_position,
                             doc_issue_from_fio,
                             doc_issue_get_from_org,
                             doc_issue_get_num_doc,
                             doc_table_rows):
    if collection_documents.find_one(
            {
                "num_dover": doc_num_dover
            }
    ):
        return 0
    else:
        collection_documents.insert_one(
            {
                "home_org": doc_home_org,
                "num_dover": doc_num_dover,
                "issue_with":
                [{
                    "day": doc_issue_with_day,
                    "month": doc_issue_with_month,
                    "year": doc_issue_with_year
                }],
                "issue_for":
                [{
                    "day": doc_issue_for_day,
                    "month": doc_issue_for_month,
                    "year": doc_issue_for_year
                }],
                "consumer_org": doc_consumer_org,
                "payer_org": doc_payer_org,
                "issue_from":
                [{
                    "position": doc_issue_from_position,
                    "fio_id": doc_issue_from_fio,
                }],
                "get_from_org": doc_issue_get_from_org,
                "num_doc": doc_issue_get_num_doc,
                "table": doc_table_rows
            }
        )
        return 1

@eel.expose
def collection_individuals_add(surname,
                               name,
                               patronymic,
                               serial,
                               num,
                               issue,
                               address,
                               day,
                               month,
                               year,
                               kod):
    if collection_individuals.find_one(
            {
                "surname": surname,
                "name": name,
                "patronymic": patronymic,
                "serial_passport": serial,
                "num_passport": num
            }
    ):
        return 0
    else:
        collection_individuals.insert_one(
            {
                "surname": surname,
                "name": name,
                "patronymic": patronymic,
                "serial_passport": serial,
                "num_passport": num,
                "issued": issue,
                "address": address,
                "issued_for": [{
                    "day": day,
                    "month": month,
                    "year": year
                }],
                "kod": kod
            }
        )
        return 1

@eel.expose
def collection_items_add(name):
    if collection_items.find_one(
            {
                "name": name
            }
    ):
        return 0
    else:
        collection_items.insert_one(
            {
                "name": name
            }
        )
        return 1

@eel.expose
def collection_organizations_add(name, address):
    if collection_organizations.find_one(
            {
                "name": name,
                "address": address
            }
    ):
        return 0
    else:
        collection_organizations.insert_one(
            {
                "name": name,
                "address": address
            }
        )
        return 1

@eel.expose
def collection_employment_contract_add(
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
        emp_receipt_date_year):
    if collection_employment_contract.find_one(
            {
                "num_dover": emp_num_dover,
            }
    ):
        return 0
    else:
        collection_employment_contract.insert_one(
            {
                "num_dover": emp_num_dover,
                "city": emp_city,
                "date":
                [{
                    "day": emp_date_day,
                    "month": emp_date_month,
                    "year": emp_date_year
                }],
                "employer_name": emp_employer_name,
                "employer":
                [{
                    "fio": emp_employer_fio,
                    "position": emp_employer_position
                }],
                "charter": emp_charter,
                "employee":
                [{
                    "fio": emp_employee_fio,
                    "position": emp_employee_position,
                    "pass_seria": emp_pass_seria,
                    "pass_number": emp_pass_number,
                    "pass_issued": emp_pass_issued,
                    "pass_issue_for":
                    [{
                        "day": emp_pass_issue_for_day,
                        "month": emp_pass_issue_for_month,
                        "year": emp_pass_issue_for_year
                    }],
                    "pass_kod": emp_pass_kod,
                    "pass_address": emp_pass_address,
                }],
                "work_place": emp_work_place,
                "work_address": emp_work_address,
                "supervisor_fio": emp_supervisor_fio,
                "class": emp_class,
                "date_start":
                [{
                    "day": emp_start_day,
                    "month": emp_start_month,
                    "year": emp_start_year
                }],
                "duration": emp_duration,
                "salary": emp_salary,
                "holiday_duration": emp_holiday_duration,
                "day_schedule":
                [{
                    "start_time": emp_day_start_time,
                    "end_time": emp_day_end_time,
                    "rest_start_time": emp_day_rest_start_time,
                    "rest_end_time": emp_day_rest_end_time
                }],
                "company_address": emp_company_address,
                "inn": emp_inn,
                "kpp": emp_kpp,
                "account": emp_account,
                "bik": emp_bik,
                "inspection_date":
                [{
                    "day": emp_inspection_date_day,
                    "month": emp_inspection_date_month,
                    "year": emp_inspection_date_year
                }],
                "receipt_date":
                [{
                    "day": emp_receipt_date_day,
                    "month": emp_receipt_date_month,
                    "year": emp_receipt_date_year
                }]
            }
        )
        return 1

# Функции обновления элемента

@eel.expose
def collection_documents_update(
        doc_num_dover_current,
        doc_num_dover,
        doc_home_org,
        doc_issue_with_day,
        doc_issue_with_month,
        doc_issue_with_year,
        doc_issue_for_day,
        doc_issue_for_month,
        doc_issue_for_year,
        doc_consumer_org,
        doc_payer_org,
        doc_issue_from_position,
        doc_issue_from_fio,
        doc_issue_get_from_org,
        doc_issue_get_num_doc,
        doc_table_rows):
    collection_documents.update_one(
            {
                "num_dover": doc_num_dover_current
            },
            { '$set': {
                "home_org": doc_home_org,
                "num_dover": doc_num_dover,
                "issue_with":
                [{
                    "day": doc_issue_with_day,
                    "month": doc_issue_with_month,
                    "year": doc_issue_with_year
                }],
                "issue_for":
                [{
                    "day": doc_issue_for_day,
                    "month": doc_issue_for_month,
                    "year": doc_issue_for_year
                }],
                "consumer_org": doc_consumer_org,
                "payer_org": doc_payer_org,
                "issue_from":
                [{
                    "position": doc_issue_from_position,
                    "fio_id": doc_issue_from_fio,
                }],
                "get_from_org": doc_issue_get_from_org,
                "num_doc": doc_issue_get_num_doc,
                "table": doc_table_rows
            }}
    )

@eel.expose
def collection_individuals_update(surname_current, name_current, patronymic_current, serial_current, num_current,
                                  surname_new, name_new, patronymic_new, serial_new, num_new, issue_new, address_new, day_new, month_new, year_new, kod_new):
    collection_individuals.update_one(
        {
            "surname": surname_current,
            "name": name_current,
            "patronymic": patronymic_current,
            "serial_passport": serial_current,
            "num_passport": num_current
        },
        { '$set': {
            "surname": surname_new,
            "name": name_new,
            "patronymic": patronymic_new,
            "serial_passport": serial_new,
            "num_passport": num_new,
            "issued": issue_new,
            "address": address_new,
            "issued_for": [{
                "day": day_new,
                "month": month_new,
                "year": year_new
            }],
            "kod": kod_new
        }}
    )

@eel.expose
def collection_items_update(name_current, name_new):
    collection_items.update_one(
        {
            "name": name_current
        },
        { '$set': {
            "name": name_new
        }}
    )


@eel.expose
def collection_organizations_update(name_current, address_current, name_new, address_new):
    collection_organizations.update_one(
        {
            "name": name_current,
            "address": address_current
        },
        { '$set': {
            "name": name_new,
            "address": address_new
        }}
    )

@eel.expose
def collection_employment_contract_update(
        emp_num_dover_current,
        emp_num_dover_new,
        emp_city_new,
        emp_date_day_new,
        emp_date_month_new,
        emp_date_year_new,
        emp_employer_name_new,
        emp_employer_fio_new,
        emp_employer_position_new,
        emp_charter_new,
        emp_employee_fio_new,
        emp_employee_position_new,
        emp_work_place_new,
        emp_work_address_new,
        emp_supervisor_fio_new,
        emp_class_new,
        emp_start_day_new,
        emp_start_month_new,
        emp_start_year_new,
        emp_duration_new,
        emp_salary_new,
        emp_holiday_duration_new,
        emp_day_start_time_new,
        emp_day_end_time_new,
        emp_day_rest_start_time_new,
        emp_day_rest_end_time_new,
        emp_company_address_new,
        emp_inn_new,
        emp_kpp_new,
        emp_account_new,
        emp_bik_new,
        emp_pass_seria_new,
        emp_pass_number_new,
        emp_pass_issued_new,
        emp_pass_issue_for_day_new,
        emp_pass_issue_for_month_new,
        emp_pass_issue_for_year_new,
        emp_pass_kod_new,
        emp_pass_address_new,
        emp_inspection_date_day_new,
        emp_inspection_date_month_new,
        emp_inspection_date_year_new,
        emp_receipt_date_day_new,
        emp_receipt_date_month_new,
        emp_receipt_date_year_new):
    collection_employment_contract.update_one(
        {
            "num_dover": emp_num_dover_current
        },
        { '$set': {
            "num_dover": emp_num_dover_new,
            "city": emp_city_new,
            "date":
            [{
                "day": emp_date_day_new,
                "month": emp_date_month_new,
                "year": emp_date_year_new
            }],
            "employer_name": emp_employer_name_new,
            "employer":
            [{
                "fio": emp_employer_fio_new,
                "position": emp_employer_position_new
            }],
            "charter": emp_charter_new,
            "employee":
            [{
                "fio": emp_employee_fio_new,
                "position": emp_employee_position_new,
                "pass_seria": emp_pass_seria_new,
                "pass_number": emp_pass_number_new,
                "pass_issued": emp_pass_issued_new,
                "pass_issue_for":
                    [{
                        "day": emp_pass_issue_for_day_new,
                        "month": emp_pass_issue_for_month_new,
                        "year": emp_pass_issue_for_year_new
                    }],
                "pass_kod": emp_pass_kod_new,
                "pass_address": emp_pass_address_new,
            }],
            "work_place": emp_work_place_new,
            "work_address": emp_work_address_new,
            "supervisor_fio": emp_supervisor_fio_new,
            "class": emp_class_new,
            "date_start":
            [{
                "day": emp_start_day_new,
                "month": emp_start_month_new,
                "year": emp_start_year_new
            }],
            "duration": emp_duration_new,
            "salary": emp_salary_new,
            "holiday_duration": emp_holiday_duration_new,
            "day_schedule":
            [{
                "start_time": emp_day_start_time_new,
                "end_time": emp_day_end_time_new,
                "rest_start_time": emp_day_rest_start_time_new,
                "rest_end_time": emp_day_rest_end_time_new
            }],
            "company_address": emp_company_address_new,
            "inn": emp_inn_new,
            "kpp": emp_kpp_new,
            "account": emp_account_new,
            "bik": emp_bik_new,
            "inspection_date":
            [{
                "day": emp_inspection_date_day_new,
                "month": emp_inspection_date_month_new,
                "year": emp_inspection_date_year_new
            }],
            "receipt_date":
            [{
                "day": emp_receipt_date_day_new,
                "month": emp_receipt_date_month_new,
                "year": emp_receipt_date_year_new
            }]
        }}
    )

# Функции удаления элемента
@eel.expose
def collection_documents_delete(doc_num):
    collection_documents.delete_one(
        {
            "num_dover": doc_num
        }
    )

@eel.expose
def collection_individuals_delete(surname, name, patronymic, serial, num):
    collection_individuals.delete_one(
        {
            "surname": surname,
            "name": name,
            "patronymic": patronymic,
            "serial_passport": serial,
            "num_passport": num
        }
    )

@eel.expose
def collection_items_delete(name):
    collection_items.delete_one(
        {
            "name": name
        }
    )

@eel.expose
def collection_organizations_delete(name, address):
    collection_organizations.delete_one(
        {
            "name": name,
            "address": address
        }
    )

@eel.expose
def collection_employment_contract_delete(doc_num):
    collection_employment_contract.delete_one(
        {
            "num_dover": doc_num
        }
    )

# Функция для печати
@eel.expose
def collection_documents_print(num_dover):
    return collection_documents.find_one(
        {
            "num_dover": num_dover
        }
    )

@eel.expose
def collection_employment_contract_print(num_dover):
    return collection_employment_contract.find_one(
        {
            "num_dover": num_dover
        }
    )

eel.init("")
eel.start("index.html", mode="safari")
