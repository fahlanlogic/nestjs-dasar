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
