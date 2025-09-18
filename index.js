const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.PORT || 5000;

// Serve os arquivos estáticos da pasta "public"
app.use(express.static("public"));

// Configura o body-parser para ler JSON
app.use(bodyParser.json());

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");
    }
});

// Criação das tabelas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER primary key AUTOINCREMENT,
            codigo VARCHAR(10) NOT NULL UNIQUE,
            nome VARCHAR(100) NOT NULL,
            idade INTEGER,
            telefone VARCHAR(15),
            emergencia VARCHAR(15),
            endereco TEXT,
            email VARCHAR(100),
            cpf VARCHAR(14) NOT NULL UNIQUE
        )
    `);

    db.run(`
  CREATE TABLE if not exists funcionario (
    id INTEGER primary key AUTOINCREMENT,
    codigo VARCHAR(10) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(100),
    endereco TEXT,
    telefone VARCHAR(15),
    idade INTEGER,
    cargo_id INTEGER,
    FOREIGN KEY (cargo_id) REFERENCES cargo (id)
  )
  `);

     db.run(`
    CREATE TABLE IF NOT EXISTS pagamentos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          codigo INTEGER NOT NULL,
          valor REAL NOT NULL,
          dataPagamento DATE NOT NULL,
          formaPagamento VARCHAR(50) NOT NULL,
          FOREIGN KEY (codigo) REFERENCES clientes(id) 
    )
    `);

    db.run(`
    CREATE TABLE IF NOT EXISTS frequencia (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     codigo VARCHAR(10),
     nome VARCHAR(100) NOT NULL,
     treinos INTEGER,
     faltas INTEGER
    )
    `);

    db.run(`
    CREATE TABLE if not exists cargo (
        id integer PRIMARY KEY AUTOINCREMENT,
        codigo VARCHAR(10),
        codigofun VARCHAR(6) NOT NULL UNIQUE,
        funcao VARCHAR(100) NOT NULL
        )
        `);
    
    db.run(`
    CREATE TABLE IF NOT EXISTS movimento (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        codigo VARCHAR(10) NOT NULL,
        nome VARCHAR(100) NOT NULL,
        mes VARCHAR(7) NOT NULL,
        treinos INTEGER DEFAULT 0,
        faltas INTEGER DEFAULT 0,
        valor DECIMAL(10,2) DEFAULT 0,
        pago VARCHAR(3) DEFAULT 'Não'
    )
    `);


    db.run(`
        CREATE TABLE IF NOT EXISTS planos_treino (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            codigo VARCHAR(10) UNIQUE,
            nome VARCHAR(100) NOT NULL,
            categoria VARCHAR(50) NOT NULL,
            duracao INTEGER NOT NULL,
            exercicios TEXT NOT NULL,
            observacoes TEXT
        )
    `);


    console.log("Tabelas criadas com sucesso.");
});

///////////////////////////// Rotas para Clientes /////////////////////////////
///////////////////////////// Rotas para Clientes /////////////////////////////
///////////////////////////// Rotas para Clientes /////////////////////////////


// Cadastrar cliente
app.post("/clientes", (req, res) => {
    const { codigo, nome, idade, telefone, emergencia, endereco, email, cpf } =
        req.body;

    if (!nome || !codigo) {
        return res.status(400).send("Nome e CPF são obrigatórios.");
    }

    const query = `INSERT INTO clientes (codigo, nome, idade, telefone, emergencia, endereco, email, cpf) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(
        query,
        [codigo, nome, idade, telefone, emergencia, endereco, email, cpf],
        function (err) {
            if (err) {
                return res.status(500).send("Erro ao cadastrar cliente.");
            }
            res.status(201).send({
                id: this.lastID,
                message: "Cliente cadastrado com sucesso.",
            });
        },
    );
});

// Listar clientes
// Endpoint para listar todos os clientes ou buscar por CPF
app.get("/clientes", (req, res) => {
    const codigo = req.query.codigo || ""; // Recebe o CPF da query string (se houver)

    if (codigo) {
        // Se CPF foi passado, busca clientes que possuam esse CPF ou parte dele
        const query = `SELECT * FROM clientes WHERE codigo LIKE ?`;

        db.all(query, [`%${codigo}%`], (err, rows) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ message: "Erro ao buscar clientes." });
            }
            res.json(rows); // Retorna os clientes encontrados ou um array vazio
        });
    } else {
        // Se CPF não foi passado, retorna todos os clientes
        const query = `SELECT * FROM clientes`;

        db.all(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ message: "Erro ao buscar clientes." });
            }
            res.json(rows); // Retorna todos os clientes
        });
    }
});

