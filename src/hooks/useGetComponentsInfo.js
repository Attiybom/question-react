import { useSelector } from "react-redux";



// 从store中获取组件列表
export default function useGetComponentsInfo() {

  const components = useSelector(state => state.components)

  const { componentList = [], selectedId } = components


  return {
    componentList,
    selectedId
  }

}