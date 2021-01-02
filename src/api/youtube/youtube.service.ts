import express from 'express'

import { Router as AuthRouter } from './auth'
import { Router as AppRouter } from './app'

export const Router = express.Router()

Router.use('/auth', AuthRouter)
Router.use('/app', AppRouter)