import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

export const Mock = new MockAdapter(axios, {
  delayResponse: 500
})
