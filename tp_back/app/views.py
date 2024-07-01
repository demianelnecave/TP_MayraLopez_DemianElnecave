from flask import jsonify, request
from app.models import Book

def index():
    response = {'message':'Hola mundo API FLASK 🐍'}
    return jsonify(response)

#funcion que busca todo el listado de los libros
def get_all_books():
    books = Book.get_all()
    list_books = [book.serialize() for book in books]
    return jsonify(list_books)

#funcion que busca un libro
def get_book(book_id): 
    book = Book.get_by_id(book_id)
    if not book:
        return jsonify({'message': 'Book not found'}), 404
    return jsonify(book.serialize())

def create_book():
    data = request.json
    #agregar una logica de validacion de datos
    new_book = Book(None,data['title'],data['autor'],data['release_date'],data['banner'])
    new_book.save()
    return jsonify({'message':'Libro creado con éxito'}), 201
    

def update_book(book_id):
    book = Book.get_by_id(book_id)
    if not book:
        return jsonify({'message': 'Book not found'}), 404
    data = request.json
    book.title = data['title']
    book.autor = data['autor']
    book.release_date = data['release_date']
    book.banner = data['banner']
    book.save()
    return jsonify({'message': 'Book updated successfully'})

def delete_book(book_id):
    book = Book.get_by_id(book_id)
    if not book:
        return jsonify({'message': 'Book not found'}), 404
    book.delete()
    return jsonify({'message': 'Book deleted successfully'})