import { useState, useReducer, useEffect } from 'react'
import ky from 'ky'

type ActionType = 'FETCH_INIT' | 'FETCH_SUCCESS' | 'FETCH_FAILURE'
interface Action {
  type: ActionType
  payload?: any
}

const dataFetchReducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      throw new Error()
  }
}

const useDataApi = (initialUrl: string, initialData = {}) => {
  const [url, setUrl] = useState(initialUrl)
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  })

  useEffect(() => {
    let didCancel = false
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' })
      try {
        const result = await ky(url, {
          // prefixUrl: '/a',
        }).json<any>()
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result })
        }
      } catch (error) {
        console.log(error)
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' })
        }
      }
    }
    fetchData()
    return () => {
      didCancel = true
    }
  }, [url])

  return [state, setUrl]
}

export default useDataApi
