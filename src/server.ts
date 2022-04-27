import app from './app'

const port = 8080
const address = '127.0.0.1'

const start = async () => {
  try{
      await app.listen(port,address)
      console.log('Server listening at '+address)
  } catch (err) {
      console.log(err)
      process.exit(0)
  }
}

start()