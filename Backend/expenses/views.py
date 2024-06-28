from rest_framework import generics, permissions, status
from .models import Expense
from .serializers import ExpenseSerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Sum, Count, Avg, Max, Min
from django.utils.timezone import now
from .models import Budget, Expense
from .serializers import BudgetSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import generate_jwt_token, decode_jwt_token, get_token


class DashboardDataView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        # Example 1: Total expenses for the current month
        current_month = now().month
        current_year = now().year

        current_month_expenses = Expense.objects.filter(
            user=request.user,
            date__month=current_month,
            date__year=current_year
        ).aggregate(total_expenses=Sum('amount'))['total_expenses'] or 0.0

        # Example 2: Total number of expenses
        total_expense_count = Expense.objects.filter(
            user=request.user
        ).count()

        # Example 3: Average expense amount
        average_expense = Expense.objects.filter(
            user=request.user
        ).aggregate(avg_expense=Avg('amount'))['avg_expense'] or 0.0

        # Example 4: Maximum and minimum expense amount
        max_expense = Expense.objects.filter(
            user=request.user
        ).aggregate(max_expense=Max('amount'))['max_expense'] or 0.0

        min_expense = Expense.objects.filter(
            user=request.user
        ).aggregate(min_expense=Min('amount'))['min_expense'] or 0.0

        data = {
            'current_month_expenses': current_month_expenses,
            'total_expense_count': total_expense_count,
            'average_expense': average_expense,
            'max_expense': max_expense,
            'min_expense': min_expense,
            # Add more aggregated data as needed for your dashboard
        }

        return Response(data)

class ExpenseListCreateView(generics.ListCreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

class BudgetListCreateView(generics.ListCreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExpenseCreateView(generics.CreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        expense = serializer.save(user=self.request.user)
        # Check if the expense exceeds any budget limits
        budgets = Budget.objects.filter(user=self.request.user, category=expense.category)
        for budget in budgets:
            if expense.amount > budget.amount:
                # Handle exceeding budget logic (e.g., raise a notification)
                pass


class BudgetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)

    def perform_destroy(self, instance):
        # Check if there are any expenses associated with this budget
        associated_expenses = Expense.objects.filter(
            user=self.request.user,
            category=instance.category,
            amount__gt=instance.amount
        )
        if associated_expenses.exists():
            return Response({"error": "Cannot delete budget with associated expenses exceeding the limit."},
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        # expenses/views.py


@api_view(['POST'])
def obtain_jwt_token(request):
    # Assuming you have a login view that authenticates the user
    user = authenticate(request, username=request.data.get('username'), password=request.data.get('password'))
    if user:
        jwt_token = generate_jwt_token(user)
        return Response({'token': jwt_token})
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

