import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// настройки статики

app.use(express.static(join(__dirname, "public")));


// регистрация
app.get("/register", (req, res) => {
    res.render("register", {
        title: "Регистрация на портале"
    });
});

// о портале
app.get("/about", (req, res) => {
    res.render("about", {
        title: "О портале",
        description: "Конференции.РФ — портал для подачи заявок на бронирование помещений."
    });
});

// контакты
app.get("/contact", (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Контакты</h1>
                <p>Телефон: +7 (900) 123-45-67</p>
            </body>
        </html>
    `);
});

// помощь
app.get("/help", (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Помощь</h1>
            </body>
        </html>
    `);
});

// список помещений
app.get("/rooms", (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Список помещений</h1>
                <ul>
                    <li>Конференц-зал №1</li>
                    <li>Конференц-зал №2</li>
                </ul>
            </body>
        </html>
    `);
});


app.post("/register", (req, res) => {
    res.render("register", {
        title: "Регистрация на портале",
        user: {
            fio: req.body.fio,
            phone: req.body.phone,
            email: req.body.email
        }
    });
});

// вход
app.get("/login", (req, res) => {
    res.render("login", {
        title: "Авторизация"
    });
});

app.post("/login", (req, res) => {
    res.redirect("/dashboard");
});

// личный кабинет
app.get("/dashboard", (req, res) => {
    res.render("dashboard", {
        title: "Мои заявки",
        user: {
            fio: "Иванов Иван"
        },
        requests: [
            {
                room_name: "Аудитория №1",
                status: "Новая"
            },
            {
                room_name: "Коворкинг",
                status: "Завершено"
            }
        ]
    });
});

app.listen(PORT, () => {
  console.log(`Сервер: http://localhost:${PORT}`);
});