// Atualizar cliente
app.put("/clientes/codigo/:codigo", (req, res) => {
    const { codigo } = req.params;
    const { nome, idade, telefone, emergencia, endereco, email, cpf } = req.body;

    if (!codigo || !nome) {
        return res.status(400).send("Código e nome são obrigatórios.");
    }

    const query = `UPDATE clientes SET  nome = ?, idade = ?, telefone = ?, emergencia = ?, endereco = ?, email = ?, cpf = ?, WHERE codigo = ?`;
    db.run(query, [codigo, nome, idade, telefone, emergencia, endereco, email, cpf], function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send("Erro ao atualizar cliente.");
        }
        if (this.changes === 0) {
            return res.status(404).send("Cliente não encontrado.");
        }
        res.send("Cliente atualizado com sucesso.");
    });
});

///////////////////////////// Rotas para Funcionario /////////////////////////////
///////////////////////////// Rotas para Funcionario /////////////////////////////
///////////////////////////// Rotas para Funcionario /////////////////////////////
app.post('/funcionario', (req, res) => {
    const { codigo, nome, cpf, email, telefone, endereco, idade, cargo_id } = req.body;

    if (!codigo || !cpf) {
        return res.status(400).send('codigo e CPF são obrigatórios.');
    }

    const query = `INSERT INTO funcionario (codigo, nome, cpf, email, telefone, endereco, idade, cargo_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(query, [codigo, nome, cpf, email, telefone, endereco, idade, cargo_id], function (err) {
        if (err) {
            return res.status(500).send('Erro ao cadastrar funcionario.');
        }
        res.status(201).send({ id: this.lastID, message: 'Funcionario cadastrado com sucesso.' });
    });
});

// Listar funcionario
// Endpoint para listar todos os funcionarios ou buscar por CPF
app.get('/funcionario', (req, res) => {
    const codigo = req.query.codigo || '';  // Recebe o CPF da query string (se houver)

    if (codigo) {
        // Se CPF foi passado, busca funcionarios que possuam esse CPF ou parte dele
        const query = `SELECT * FROM funcionario WHERE codigo LIKE ?`;

        db.all(query, [`%${cpf}%`], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar funcionarios.' });
            }
            res.json(rows);  // Retorna os funcionarios encontrados ou um array vazio
        });
    } else {
        // Se CPF não foi passado, retorna todos os funcionarios
        const query = `SELECT * FROM funcionario`;

        db.all(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao buscar funcionarios.' });
            }
            res.json(rows);  // Retorna todos os funcionarios
        });
    }
});

// Atualizar funcionario
app.put('/funcionario/codigo/:codigo', (req, res) => {
    const { codigo } = req.params;
    const { nome, email, telefone, endereco, idade, cpf, cargo_id } = req.body;

    const query = `UPDATE funcionario SET nome = ?, email = ?, telefone = ?, endereco = ?, idade = ?, cargo_id = ? cpf = ?, WHERE codigo = ?`;
    db.run(query, [nome, email, telefone, endereco, idade, cargo_id, cpf], function (err) {
        if (err) {
            return res.status(500).send('Erro ao atualizar funcionario.');
        }
        if (this.changes === 0) {
            return res.status(404).send('Funcionario não encontrado.');
        }
        res.send('Funcionario atualizado com sucesso.');
    });
    });
    
// ROTA PARA BUSCAR TODOS OS CARGOS PARA CADASTRAR O Funcionario
app.get('/buscar-cargo', (req, res) => {
    db.all("SELECT id, funcao FROM cargo", [], (err, rows) => {
        if (err) {
            console.error('Erro ao buscar serviços:', err);
            res.status(500).send('Erro ao buscar serviços');
        } else {
            res.json(rows); // Retorna os serviços em formato JSON
        }
    });
});




///////////////////////////// Rotas para Pagamentos /////////////////////////////
///////////////////////////// Rotas para Pagamentos /////////////////////////////
///////////////////////////// Rotas para Pagamentos /////////////////////////////


app.post("/pagamentos", (req, res) => {
    const { codigo, valor, dataPagamento, formaPagamento} =
        req.body;

    if (!codigo) {
        return res.status(400).send("Codigo são obrigatórios.");
    }

    const query = `INSERT INTO pagamentos (codigo, valor, dataPagamento, formaPagamento) VALUES (?, ?, ?, ?)`;
    db.run(
        query,
        [codigo, valor, dataPagamento, formaPagamento],
        function (err) {
            if (err) {
                return res.status(500).send("Erro ao cadastrar pagamentos.");
            }
            res.status(201).send({
                id: this.lastID,
                message: "pagamentos cadastrado com sucesso.",
            });
        },
    );
});
// Listar pagamento
// Endpoint para listar todos os clientes ou buscar por CPF
app.get("/pagamentos", (req, res) => {
    const codigo = req.query.codigo || ""; // Recebe o CPF da query string (se houver)

    if (codigo) {
        // Se CPF foi passado, busca clientes que possuam esse CPF ou parte dele
        const query = `SELECT * FROM pagamentos WHERE codigo LIKE ?`;

        db.all(query, [`%${codigo}%`], (err, rows) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ message: "Erro ao buscar pagamentos." });
            }
            res.json(rows); // Retorna os clientes encontrados ou um array vazio
        });
    } else {
        // Se CPF não foi passado, retorna todos os clientes
        const query = `SELECT * FROM pagamentos`;

        db.all(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ message: "Erro ao buscar pagamentos."});
            }
            res.json(rows); // Retorna todos os clientes
        });
    }
});

// Atualizar pagamento
app.put("/pagamentos/codigo/:codigo", (req, res) => {
    const { codigo } = req.params;
    const { valor, dataPagamento, formaPagamento } = req.body;

    const query = `UPDATE pagamentos SET valor = ?, dataPagamento = ?, formaPagamento = ? WHERE codigo = ?`;
    db.run(query, [valor, dataPagamento, formaPagamento, codigo], function (err) {
        if (err) {
            return res.status(500).send("Erro ao registrar pagamentos.");
        }
        if (this.changes === 0) {
            return res.status(404).send("pagamentos nao encontrado.");
        }
        res.send("pagamentos registrado com sucesso.");
    });
});

 ////////////////////////////rotas para frequencia////////////////////////////////
 ////////////////////////////rotas para frequencia////////////////////////////////
 ////////////////////////////rotas para frequencia////////////////////////////////

      // Cadastrar frequencia
     app.post("/frequencia", (req, res) => {
         const { codigo, nome, treinos, faltas } =
             req.body;

         if (!nome || !codigo) {
             return res.status(400).send("Nome e CPF são obrigatórios.");
         }

         const query = `INSERT INTO frequencia (codigo, nome, treinos, faltas) VALUES (?, ?, ?, ?)`;
         db.run(
             query,
             [codigo, nome, treinos, faltas],
             function (err) {
                 if (err) {
                     return res.status(500).send("Erro ao cadastrar cliente.");
                 }
                 res.status(201).send({
                     id: this.lastID,
                     message: "Cliente cadastrado com sucesso.",
                 });
             },
         );
     });

     // Listar clientes
     // Endpoint para listar todos os clientes ou buscar por CPF
     app.get("/frequencia", (req, res) => {
         const codigo = req.query.codigo || ""; // Recebe o CPF da query string (se houver)

         if (codigo) {
             // Se CPF foi passado, busca clientes que possuam esse CPF ou parte dele
             const query = `SELECT * FROM frequencia WHERE codigo LIKE ?`;

             db.all(query, [`%${codigo}%`], (err, rows) => {
                 if (err) {
                     console.error(err);
                     return res
                         .status(500)
                         .json({ message: "Erro ao buscar frequencia." });
                 }
                 res.json(rows); // Retorna os clientes encontrados ou um array vazio
             });
         } else {
             // Se CPF não foi passado, retorna todos os clientes
             const query = `SELECT * FROM frequencia`;

             db.all(query, (err, rows) => {
                 if (err) {
                     console.error(err);
                     return res
                         .status(500)
                         .json({ message: "Erro ao buscar clientes." });
                 }
                 res.json(rows); // Retorna todos os clientes
             });
         }
     });

     // Atualizar cliente
     app.put("/frequencia/codigo/:codigo", (req, res) => {
         const { codigo } = req.params;
         const { nome, treinos, faltas } = req.body;

         const query = `UPDATE frequencia SET nome = ?, treinos = ?, faltas = ? WHERE codigo = ?`;
         db.run(query, [nome, treinos, faltas, codigo], function (err) {
             if (err) {
                 return res.status(500).send("Erro ao atualizar cliente.");
             }
             if (this.changes === 0) {
                 return res.status(404).send("Cliente não encontrado.");
             }
             res.send("Cliente atualizado com sucesso.");
         });
     });

///////////////////////////// Rotas para Cargos /////////////////////////////
///////////////////////////// Rotas para Cargos /////////////////////////////
///////////////////////////// Rotas para Cargos /////////////////////////////


// Cadastrar cargo
app.post("/cargo", (req, res) =>{
    const { codigo, codigofun, funcao } =
        req.body;

    if (!codigo || !codigofun) {
        return res.status(400).send("Codigo e Codigofun são obrigatórios.");
    }

    const query = `INSERT INTO cargo (codigo, codigofun, funcao) VALUES (?, ?, ?)`;
    db.run(
        query,
        [codigo, codigofun, funcao],
        function (err) {
            if (err) {
                return res.status(500).send("Erro ao cadastrar cargo.");
            }
            res.status(201).send({
                id: this.lastID,
                message: "Cargo cadastrado com sucesso.",
            });
        },
    );
});

// Listar cargos
// Endpoint para listar todos os cargos ou buscar por codigo
app.get("/cargo", (req, res) => {
    const codigo = req.query.codigo || ""; // Recebe o codigo da query string (se houver)

    if (codigo) {
        // Se codigo foi passado, busca cargos que possuam esse codigo ou parte dele
        const query = `SELECT * FROM cargo WHERE codigo LIKE ?`;

        db.all(query, [`%${codigo}%`], (err, rows) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ message: "Erro ao buscar cargos." });
            }
            res.json(rows); // Retorna os cargos encontrados ou um array vazio
        });
    } else {
        // Se CPF não foi passado, retorna todos os cargos
        const query = `SELECT * FROM cargo`;

        db.all(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .json({ message: "Erro ao buscar cargos." });
            }
            res.json(rows); // Retorna todos os cargos
        });
    }
});

// Atualizar cargo
app.put("/cargo/codigo/:codigo", (req, res) => {
    const { codigo } = req.params;
    const { codigofun, funcao } = req.body;

    const query = `UPDATE cargo SET codigofun = ?, funcao = ? WHERE codigo = ?`;
    db.run(query, [codigofun, funcao, codigo], function (err) {
        if (err) {
            return res.status(500).send("Erro ao atualizar cargo.");
        }
        if (this.changes === 0) {
            return res.status(404).send("Cargo não encontrado.");
        }
        res.send("Cargo atualizado com sucesso.");
    });
});


//////////////////////////// Rotas para Planos de Treino /////////////////////////////
///////////////////////////// Rotas para Planos de Treino /////////////////////////////
///////////////////////////// Rotas para Planos de Treino /////////////////////////////

// Cadastrar plano de treino
app.post("/planos_treino", (req, res) => {
    const { codigo, nome, categoria, duracao, exercicios, observacoes } = req.body;

    if (!codigo || !nome || !categoria || !duracao || !exercicios) {
        return res.status(400).json({ message: "Código, nome, categoria, duração e exercícios são obrigatórios." });
    }

    const query = `INSERT INTO planos_treino (codigo, nome, categoria, duracao, exercicios, observacoes) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(
        query,
        [codigo, nome, categoria, duracao, exercicios, observacoes || ''],
        function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ message: "Código do plano já existe." });
                }
                return res.status(500).json({ message: "Erro ao cadastrar plano." });
            }
            res.status(201).json({
                id: this.lastID,
                message: "Plano cadastrado com sucesso.",
            });
        }
    );
});

