from server.app import app, db
from models.page import Page

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

