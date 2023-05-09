import app from './app'
import { AppDataSource } from './data-source'

AppDataSource.initialize()
    .then(() => {
        console.log('Database conectado')
        app.listen(3000, () => {
            console.log('Servidor executando')
        })
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err)
    })
