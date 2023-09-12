import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuestionService } from "../services/question";

import { useRequest } from "ahooks";

export default function useLoadQuestionData() {
  const { id = {} } = useParams()

  // const [loading, setLoading] = useState(true)
  // const [questionData, setQuestionData] = useState({})

  // useEffect(() => {
  //   async function fn() {
  //     const data = await getQuestionService(id)
  //     setQuestionData(data)
  //     setLoading(false)
  //   }
  //   fn()
  // }, [])

  async function load() {
    const data = getQuestionService(id)
    return data
  }

  const { loading, data, error} = useRequest(load)


  return {
    loading, data, error
  }
}
