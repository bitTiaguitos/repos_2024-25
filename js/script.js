// Carrega os carros armazenados ou inicializa um array vazio
let cars = JSON.parse(localStorage.getItem('cars')) || [];

// Função para adicionar um novo carro e salvar no localStorage
function addCar(name, image, features, engine, type, year, price, color, fuel) {
    const car = { 
        name, 
        image, 
        features, 
        engine, 
        type,
        year,
        price,
        color,
        fuel,
        status: 'Disponível', // Status inicial de cada carro
        rental: { 
            user: '',
            startDate: '',
            endDate: ''
        },
        rentalHistory: [] // Array para armazenar o histórico de alugueis
    };
    cars.push(car);
    localStorage.setItem('cars', JSON.stringify(cars));
    displayCars();
}

// Função para exibir os carros na página de administração com status e histórico
function displayCars() {
    const carList = document.getElementById('car-list');
    carList.innerHTML = '';

    cars.forEach((car, index) => {
        const carElement = document.createElement('div');
        carElement.className = 'car';
        carElement.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <h3>${car.name}</h3>
            <p><strong>Características:</strong> ${car.features}</p>
            <p><strong>Cilindrada:</strong> ${car.engine}</p>
            <p><strong>Tipo de Veículo:</strong> ${car.type}</p>
            <p><strong>Ano:</strong> ${car.year}</p>
            <p><strong>Preço por Dia:</strong> ${car.price} €</p>
            <p><strong>Cor:</strong> ${car.color}</p>
            <p><strong>Combustível:</strong> ${car.fuel}</p>
            <p><strong>Status:</strong> ${car.status}</p>
            
            <!-- Detalhes de Aluguel -->
            <h4>Detalhes do Aluguel Atual:</h4>
            ${car.rental.user ? `
                <p><strong>Usuário:</strong> ${car.rental.user}</p>
                <p><strong>Data de Início:</strong> ${car.rental.startDate}</p>
                <p><strong>Data de Término:</strong> ${car.rental.endDate}</p>
            ` : `<p>Este carro não está alugado.</p>`}
            
            <h4>Histórico de Aluguel:</h4>
            ${car.rentalHistory.length > 0 ? car.rentalHistory.map(rental => `
                <p><strong>Usuário:</strong> ${rental.user} | <strong>Data de Início:</strong> ${rental.startDate} | <strong>Data de Término:</strong> ${rental.endDate}</p>
            `).join('') : `<p>Sem histórico de aluguel.</p>`}
            
            <button onclick="deleteCar(${index})">Apagar Carro</button>
        `;
        carList.appendChild(carElement);
    });
}

// Função para apagar um carro pelo índice
function deleteCar(index) {
    if (confirm("Tem certeza que deseja apagar este carro?")) {
        cars.splice(index, 1);  // Remove o carro do array
        localStorage.setItem('cars', JSON.stringify(cars));  // Atualiza o localStorage
        displayCars();  // Atualiza a exibição
    }
}

// Evento para adicionar carro pelo formulário da página de administração
const carForm = document.getElementById('car-form');
if (carForm) {
    carForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const image = document.getElementById('image').value;
        const features = document.getElementById('features').value;
        const engine = document.getElementById('engine').value;
        const type = document.getElementById('type').value;
        const year = document.getElementById('year').value;
        const price = document.getElementById('price').value;
        const color = document.getElementById('color').value;
        const fuel = document.getElementById('fuel').value;

        addCar(name, image, features, engine, type, year, price, color, fuel);

        // Limpa o formulário após adicionar o carro
        carForm.reset();
    });
}

// Função para filtrar carros com base na busca do usuário
function filterCars() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredCars = cars.filter(car => {
        return car.name.toLowerCase().includes(searchInput) || 
               car.type.toLowerCase().includes(searchInput) ||
               car.color.toLowerCase().includes(searchInput);
    });
    
    displayFilteredCars(filteredCars);
}

// Função para exibir os carros filtrados
function displayFilteredCars(filteredCars) {
    const carList = document.getElementById('car-list');
    carList.innerHTML = '';

    filteredCars.forEach((car, index) => {
        const carElement = document.createElement('div');
        carElement.className = 'car';
        carElement.innerHTML = `
            <img src="${car.image}" alt="${car.name}">
            <h3>${car.name}</h3>
            <p><strong>Características:</strong> ${car.features}</p>
            <p><strong>Cilindrada:</strong> ${car.engine}</p>
            <p><strong>Tipo de Veículo:</strong> ${car.type}</p>
            <p><strong>Ano:</strong> ${car.year}</p>
            <p><strong>Preço por Dia:</strong> ${car.price} €</p>
            <p><strong>Cor:</strong> ${car.color}</p>
            <p><strong>Combustível:</strong> ${car.fuel}</p>
            <p><strong>Status:</strong> ${car.status}</p>
            
            <!-- Detalhes de Aluguel -->
            <h4>Detalhes do Aluguel Atual:</h4>
            ${car.rental.user ? `
                <p><strong>Usuário:</strong> ${car.rental.user}</p>
                <p><strong>Data de Início:</strong> ${car.rental.startDate}</p>
                <p><strong>Data de Término:</strong> ${car.rental.endDate}</p>
            ` : `<p>Este carro não está alugado.</p>`}
            
            <h4>Histórico de Aluguel:</h4>
            ${car.rentalHistory.length > 0 ? car.rentalHistory.map(rental => `
                <p><strong>Usuário:</strong> ${rental.user} | <strong>Data de Início:</strong> ${rental.startDate} | <strong>Data de Término:</strong> ${rental.endDate}</p>
            `).join('') : `<p>Sem histórico de aluguel.</p>`}
            
            <button onclick="deleteCar(${index})">Apagar Carro</button>
        `;
        carList.appendChild(carElement);
    });
}

// Exibe os carros na página de administração
displayCars();
