from flask import Flask
from app.views import *
from app.database import init_app
from flask_cors import CORS

#inicializacion de la apliacion con Flask
app = Flask(__name__)

init_app(app)
#permitir solicitudes desde cualquier origin
CORS(app)

#registrar una ruta asociada a una vista
app.route('/',methods=['GET'])(index)
app.route('/api/books/',methods=['GET'])(get_all_books)
app.route('/api/books/',methods=['POST'])(create_book)
app.route('/api/books/<int:book_id>', methods=['GET'])(get_book)
app.route('/api/books/<int:book_id>', methods=['PUT'])(update_book)
app.route('/api/books/<int:book_id>', methods=['DELETE'])(delete_book)

if __name__ == '__main__':
    #levanta servidor de desarrollo flask
    app.run(debug=True)


