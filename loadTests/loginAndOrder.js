import { sleep, check, group, fail } from 'k6'
import http from 'k6/http'
import jsonpath from 'https://jslib.k6.io/jsonpath/1.0.2/index.js'

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 5, duration: '30s' },
        { target: 15, duration: '1m' },
        { target: 10, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
      gracefulRampDown: '30s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  let response
  const vars = {}

  group('page_1 - http://pizza.jamesephelps.com/', function () {
    response = http.get('http://pizza.jamesephelps.com/')
    checkResponse(response)

    response = http.get('https://pizza.jamesephelps.com/')
    checkResponse(response)
    sleep(5)

    response = http.put(
      'https://pizza-service.jamesephelps.com/api/auth',
      '{"email":"a@jwt.com","password":"admin"}',
      { headers: { accept: '*/*', 'content-type': 'application/json', origin: 'https://pizza.jamesephelps.com' } }
    )
    checkResponse(response)
    vars['token1'] = jsonpath.query(response.json(), '$.token')[0]
    sleep(7.8)

    response = http.get('https://pizza-service.jamesephelps.com/api/order/menu', {
      headers: { accept: '*/*', authorization: `Bearer ${vars['token1']}` }
    })
    checkResponse(response)

    response = http.get('https://pizza-service.jamesephelps.com/api/franchise', {
      headers: { accept: '*/*', authorization: `Bearer ${vars['token1']}` }
    })
    checkResponse(response)
    sleep(7)

    response = http.post(
      'https://pizza-service.jamesephelps.com/api/order',
      '{"items":[{"menuId":1,"description":"Food","price":0.0001},{"menuId":2,"description":"Tasty Pizza","price":0.0001}],"storeId":"1","franchiseId":1}',
      { headers: { accept: '*/*', authorization: `Bearer ${vars['token1']}`, 'content-type': 'application/json' } }
    )
    checkResponse(response)
    vars['pizzaJWT'] = response.json().jwt
    sleep(6.2)

    response = http.post(
      'https://pizza-factory.cs329.click/api/order/verify',
      JSON.stringify({ jwt: vars['pizzaJWT'] }),
      { headers: { accept: '*/*', authorization: `Bearer ${vars['token1']}`, 'content-type': 'application/json' } }
    )
    checkResponse(response)
  })
}

function checkResponse(response) {
  if (!check(response, { 'status equals 200': r => r.status === 200 })) {
    console.log(response.body)
    fail(`Request failed with status ${response.status}`)
  }
}
