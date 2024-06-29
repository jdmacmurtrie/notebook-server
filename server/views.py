from models.page import Page
from application import app
from db import db

@app.route('/')
def get_pages():
    pages = db.session.execute(db.select(Page)).scalars().all()
    print(pages)
    response = []

    for page in pages:
        obj = {
            'title': page.title,
            'body': page.body,
        }
        response.append(obj)

    return response

