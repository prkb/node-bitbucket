const endpointMethod = require('../method.js')

jest.mock('../validate.js', () => jest.fn((paramsSpecs, params) => params))

const validate = require('../validate.js')

let apiClient

beforeEach(() => {
  apiClient = {
    request: jest.fn(o => Promise.resolve(o))
  }
})

describe('plugins:endpoint-methods/method', () => {
  it('invokes callback if present', done => {
    expect.assertions(1)

    const mockCallback = jest.fn(() => {
      expect(mockCallback).toBeCalled()
      done()
    })

    endpointMethod(apiClient, {}, {}, {}, mockCallback)
  })

  it('returns resolved promise if callback not present', async () => {
    expect.assertions(1)

    await expect(
      endpointMethod(apiClient, {}, {}, {})
    ).resolves.toMatchSnapshot()
  })

  it('calls `validate` & `apiClient.request`', async () => {
    expect.assertions(2)

    await endpointMethod(apiClient, {}, {}, {})

    expect(validate).toBeCalled()
    expect(apiClient.request).toBeCalled()
  })
})
