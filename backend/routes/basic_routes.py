# module imports
from flask import Flask, send_from_directory,render_template
# local imports
from backend import app

# handle refreashes and work with react-router-dom (navigation)
@app.errorhandler(404)
def not_found(e):
    return render_template("index.html", token="Hello World")

@app.route("/")
def my_index():
    return render_template("index.html", token="Hello World")

