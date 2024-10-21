document.addEventListener('DOMContentLoaded', () => {
    const ingredientSelect = document.getElementById('ingredient-select');
    const ingredientOptions = document.getElementById('ingredient-options');
    const selectButton = document.getElementById('select-button');
    const clearSumsButton = document.getElementById('clear-sums-button');
    const nutritionalInfo = document.getElementById('nutritional-info');
    const selectedIngredients = [];

    selectButton.addEventListener('click', () => {
        const selectedName = ingredientSelect.value;
        const quantity = parseFloat(document.getElementById('ingredient-quantity').value);

        if (selectedName && quantity) {
            const ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
            const ingredient = ingredients.find(ing => ing.name === selectedName);
            if (ingredient) {
                selectedIngredients.push({ ...ingredient, quantity });
            }
            displaySelectedIngredients();
        }
    });

    clearSumsButton.addEventListener('click', () => {
        selectedIngredients.length = 0;
        nutritionalInfo.innerHTML = '';
    });

    function displayIngredients() {
        let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
        
        ingredientOptions.innerHTML = '';

        ingredients.forEach(ingredient => {
            const option = document.createElement('option');
            option.value = ingredient.name;
            option.textContent = ingredient.name;
            ingredientOptions.appendChild(option);
        });
    }

    function displaySelectedIngredients() {
        let total = {
            calories: 0,
            netCarbs: 0,
            carbs: 0,
            proteins: 0,
            totalFats: 0,
            saturatedFats: 0,
            fiber: 0,
            sodium: 0
        };

        let ingredientDetails = '<p>Ingredientes Selecionados:<br>';

        selectedIngredients.forEach(ingredient => {
            const multiplier = ingredient.quantity;
            total.calories += ingredient.calories * multiplier;
            total.netCarbs += ingredient.netCarbs * multiplier;
            total.carbs += ingredient.carbs * multiplier;
            total.proteins += ingredient.proteins * multiplier;
            total.totalFats += ingredient.totalFats * multiplier;
            total.saturatedFats += ingredient.saturatedFats * multiplier;
            total.fiber += ingredient.fiber * multiplier;
            total.sodium += ingredient.sodium * multiplier;

            ingredientDetails += `${ingredient.name}: ${ingredient.quantity}g<br>`;
        });

        ingredientDetails += `</p><p>Total:<br>
            Calorias: ${total.calories.toFixed(2)} kcal<br>
            Carboidratos Líquidos: ${total.netCarbs.toFixed(2)} g<br>
            Carboidratos: ${total.carbs.toFixed(2)} g<br>
            Proteínas: ${total.proteins.toFixed(2)} g<br>
            Gorduras Totais: ${total.totalFats.toFixed(2)} g<br>
            Gorduras Saturadas: ${total.saturatedFats.toFixed(2)} g<br>
            Fibra Alimentar: ${total.fiber.toFixed(2)} g<br>
            Sódio: ${total.sodium.toFixed(2)} mg
        </p>`;

        nutritionalInfo.innerHTML = ingredientDetails;
    }

    displayIngredients();
});


document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('authenticated');
    window.location.href = 'login.html';
});
