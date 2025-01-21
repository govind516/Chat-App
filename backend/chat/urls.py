from django.urls import path
from . import views

urlpatterns = [
    path("api/users/", views.UserListView.as_view()),
    path("api/messages/<int:recipient_id>/", views.MessageListView.as_view()),
    path("api/register/", views.RegisterView.as_view()),
    path("api/login/", views.LoginView.as_view()),
]