// Listar planos de treino (todos ou por código)
app.get("/planos_treino", (req, res) => {
    const codigo = req.query.codigo;

    if (codigo) {
        const query = `SELECT * FROM planos_treino WHERE codigo = ?`;
        db.all(query, [codigo], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Erro ao buscar planos de treino." });
            }
            res.json(rows);
        });
    } else {
        const query = `SELECT * FROM planos_treino ORDER BY categoria, nome`;
        db.all(query, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Erro ao buscar planos de treino." });
            }
            res.json(rows);
        });
    }
});

// Buscar planos por categoria
app.get("/planos_treino/categoria/:categoria", (req, res) => {
    const { categoria } = req.params;

    const query = `SELECT * FROM planos_treino WHERE categoria = ? ORDER BY nome`;
    db.all(query, [categoria], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erro ao buscar planos por categoria." });
        }
        res.json(rows);
    });
});

// Atualizar plano de treino
app.put("/planos_treino/codigo/:codigo", (req, res) => {
    const { codigo } = req.params;
    const { nome, categoria, duracao, exercicios, observacoes } = req.body;

    if (!nome || !categoria || !duracao || !exercicios) {
        return res.status(400).json({ message: "Nome, categoria, duração e exercícios são obrigatórios." });
    }

    const query = `UPDATE planos_treino SET nome = ?, categoria = ?, duracao = ?, exercicios = ?, observacoes = ? WHERE codigo = ?`;
    db.run(query, [nome, categoria, duracao, exercicios, observacoes || '', codigo], function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erro ao atualizar plano de treino." });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: "Plano de treino não encontrado." });
        }
        res.json({ message: "Plano de treino atualizado com sucesso." });
    });
});

