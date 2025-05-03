import eel
import pymongo

db_client = pymongo.MongoClient("mongodb://localhost:27017/")
current_db = db_client["CMSAdmin"]

collection_documents = current_db["documents"]
collection_individuals = current_db["individuals"]
collection_items = current_db["items"]
collection_organizations = current_db["organizations"]


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
def collection_individuals_add(surname, name, patronymic, serial, num, issue):
    if collection_individuals.find_one(
            {
                "surname": surname,
                "name": name,
                "patronymic": patronymic,
                "serial_passport": serial,
                "num_passport": num,
                "issued": issue
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
                "issued": issue
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
def collection_individuals_update(surname, name, patronymic, serial, num, issue,
                                  surname_new, name_new, patronymic_new, serial_new, num_new, issue_new):
    collection_individuals.update_one(
        {
            "surname": surname,
            "name": name,
            "patronymic": patronymic,
            "serial_passport": serial,
            "num_passport": num,
            "issued": issue
        },
        { '$set': {
            "surname": surname_new,
            "name": name_new,
            "patronymic": patronymic_new,
            "serial_passport": serial_new,
            "num_passport": num_new,
            "issued": issue_new
        }}
    )

@eel.expose
def collection_items_update(name, name_new):
    collection_items.update_one(
        {
            "name": name
        },
        { '$set': {
            "name": name_new
        }}
    )


@eel.expose
def collection_organizations_update(name, address, name_new, address_new):
    collection_organizations.update_one(
        {
            "name": name,
            "address": address
        },
        { '$set': {
            "name": name_new,
            "address": address_new
        }}
    )

# Функции удаления элемента
@eel.expose
def collection_documents_delete(doc_num):
    collection_documents.delete_one(
        {
            "num_dover": f"{doc_num}"
        }
    )

@eel.expose
def collection_individuals_delete(surname, name, patronymic, serial, num, issue):
    collection_individuals.delete_one(
        {
            "surname": surname,
            "name": name,
            "patronymic": patronymic,
            "serial_passport": serial,
            "num_passport": num,
            "issued": issue
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

# Функция для печати
@eel.expose
def collection_documents_print(num_dover):
    return collection_documents.find_one(
        {
            "num_dover": num_dover
        }
    )

eel.init("")
eel.start("index.html", mode="safari")