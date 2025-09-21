export function showAlert(message, type) {
    const icons = {
        success: `
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
                <use xlink:href="#check-circle-fill"></use>
            </svg>
        `,
        danger: `
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:">
                <use xlink:href="#exclamation-triangle-fill"></use>
            </svg>
        `
    };

    const alert = document.createElement('div');
    alert.className = `alert alert-${type} d-flex align-items-center alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
        ${icons[type] || ''}
        <div>${message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    const alertContainer = document.getElementById('alertContainer');
    alertContainer.appendChild(alert);

    setTimeout(() => {
        alert.classList.add('hide');
        alert.addEventListener('transitionend', () => alert.remove());
    }, 5000);
}
