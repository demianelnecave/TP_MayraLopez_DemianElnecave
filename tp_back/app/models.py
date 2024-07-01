from app.database import get_db

class Book:
    #CONSTRUCTOR
    def __init__(self,id_book=None,title=None,autor=None,release_date=None,banner=None):
        self.id_book = id_book
        self.title = title
        self.autor = autor
        self.release_date = release_date
        self.banner = banner

    @staticmethod #No dependo de instanciar la clase para usar este método
    def get_by_id(book_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM books WHERE id_book = %s", (book_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Book(id_book=row[0], title=row[1], autor=row[2], release_date=row[3], banner=row[4])
        return None
    
    @staticmethod    
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM books")
        rows = cursor.fetchall()
        books = [Book(id_book=row[0], title=row[1], autor=row[2], release_date=row[3], banner=row[4]) for row in rows]
        # books = []
        # for row in rows:
        #     new_book =  Book(row[0],row[1],row[2],row[3],row[4])
        #     books.append(new_book)
        cursor.close()
        return books
    
    def save(self):
        #así es como hago los INSERT/UPDATE en la base de datos
        db = get_db()
        cursor = db.cursor()
        if self.id_book:
            cursor.execute("""
                UPDATE books SET title = %s, autor = %s, release_date = %s, banner = %s
                WHERE id_book = %s
            """, (self.title, self.autor, self.release_date, self.banner, self.id_book))
        else:
            cursor.execute("""
                INSERT INTO books (title, autor, release_date, banner) VALUES (%s, %s, %s, %s)
            """, (self.title, self.autor, self.release_date, self.banner))
            self.id_book = cursor.lastrowid
        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM books WHERE id_book = %s", (self.id_book,))
        db.commit()
        cursor.close()
    
    def serialize(self):
        return {
            'id_book': self.id_book,
            'title': self.title,
            'autor': self.autor,
            'release_date': self.release_date.strftime("%Y-%m-%d"),
            'banner': self.banner,
        }
    
    