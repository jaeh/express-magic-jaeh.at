import { join } from 'path';
import { Magic, conjure } from 'magic-root';

const app = conjure();
const cwd = process.cwd();

app.set('cwd', join(cwd, 'src'));

app.set('babelifyFiles', ['index']);

app.set('404redirect', '/');

app.set('port', app.get('env') === 'development' ? 1337 : 80);

Magic(app);