// Excluir plano de treino
app.delete("/planos_treino/codigo/:codigo", (req, res) => {
    const { codigo } = req.params;

    const query = `DELETE FROM planos_treino WHERE codigo = ?`;
    db.run(query, [codigo], function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erro ao excluir plano de treino." });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: "Plano de treino não encontrado." });
        }
        res.json({ message: "Plano de treino excluído com sucesso." });
    });
});


///////////////////////////// Rotas para Movimento /////////////////////////////
///////////////////////////// Rotas para Movimento /////////////////////////////
///////////////////////////// Rotas para Movimento /////////////////////////////

// Cadastrar movimento
app.post("/movimento", (req, res) => {
    const { codigo, nome, mes, treinos, faltas, valor, pago } = req.body;

    if (!codigo || !nome || !mes) {
        return res.status(400).send("Código, nome e mês são obrigatórios.");
    }

    const query = `INSERT INTO movimento (codigo, nome, mes, treinos, faltas, valor, pago) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run(query, [codigo, nome, mes, treinos, faltas, valor, pago], function (err) {
        if (err) {
            return res.status(500).send("Erro ao cadastrar movimento.");
        }
        res.status(201).send({
            id: this.lastID,
            message: "Movimento cadastrado com sucesso.",
        });
    });
});

// Listar movimento - busca por código, nome ou mês
app.get("/movimento", (req, res) => {
    const search = req.query.search || "";
    const mes = req.query.mes || "";

    let query = `SELECT * FROM movimento WHERE 1=1`;
    let params = [];

    if (search) {
        query += ` AND (codigo LIKE ? OR nome LIKE ?)`;
        params.push(`%${search}%`, `%${search}%`);
    }

    if (mes) {
        query += ` AND mes = ?`;
        params.push(mes);
    }

    query += ` ORDER BY nome`;

    db.all(query, params, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erro ao buscar movimento." });
        }
        res.json(rows);
    });
});

// Atualizar movimento
app.put("/movimento/codigo/:codigo/mes/:mes", (req, res) => {
    const { codigo, mes } = req.params;
    const { treinos, faltas, valor, pago } = req.body;

    const query = `UPDATE movimento SET treinos = ?, faltas = ?, valor = ?, pago = ? WHERE codigo = ? AND mes = ?`;
    db.run(query, [treinos, faltas, valor, pago, codigo, mes], function (err) {
        if (err) {
            return res.status(500).send("Erro ao atualizar movimento.");
        }
        if (this.changes === 0) {
            return res.status(404).send("Movimento não encontrado.");
        }
        res.send("Movimento atualizado com sucesso.");
    });
});

// Buscar movimento completo (junção com clientes)
app.get("/movimento/completo", (req, res) => {
    const search = req.query.search || "";

    if (!search) {
        return res.status(400).send("Termo de pesquisa é obrigatório.");
    }

    const query = `
        SELECT 
            c.codigo, 
            c.nome, 
            c.idade, 
            c.telefone, 
            c.email,
            c.cpf,
            c.endereco,
            m.mes,
            m.treinos,
            m.faltas,
            m.valor,
            m.pago
        FROM clientes c
        LEFT JOIN movimento m ON c.codigo = m.codigo
        WHERE c.codigo LIKE ? OR c.nome LIKE ? OR c.cpf LIKE ?
        ORDER BY c.nome
    `;

    db.all(query, [`%${search}%`, `%${search}%`, `%${search}%`], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erro ao buscar movimento completo." });
        }
        res.json(rows);
    });
});


            // Teste para verificar se o servidor está rodando
app.get("/", (req, res) => {
    res.send("Servidor está rodando e tabelas criadas!");
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
