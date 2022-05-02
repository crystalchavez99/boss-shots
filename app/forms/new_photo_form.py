from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import DataRequired

class NewPhotoForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    description = StringField("Description")
    photo_url = StringField("Photo url", validators=[DataRequired()])
    submit = SubmitField("Add Photo")