# Nest CLI
  | CLI           | Kegunaan |
  |---------------|----------|
  | `nest generate module <nama> <path>`     | untuk generate module |
  | `nest generate controller <nama> <path>` | untuk generate controller |

# HTTP Request
  | Decorator     | Kegunaan |
  |---------------|----------|
  | @Req()        | untuk express.Request |
  | @Param(key?)  | untuk req.params.key? |
  | @Body(key?)   | untuk req.body.key?   |
  | @Query(key?)  | untuk req.query.key?  |
  | @Header(key?) | untuk req.header.key? |
  | @Ip()         | untuk req.ip          |
  | @HostParam()  | untuk req.hosts       |

# HTTP Response
  | Decorator             | Kegunaan |
  |-----------------------|----------|
  | @HttpCode(value)      | untuk response status code  |
  | @Header(key, value)   | untuk response header       |
  | @Redirect(loc, code)  | untuk redirect endpoint     |
  | @Next()               | untuk express.Nextfunction  |

# Set Cookie
Kita perlu install package cookie-parser, lalu gunakan di main.ts seperti ini `app.use(cookieParser(process.env.COOKIE_PASSWORD))` dan bisa langsung digunakan di-controller dengan notation @Res dari express.Response seperti ini :
```javascript  
setCookie(@Query('name') name: string, @Res() response: Response) {
  response.cookie('name', name);
  response.status(200).send('Success set cookie!');
}
```

# View
Untuk bisa menggunakan view, sama seperti express kita perlu menginstall package **mustache-express**. Setelah terinstall berikut kita harus set di `main.ts` seperti berikut:
```javascript
import * as mustache from 'mustache-express';

// didalam bootstrap
app.set('view engine', 'html');
app.set('views', __dirname + '/../views');
app.engine('html', mustache());
```

Karena kita memakai turunan/karakteristik dari express, kita harus memakai interface dari `NestExpressApplication`, ubah variable app-nya jadi seperti ini :
```javascript
import { NestExpressApplication } from '@nestjs/platform-express';

// didalam bootstrap
const app = await NestFactory.create<NestExpressApplication>(AppModule);
```

Setelah set up selesai, jangan lupa buat folder views (sejajar dengan src) dan buat file index.html didalamnya. Jika sudah maka buat controller view seperti berikut :
```javascript
@Get('/view/hello')
viewHello(@Query('name') name: string, @Res() response: Response) {
  response.render('index.html', {
    title: 'Template Engine!',
    name: name,
  });
}
```
argument pertama dari `response.render` adalah target dari output view-nya, dan object didalamnya mengatur nilai dari isi index.html itu sendiri (bisa lihat [disini](views/index.html))

# Unit Test
Unit test pada NestJS mirip seperti ExpressJS, namun jika ingin mengambil response kita harus membuat mock terlebih dahulu (tidak bisa langsung explist), gunakan library dari **node-mocks-http** agar lebih mudah, pasang package-nya dan gunakan difile `example.controller.spec.ts` dengan cara seperti berikut :
```javascript
// panggil semua class-nya sebaagai httpMock
import * as httpMock from 'node-mocks-http';

it('should show view template', async () => {
  // buat variable response-nya
  const response = httpMock.createResponse();
  controller.viewHello('Fahdi', response);

  // karena controller-nya untuk view jadi pakai ._getRenderView
  expect(response._getRenderView()).toBe('index.html');
  expect(response._getRenderData()).toEqual({
    title: 'Template Engine!',
    name: 'Fahdi',
  })
})
```