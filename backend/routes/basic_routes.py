# module imports
from flask import Flask, send_from_directory,render_template
# local imports
from backend import app

# serve static files
@app.route('/<path:filename>')
def download_file(filename):
    return send_from_directory(app.root_path,
                               filename, as_attachment=True)

# handle refreashes and work with react-router-dom (navigation)
#@app.errorhandler(404)
#def not_found(e):
#    return render_template("index.html", token="Hello World")
#
#@app.route("/")
#def my_index():
#    return render_template("index.html", token="Hello World")

