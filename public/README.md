<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gym Fit - Sistema de Academia</title>
    <style>
        :root {
            --primary-color: #1a4b8c;
            --secondary-color: #2a6fdb;
            --light-color: #e6f0ff;
            --dark-color: #0d2b4e;
            --accent-color: #4c9cff;
            --text-color: #333;
            --light-text: #f8f9fa;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #f5f7fa;
            color: var(--text-color);
        }

        .container {
            display: flex;
            min-height: 100vh;
        }

        /* Sidebar */
        .sidebar {
            width: 250px;
            background-color: var(--primary-color);
            color: var(--light-text);
            padding: 20px 0;
            transition: all 0.3s;
        }

        .sidebar-header {
            padding: 0 20px 20px;
            text-align: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sidebar-header h2 {
            color: white;
            margin-bottom: 5px;
        }

        .sidebar-header p {
            color: var(--light-color);
            font-size: 12px;
        }

        .sidebar-menu {
            padding: 20px 0;
        }

        .menu-title {
            padding: 0 20px;
            color: var(--light-color);
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 10px;
        }

        .menu-item {
            padding: 12px 20px;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s;
        }

        .menu-item:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }

        .menu-item.active {
            background-color: var(--secondary-color);
        }

        .menu-item i {
            margin-right: 10px;
            font-size: 18px;
        }

        /* Main Content */
        .main-content {
            flex: 1;
            padding: 20px;
            background-color: #f5f7fa;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ddd;
        }

        .header h1 {
            color: var(--primary-color);
        }

        .user-info {
            display: flex;
            align-items: center;
        }

        .user-info img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
        }

        /* Dashboard */
        .dashboard {
            display: block;
        }

        .stats-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            text-align: center;
            transition: transform 0.3s;
        }

        .stat-card:hover {
            transform: translateY(-5px);
        }

        .stat-card h3 {
            color: var(--primary-color);
            margin-bottom: 10px;
            font-size: 16px;
        }

        .stat-card .stat-value {
            font-size: 28px;
            font-weight: bold;
            color: var(--secondary-color);
            margin-bottom: 5px;
        }

        .stat-card .stat-desc {
            color: #666;
            font-size: 12px;
        }

        .charts-container {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
        }

        .chart-card {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .chart-card h3 {
            color: var(--primary-color);
            margin-bottom: 20px;
        }

        /* Forms */
        .form-section {
            display: none;
        }

        .form-section.active {
            display: block;
        }

        .form-card {
            background-color: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 800px;
            margin: 0 auto;
        }

        .form-card h2 {
            color: var(--primary-color);
            margin-bottom: 20px;
            text-align: center;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: var(--dark-color);
            font-weight: 500;
        }

        .form-group input,
        .form-group select {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
            transition: border 0.3s;
        }

        .form-group input:focus,
        .form-group select:focus {
            border-color: var(--secondary-color);
            outline: none;
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .form-actions {
            display: flex;
            justify-content: flex-end;
            margin-top: 30px;
        }

        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .btn-primary {
            background-color: var(--secondary-color);
            color: white;
        }

        .btn-primary:hover {
            background-color: var(--primary-color);
        }

        .btn-secondary {
            background-color: #ddd;
            color: var(--text-color);
            margin-right: 10px;
        }

        .btn-secondary:hover {
            background-color: #ccc;
        }

        /* Table */
        .table-container {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: 30px;
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: var(--light-color);
            color: var(--primary-color);
        }

        tr:hover {
            background-color: #f9f9f9;
        }

        .action-btns button {
            padding: 5px 10px;
            margin-right: 5px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }

        .edit-btn {
            background-color: #ffc107;
            color: #212529;
        }

        .delete-btn {
            background-color: #dc3545;
            color: white;
        }

        /* Responsive */
        @media (max-width: 1200px) {
            .stats-container {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .charts-container {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 768px) {
            .container {
                flex-direction: column;
            }
            
            .sidebar {
                width: 100%;
                height: auto;
            }
            
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .stats-container {
                grid-template-columns: 1fr;
            }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="container">
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="sidebar-header">
                <h2>Gym Fit</h2>
                <p>Sistema de Gestão de Academia</p>
            </div>
            <div class="sidebar-menu">
                <p class="menu-title">Principal</p>
                <div class="menu-item active" data-section="dashboard">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </div>
                
                <p class="menu-title">Cadastros</p>
                <div class="menu-item" data-section="client-form">
                    <i class="fas fa-user-plus"></i>
                    <span>Cadastrar Cliente</span>
                </div>
                <div class="menu-item" data-section="employee-form">
                    <i class="fas fa-user-tie"></i>
                    <span>Cadastrar Funcionário</span>
                </div>
                
                <p class="menu-title">Listagens</p>
                <div class="menu-item" data-section="client-list">
                    <i class="fas fa-users"></i>
                    <span>Clientes Cadastrados</span>
                </div>
                <div class="menu-item" data-section="employee-list">
                    <i class="fas fa-id-badge"></i>
                    <span>Funcionários</span>
                </div>
            </div>
        </div>
        
        <!-- Main Content -->
        <div class="main-content">
            <div class="header">
                <h1 id="section-title">Dashboard</h1>
                <div class="user-info">
                    <img src="https://randomuser.me/api/portraits/men/42.jpg" alt="Usuário">
                    <span>Admin</span>
                </div>
            </div>
            
            <!-- Dashboard Section -->
            <div class="dashboard form-section active" id="dashboard">
                <div class="stats-container">
                    <div class="stat-card">
                        <h3>Clientes Ativos</h3>
                        <div class="stat-value">1,248</div>
                        <div class="stat-desc">+12% em relação ao mês passado</div>
                    </div>
                    <div class="stat-card">
                        <h3>Novos Clientes</h3>
                        <div class="stat-value">143</div>
                        <div class="stat-desc">+8% em relação ao mês passado</div>
                    </div>
                    <div class="stat-card">
                        <h3>Faturamento</h3>
                        <div class="stat-value">R$ 84,720</div>
                        <div class="stat-desc">Meta: R$ 90,000</div>
                    </div>
                    <div class="stat-card">
                        <h3>Funcionários</h3>
                        <div class="stat-value">28</div>
                        <div class="stat-desc">5 instrutores, 10 recepcionistas</div>
                    </div>
                </div>
                
                <div class="charts-container">
                    <div class="chart-card">
                        <h3>Matrículas nos últimos 6 meses</h3>
                        <canvas id="membershipChart" height="300"></canvas>
                    </div>
                    <div class="chart-card">
                        <h3>Tipos de Planos</h3>
                        <canvas id="plansChart" height="300"></canvas>
                    </div>
                </div>
            </div>
            
            <!-- Client Form Section -->
            <div class="form-section" id="client-form">
                <div class="form-card">
                    <h2>Cadastro de Cliente</h2>
                    <form id="clientForm">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="clientName">Nome Completo</label>
                                <input type="text" id="clientName" required>
                            </div>
                            <div class="form-group">
                                <label for="clientId">ID</label>
                                <input type="text" id="clientId" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="clientPhone">Telefone</label>
                                <input type="tel" id="clientPhone" required>
                            </div>
                            <div class="form-group">
                                <label for="clientEmail">Email</label>
                                <input type="email" id="clientEmail" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="clientAddress">Endereço</label>
                            <input type="text" id="clientAddress" required>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="clientBirthdate">Data de Nascimento</label>
                                <input type="date" id="clientBirthdate" required>
                            </div>
                            <div class="form-group">
                                <label for="clientPlan">Plano</label>
                                <select id="clientPlan" required>
                                    <option value="">Selecione um plano</option>
                                    <option value="basic">Básico (R$ 99/mês)</option>
                                    <option value="standard">Standard (R$ 149/mês)</option>
                                    <option value="premium">Premium (R$ 199/mês)</option>
                                    <option value="student">Estudante (R$ 79/mês)</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" id="cancelClient">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Cadastrar Cliente</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <!-- Employee Form Section -->
            <div class="form-section" id="employee-form">
                <div class="form-card">
                    <h2>Cadastro de Funcionário</h2>
                    <form id="employeeForm">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="employeeName">Nome Completo</label>
                                <input type="text" id="employeeName" required>
                            </div>
                            <div class="form-group">
                                <label for="employeeId">ID</label>
                                <input type="text" id="employeeId" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="employeePhone">Telefone</label>
                                <input type="tel" id="employeePhone" required>
                            </div>
                            <div class="form-group">
                                <label for="employeeEmail">Email</label>
                                <input type="email" id="employeeEmail" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="employeeAddress">Endereço</label>
                            <input type="text" id="employeeAddress" required>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="employeeBirthdate">Data de Nascimento</label>
                                <input type="date" id="employeeBirthdate" required>
                            </div>
                            <div class="form-group">
                                <label for="employeePosition">Cargo</label>
                                <select id="employeePosition" required>
                                    <option value="">Selecione um cargo</option>
                                    <option value="instructor">Instrutor</option>
                                    <option value="receptionist">Recepcionista</option>
                                    <option value="manager">Gerente</option>
                                    <option value="cleaner">Zelador</option>
                                    <option value="nutritionist">Nutricionista</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="employeeSalary">Salário</label>
                                <input type="text" id="employeeSalary" required>
                            </div>
                            <div class="form-group">
                                <label for="employeeHireDate">Data de Contratação</label>
                                <input type="date" id="employeeHireDate" required>
                            </div>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" id="cancelEmployee">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Cadastrar Funcionário</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <!-- Client List Section -->
            <div class="form-section" id="client-list">
                <div class="form-card">
                    <h2>Clientes Cadastrados</h2>
                    <div class="table-container">
                        <table id="clientsTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Telefone</th>
                                    <th>Email</th>
                                    <th>Plano</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody id="clientsTableBody">
                                <!-- Clientes serão adicionados aqui via JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- Employee List Section -->
            <div class="form-section" id="employee-list">
                <div class="form-card">
                    <h2>Funcionários Cadastrados</h2>
                    <div class="table-container">
                        <table id="employeesTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Cargo</th>
                                    <th>Telefone</th>
                                    <th>Salário</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody id="employeesTableBody">
                                <!-- Funcionários serão adicionados aqui via JavaScript -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        // Dados iniciais
        let clients = [
            { id: "CL001", name: "João Silva", phone: "(11) 98765-4321", email: "joao.silva@email.com", address: "Rua das Flores, 123 - São Paulo/SP", birthdate: "1985-05-15", plan: "premium" },
            { id: "CL002", name: "Maria Oliveira", phone: "(11) 99876-5432", email: "maria.oliveira@email.com", address: "Av. Paulista, 1000 - São Paulo/SP", birthdate: "1990-08-22", plan: "standard" },
            { id: "CL003", name: "Carlos Souza", phone: "(11) 97654-3210", email: "carlos.souza@email.com", address: "Rua Augusta, 500 - São Paulo/SP", birthdate: "1982-11-30", plan: "basic" },
            { id: "CL004", name: "Ana Costa", phone: "(11) 96543-2109", email: "ana.costa@email.com", address: "Rua Oscar Freire, 200 - São Paulo/SP", birthdate: "1995-03-10", plan: "student" }
        ];

        let employees = [
            { id: "EMP001", name: "Roberto Alves", phone: "(11) 91234-5678", email: "roberto.alves@gymfit.com", address: "Rua dos Pinheiros, 300 - São Paulo/SP", birthdate: "1980-07-25", position: "manager", salary: "R$ 5.000,00", hireDate: "2018-01-15" },
            { id: "EMP002", name: "Fernanda Lima", phone: "(11) 92345-6789", email: "fernanda.lima@gymfit.com", address: "Av. Brigadeiro Faria Lima, 1500 - São Paulo/SP", birthdate: "1988-04-18", position: "instructor", salary: "R$ 3.500,00", hireDate: "2020-05-10" },
            { id: "EMP003", name: "Paulo Santos", phone: "(11) 93456-7890", email: "paulo.santos@gymfit.com", address: "Rua Haddock Lobo, 400 - São Paulo/SP", birthdate: "1992-09-12", position: "receptionist", salary: "R$ 2.200,00", hireDate: "2021-02-20" },
            { id: "EMP004", name: "Juliana Pereira", phone: "(11) 94567-8901", email: "juliana.pereira@gymfit.com", address: "Rua Bela Cintra, 600 - São Paulo/SP", birthdate: "1985-12-05", position: "nutritionist", salary: "R$ 4.000,00", hireDate: "2019-08-15" }
        ];

        // DOM Elements
        const menuItems = document.querySelectorAll('.menu-item');
        const formSections = document.querySelectorAll('.form-section');
        const sectionTitle = document.getElementById('section-title');
        
        // Form elements
        const clientForm = document.getElementById('clientForm');
        const employeeForm = document.getElementById('employeeForm');
        const cancelClient = document.getElementById('cancelClient');
        const cancelEmployee = document.getElementById('cancelEmployee');
        
        // Table elements
        const clientsTableBody = document.getElementById('clientsTableBody');
        const employeesTableBody = document.getElementById('employeesTableBody');

        // Menu navigation
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                menuItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                item.classList.add('active');
                
                // Hide all sections
                formSections.forEach(section => section.classList.remove('active'));
                
                // Show selected section
                const sectionId = item.getAttribute('data-section');
                document.getElementById(sectionId).classList.add('active');
                
                // Update section title
                updateSectionTitle(sectionId);
                
                // If showing a list, update the table
                if (sectionId === 'client-list') {
                    updateClientsTable();
                } else if (sectionId === 'employee-list') {
                    updateEmployeesTable();
                }
            });
        });

        // Update section title based on active section
        function updateSectionTitle(sectionId) {
            const titles = {
                'dashboard': 'Dashboard',
                'client-form': 'Cadastro de Cliente',
                'employee-form': 'Cadastro de Funcionário',
                'client-list': 'Clientes Cadastrados',
                'employee-list': 'Funcionários Cadastrados'
            };
            
            sectionTitle.textContent = titles[sectionId] || 'Gym Fit';
        }

        // Form submissions
        clientForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newClient = {
                id: document.getElementById('clientId').value,
                name: document.getElementById('clientName').value,
                phone: document.getElementById('clientPhone').value,
                email: document.getElementById('clientEmail').value,
                address: document.getElementById('clientAddress').value,
                birthdate: document.getElementById('clientBirthdate').value,
                plan: document.getElementById('clientPlan').value
            };
            
            clients.push(newClient);
            clientForm.reset();
            
            alert('Cliente cadastrado com sucesso!');
            
            // Update clients table if it's visible
            if (document.getElementById('client-list').classList.contains('active')) {
                updateClientsTable();
            }
            
            // Go back to dashboard
            document.querySelector('.menu-item[data-section="dashboard"]').click();
        });

        employeeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newEmployee = {
                id: document.getElementById('employeeId').value,
                name: document.getElementById('employeeName').value,
                phone: document.getElementById('employeePhone').value,
                email: document.getElementById('employeeEmail').value,
                address: document.getElementById('employeeAddress').value,
                birthdate: document.getElementById('employeeBirthdate').value,
                position: document.getElementById('employeePosition').value,
                salary: document.getElementById('employeeSalary').value,
                hireDate: document.getElementById('employeeHireDate').value
            };
            
            employees.push(newEmployee);
            employeeForm.reset();
            
            alert('Funcionário cadastrado com sucesso!');
            
            // Update employees table if it's visible
            if (document.getElementById('employee-list').classList.contains('active')) {
                updateEmployeesTable();
            }
            
            // Go back to dashboard
            document.querySelector('.menu-item[data-section="dashboard"]').click();
        });

        // Cancel buttons
        cancelClient.addEventListener('click', () => {
            clientForm.reset();
            document.querySelector('.menu-item[data-section="dashboard"]').click();
        });

        cancelEmployee.addEventListener('click', () => {
            employeeForm.reset();
            document.querySelector('.menu-item[data-section="dashboard"]').click();
        });

        // Update clients table
        function updateClientsTable() {
            clientsTableBody.innerHTML = '';
            
            clients.forEach(client => {
                const row = document.createElement('tr');
                
                // Get plan name
                const planNames = {
                    'basic': 'Básico',
                    'standard': 'Standard',
                    'premium': 'Premium',
                    'student': 'Estudante'
                };
                
                row.innerHTML = `
                    <td>${client.id}</td>
                    <td>${client.name}</td>
                    <td>${client.phone}</td>
                    <td>${client.email}</td>
                    <td>${planNames[client.plan] || client.plan}</td>
                    <td class="action-btns">
                        <button class="edit-btn"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                
                clientsTableBody.appendChild(row);
            });
        }

        // Update employees table
        function updateEmployeesTable() {
            employeesTableBody.innerHTML = '';
            
            employees.forEach(employee => {
                const row = document.createElement('tr');
                
                // Get position name
                const positionNames = {
                    'instructor': 'Instrutor',
                    'receptionist': 'Recepcionista',
                    'manager': 'Gerente',
                    'cleaner': 'Zelador',
                    'nutritionist': 'Nutricionista'
                };
                
                row.innerHTML = `
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${positionNames[employee.position] || employee.position}</td>
                    <td>${employee.phone}</td>
                    <td>${employee.salary}</td>
                    <td class="action-btns">
                        <button class="edit-btn"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                
                employeesTableBody.appendChild(row);
            });
        }

        // Initialize charts
        function initCharts() {
            // Membership Chart
            const membershipCtx = document.getElementById('membershipChart').getContext('2d');
            const membershipChart = new Chart(membershipCtx, {
                type: 'line',
                data: {
                    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
                    datasets: [{
                        label: 'Novas Matrículas',
                        data: [120, 135, 110, 150, 180, 160],
                        backgroundColor: 'rgba(42, 111, 219, 0.2)',
                        borderColor: 'rgba(42, 111, 219, 1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            
            // Plans Chart
            const plansCtx = document.getElementById('plansChart').getContext('2d');
            const plansChart = new Chart(plansCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Básico', 'Standard', 'Premium', 'Estudante'],
                    datasets: [{
                        data: [450, 350, 250, 198],
                        backgroundColor: [
                            'rgba(42, 111, 219, 0.7)',
                            'rgba(26, 75, 140, 0.7)',
                            'rgba(76, 156, 255, 0.7)',
                            'rgba(13, 43, 78, 0.7)'
                        ],
                        borderColor: [
                            'rgba(42, 111, 219, 1)',
                            'rgba(26, 75, 140, 1)',
                            'rgba(76, 156, 255, 1)',
                            'rgba(13, 43, 78, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                        }
                    }
                }
            });
        }

        // Initialize the app
        function init() {
            updateClientsTable();
            updateEmployeesTable();
            initCharts();
        }

        // Start the app
        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>
