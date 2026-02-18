from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

# create database
def get_db():
    conn = sqlite3.connect("database.db")
    return conn

# create table
conn = get_db()
conn.execute("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, task TEXT)")
conn.close()

# get todos
@app.route("/todos", methods=["GET"])
def get_todos():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM todos")
    todos = cursor.fetchall()
    conn.close()

    return jsonify(todos)

# add todo
@app.route("/todos", methods=["POST"])
def add_todo():
    data = request.json
    task = data["task"]

    conn = get_db()
    conn.execute("INSERT INTO todos (task) VALUES (?)", (task,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Task added"})

# delete todo
@app.route("/todos/<int:id>", methods=["DELETE"])
def delete_todo(id):
    conn = get_db()
    conn.execute("DELETE FROM todos WHERE id=?", (id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Task deleted"})

if __name__ == "__main__":
    app.run(debug=True)
