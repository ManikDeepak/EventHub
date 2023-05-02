from django.urls import path, include
from rest_framework import routers
from my_api import views


from my_api.views import userViewSet,eventViewSet,likeViewSet

router =routers.DefaultRouter()
router.register(r'user',userViewSet)
router.register(r'event', eventViewSet)
router.register(r'likes',likeViewSet)

urlpatterns = [
   path('', include(router.urls)),
   path('login',views.login.as_view()),
   path('register',views.register.as_view()),
   path('create',views.createEvent.as_view()),
   path('getMyEvent', views.getMyEvent.as_view()),
   path('getAllEvent', views.getAllEvent.as_view()),
   path('getMyLikes', views.getMyLikes.as_view()),
   path('addLike',views.addLike.as_view()),
   path("getMyId", views.getMyId.as_view()),
   path("deleteLike", views.deleteLike.as_view())
]