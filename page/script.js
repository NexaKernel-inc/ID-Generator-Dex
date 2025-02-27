function generateRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let result = '';
    const length = 10; // Longitud de la ID
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function getServerId() {
    const serverId = generateRandomId();
    document.getElementById('serverId').textContent = serverId;
    console.log('ID generada:', serverId);
    document.getElementById('btn').disabled = true; // Deshabilitar el botón después de generar la ID

    // Guardar la ID en localStorage con un tiempo límite de 24 horas
    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    localStorage.setItem('serverId', JSON.stringify({ id: serverId, expires: expirationTime }));
}

function checkServerId() {
    const storedData = localStorage.getItem('serverId');
    if (storedData) {
        const { id, expires } = JSON.parse(storedData);
        if (new Date().getTime() < expires) {
            document.getElementById('serverId').textContent = id;
            document.getElementById('btn').disabled = true;
            console.log('ID recuperada:', id);
        } else {
            localStorage.removeItem('serverId');
        }
    }
}

document.getElementById('btn').addEventListener('click', getServerId);

document.getElementById('btn').addEventListener('click', () => {
    console.log('Iniciando petición');
    fetch('/storage/emulated/0/system/etc/linkerconfig/dev/cpu/cpuset/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
});

// Verificar si hay una ID válida al cargar la página
checkServerId();
