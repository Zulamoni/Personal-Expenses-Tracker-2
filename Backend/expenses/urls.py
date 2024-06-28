# expenses/urls.py

from django.urls import path
from .views import ExpenseListCreateView, ExpenseDetailView
from .views import DashboardDataView
from .views import BudgetListCreateView, BudgetDetailView
urlpatterns = [
    path('expenses/', ExpenseListCreateView.as_view(), name='expense-list-create'),
    path('expenses/<int:pk>/', ExpenseDetailView.as_view(), name='expense-detail'),
    path('dashboard/', DashboardDataView.as_view(), name='dashboard-data'),
    path('budgets/', BudgetListCreateView.as_view(), name='budget-list'),
    path('budgets/<int:pk>/', BudgetDetailView.as_view(), name='budget-detail'),
]
