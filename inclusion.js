document.addEventListener('DOMContentLoaded', () => {
    // Verifica se o usuário está autenticado
    if (localStorage.getItem('authenticated') !== 'true') {
        window.location.href = 'login.html'; // Redireciona para a página de login se não estiver autenticado
    }

    const ingredientForm = document.getElementById('ingredient-form');

    ingredientForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const calories = parseFloat(document.getElementById('calories').value);
        const netCarbs = parseFloat(document.getElementById('netCarbs').value);
        const carbs = parseFloat(document.getElementById('carbs').value);
        const proteins = parseFloat(document.getElementById('proteins').value);
        const totalFats = parseFloat(document.getElementById('totalFats').value);
        const saturatedFats = parseFloat(document.getElementById('saturatedFats').value);
        const fiber = parseFloat(document.getElementById('fiber').value);
        const sodium = parseFloat(document.getElementById('sodium').value);

        const ingredient = {
            name,
            calories,
            netCarbs,
            carbs,
            proteins,
            totalFats,
            saturatedFats,
            fiber,
            sodium
        };

        saveIngredient(ingredient);
        ingredientForm.reset();
    });

    function saveIngredient(ingredient) {
        let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
        ingredients.push(ingredient);
        localStorage.setItem('ingredients', JSON.stringify(ingredients));
    }
});


document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('authenticated');
    window.location.href = 'login.html';
});
