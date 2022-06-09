from lib2to3.pgen2 import pgen
from flask import Blueprint, jsonify, render_template,redirect, request
from app.models import db, Photo, User, Comment
from app.forms.new_photo_form import NewPhotoForm,EditPhotoForm
from app.forms.new_comment_form import NewCommentForm
from flask_login import current_user
from app.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__, url_prefix="/comments")

# WORKS
@comment_routes.route('/<int:id>', methods=["DELETE"])
def delete_comment(id):
    print('ENTER ROUTE DELETE')
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()

@comment_routes.route("/<int:id>/edit", methods=["PUT", "GET"])
def update_comment(id):
  print('ENTER ROUTE update')
  comments = Comment.query.get(id)
  print('GRABBED COMMENT TO UPDATE', comments.comment)
  form = NewCommentForm()
  print('form data worki',form.data["comment"])
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    print('FORM IS VALID')
    comments.comment = form.data["comment"]
    db.session.commit()
    print('SUCCESS FORM',comments.to_dict())
    return comments.to_dict()
  return {"errors": validation_errors_to_error_messages(form.errors)},401
