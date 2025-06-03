const stars = document.querySelectorAll('.rating-stars .star');
    const ratingInput = document.getElementById('rating');

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            ratingInput.value = index + 1;

            stars.forEach((s, i) => {
                s.classList.toggle('selected', i <= index);
            });
        });
  });