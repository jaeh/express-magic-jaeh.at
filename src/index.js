import { Magic, Express } from 'magic-root';

const app = Express();

app.set('cwd', __dirname);

app.set('babelifyFiles', ['index']);

app.set('port', app.get('env') === 'development' ? 1337 : 80);

Magic(app);
