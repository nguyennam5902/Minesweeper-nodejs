const express = require('express');
const app = express();
const fileController = require('./helper/file');
const database = require('./helper/database');
const utils = require('./helper/utils');
const config = require('./helper/config');
const Account = require('./models/Account');
const Beginner = require('./models/Beginner');
const Intermediate = require('./models/Intermediate');
const Expert = require('./models/Expert');
const Custom = require('./models/Custom');
const Data = require('./models/Data');
const modeMap = [Beginner, Intermediate, Expert];

database.getConnection();

app.use(express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('port', 3000);

var isLogin = false;
const cssText = fileController.readFile('./static/styles-455.css');
var isCheck = false;

app.get('/', (_req, res) => {
   res.render('index', {
      // 'stylesheet': cssText,
      'stylesheet': fileController.readFile('./static/styles-455.css'),
      'isLogin': isLogin,
      'username': app.get('username'),
      'subtitle': 'Welcome'
   });
});

app.post('/all', (req, res) => {
   const mode = req.body.mode;
   const tmpCheck = utils.parseBoolean(req.body.isCheck);
   // console.log(`MODE:|${mode}`);
   isCheck = tmpCheck;
});

app.get('/beginner', (_req, res) => {
   if (app.get(`username`) == null) {
      res.redirect('/login');
   } else {
      res.render('beginner', {
         // 'stylesheet': cssText,
         'stylesheet': fileController.readFile('./static/styles-455.css'),
         isLogin: true,
         'username': app.get('username'),
         'subtitle': "Beginner"
      });
   }
});

app.get('/custom', (req, res) => {
   utils.apologyRender(res, app.get('username') != undefined, 400, "SORRY");
})

app.post('/data', async (req, res) => {
   const gameMode = req.body.game_mode;
   const isWin = utils.parseBoolean(req.body.is_win);
   const time = req.body.time;
   const clicks = req.body.clicks;
   const date = req.body.date;
   // console.log(`MODE:|${gameMode}\nWIN:|${isWin}\nTIME:|${time}\nCLICKS:|${clicks}\nDATE:|${date}`);
   Data.create({
      'user_id': app.get('user_id'),
      'clicks': clicks,
      'game_mode': gameMode,
      'is_win': isWin,
      'time': time,
      'date': date
   });
   const result = await modeMap[gameMode].findOne().byUsername(app.get(`username`)).exec();
   if (isWin == true) {
      // console.log("WIN");
      result.wins++;
      result.current_ws++;
   }
   else {
      // console.log("LOSE");
      result.current_ws = 0;
   }
   result.max_ws = Math.max(result.max_ws, result.current_ws);
   await result.save();
});

app.get('/expert', (_req, res) => {
   if (app.get(`username`) == null) {
      res.redirect('/login');
   } else {
      res.render('expert', {
         // 'stylesheet': cssText,
         'stylesheet': fileController.readFile('./static/styles-455.css'),
         isLogin: true,
         'username': app.get('username'),
         'subtitle': 'Expert'
      });
   }
});

app.get('/game/:game_id', (req, res) => {
   res.render('game', {
      'stylesheet': fileController.readFile('./static/styles-455.css'),
      isLogin: true,
      'username': app.get('username'),
      'subtitle': `Game ${req.params.game_id}`
   })
});

app.get('/help/:route', (req, res) => {
   const route = req.params.route;
   res.render(`help/${route}`, {
      'stylesheet': fileController.readFile('./static/styles-455.css'),
      isLogin: isLogin,
      'username': app.get('username'),
      'subtitle': 'Gameplay',
      'titles': config.HELP_TITLES,
      'route': route
   })
});

app.get('/intermediate', (_req, res) => {
   if (app.get(`username`) == null) {
      res.redirect('/login');
   } else {
      res.render('intermediate', {
         // 'stylesheet': cssText,
         'stylesheet': fileController.readFile('./static/styles-455.css'),
         isLogin: true,
         'username': app.get('username')
      });
   }
})

app.get('/login', (_req, res) => {
   res.render('login', {
      // 'stylesheet': cssText,
      'stylesheet': fileController.readFile('./static/styles-455.css'),
      'isLogin': false,
      'username': app.get('username')
   });
});

app.post('/login', (req, res) => {
   const username = req.body.username;
   const password = req.body.password;
   Account.findOne().byAccount(username, password).exec((_err, account) => {
      if (account != null) {
         isLogin = true;
         app.set('username', username);
         app.set('user_id', account.id);
         console.log(app.get('user_id'));
         res.redirect('/');
      } else {
         res.redirect('/login');
      }
   });
});

app.get('/logout', (_req, res) => {
   app.set('username', undefined);
   app.set('user_id', undefined);
   isLogin = false;
   res.redirect('/');
});

app.get('/my-games/:mode/:pageID', (request, res) => {
   if (app.get(`username`) == null) {
      res.redirect('/login');
   } else {
      const url = request.originalUrl.split('/');
      const pageNum = parseInt(url.pop());
      const mode = url.pop();
      // const numMode = config.getNumMode(mode);
      // console.log(isCheck);
      // console.log(mode);
      // console.log(pageNum);
      // console.log(numMode);
      console.log(app.get(`username`));
      const dataFilter = {
         'user_id': app.get('user_id'),
         'game_mode': config.getNumMode(mode)
      };
      if (!isCheck) {
         dataFilter['is_win'] = true;
      }
      Data.find(dataFilter)
         .sort('time')
         .exec((err, games) => {
            if (err) throw err;
            var body = ``;
            const gamesNum = games.length;
            const totalPages = utils.getPage(gamesNum);
            const prevPage = pageNum != 1 ? pageNum - 1 : 1;
            const nextPage = pageNum == totalPages ? totalPages : pageNum + 1;
            const arrIndex = pageNum - 1;
            for (let i = 0; i < Math.min(gamesNum - 10 * arrIndex, 10); i++) {
               const tmpIndex = 10 * arrIndex + i;
               const game_id = games[tmpIndex].id;
               body = body + `
         <tr id="game_row_${game_id}">
            <td>${tmpIndex + 1}</td>
            <td><a href="/game/${game_id}"><span><span class="fa fa-caret-square-o-right game-play"></span>${games[tmpIndex].time}</span></a></td>
            <td class="text-center"><span class="help" title="" data-original-title="Win"><i class="fa fa-${games[tmpIndex].is_win == true ? `check-circle text-success` : `times-circle text-danger`} icon-state icon-state-table"></i></span></td>
            <td>${games[tmpIndex].clicks}</td>
            <td class=""><span>${games[tmpIndex].date}</span></td>
         </tr>`;
            }
            res.render('my_games/index', {
               'stylesheet': fileController.readFile('./static/styles-455.css'),
               'isLogin': true,
               'username': app.get('username'),
               'tableData': body,
               'isCheck': isCheck ? 'checked' : '',
               'mode': mode,
               'prevPage': prevPage,
               'totalPages': totalPages,
               'nextPage': nextPage,
               'pageNum': pageNum
            });
         })
   }
});

app.get('/profile', (_req, res) => {
   if (app.get(`username`) == null) {
      res.redirect('/login');
   } else {
      res.render('profile', {
         // 'stylesheet': cssText,
         'stylesheet': fileController.readFile('./static/styles-455.css'),
         'isLogin': true,
         'username': app.get('username'),
         'subtitle': 'Profile'
      })
   }
});

app.get('/register', (_req, res) => {
   res.render('register', {
      // 'stylesheet': cssText,
      'stylesheet': fileController.readFile('./static/styles-455.css'),
      'mainContent': fileController.readFile('./views/register.html'),
      'isLogin': false,
      'username': app.get('username')
   });
});

app.post('/register', (_req, res) => {
   const username = _req.body.username;
   const password = _req.body.password;
   const repeatPassword = _req.body.repeatPassword;
   Account.findOne().byUsername(username).exec((_err, acc) => {
      if (acc == null) {
         Account.create({ 'username': username, 'password': password });
         Beginner.create({ 'username': username });
         Intermediate.create({ 'username': username });
         Expert.create({ 'username': username });
         Custom.create({ 'username': username });
         res.redirect('/');
      } else {
         res.redirect('/register');
      }
   });
});

app.listen(app.get('port'), () => {
   console.log(`Node app is running on port ${app.get('port')}`);
});
